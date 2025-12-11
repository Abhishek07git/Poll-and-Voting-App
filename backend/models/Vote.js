import mongoose from "mongoose";

const voteSchema = new mongoose.Schema(
  {
    pollId: { type: mongoose.Schema.Types.ObjectId, ref: "Poll" },
    identifier: String  // userId or IP Address
  },
  { timestamps: true }
);

export default mongoose.model("Vote", voteSchema);
