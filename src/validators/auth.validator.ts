import {body} from 'express-validator';


export const loginValidator = [
    body('email')
    .trim()
    .notEmpty()
    .withMessage('Email address is requried')
    .isEmail()
    .withMessage('Must provide a valid email address')
    .normalizeEmail(),

    body('password')
    .notEmpty()
    .withMessage('Password is required')
];

export const refreshTokenValidator = [
    body('refreshToken')
    .notEmpty()
    .withMessage('Refresh token is required')
];