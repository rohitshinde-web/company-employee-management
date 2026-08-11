export interface CreateProjectDTO {
    projectCode: string;
    title: string;
    description?: string;
    departmentId: string;
    budget: number;
    startDate: string;
    endDate: string;
}