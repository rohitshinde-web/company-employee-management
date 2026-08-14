import {body, param} from 'express-validator';
export const createDepartmentValidator = [
    body('departmentCode')
    .trim()
    .notEmpty()
    .withMessage('Department code is required')
    .isLength({min: 3, max: 20})
    .withMessage('Department code must be between 3 and 20 characters')
    .isUppercase()
    .withMessage('Department code must be uppercase'),

    body('name')
    .trim()
    .notEmpty()
    .withMessage('Department name is required')
    .isLength({min:2, max:100})
    .withMessage('Department name must be between 2 and 100 characters')
    .escape(),

    body('budget')
    .notEmpty()
    .withMessage('Budget is required')
    .isFloat({min: 0})
    .withMessage('Budget must be a positive number')
];

export const updateDepartmentValidator = [
    param('id')
    .isUUID()
    .withMessage('Department ID must be a valid UUID'),

    body('name')
    .optional()
    .trim()
    .isLength({min:2, max:100})
    .withMessage('Department name must be between 2 and 100 characters')
    .escape(),

    body('budget')
    .optional()
    .isFloat({min: 0})
    .withMessage('Budget must be a non-negative number'),
];