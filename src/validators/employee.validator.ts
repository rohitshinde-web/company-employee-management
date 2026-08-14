import {body, param, query} from 'express-validator';
import { EmployementStatus, Gender, UserRole } from '../constants/userRoles';


export const createEmployeeValidator = [
    body('firstName')
      .trim()
      .notEmpty()
      .withMessage('First name is required')
      .isLength({min: 2, max: 50})
      .withMessage('First name must be between 2 and 50 characters')
      .escape(),

    body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({min:2, max:50})
    .withMessage('Last name must be between 2 and 50 characters')
    .escape(),

    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email address is required')
      .isEmail()
      .withMessage('Must provide a valid email address')
      .normalizeEmail(),

    body('passwordHash')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({min: 8})
        .withMessage('Password must be at least 8 characters long'),
    
    body('departmentId')
        .notEmpty()
        .withMessage('Department ID is required')
        .isUUID()
        .withMessage('Department ID must be a valid UUID'),

    body('designation')
        .trim()
        .notEmpty()
        .withMessage('Designation is required')
        .escape(),

    body('role')
      .notEmpty()
      .withMessage('Role is required')
      .isIn(Object.values(UserRole))
      .withMessage(`Role must be one of: ${Object.values(UserRole).join(', ')}`),

    body('employmentStatus')
    .notEmpty()
    .withMessage('Employment status is requried')
    .isIn(Object.values(EmployementStatus))
    .withMessage(`Employment status must be one of: ${Object.values(EmployementStatus).join(', ')}`),

    body('gender').notEmpty().isIn(Object.values(Gender)).withMessage(`Gender must be one of: ${Object.values(Gender).join(', ')}`),

    body('salary').notEmpty().withMessage('Salary is requried').isFloat({min:0}).withMessage('Salary must be a positive number'),

    body('dateOfBirth').notEmpty().withMessage('Date of birth is requried').isISO8601().withMessage('Date of birth must be a YYYY-MM-DD valid date').custom((values)=>{
        const dob = new Date(values);
        const age = new Date().getFullYear() - dob.getFullYear();
        if(age < 18){
            throw new Error('Employee must be at least 18 years old');
        }
        return true;
    }),

    body('dateOfJoining').notEmpty().withMessage('Date of joining is requried').isISO8601().withMessage('Date of joining must be a valid YYYY-MM-DD date')
];

export const updateEmployeeValidator = [
  param('id').isUUID().withMessage('Employee ID must be a valid UUID'),

  body('firstName').optional().trim().isLength({min: 2, max: 50})
  .withMessage('First name must be between 2 and 50 characters')
  .escape(),

  body('lastName').optional().trim().isLength({min:2, max: 50})
  .withMessage('Last name must be between 2 and 50 characters').escape(),

  body('designation').optional().trim().notEmpty().withMessage('Designation cannot be empty').escape(),
];

export const employeeQueryValidator = [
  query('page').optional().isInt({min:1}).withMessage('page query parameter must be a positive integer'),
  query('limit').optional().isInt({min:1, max: 100}).withMessage('Limit query parameter must be between 1 and 100'),
  query('search').optional().trim().escape(),
];

export const uuidParamValidator = [
  param('id').isUUID().withMessage('URL parameter must be a valid UUID'),
];