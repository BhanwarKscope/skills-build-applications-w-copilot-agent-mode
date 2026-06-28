import { Schema, model } from 'mongoose';

export interface UserDocument {
  username: string;
  email: string;
  displayName: string;
  fitnessGoal: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  team: string;
}

const userSchema = new Schema<UserDocument>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    fitnessGoal: { type: String, required: true },
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    team: { type: String, required: true },
  },
  { timestamps: true },
);

export const User = model<UserDocument>('User', userSchema);