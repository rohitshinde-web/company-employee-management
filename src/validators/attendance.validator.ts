import {body, param} from 'express-validator';

export const attendanceCheckInValidator = [
    body('employeeId')
    .notEmpty()
    .withMessage('Employee ID is required')
    .isUUID()
    .withMessage('Employee ID must be a valid UUID'),
];

export const attendanceCheckOutValidator = [
    body('employeeId')
    .notEmpty()
    .withMessage('Employee ID is requried')
    .isUUID()
    .withMessage('Employee ID must be a valid UUID')
];

export const getAttendaceValidator = [
param('employeeId')
.isUUID()
.withMessage('Employee ID parameter must be a valid UUID'),
];