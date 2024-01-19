const uuid = require("uuid");
const path = require("path"); 
const { Podcast } = require("../models/models");
const ErrorApi = require("../error/ErrorApi");


class PodcastControlers{
    static Add=async(req,resp,next)=>{
        try{
            const {name,author}=req.body;
            const {podcast}=req.files;
            const namePodcast=uuid.v4()+".mp3";
            podcast.mv(path.resolve(__dirname,'..','static',namePodcast));
            const res=await Podcast.create({name,author,src:namePodcast});
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
            const res=await Podcast.findAll({limit,offset});
            resp.json({status:200,res});
            
        }catch(err){
            return next(ErrorApi.badRequest(err));
        }
    }
    static GetPages=async(req,resp,next)=>{
        try{
            let {limit}=req.query;
            const countPodcast=await Podcast.count();
            const countPages=Math.ceil(countPodcast/limit);
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
            const podcasts=await Podcast.findAll({attributes:['id']});
            const res=podcasts.map(x=>({id:x.id}));
            return resp.json({status:200,res});
        }catch(err){
            return next(ErrorApi.badRequest(err));
        }
    }
    static getForId=async(req,resp,next)=>{
        try{
            const {id}=req.query;
            const res=await Podcast.findOne({where:{id}});
            return resp.json({status:200,res});
        }catch(err){
            return next(ErrorApi.badRequest(err));
        }
    }
}

module.exports=PodcastControlers;