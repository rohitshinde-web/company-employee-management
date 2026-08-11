import { ILeave } from "../interfaces/leave.interface.js";
import { ApplyLeaveDTO, UpdateLeaveStatusDTO } from "../types/dto/leave.dto.js";
import { BaseRepository } from "./base.repositories";



export class LeaveRepository extends BaseRepository<ILeave> {
    private mapToEntity(row: Record<string, unknown>): ILeave {
        return {
            id: row.id as string,
            employeeId: row.employee_id as string,
            leaveType: row.leave_type as ILeave['leaveType'],
            startDate: new Date(row.start_date as string),
            endDate: new Date(row.end_date as string),
            reason: row.reason as string,
            status: row.status as ILeave['status'],
            approvedBy: row.approved_by as string | null,
            createdAt: new Date(row.created_at as string),
            updatedAt: new Date(row.updated_at as string)
        };
    }

    public async findById(id:string): Promise<ILeave | null>{
        const query = `
        SELECT * FROM leaves
        WHERE id = $1 LIMIT 1
        `;
        const result = await this.query(query, [id]);
        return result.rows.length ? this.mapToEntity(result.rows[0]): null;
    }

    public async create(dto: ApplyLeaveDTO): Promise<ILeave>{
        const query = `
        INSERT INTO leaves (employee_id, leave_type, start_date, end_date, reason)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        `;

        const result = await this.query(query, [
            dto.employeeId,
            dto.leaveType,
            dto.startDate,
            dto.endDate,
            dto.reason
        ]);

        return this.mapToEntity(result.rows[0])
    }

    public async findByEmployeeId(employeeId: string): Promise<ILeave[]>{
        const query = `
        SELECT * FROM leaves
        WHERE employee_id = $1
        ORDER BY created_at DESC`;

        const result = await this.query(query, [employeeId]);
        return result.rows.map((row) => this.mapToEntity(row));
    }

    public async udpateStatus(id:string, dto:UpdateLeaveStatusDTO): Promise<ILeave>{
        const query = `
        UPDATE leaves
        SET status = $1, approved_by = $2, updated_at = CURRENT_TIMESTAMP
        WHERE id = $3
        RETURNING *`;

        const result = await this.query(query, [dto.status, dto.approvedBy, id]);
        return result.rows.length ? this.mapToEntity(result.rows[0]) : null;
    }

}

export const leaveRepository = new LeaveRepository();