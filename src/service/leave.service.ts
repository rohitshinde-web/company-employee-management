import { HTTP_STATUS } from "../constants/statusCodes";
import { ILeave } from "../interfaces/leave.interface";
import { employeeRepository } from "../repositories/employee.respository";
import { leaveRepository } from "../repositories/leave.repository";
import { ApplyLeaveDTO, UpdateLeaveStatusDTO } from "../types/dto/leave.dto";
import { AppError } from "../utils/AppError";


export class LeaveService {
    public async applyLeave(dto: ApplyLeaveDTO): Promise<ILeave>{
        const employee = await employeeRepository.findById(dto.employeeId);
        if(!employee){
            throw new AppError(`Employee with id ${dto.employeeId} not found`, HTTP_STATUS.NOT_FOUND);
        }
        return leaveRepository.create(dto);
    }

    public async updateLeaveStatus(id:string, dto: UpdateLeaveStatusDTO): Promise<ILeave>{
        const leave = await leaveRepository.findById(id);
        if(!leave){
            throw new AppError(`Leave with id ${id} not found`, HTTP_STATUS.NOT_FOUND);
        }

        const update = await leaveRepository.udpateStatus(id, dto);
        return update;
    }

    public async getEmployeeLeaves(employeeId: string): Promise<ILeave[]>{
        return leaveRepository.findByEmployeeId(employeeId);
    }
}

export const leaveService = new LeaveService();