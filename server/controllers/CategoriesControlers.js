const ErrorApi = require("../error/ErrorApi");
const {Categories}=require("../models/models");
const getIdLanguage = require("../utils/getIdLanguage");

class CategoriesControlers{
    static GetAll=async(req,resp,next)=>{
        try{
            const {language}=req.query;            
            const idLanguage=getIdLanguage(language);
            
            let categories;
            if(idLanguage===2){
                categories = await Categories.findAll({
                    attributes: ["id", `name${idLanguage}`]
                }); 
            }else{
                categories = await Categories.findAll({
                    attributes: ["id", `name${idLanguage}`,name2]
                });
            }
            let modifiedCategories;
            if(idLanguage===2){
                modifiedCategories = categories.map(category => {
                    return {
                        id: category.id,
                        name: category[`name2`],
                        namePath:category['name2']
                    };
                });
            }else{
                modifiedCategories = categories.map(category => {
                    return {
                        id: category.id,
                        name: category[`name${idLanguage}`],
                        namePath:category['name2']
                    };
                });
            }
              
            return resp.json({ status: 200, res: modifiedCategories });
        }catch(err){
            return next(ErrorApi.badRequest(err));
        }
    }
    static Add=async(req,resp,next)=>{
        try{
            const {name1,name2,name3}=req.body;
            const res=await Categories.create({name1,name2,name3});
            return resp.json({status:200,res:res});
        }catch(err){
            return next(ErrorApi.badRequest(err));
        }

    }
    static Update = async (req, resp, next) => {
        try {
            const { id, name1, name2, name3 } = req.body;
            const result = await Categories.update({ name1, name2, name3 }, { where: { id } });
            
            if (result[0] === 1) {
                resp.json({ status: 200, message: "Data updated successfully" });
            } else {
                return next(ErrorApi.notFound("Record not found"));
            }
        } catch (err) {
            return next(ErrorApi.badRequest(err));
        }
    }
    
}

module.exports=CategoriesControlers