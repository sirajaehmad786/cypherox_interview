const { check, validationResult } = require("express-validator");

const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) break;
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: false,
                errors: errors.array(),
            });
        }

        next();
    };
};

const taskValidationRules = [
    check("title")
        .notEmpty()
        .withMessage("Title is required")
        .isLength({ max: 100 })
        .withMessage("Title must be at most 100 characters"),
    
    check("description")
        .notEmpty()
        .withMessage("Description is required")
        .isLength({ max: 500 })
        .withMessage("Description must be at most 500 characters"),

    check("status")
        .notEmpty()
        .withMessage("Status is required")
        .isIn(["To-Do", "In Progress", "Done"])
        .withMessage("Status must be one of 'To-Do', 'In Progress', or 'Done'")
];

module.exports = {
    validate,
    taskValidationRules
};
