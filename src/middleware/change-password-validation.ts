import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

export const changePasswordValidationMiddleware = [
  check('currentPassword').notEmpty().withMessage('Current password is required'),
  check('newPassword').notEmpty().withMessage('New password is required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

export const changePasswordValidation = (req: Request, res: Response, next: NextFunction) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Validation successful, proceed to the next middleware or route handler
  next();
};
