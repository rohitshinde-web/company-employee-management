export interface ApplyLeaveDTO {
    employeeId: string;
    leaveType: 'SICK' | 'CASUAL' | 'MATERNITY' | 'PATERNITY' | 'UNPAID';
    startDate: Date;
    endDate: Date;
    reason: string;
}

export interface UpdateLeaveStatusDTO {
    status : 'APPROVED' | 'REJECTED';
    approvedBy: string;
}