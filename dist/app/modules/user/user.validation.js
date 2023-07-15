"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
const zod_1 = require("zod");
const validateUser = (req, res, next) => {
    const userSchema = zod_1.z.object({
        firstName: zod_1.z.string().min(2).max(50).nonempty(),
        lastName: zod_1.z.string().min(2).max(50).nonempty(),
        password: zod_1.z.string().min(6).max(30).nonempty(),
    });
    try {
        const validatedData = userSchema.parse(req.body);
        req.body = validatedData;
        next();
    }
    catch (error) {
        res.status(400).json({ error: 'Validation error', details: error });
    }
};
exports.validateUser = validateUser;
