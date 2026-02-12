import Group from "../models/group.js";
import Message from "../models/message.js";

export const createGroup = async (req, res) => {
  try {
    const { name, members } = req.body;

    const group = await Group.create({
      name,
      members: [...members, req.user._id],
      admin: req.user._id,
    });

    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyGroups = async (req, res) => {
  try {
    const groups = await Group.find({
      members: req.user._id,
    })
      .populate("members", "fullName profilePic")
      .populate("admin", "fullName profilePic");

    res.status(200).json(groups);
  } catch (error) {
    console.log("Error fetching groups:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
  console.log(JSON.stringify(groups, null, 2));
};

export const sendGroupMessage = async (req, res) => {
  const { groupId } = req.params;
  const { text, image } = req.body;

  const message = await Message.create({
    senderId: req.user._id,
    groupId,
    text,
    image,
  });

  const group = await Group.findById(groupId);

  group.members.forEach((memberId) => {
    const socketId = getReceiverSocketId(memberId.toString());
    if (socketId) {
      io.to(socketId).emit("newGroupMessage", message);
    }
  });

  res.status(201).json(message);
};

export const getGroupMessages = async (req, res) => {
  try {
    const { groupId } = req.params;

    const messages = await Message.find({ groupId }).populate("senderId", "fullName profilePic");

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeMember = async (req, res) => {
  const { groupId, memberId } = req.body;

  const group = await Group.findById(groupId);

  if (group.admin.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not admin" });
  }

  group.members = group.members.filter(
    (id) => id.toString() !== memberId
  );

  await group.save();
  res.json(group);
};

export const renameGroup = async (req, res) => {
  const { groupId, name } = req.body;

  const group = await Group.findById(groupId);

  if (group.admin.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not admin" });
  }

  group.name = name;
  await group.save();

  res.json(group);
};

export const deleteGroup = async (req, res) => {
  const { groupId } = req.body;

  const group = await Group.findById(groupId);

  if (group.admin.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not admin" });
  }

  await group.deleteOne();
  await Message.deleteMany({ groupId });

  res.json({ message: "Group deleted" });
};

