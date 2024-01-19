const Router=require("express");
const IsAdminMiddleWare = require("../middleWare/IsAdminMiddleWare");
const MusicControlers = require("../controllers/MusicControlers");
const router=Router();

router.post("/add",IsAdminMiddleWare,MusicControlers.Add);
router.get("/get",MusicControlers.Get);
router.get("/getPages",MusicControlers.GetPages);
router.get("/getPosts",MusicControlers.GetPosts);
router.get("/getForId",MusicControlers.getForId);

module.exports=router;