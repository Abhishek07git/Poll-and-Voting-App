import mongoose from "mongoose";

// Option schema for each poll
const optionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  votes: { type: Number, default: 0 }
});

// Poll schema
const pollSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    options: [optionSchema],
    createdBy: { type: String, default: "Admin" },
    closingDate: { type: Date, required: true }, // When the poll closes
    closedManually: { type: Boolean, default: false } // Admin can manually close
  },
  { timestamps: true }
);

export default mongoose.model("Poll", pollSchema);
