// Creating token and savig in cookie
const sentToken = (user, statusCode, res) =>{
    const token = user.getJWTToken();

    // Options for cookie

    const options = {
        expires : new Date(Date.now() + process.env.COOKIE_EXPIRE *24 * 60 * 60 * 1000),
        httpOnly : true,
    };

    res.status(statusCode).cookie('token',token, options).json({
        success : true,
        token,
        user
    });
};

module.exports = sentToken;
