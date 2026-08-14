import {body} from 'express-validator';

export const createRoleValidator = [
    body('roleName')
    .trim()
    .notEmpty()
    .withMessage('Role name is required')
    .isLength({min:2, max:50})
    .withMessage('Role name bust be between 2 and 50 characters')
    .isUppercase()
    .withMessage('Role name must be uppercase'),

    body('description')
    .optional()
    .trim()
    .escape(),
];