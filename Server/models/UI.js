import mongoose from "mongoose";

const UISchema = new mongoose.Schema({
  requirementId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Requirement",
    required: true,
  },
  uiElements: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const UI = mongoose.model("UI", UISchema);
