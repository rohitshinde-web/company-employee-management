export interface CreateDepartmentDTO {
  departmentCode: string;
  name: string;
  budget: number;
}

export type UpdateDepartmentDTO = Partial<CreateDepartmentDTO>;
