const IsAdminMiddleWare = require("../middleWare/IsAdminMiddleWare");
const AdditionalPagesControlers = require("../controllers/AdditionalPagesControlers");

const router=require("express")();

router.get("/getPrivacyPolicy",AdditionalPagesControlers.GetPrivacyPolicy);
router.get("/getCookies",AdditionalPagesControlers.GetCookies);
router.get("/getTermsOfUse",AdditionalPagesControlers.GetTermsOfUse);
router.post("/addPrivacyPolicy",IsAdminMiddleWare,AdditionalPagesControlers.AddPrivacyPolicy);
router.post("/addTermsOfUse",IsAdminMiddleWare,AdditionalPagesControlers.AddTermsOfUse);
router.post("/addCookies",IsAdminMiddleWare,AdditionalPagesControlers.AddCookies);

module.exports=router;