import { HTTP_STATUS } from "../constants/statusCodes";
import { IAttendance } from "../interfaces/attendance.interface";
import { attendanceRepository } from "../repositories/attendance.repository";
import { employeeRepository } from "../repositories/employee.respository";
import { AppError } from "../utils/AppError";


export class AttendanceService {
    public async checkIn(employeeId: string): Promise<IAttendance>{
        const employee = await employeeRepository.findById(employeeId);
        if(!employee){
            throw new AppError(`Employee with ID ${employeeId}  not found`, HTTP_STATUS.NOT_FOUND);
        }
       
        const todayStr = new Date().toISOString().split('T')[0];
        const existingRecord = await attendanceRepository.findTodayRecord(employeeId, todayStr);
        if(existingRecord){
            throw new AppError(`Employee has already checked in today`, HTTP_STATUS.CONFLICT)
        }
        return attendanceRepository.checkIn(employeeId, todayStr)
    }

    public async checkOut(employeeId: string): Promise<IAttendance>{
        const todayStr = new Date().toISOString().split('T')[0];
        const record = await attendanceRepository.findTodayRecord(employeeId, todayStr);
        if(!record){
            throw new AppError(`No check-in record found for today`, HTTP_STATUS.NOT_FOUND);
        }
        if(record.checkOutTime){
            throw new AppError(`Employee has already checked out for today`, HTTP_STATUS.CONFLICT);
        }
        return attendanceRepository.checkOut(record.id)
    }

    public async getEmployeeAttendance(employeeId: string): Promise<IAttendance>{
      return attendanceRepository.getEmployeeAttendanceHistory(employeeId);
    }
}

export const attendanceService = new AttendanceService();