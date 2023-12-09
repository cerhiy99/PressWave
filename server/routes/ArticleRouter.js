const Router=require("express");
const router=new Router();
const IsAdminMiddleWare = require("../middleWare/IsAdminMiddleWare");
const ArticleControlers = require("../controllers/ArticleControlers");

router.post("/add",IsAdminMiddleWare,ArticleControlers.Add);
router.get("/getLatest",ArticleControlers.GetMiniLatest);
router.get("/getForId",ArticleControlers.GetForId);
router.get("/getHot",ArticleControlers.GetHot);
router.get("/getMostPopular",ArticleControlers.GetMostPopular);
router.get("/getForCategories",ArticleControlers.GetForCategories);
router.get("/getVideo",ArticleControlers.GetVideo);
router.get("/getMiniForId",ArticleControlers.GetMiniForId);

module.exports=router;