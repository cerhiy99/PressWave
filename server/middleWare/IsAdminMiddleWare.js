const ErrorApi = require("../error/ErrorApi");

module.exports = async (req, resp, next) => {
    try{
        console.log(2)
        const KEY=req.headers.key;
        const isPasswordTrue=KEY==process.env.KEY;
        if(isPasswordTrue){
            next();
        }else 
            return next(ErrorApi.noAuth());
        
    } catch (err) {
        return next(ErrorApi.noAuth());
    }
}