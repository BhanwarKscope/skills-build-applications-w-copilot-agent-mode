import { Schema, model } from 'mongoose';

export interface TeamDocument {
  name: string;
  motto: string;
  memberCount: number;
  weeklyGoalMinutes: number;
}

const teamSchema = new Schema<TeamDocument>(
  {
    name: { type: String, required: true, unique: true },
    motto: { type: String, required: true },
    memberCount: { type: Number, required: true },
    weeklyGoalMinutes: { type: Number, required: true },
  },
  { timestamps: true },
);

export const Team = model<TeamDocument>('Team', teamSchema);