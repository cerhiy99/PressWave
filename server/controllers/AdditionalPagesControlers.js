const ErrorApi = require("../error/ErrorApi");
const { PrivacyPolicy, TermsOfUse, Cookies } = require("../models/models");
const getIdLanguage = require("../utils/getIdLanguage");

class AdditionalPagesControlers{
    static GetPrivacyPolicy=async(req,resp,next)=>{
        try{
            const {language}=req.query;
            const idLanguage=getIdLanguage(language)
            const privacyPolicy=await PrivacyPolicy.findOne({attributes:[`text${idLanguage}`]});
            const res=privacyPolicy[`text${idLanguage}`];
            return resp.json({status:200,res});
        }catch(err){
            return next(ErrorApi.badRequest(err));
        }
    }
    static GetTermsOfUse=async(req,resp,next)=>{
        try{
            const {language}=req.query;
            const idLanguage=getIdLanguage(language)
            const termsOfUse=await TermsOfUse.findOne({attributes:[`text${idLanguage}`]});
            const res=termsOfUse[`text${idLanguage}`];
            return resp.json({status:200,res});
        }catch(err){
            return next(ErrorApi.badRequest(err));
        }
    }
    static GetCookies=async(req,resp,next)=>{
        try{
            const {language}=req.query;
            const idLanguage=getIdLanguage(language)
            const cookies=await Cookies.findOne({attributes:[`text${idLanguage}`]});
            const res=cookies[`text${idLanguage}`];
            return resp.json({status:200,res});
        }catch(err){
            return next(ErrorApi.badRequest(err));
        }
    }
    static AddPrivacyPolicy=async(req,resp,next)=>{
        try{
            const {text1,text2,text3}=req.body;
            const res=await PrivacyPolicy.create({text1,text2,text3});
            return resp.json({status:200,res});
        }catch(err){
            return next(ErrorApi.badRequest(err));
        }
    }
    static AddTermsOfUse=async(req,resp,next)=>{
        try{
            const {text1,text2,text3}=req.body;
            const res=await TermsOfUse.create({text1,text2,text3});
            return resp.json({status:200,res});
        }catch(err){
            return next(ErrorApi.badRequest(err));
        }
    }
    static AddCookies=async(req,resp,next)=>{
        try{
            const {text1,text2,text3}=req.body;
            const res=await Cookies.create({text1,text2,text3});
            return resp.json({status:200,res});
        }catch(err){
            return next(ErrorApi.badRequest(err));
        }
    }
}

module.exports = AdditionalPagesControlers;