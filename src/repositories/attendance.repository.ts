import { IAttendance } from "../interfaces/attendance.interface.js";
import { BaseRepository } from "./base.repositories.js";

export class AttendanceRepository extends BaseRepository<IAttendance>{
    private mapToEntity(row: Record<string, unknown>): IAttendance {
        return {
            id: row['id'] as string,
            employeeId: row['employeeId'] as string,
            date: new Date(row['date'] as string),
            checkInTime: row.check_in_time ? new Date(row.check_in_time as string) : null,
            checkOutTime: row.check_out_time ? new Date(row.check_out_time as string) : null,
            status: row.status as IAttendance['status'],
            createdAt: new Date(row.created_at as string)
        }
    }

    public async findTodayRecord(employeeId: string, dateStr: string) : Promise<IAttendance | null>{
        const query = `
        SELECT * FROM attendances
        WHERE employee_id = $1 AND date = $2 LIMIT 1`;
        const result = await this.query(query, [employeeId, dateStr]);
        return result.rows.length > 0 ? this.mapToEntity(result.rows[0]) : null;
    }

    public async checkIn(employeeId: string, dateStr: string): Promise<IAttendance>{
        const query = `
        INSERT INTO attendances (employee_id, date, check_in_time, status)
        VALUES ($1, $2, CURRENT_TIMESTAMP, 'PRESENT')
        `;
        const result = await this.query(query, [employeeId, dateStr]);
        return this.mapToEntity(result.rows[0])
    }

    public async checkOut(attendanceId: string): Promise<IAttendance>{
        const query = `
        UPDATE attendances
        SET check_out_time = CURRENT_TIMESTAMP
        WHERE id = $1
        RETURNING *`;

        const result = await this.query(query, [attendanceId]);
        return this.mapToEntity(result.rows[0])
    }

    public async getEmployeeAttendanceHistory(employeeId: string): Promise<IAttendance>{
        const query = `
        SELECT * FROM attendances
        WHERE employee_id = $1
        ORDER BY date DESC`;
        const result = await this.query(query, [employeeId]);
        return result.rows.map((row) => this.mapToEntity(row));
    }
}

export const attendanceRepository = new AttendanceRepository();