"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    fitnessGoal: { type: String, required: true },
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    team: { type: String, required: true },
}, { timestamps: true });
exports.User = (0, mongoose_1.model)('User', userSchema);
