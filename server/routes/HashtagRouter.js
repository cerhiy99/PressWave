const Router=require("express");
const IsAdminMiddleWare = require("../middleWare/IsAdminMiddleWare");
const router=Router();
const HastagControlers=require("../controllers/HastegsControlers")

router.post('/add',IsAdminMiddleWare,HastagControlers.Add);
router.get('/get',HastagControlers.Get);

module.exports=router;