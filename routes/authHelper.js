const qs = require('querystring');
const axios = require('axios');

const Authorization = () => {
    const state = Math.random().toString(36).substring(2); // Generate a random state parameter
    return encodeURI(`https://linkedin.com/oauth/v2/authorization?client_id=${process.env.CLIENT_ID}&response_type=code&scope=${process.env.SCOPE}&redirect_uri=${process.env.REDIRECT_URL}&state=${state}`);
}

const getUserProfile = async (accessToken) => {
    try {
        const response = await axios.get('https://api.linkedin.com/v2/me', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Connection': 'Keep-Alive'
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data.error_description;
    }
}

const Redirect = async (code) => {
    const payload = {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: process.env.REDIRECT_URL,
        grant_type: 'authorization_code',
        code: code
    }

    try {
        const { data } = await axios({
            url: `https://linkedin.com/oauth/v2/accessToken?${qs.stringify(payload)}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return data;
    } catch (error) {
        console.error('Error during token exchange:', error.response.data);
        throw new Error('Failed to exchange authorization code for access token');
    }
}

module.exports = {
    Authorization,
    Redirect,
    getUserProfile
}