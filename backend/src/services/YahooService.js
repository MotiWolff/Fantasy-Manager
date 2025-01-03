const YahooFantasy = require('yahoo-fantasy');

class YahooService {
    constructor() {
        this.yf = new YahooFantasy(
            process.env.YAHOO_CLIENT_ID,
            process.env.YAHOO_CLIENT_SECRET
        );
    }

    async authenticate(code) {
        try {
            const auth = await this.yf.auth(code);
            return auth;
        } catch (error) {
            console.error('Yahoo authentication error:', error);
            throw error;
        }
    }

    async getTeam(teamKey) {
        try {
            const team = await this.yf.team.roster(teamKey);
            return team;
        } catch (error) {
            console.error('Error fetching team:', error);
            throw error;
        }
    }
}

module.exports = new YahooService(); 