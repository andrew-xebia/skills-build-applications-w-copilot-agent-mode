import mongoose, { Schema } from 'mongoose';
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true, default: 'member' },
    fitnessGoal: { type: String, required: true, default: 'Improve endurance' },
    joinedAt: { type: Date, default: Date.now },
}, { timestamps: true });
const teamSchema = new Schema({
    name: { type: String, required: true, unique: true },
    sport: { type: String, required: true },
    members: { type: Number, required: true, default: 0 },
    city: { type: String, required: true },
    description: { type: String, required: true },
}, { timestamps: true });
const activitySchema = new Schema({
    userName: { type: String, required: true },
    activityType: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    intensity: { type: String, required: true },
    completedAt: { type: Date, default: Date.now },
}, { timestamps: true });
const leaderboardSchema = new Schema({
    name: { type: String, required: true, unique: true },
    points: { type: Number, required: true, default: 0 },
    streak: { type: Number, required: true, default: 0 },
    rank: { type: Number, required: true, default: 1 },
}, { timestamps: true });
const workoutSchema = new Schema({
    title: { type: String, required: true, unique: true },
    focus: { type: String, required: true },
    duration: { type: String, required: true },
    level: { type: String, required: true, default: 'beginner' },
    equipment: { type: [String], required: true, default: [] },
}, { timestamps: true });
export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);
export const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema);
export const Leaderboard = mongoose.models.Leaderboard || mongoose.model('Leaderboard', leaderboardSchema);
export const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);
