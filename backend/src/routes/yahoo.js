const express = require('express');
const router = express.Router();
const YahooService = require('../services/YahooService');
const User = require('../models/User');

router.get('/auth', async (req, res) => {
    try {
        const authUrl = YahooService.getAuthorizationUrl();
        res.json({ authUrl });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/callback', async (req, res) => {
    try {
        const { code } = req.body;
        const auth = await YahooService.authenticate(code);
        // Save user data
        res.json({ success: true, auth });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/team/:teamKey', async (req, res) => {
    try {
        const { teamKey } = req.params;
        const team = await YahooService.getTeam(teamKey);
        res.json(team);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router; 