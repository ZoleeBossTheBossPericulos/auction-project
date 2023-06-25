import express from "express";
import controller from "../controllers/itemController";
const router = express.Router();

router.get("/items", controller.getItems);
router.get("/current-auction", controller.getCurrentAuction);

export = router;
