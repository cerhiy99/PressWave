const uuid = require("uuid");
const ErrorApi = require("../error/ErrorApi");
const { Article, Categories, CategoriesArticles, HashtagArticles } = require("../models/models");
const path = require("path");
const { INTEGER, NUMBER } = require("sequelize");

class ArticleControlers{
    static Add=async(req,resp,next)=>{
        try{
            let {name1,name2,name3,date,description1,description2,
                description3,countWatch,isImage,video,time,
                timeReading,isHot,isHotMain,listHestegs,
                listCategories}=req.body;
            const arrayCategories=listCategories.split(" ");
            const arrayHestegs=listHestegs.split(" ");
            isImage=isImage==="true";
            isHot=isHot!=="false";
            isHotMain=isHotMain!=="false";
            const { image } = req.files;
            const nameImg = uuid.v4() + ".jpg";
            image.mv(path.resolve(__dirname, '..', 'static', nameImg));
            const res=await Article.create({name1,name2,name3,date,description1,description2,
                description3,countWatch,isImage,video,time,
                timeReading,isHot,isHotMain,image:nameImg});
            for(let id of arrayCategories){
                await CategoriesArticles.create(
                    {categoryId: parseInt(id),articleId:res.id});
            }
            for(let id of arrayHestegs){
                await HashtagArticles.create(
                    {hestegId: parseInt(id),articleId:res.id});
            }
            resp.json({status:200,res});
        }catch(err){
            return next(ErrorApi.badRequest(err));
        }
    }
}

module.exports = ArticleControlers;