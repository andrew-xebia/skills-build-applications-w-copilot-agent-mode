import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';
import { connectToDatabase } from '../config/database.js';
async function seedDatabase() {
    console.log('Seed the octofit_db database with test data');
    await connectToDatabase();
    await Promise.all([
        User.deleteMany({}),
        Team.deleteMany({}),
        Activity.deleteMany({}),
        Leaderboard.deleteMany({}),
        Workout.deleteMany({}),
    ]);
    await Promise.all([
        User.create([
            {
                name: 'Ava Patel',
                email: 'ava.patel@example.com',
                role: 'captain',
                fitnessGoal: 'Run a half marathon',
            },
            {
                name: 'Noah Kim',
                email: 'noah.kim@example.com',
                role: 'member',
                fitnessGoal: 'Increase strength',
            },
            {
                name: 'Mina Chen',
                email: 'mina.chen@example.com',
                role: 'coach',
                fitnessGoal: 'Improve mobility',
            },
        ]),
        Team.create([
            {
                name: 'Velocity Runners',
                sport: 'Running',
                members: 8,
                city: 'Seattle',
                description: 'A community running team focused on endurance and relay training.',
            },
            {
                name: 'Summit Cyclists',
                sport: 'Cycling',
                members: 6,
                city: 'Denver',
                description: 'Weekend cyclists building power and distance.',
            },
        ]),
        Activity.create([
            {
                userName: 'Ava Patel',
                activityType: 'Run',
                durationMinutes: 42,
                intensity: 'high',
            },
            {
                userName: 'Noah Kim',
                activityType: 'Strength',
                durationMinutes: 35,
                intensity: 'medium',
            },
            {
                userName: 'Mina Chen',
                activityType: 'Yoga',
                durationMinutes: 28,
                intensity: 'low',
            },
        ]),
        Leaderboard.create([
            { name: 'Ava Patel', points: 1480, streak: 12, rank: 1 },
            { name: 'Noah Kim', points: 1320, streak: 7, rank: 2 },
            { name: 'Mina Chen', points: 1235, streak: 5, rank: 3 },
        ]),
        Workout.create([
            {
                title: 'HIIT Intervals',
                focus: 'Cardio',
                duration: '25m',
                level: 'intermediate',
                equipment: ['mat', 'timer'],
            },
            {
                title: 'Core Strength',
                focus: 'Core',
                duration: '20m',
                level: 'beginner',
                equipment: ['mat'],
            },
            {
                title: 'Cycling Endurance',
                focus: 'Endurance',
                duration: '45m',
                level: 'intermediate',
                equipment: ['bike'],
            },
        ]),
    ]);
    console.log('Database seeded successfully');
    await mongoose.disconnect();
}
seedDatabase().catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
});
