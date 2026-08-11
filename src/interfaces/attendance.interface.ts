export interface IAttendance {
    id: string;
    employeeId: string;
    date: Date;
    checkInTime: Date;
    checkOutTime: Date;
    status: 'PRESENT' | 'ABSENT' | 'HALF_DAY' | 'LEAVE';
    createdAt: Date;
}