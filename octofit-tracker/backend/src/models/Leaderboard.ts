import { Schema, model } from 'mongoose';

export interface LeaderboardDocument {
  username: string;
  team: string;
  points: number;
  rank: number;
  streakDays: number;
}

const leaderboardSchema = new Schema<LeaderboardDocument>(
  {
    username: { type: String, required: true, unique: true },
    team: { type: String, required: true },
    points: { type: Number, required: true },
    rank: { type: Number, required: true },
    streakDays: { type: Number, required: true },
  },
  { timestamps: true },
);

export const Leaderboard = model<LeaderboardDocument>('Leaderboard', leaderboardSchema);