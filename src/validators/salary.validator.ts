import {body, param} from 'express-validator';

export const createSalaryValidator = [
    body('employeeId')
    .notEmpty()
    .withMessage('Employee ID is requried')
    .isUUID()
    .withMessage('Employee ID must be a valid UUID'),

    body('baseSalary')
    .notEmpty()
    .withMessage('Base salary is required')
    .isFloat({min: 1})
    .withMessage('Base salary must be a greater than 0'),

    body('allowances')
    .optional()
    .isFloat({min: 0})
    .withMessage('Allowances must be a non-negative'),

    body('deductions')
    .optional()
    .isFloat({min: 0})
    .withMessage('Deductions must be non-negative'),

    body('effectiveDate')
    .notEmpty()
    .withMessage('Effective date is required')
    .isISO8601()
    .withMessage('Effective date must be a valid YYYY-MM-DD date'),
];

export const getSalaryHistoryValidator = [
    param('employeeId')
    .isUUID()
    .withMessage('Employee ID parameter must be a valid UUID'),
];