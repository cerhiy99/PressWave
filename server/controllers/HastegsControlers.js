const ErrorApi = require("../error/ErrorApi");
const { Hashtag } = require("../models/models");

class HastegControlers{
    static Get=async(req,resp,next)=>{
        try{
            const res=await Hashtag.findAll();
            return resp.json({status:200,res}); 
        }catch(err){
            return next(ErrorApi.badRequest(err));
        }
    }
    static Add=async(req,resp,next)=>{
        try{
            const {name}=req.body;
            const res=await Hashtag.create({name});
            return resp.json({status:200,res});
        }catch(err){
            return next(ErrorApi.badRequest(err));
        }
    }
    
}

module.exports=HastegControlers;