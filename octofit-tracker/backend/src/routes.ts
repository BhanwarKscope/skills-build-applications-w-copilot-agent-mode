import { Router } from 'express';
import { Activity } from './models/Activity';
import { Leaderboard } from './models/Leaderboard';
import { Team } from './models/Team';
import { User } from './models/User';
import { Workout } from './models/Workout';

const router = Router();

router.get('/users/', async (_req, res, next) => {
  try {
    const data = await User.find().sort({ displayName: 1 }).lean();
    res.json({ resource: 'users', data });
  } catch (error) {
    next(error);
  }
});

router.get('/teams/', async (_req, res, next) => {
  try {
    const data = await Team.find().sort({ name: 1 }).lean();
    res.json({ resource: 'teams', data });
  } catch (error) {
    next(error);
  }
});

router.get('/activities/', async (_req, res, next) => {
  try {
    const data = await Activity.find().sort({ activityDate: -1 }).lean();
    res.json({ resource: 'activities', data });
  } catch (error) {
    next(error);
  }
});

router.get('/leaderboard/', async (_req, res, next) => {
  try {
    const data = await Leaderboard.find().sort({ rank: 1 }).lean();
    res.json({ resource: 'leaderboard', data });
  } catch (error) {
    next(error);
  }
});

router.get('/workouts/', async (_req, res, next) => {
  try {
    const data = await Workout.find().sort({ difficulty: 1, title: 1 }).lean();
    res.json({ resource: 'workouts', data });
  } catch (error) {
    next(error);
  }
});

export default router;