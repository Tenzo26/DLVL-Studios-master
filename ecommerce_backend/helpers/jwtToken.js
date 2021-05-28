//create and send token and save in the cookie
const sendToken = (user, statusCode, res) => {
   
    //Create JWT Token 
    const token = user.getJwtToken();

    //Options for cookie
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60  * 60 * 1000
        ),
        httpOnly: true //cookie cant be accessed by frontend and js code
    }

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token,
        user
    })
   
}

module.exports = sendToken