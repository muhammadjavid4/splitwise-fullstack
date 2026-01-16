const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const settlementController = require("../controllers/settlement.controller");

router.post("/", authMiddleware, settlementController.settleUp);
router.get("/group/:groupId", authMiddleware, settlementController.getGroupHistory);
router.get("/me", authMiddleware, settlementController.getMyHistory);

module.exports = router;
