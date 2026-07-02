import mongoose, { Schema, type Model } from 'mongoose';

export interface UserDocument {
  name: string;
  email: string;
  role: string;
  fitnessGoal: string;
  joinedAt: Date;
}

export interface TeamDocument {
  name: string;
  sport: string;
  members: number;
  city: string;
  description: string;
}

export interface ActivityDocument {
  userName: string;
  activityType: string;
  durationMinutes: number;
  intensity: string;
  completedAt: Date;
}

export interface LeaderboardDocument {
  name: string;
  points: number;
  streak: number;
  rank: number;
}

export interface WorkoutDocument {
  title: string;
  focus: string;
  duration: string;
  level: string;
  equipment: string[];
}

const userSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, default: 'member' },
  fitnessGoal: { type: String, required: true, default: 'Improve endurance' },
  joinedAt: { type: Date, default: Date.now },
}, { timestamps: true });

const teamSchema = new Schema<TeamDocument>({
  name: { type: String, required: true, unique: true },
  sport: { type: String, required: true },
  members: { type: Number, required: true, default: 0 },
  city: { type: String, required: true },
  description: { type: String, required: true },
}, { timestamps: true });

const activitySchema = new Schema<ActivityDocument>({
  userName: { type: String, required: true },
  activityType: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  intensity: { type: String, required: true },
  completedAt: { type: Date, default: Date.now },
}, { timestamps: true });

const leaderboardSchema = new Schema<LeaderboardDocument>({
  name: { type: String, required: true, unique: true },
  points: { type: Number, required: true, default: 0 },
  streak: { type: Number, required: true, default: 0 },
  rank: { type: Number, required: true, default: 1 },
}, { timestamps: true });

const workoutSchema = new Schema<WorkoutDocument>({
  title: { type: String, required: true, unique: true },
  focus: { type: String, required: true },
  duration: { type: String, required: true },
  level: { type: String, required: true, default: 'beginner' },
  equipment: { type: [String], required: true, default: [] },
}, { timestamps: true });

export const User: Model<UserDocument> = mongoose.models.User || mongoose.model<UserDocument>('User', userSchema);
export const Team: Model<TeamDocument> = mongoose.models.Team || mongoose.model<TeamDocument>('Team', teamSchema);
export const Activity: Model<ActivityDocument> = mongoose.models.Activity || mongoose.model<ActivityDocument>('Activity', activitySchema);
export const Leaderboard: Model<LeaderboardDocument> = mongoose.models.Leaderboard || mongoose.model<LeaderboardDocument>('Leaderboard', leaderboardSchema);
export const Workout: Model<WorkoutDocument> = mongoose.models.Workout || mongoose.model<WorkoutDocument>('Workout', workoutSchema);
