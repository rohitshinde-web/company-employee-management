export interface CreateSalaryDTO {
  employeeId: string;
  baseSalary: number;
  allowances: number;
  deductions: number;
  effectiveDate: Date;
}
