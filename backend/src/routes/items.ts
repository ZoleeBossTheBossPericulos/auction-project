import express from "express";
import controller from "../controllers/itemController";
const router = express.Router();

router.get("/items", controller.getItems);
router.post("/items", controller.addMember);
router.get("/current-auction", controller.getCurrentAuction);
router.put("/current-auction", controller.updateMember);

export = router;
