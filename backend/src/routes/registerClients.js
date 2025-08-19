//Imports
import express from "express"
import multer from "multer";
import registerClientsController from "../controllers/registerClientsController.js";


const upload = multer({dest: "public/Clients"})

//Router
const router = express.Router();


router.route("/")
  .post(upload.fields([
    { name: "licenseFront", maxCount: 1 },
    { name: "licenseBack", maxCount: 1 },
    { name: "passportFront", maxCount: 1 },
    { name: "passportBack", maxCount: 1 },
    { name: "photo", maxCount: 1 }  
  ]), registerClientsController.registerClients)

//Subroutes
router.route("/verifyCodeEmail")
  .post(registerClientsController.verifyEmail)
router.route("/resendCodeEmail")
  .post(registerClientsController.resendVerificationEmail)

//Export
export default router;