const uuid = require("uuid");
const ErrorApi = require("../error/ErrorApi");
const { Article, CategoriesArticles, HashtagArticles, Categories } = require("../models/models");
const path = require("path");
const { INTEGER, NUMBER, where } = require("sequelize");
const getIdLanguage = require("../utils/getIdLanguage");
const { Op } = require('sequelize');

class ArticleControlers{

    static GetMiniForId=async(req,resp,next)=>{
        try{
            const {id,language}=req.query;
            const idLanguage=getIdLanguage(language);
            const articles=await Article.findOne({
                where:{id},
                attributes: ['id', `name${idLanguage}`, 'date', 'image', `description${idLanguage}`, 'countWatch', 'isImage', 'video', 'time', 'isHot','timeReading'],
            });
            const res = await this.GetModifiedArticles([articles], idLanguage);
            return resp.json({status:200,res});

        }catch(err){
            return next(ErrorApi.badRequest(err));
        }
    }

    static GetForCategories=async(req,resp,next)=>{
        try{
            let {language,limit,categoryId,page,sortBy}=req.query;
            if(!page)page=1;
            const offset = (page - 1) * limit;
            limit=parseInt(limit);
            const idLanguage=getIdLanguage(language);
            if(categoryId==-1){
                
                const count = await Article.count({
                    where: {
                        video: {
                            [Op.not]: ''
                        }
                    }
                });
                console.log(count)

                const arrayArticles=await Article.findAll({
                    where:{video:{[Op.ne]:''}},
                    attributes: ['id', `name${idLanguage}`, 'date', 'image', `description${idLanguage}`, 'countWatch', 'isImage', 'video', 'time', 'isHot','timeReading'],
                })
                let res;
                const modifiedArticles = await this.GetModifiedArticles(arrayArticles, idLanguage);

                if (sortBy === "Name") {
                res = modifiedArticles.slice().sort((a, b) => a.name.localeCompare(b.name));
                } else if (sortBy === "Views") {
                res = modifiedArticles.slice().sort((a, b) => b.countWatch - a.countWatch);
                } else {
                res = modifiedArticles.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                }

                const endIndex = offset + limit;
                if (endIndex >= res.length) {
                res = res.slice(offset);
                } else {
                res = res.slice(offset, endIndex);
                }

                return resp.json({ status: 200, res, count });
            }
            else if(categoryId==0){
                const count =await Article.count();
                
                const arrayArticles=await Article.findAll({
                    attributes: ['id', `name${idLanguage}`, 'date', 'image', `description${idLanguage}`, 'countWatch', 'isImage', 'video', 'time', 'isHot','timeReading'],
                })
                
                let res;
                const modifiedArticles = await this.GetModifiedArticles(arrayArticles, idLanguage);

                if (sortBy === "Name") {
                res = modifiedArticles.slice().sort((a, b) => a.name.localeCompare(b.name));
                } else if (sortBy === "Views") {
                res = modifiedArticles.slice().sort((a, b) => b.countWatch - a.countWatch);
                } else {
                res = modifiedArticles.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                }

                const endIndex = offset + limit;
                if (endIndex >= res.length) {
                res = res.slice(offset);
                } else {
                res = res.slice(offset, endIndex);
                }

                return resp.json({ status: 200, res, count });
            }
            const nameCategory=await Categories.findOne({where:{id:categoryId},attributes:['name2']});
            
            if(nameCategory.name2==="Latest"){
                const count=await Article.count();
                const articles = await Article.findAll({
                    limit,
                    offset,
                    order: [['id', 'DESC']]
                });
                const res=await this.GetModifiedArticles(articles, idLanguage);
                return resp.json({ status: 200, res, count });
            }else if(nameCategory.name2==="Most popular"){
                const count=await Article.count();
                const articles = await Article.findAll({
                    limit,
                    offset,
                    order: [['countWatch', 'DESC']]
                });
                const res=await this.GetModifiedArticles(articles, idLanguage);
                return resp.json({ status: 200, res, count });
            }
            else{
                let idArticles=await CategoriesArticles.findAll({attributes:['articleId'],where:{categoryId}});
                const count =await CategoriesArticles.count({attributes:['articleId'],where:{categoryId}});
                if(idArticles.length>limit)idArticles=idArticles.slice(0);
                let arrayArticles=[];
                for(let i=0;i<idArticles.length;i++){
                    arrayArticles.push(await Article.findOne({
                        where:{id:idArticles[i].articleId},
                        attributes: ['id', `name${idLanguage}`, 'date', 'image', `description${idLanguage}`, 'countWatch', 'isImage', 'video', 'time', 'isHot','timeReading'],
                    }))
                }
                let res;
                const modifiedArticles = await this.GetModifiedArticles(arrayArticles, idLanguage);

                if (sortBy === "Name") {
                res = modifiedArticles.slice().sort((a, b) => a.name.localeCompare(b.name));
                } else if (sortBy === "Views") {
                res = modifiedArticles.slice().sort((a, b) => b.countWatch - a.countWatch);
                } else {
                res = modifiedArticles.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                }

                const endIndex = offset + limit;
                if (endIndex >= res.length) {
                res = res.slice(offset);
                } else {
                res = res.slice(offset, endIndex);
                }

                return resp.json({ status: 200, res, count });
            }
        }catch(err){
            return next(ErrorApi.badRequest(err));
        }
    }
    static GetVideo=async(req,resp,next)=>{
        try{
            let { language, limit, page, sortBy } = req.query;
        sortBy = sortBy || "Views";
        page=page||1;
        limit = parseInt(limit);
        const idLanguage = getIdLanguage(language);
        const offset = (page - 1) * limit;
        const video = await Article.findAll({
            where: {
                video: {
                    [Op.ne]: ''
                }
            },
            attributes: ['id', `name${idLanguage}`, 'date', 'image', `description${idLanguage}`, 'countWatch', 'isImage', 'video', 'time', 'isHot', 'timeReading'],
            limit,
        });
        let res = await this.GetModifiedArticles(video, idLanguage);
        if (sortBy === "Name") {
            res = res.slice().sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === "Views") {
            res = res.slice().sort((a, b) => b.countWatch - a.countWatch);
        } else {
            res = res.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }

        const endIndex = offset + limit;
        if (endIndex >= res.length) {
            res = res.slice(offset);
        } else {
            res = res.slice(offset, endIndex);
        }
        resp.json({ status: 200, res });

        }catch(err){
            return next(ErrorApi.badRequest(err));
        }
    }
    static GetMostPopular=async(req,resp,next)=>{
        try{
            let {language,limit,page}=req.query;
            if(!page)page=1;
            limit=parseInt(limit);
            const idLanguage=getIdLanguage(language);
            const mostPopular=await Article.findAll({
                order: [['countWatch', 'DESC']],
                attributes: ['id', `name${idLanguage}`, 'date', 'image', `description${idLanguage}`, 'countWatch', 'isImage', 'video', 'time', 'isHot','timeReading'],
                limit,
              });
            const res=await this.GetModifiedArticles(mostPopular,idLanguage);
            resp.json({status:200,res});
        }catch(err){
            return next(ErrorApi.badRequest(err));
        }
    }
    static GetHot=async(req,resp,next)=>{
        try{
            let {limit,language}=req.query;
            limit=parseInt(limit)
            const idLanguage=getIdLanguage(language);

            const hotArticle= await Article.findAll({
                where: {isHot:true},
                attributes: ['id', `name${idLanguage}`, 'date', 'image', `description${idLanguage}`, 'countWatch', 'isImage', 'video', 'time', 'isHot','timeReading'],
                limit
            });
            const res=await this.GetModifiedArticles(hotArticle,idLanguage);
            resp.json({status:200,res});
        }catch(err){
            return next(ErrorApi.badRequest(err));
        }
    }
    static async getNeighboringArticles(articleId,idLanguage) {
        try {
            const countNext = await Article.count({
                where: {
                    id: {
                        [Op.gt]: articleId,
                    },
                },
            });
            const countPrevious=await Article.count({
                where:{
                    id:{
                        [Op.lt]:articleId
                    }
                }
            })
            let tempCountNext=countNext>3?3:countNext;
            let tempCountPrevious=countPrevious>3?3:countPrevious;
            

            if(countPrevious<3){
                if(3-countPrevious+3<=countNext){
                    tempCountNext+=3-countPrevious;
                }
                else if(countNext>3){
                    let temp=3-countPrevious+3;
                    while(temp>countNext){
                        temp--;
                    }
                    tempCountNext=temp;
                }
            }
            else if(countNext<3){
                if(3-countNext+3<=countPrevious){
                    tempCountPrevious+=3-countNext;
                }
                else if(countPrevious>3){
                    let temp=3-countNext+3;
                    while(temp>countNext){
                        temp--;
                    }
                    tempCountPrevious=temp;
                }
            }
            const next = await Article.findAll({
                where: {
                    id: {
                        [Op.gt]: articleId,
                    },
                },
                attributes: ['id', `name${idLanguage}`, 'date', 'image', `description${idLanguage}`, 'countWatch', 'isImage', 'video', 'time', 'isHot','timeReading'],
                order: [['id', 'ASC']],
                limit:tempCountNext
            });
            const previous = await Article.findAll({
                where: {
                    id: {
                        [Op.lt]: articleId
                    }
                },
                attributes: ['id', `name${idLanguage}`, 'date', 'image', `description${idLanguage}`, 'countWatch', 'isImage', 'video', 'time', 'isHot','timeReading'],
                order: [['id', 'DESC']],
                limit: tempCountPrevious
            });
            const sortActicles=[...previous.sort((a, b) => a.id - b.id), ...next.sort((a, b) => a.id - b.id)];
            const modifiedArticle=await this.GetModifiedArticles(sortActicles,idLanguage);
            return modifiedArticle;
        } catch (error) {
            console.error('Error fetching neighboring articles:', error);
            throw error;
        }
    }
    static async GetModifiedArticles(articles,idLanguage){ 
        return await Promise.all(
            articles.map(async (article) => {
                const getIdCategories = await CategoriesArticles.findAll({
                    attributes: ['categoryId'],
                    where: { articleId: article.id },
                });
                const getIdHashtag = await HashtagArticles.findAll({
                    attributes: ['hestegId'],
                    where: { articleId: article.id },
                });
            
                const modifiedArticle = {
                    id: article.id,
                    date: article.date,
                    image: article.image,
                    countWatch: article.countWatch,
                    isImage: article.isImage,
                    video: article.video,
                    time: article.time,
                    isHot: article.isHot,
                    timeReading: article.timeReading,
                    idCategories: getIdCategories,
                    idHashtag: getIdHashtag,
                };
            
                modifiedArticle.name = article[`name${idLanguage}`];
                modifiedArticle.description = article[`description${idLanguage}`].replace(/<[^>]*>/g, '').slice(0, 120) + '...';
            
                return modifiedArticle;
            })
        );
    }
    static GetForId=async(req,resp,next)=>{
        try{
            const {id,language}=req.query;
            const idLanguage=getIdLanguage(language);
            const article=await Article.findOne({
                where:{id},                
                attributes: ['id', `name${idLanguage}`, 'date', 'image', `description${idLanguage}`, 'countWatch', 'isImage', 'video', 'time', 'isHot','timeReading']
            });
            let neigborArticle=await this.getNeighboringArticles(article.id,idLanguage);
            let idCategories=(await CategoriesArticles.findAll({where:{articleId:article.id},attributes:['categoryId']}));
            const res={
                id: article.id,
                date: article.date,
                image: article.image,
                countWatch: article.countWatch,
                isImage: article.isImage,
                video: article.video,
                time: article.time,
                isHot: article.isHot,
                timeReading: article.timeReading,
                description:article[`description${idLanguage}`],
                name:article[`name${idLanguage}`],
                neigborArticle:neigborArticle,
                idCategories:idCategories
            };


            resp.json({status:200,res});

        }catch(err){
            return next(ErrorApi.badRequest(err));
        }
    }
    static GetMiniLatest=async(req,resp,next)=>{
        try{
            let { limit, language } = req.query;
            const idLanguage = getIdLanguage(language);
            const latestArticles = await Article.findAll({
                order: [['createdAt', 'ASC']],
                limit: parseInt(limit),
                attributes: ['id', `name${idLanguage}`, 'date', 'image', `description${idLanguage}`, 'countWatch', 'isImage', 'video', 'time', 'isHot','timeReading']
            });

           const modifiedLatestArticles=await this.GetModifiedArticles(latestArticles,idLanguage);
              

            resp.json({ status: 200, res: modifiedLatestArticles });

        }catch(err){
            return next(ErrorApi.badRequest(err));
        }
    }
    static Add=async(req,resp,next)=>{
        try{
            let {name1,name2,name3,date,description1,description2,
                description3,countWatch,isImage,time,
                timeReading,isHot,isHotMain,listHestegs,
                listCategories}=req.body;
            let arrayCategories;
            let arrayHestegs;
            if(listCategories!==null&&listHestegs!==null){
                arrayCategories=listCategories.split(" ");
                arrayHestegs=listHestegs.split(" ");
            }
            isImage=isImage==="true";
            isHot=isHot!=="false";
            isHotMain=isHotMain!=="false";
            const { image } = req.files;
            const nameImg = uuid.v4() + ".jpg";
            image.mv(path.resolve(__dirname, '..', 'static', nameImg));
            let {video}=req.files;
            let videoPath="";
            if(video){
                videoPath= uuid.v4() + ".mp4";
                video.mv(path.resolve(__dirname, '..', 'static', videoPath));
            }
            
            const res=await Article.create({name1,name2,name3,date,description1,description2,
                description3,countWatch,isImage,time,
                timeReading,isHot,isHotMain,image:nameImg,video:videoPath});
            if(listCategories){
                for(let id of arrayCategories){
                    await CategoriesArticles.create(
                        {categoryId: parseInt(id),articleId:res.id});
                }
            }
            if (listHestegs && arrayHestegs.length > 0) {
              
                for (let id2 of arrayHestegs) {
                  const parsedId = parseInt(id2);
              
                  if (!isNaN(parsedId)) {
                    await HashtagArticles.create({ hestegId: parsedId, articleId: res.id });
                  }
                }
            } 
              
            resp.json({status:200,res});
        }catch(err){
            return next(ErrorApi.badRequest(err));
        }
    }
}

module.exports = ArticleControlers;