const ErrorApi = require("../error/ErrorApi");

module.exports = async (req, resp, next) => {
    try{
        const password=req.headers.password;
        const isPasswordTrue=password==process.env.PASSWORD;
        if(isPasswordTrue){
            next();
        }
        
    } catch (err) {
        return next(ErrorApi.noAuth(err.message));
    }
}