export interface IProject {
    id: string;
    projectCode: string;
    title: string;
    description: string | null;
    departmentId: string;
    budget: number;
    startDate: Date;
    endDate: Date;
    createdAt: Date;
    updatedAt: Date;
}