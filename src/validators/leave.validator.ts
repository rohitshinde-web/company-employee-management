import {body, param} from 'express-validator';

export const applyLeaveValidator = [
    body('employeeId')
    .notEmpty()
    .withMessage('Employee ID is requried')
    .isUUID()
    .withMessage('Employee ID must be a valid UUID'),

    body('leaveType')
    .notEmpty()
    .withMessage('Leave type is required')
    .isIn(['SICK','CASUAL', 'MATERNITY', 'PATERNITY', 'UNPAID'])
    .withMessage('Invalid leave type specified'),

    body('startDate')
    .notEmpty()
    .withMessage('Start date is requried')
    .isISO8601()
    .withMessage('Start date must be a valid date'),

    body('endDate')
    .notEmpty()
    .withMessage('End date is requried')
    .isISO8601()
    .withMessage('End date must be a valid date')
    .custom((value, {req})=>{
        if(new Date(value) < new Date(req.body.startDate)){
            throw new Error('End date cannot be prior to start date')
        }
        return true;
    }),

    body('reason')
    .trim()
    .notEmpty()
    .withMessage('Leave reason is required')
    .isLength({min: 5, max: 500})
    .withMessage('Reason must be betwween 5 and 500 characters')
    .escape(),
];

export const updateLeaveStatsuValidator = [
    param('id')
    .isUUID()
    .withMessage('Leave ID must be a valid UUID'),

    body('status')
    .notEmpty()
    .withMessage('Status is required')
    .isIn(['APPROVED','REJECTED'])
    .withMessage('Status must be either APPROVED or REJECTED'),

    body('approvedBy')
    .notEmpty()
    .withMessage('ApprovedBy employee ID is requried')
    .isUUID()
    .withMessage('ApprovedBy must be a valid UUID'),
];