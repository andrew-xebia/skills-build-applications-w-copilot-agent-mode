import express from 'express';
import { Activity, Leaderboard, Team, User, Workout } from './models/index.js';
import { connectToDatabase } from './database.js';
const app = express();
const PORT = Number(process.env.PORT ?? 8000);
const codespaceName = process.env.CODESPACE_NAME;
export const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use(express.json());
const handleCreate = async (Model, body, res) => {
    try {
        const created = await Model.create(body);
        res.status(201).json(created);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create record', details: error });
    }
};
app.get(['/api/health', '/api/health/'], (_req, res) => {
    res.json({ status: 'ok', message: 'OctoFit Tracker backend is running', apiBaseUrl });
});
app.get(['/api/config', '/api/config/'], (_req, res) => {
    res.json({ apiBaseUrl });
});
app.get(['/api/users', '/api/users/'], async (_req, res) => {
    const users = await User.find({}).lean();
    res.json(users);
});
app.post(['/api/users', '/api/users/'], async (req, res) => {
    await handleCreate(User, req.body, res);
});
app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
    const teams = await Team.find({}).lean();
    res.json(teams);
});
app.post(['/api/teams', '/api/teams/'], async (req, res) => {
    await handleCreate(Team, req.body, res);
});
app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
    const activities = await Activity.find({}).lean();
    res.json(activities);
});
app.post(['/api/activities', '/api/activities/'], async (req, res) => {
    await handleCreate(Activity, req.body, res);
});
app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
    const leaderboard = await Leaderboard.find({}).lean();
    res.json(leaderboard);
});
app.post(['/api/leaderboard', '/api/leaderboard/'], async (req, res) => {
    await handleCreate(Leaderboard, req.body, res);
});
app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
    const workouts = await Workout.find({}).lean();
    res.json(workouts);
});
app.post(['/api/workouts', '/api/workouts/'], async (req, res) => {
    await handleCreate(Workout, req.body, res);
});
async function startServer() {
    try {
        await connectToDatabase();
        console.log('MongoDB connected');
    }
    catch (error) {
        console.warn('MongoDB connection unavailable, continuing without database:', error);
    }
    app.listen(PORT, () => {
        console.log(`Backend listening on port ${PORT}`);
        console.log(`API base URL: ${apiBaseUrl}`);
    });
}
startServer().catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
});
