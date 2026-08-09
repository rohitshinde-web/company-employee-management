export interface ISalary {
  id: string;
  employeeId: string;
  baseSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  effectiveDate: Date;
  createdAt: Date;
}
