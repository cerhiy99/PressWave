const ErrorApi = require("../error/ErrorApi");

module.exports = async (req, resp, next) => {
    try{
        const KEY=req.headers.key;
        const isPasswordTrue=KEY==process.env.KEY;
        if(isPasswordTrue){
            next();
        }else 
            return next(ErrorApi.noAuth(err.message));
        
    } catch (err) {
        return next(ErrorApi.internalServerError(err.message));
    }
}