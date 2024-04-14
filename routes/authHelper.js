const qs = require('querystring');
const axios = require('axios');

const Authorization=()=> {
    // client_id 
    // response_type
    // scope
    // redirect_uri

    // state

    return encodeURI(`https://linkedin.com/oauth/v2/authorization?client_id=${process.env.CLIENT_ID}&response_type=code&scope=${process.env.SCOPE}&redirect_uri=${process.env.REDIRECT_URL}`);
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

const Redirect =async (code)=> {
    const payload = {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: process.env.REDIRECT_URL,
        grant_type: 'authorization_code',
        code: code

    }

    const {data}= await axios({
        url: `https://linkedin.com/oauth/v2/accessToken?${qs.stringify(payload)}`,
        method: 'POST',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(response=>{
        return response;
    }).catch(error=>{
        return error;
    });

    return data;
}

module.exports = {
    Authorization,
    Redirect,
    getUserProfile
}