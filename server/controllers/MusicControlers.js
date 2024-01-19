const uuid = require("uuid");
const path = require("path"); 
const { Music } = require("../models/models");
const ErrorApi = require("../error/ErrorApi");


class MusicControlers{
    static Add=async(req,resp,next)=>{
        try{
            const {name,author}=req.body;
            const {music}=req.files;
            const nameMusic=uuid.v4()+".mp3";
            music.mv(path.resolve(__dirname,'..','static',nameMusic));
            const res=await Music.create({name,author,src:nameMusic});
            resp.json({status:200,res});
        }catch(err){
            return next(ErrorApi.badRequest(err));
        }
    }
    static Get=async(req,resp,next)=>{
        try{
            let {limit,page}=req.query;
            limit=parseInt(limit);
            page=parseInt(page)
            const offset = (page - 1) * limit;
            const res=await Music.findAll({limit,offset});
            resp.json({status:200,res});
            
        }catch(err){
            return next(ErrorApi.badRequest(err));
        }
    }
    static GetPages=async(req,resp,next)=>{
        try{
            let {limit}=req.query;
            const countMusic=await Music.count();
            const countPages=Math.ceil(countMusic/limit);
            const res=[]
            for(let page=1;page<=countPages;page++){
                res.push({page:page.toString()});
            }
            return resp.json({status:200,res});
        }catch(err){
            return next(ErrorApi.badRequest(err));
        }
    }
    static GetPosts=async(req,resp,next)=>{
        try{
            const musics=await Music.findAll({attributes:['id']});
            const res=musics.map(x=>({id:x.id}));
            return resp.json({status:200,res});
        }catch(err){
            return next(ErrorApi.badRequest(err));
        }
    }
    static getForId=async(req,resp,next)=>{
        try{
            const {id}=req.query;
            const res=await Music.findOne({where:{id}});
            return resp.json({status:200,res});
        }catch(err){
            return next(ErrorApi.badRequest(err));
        }
    }
}

module.exports=MusicControlers;