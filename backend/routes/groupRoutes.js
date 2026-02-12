import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMyGroups } from "../controllers/group.controller.js";
import {
  createGroup,
  sendGroupMessage,
  getGroupMessages,
  removeMember,
  renameGroup,
  deleteGroup
} from "../controllers/group.controller.js";

const router = express.Router();

router.post("/", protectRoute, createGroup);
router.get("/", protectRoute, getMyGroups);
router.post("/send/:groupId", protectRoute, sendGroupMessage);
router.get("/:groupId", protectRoute, getGroupMessages);
router.post("/remove-member", protectRoute, removeMember);
router.post("/rename", protectRoute, renameGroup);
router.post("/delete", protectRoute, deleteGroup);


export default router;
