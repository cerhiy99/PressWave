const Router=require("express");
const router=new Router();
const IsAdminMiddleWare = require("../middleWare/IsAdminMiddleWare");
const CategoriesControlers = require("../controllers/CategoriesControlers");

router.get("/get",CategoriesControlers.GetAll);
router.post("/add",IsAdminMiddleWare,CategoriesControlers.Add);
router.put("/upd",IsAdminMiddleWare,CategoriesControlers.Update);
router.get("/getPosts",CategoriesControlers.getPosts);

module.exports=router