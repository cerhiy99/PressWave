const ErrorApi = require("../error/ErrorApi");
const {Categories}=require("../models/models");
const getIdLanguage = require("../utils/getIdLanguage");

class CategoriesControlers{
    static GetAll=async(req,resp,next)=>{
        try{
            const {language}=req.query;            
            const idLanguage=getIdLanguage(language);
            const categories=await Categories.findAll({attributes:["id",`name${idLanguage}`]});
            return resp.json({status:200,res:categories});
        }catch(err){
            return next(ErrorApi.badRequest(err));
        }
    }
    static Add=async(req,resp,next)=>{
        try{
            const {name1,name2,name3}=req.body;
            console.log(req.body)
            const res=await Categories.create({name1,name2,name3});
            return resp.json({status:200,res});
        }catch(err){
            return next(ErrorApi.badRequest(err));
        }

    }
    static Update = async (req, res, next) => {
        try {
            const { id, name1, name2, name3 } = req.body;
            const result = await Categories.update({ name1, name2, name3 }, { where: { id } });
            
            if (result[0] === 1) {
                res.json({ status: 200, message: "Data updated successfully" });
            } else {
                return next(ErrorApi.notFound("Record not found"));
            }
        } catch (err) {
            return next(ErrorApi.badRequest(err));
        }
    }
    
}

module.exports=CategoriesControlers