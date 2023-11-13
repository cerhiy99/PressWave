const Router=require("express");
const router=new Router();
const IsAdminMiddleWare = require("../middleWare/IsAdminMiddleWare");
const ArticleControlers = require("../controllers/ArticleControlers");

router.post("/add",IsAdminMiddleWare,ArticleControlers.Add);

module.exports=router;