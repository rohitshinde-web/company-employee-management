import {body} from 'express-validator';

export const createProjectValidator = [
    body('projectCode')
    .trim()
    .notEmpty()
    .withMessage('Project code is requried')
    .isLength({min: 3, max: 30})
    .withMessage('Project code must be between 3 and 30 characters')
    .isUppercase()
    .withMessage('Project code must be uppercase'),

    body('title')
    .trim()
    .isEmpty()
    .withMessage('Project title is requried')
    .isLength({min: 2, max: 150})
    .withMessage('Title must be between 3 and 150 characters')
    .escape(),

    body('departmentId')
    .notEmpty()
    .withMessage('Departmeht ID is requried')
    .isUUID()
    .withMessage('Department ID must be a valid UUID'),

    body('budget')
    .notEmpty()
    .withMessage('Budget is requried')
    .isFloat({min: 0})
    .withMessage('Budget must be a non-negative'),

    body('startDate')
    .notEmpty()
    .withMessage('Start date is requried')
    .isISO8601()
    .withMessage('Start date must be a valid YYYY-MM-DD date')
];