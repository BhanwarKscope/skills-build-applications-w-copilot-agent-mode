import { Schema, model } from 'mongoose';

export interface WorkoutDocument {
  title: string;
  focusArea: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
  recommendedForGoal: string;
}

const workoutSchema = new Schema<WorkoutDocument>(
  {
    title: { type: String, required: true, unique: true },
    focusArea: { type: String, required: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, required: true },
    recommendedForGoal: { type: String, required: true },
  },
  { timestamps: true },
);

export const Workout = model<WorkoutDocument>('Workout', workoutSchema);