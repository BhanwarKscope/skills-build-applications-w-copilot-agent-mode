"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Activity_1 = require("../models/Activity");
const Leaderboard_1 = require("../models/Leaderboard");
const Team_1 = require("../models/Team");
const User_1 = require("../models/User");
const Workout_1 = require("../models/Workout");
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const seedDatabase = async () => {
    console.log('Seed the octofit_db database with test data');
    await mongoose_1.default.connect(mongoUri);
    await Promise.all([
        User_1.User.deleteMany({}),
        Team_1.Team.deleteMany({}),
        Activity_1.Activity.deleteMany({}),
        Leaderboard_1.Leaderboard.deleteMany({}),
        Workout_1.Workout.deleteMany({}),
    ]);
    await Team_1.Team.insertMany([
        { name: 'Core Crushers', motto: 'Stronger every rep', memberCount: 3, weeklyGoalMinutes: 900 },
        { name: 'Cardio Crew', motto: 'Miles make momentum', memberCount: 2, weeklyGoalMinutes: 720 },
        { name: 'Flex Force', motto: 'Mobility meets grit', memberCount: 2, weeklyGoalMinutes: 600 },
    ]);
    await User_1.User.insertMany([
        { username: 'alex-rivera', email: 'alex.rivera@example.com', displayName: 'Alex Rivera', fitnessGoal: 'Build functional strength', level: 'intermediate', team: 'Core Crushers' },
        { username: 'maya-chen', email: 'maya.chen@example.com', displayName: 'Maya Chen', fitnessGoal: 'Improve 10K pace', level: 'advanced', team: 'Cardio Crew' },
        { username: 'sam-patel', email: 'sam.patel@example.com', displayName: 'Sam Patel', fitnessGoal: 'Create a consistent routine', level: 'beginner', team: 'Flex Force' },
        { username: 'jordan-lee', email: 'jordan.lee@example.com', displayName: 'Jordan Lee', fitnessGoal: 'Increase endurance', level: 'intermediate', team: 'Cardio Crew' },
        { username: 'taylor-kim', email: 'taylor.kim@example.com', displayName: 'Taylor Kim', fitnessGoal: 'Build lean muscle', level: 'advanced', team: 'Core Crushers' },
    ]);
    await Activity_1.Activity.insertMany([
        { username: 'alex-rivera', type: 'Strength Training', durationMinutes: 55, caloriesBurned: 420, activityDate: new Date('2026-06-24') },
        { username: 'maya-chen', type: 'Tempo Run', durationMinutes: 48, caloriesBurned: 510, activityDate: new Date('2026-06-25') },
        { username: 'sam-patel', type: 'Yoga Flow', durationMinutes: 35, caloriesBurned: 160, activityDate: new Date('2026-06-25') },
        { username: 'jordan-lee', type: 'Cycling', durationMinutes: 70, caloriesBurned: 620, activityDate: new Date('2026-06-26') },
        { username: 'taylor-kim', type: 'HIIT', durationMinutes: 32, caloriesBurned: 380, activityDate: new Date('2026-06-26') },
    ]);
    await Leaderboard_1.Leaderboard.insertMany([
        { username: 'maya-chen', team: 'Cardio Crew', points: 2480, rank: 1, streakDays: 19 },
        { username: 'taylor-kim', team: 'Core Crushers', points: 2310, rank: 2, streakDays: 14 },
        { username: 'jordan-lee', team: 'Cardio Crew', points: 2050, rank: 3, streakDays: 11 },
        { username: 'alex-rivera', team: 'Core Crushers', points: 1985, rank: 4, streakDays: 9 },
        { username: 'sam-patel', team: 'Flex Force', points: 1320, rank: 5, streakDays: 6 },
    ]);
    await Workout_1.Workout.insertMany([
        { title: 'Foundational Strength Circuit', focusArea: 'Full body', difficulty: 'beginner', durationMinutes: 30, recommendedForGoal: 'Create a consistent routine' },
        { title: 'Power Builder Blocks', focusArea: 'Upper body and core', difficulty: 'intermediate', durationMinutes: 45, recommendedForGoal: 'Build functional strength' },
        { title: 'Threshold Run Session', focusArea: 'Cardio endurance', difficulty: 'advanced', durationMinutes: 50, recommendedForGoal: 'Improve 10K pace' },
        { title: 'Mobility Reset', focusArea: 'Flexibility', difficulty: 'beginner', durationMinutes: 25, recommendedForGoal: 'Improve recovery and range of motion' },
        { title: 'Lean Muscle Supersets', focusArea: 'Strength hypertrophy', difficulty: 'advanced', durationMinutes: 55, recommendedForGoal: 'Build lean muscle' },
    ]);
    await mongoose_1.default.disconnect();
    console.log('Seed complete');
};
seedDatabase().catch(async (error) => {
    console.error('Seed failed:', error);
    await mongoose_1.default.disconnect();
    process.exit(1);
});
