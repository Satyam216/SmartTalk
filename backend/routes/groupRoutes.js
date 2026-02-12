import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMyGroups } from "../controllers/group.controller.js";
import {
    addMember,
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
router.get("/:groupId/messages", protectRoute, getGroupMessages);
router.post("/:groupId/messages", protectRoute, sendGroupMessage);
router.post("/remove-member", protectRoute, removeMember);
router.post("/rename", protectRoute, renameGroup);
router.post("/delete", protectRoute, deleteGroup);
router.post("/add-member", protectRoute, addMember);



export default router;
