const Authorization=()=> {
    // client_id 
    // response_type
    // scope
    // redirect_uri

    // state

    return encodeURI(`https://linkedin.com/oauth/v2/authorization?client_id=${process.env.CLIENT_ID}&response_type=code&scope=${process.env.SCOPE}&redirect_uri=${process.env.REDIRECT_URL}`);
}

const Redirect =(code)=> {
    const payload = {
        code
    }
}

module.exports = {
    Authorization,
    Redirect
}