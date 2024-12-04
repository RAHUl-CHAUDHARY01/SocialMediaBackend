import ChatModel from "../models/chatModel.js";

export const createChat = async (req, res) => {
  const newChat = new ChatModel({
    members: ["674a762ffa22f25f030278ad", "6749be398733867f3af8b647"], // Use valid MongoDB user IDs here
  });

  try {
    const result = await newChat.save();
    console.log("Created Chat:", result);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error creating chat:", error);
    res.status(500).json(error);
  }
};

export const userChats = async (req, res) => {
  try {
    const chat = await ChatModel.find({
      members: { $in: [req.params.userId] },
    });
    console.log(chat);
    // console.log(chat)
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const findChat = async (req, res) => {
  try {
    const chat = await ChatModel.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    console.log(chat)
    res.status(200).json(chat)
  } catch (error) {
    res.status(500).json(error)
  }
};