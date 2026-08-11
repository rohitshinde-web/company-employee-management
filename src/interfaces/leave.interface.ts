export interface ILeave {
    id: string;
    employeeId: string;
    leaveType: 'SICK' | 'CASUAK' | 'MATERNITY' | 'PATERNITY' | 'UNPAID';
    startDate: Date;
    endDate: Date;
    reason: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    approvedBy: string | null;
    createdAt: Date;
    updatedAt: Date;
}