"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Activity_1 = require("./models/Activity");
const Leaderboard_1 = require("./models/Leaderboard");
const Team_1 = require("./models/Team");
const User_1 = require("./models/User");
const Workout_1 = require("./models/Workout");
const router = (0, express_1.Router)();
router.get('/users/', async (_req, res, next) => {
    try {
        const data = await User_1.User.find().sort({ displayName: 1 }).lean();
        res.json({ resource: 'users', data });
    }
    catch (error) {
        next(error);
    }
});
router.get('/teams/', async (_req, res, next) => {
    try {
        const data = await Team_1.Team.find().sort({ name: 1 }).lean();
        res.json({ resource: 'teams', data });
    }
    catch (error) {
        next(error);
    }
});
router.get('/activities/', async (_req, res, next) => {
    try {
        const data = await Activity_1.Activity.find().sort({ activityDate: -1 }).lean();
        res.json({ resource: 'activities', data });
    }
    catch (error) {
        next(error);
    }
});
router.get('/leaderboard/', async (_req, res, next) => {
    try {
        const data = await Leaderboard_1.Leaderboard.find().sort({ rank: 1 }).lean();
        res.json({ resource: 'leaderboard', data });
    }
    catch (error) {
        next(error);
    }
});
router.get('/workouts/', async (_req, res, next) => {
    try {
        const data = await Workout_1.Workout.find().sort({ difficulty: 1, title: 1 }).lean();
        res.json({ resource: 'workouts', data });
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
