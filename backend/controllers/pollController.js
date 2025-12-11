import Poll from "../models/Poll.js";
import Vote from "../models/Vote.js";

// UPDATE POLL
export const updatePoll = async (req, res) => {
  try {
    const { question, options, closingDate } = req.body;

    const poll = await Poll.findById(req.params.id);
    if (!poll) return res.status(404).json({ error: "Poll not found" });

    poll.question = question || poll.question;
    poll.closingDate = closingDate || poll.closingDate;
    
    if (options && options.length >= 2) {
      poll.options = options.map((o, i) => ({
        text: o,
        votes: poll.options[i]?.votes || 0,
      }));
    }

    await poll.save();
    res.json(poll);
  } catch (err) {
    res.status(500).json({ error: "Error updating poll" });
  }
};



// CREATE POLL

export const createPoll = async (req, res) => {
  try {
    const { question, options, closingDate } = req.body;

    // Validate input
    if (!question || !options || options.length < 2 || !closingDate) {
      return res.status(400).json({
        error: "All fields are required and at least 2 options are needed",
      });
    }

    // Convert options array of strings to objects
    const pollOptions = options.map((text) => ({ text, votes: 0 }));

    const poll = await Poll.create({
      question,
      options: pollOptions,
      createdBy: req.user.username, // protect middleware must attach user
      closingDate,
    });

    res.status(201).json(poll);
  } catch (err) {
    console.error("CreatePoll Error:", err); // log the real error
    res.status(500).json({ error: err.message || "Error creating poll" });
  }
};

// Close a poll manually (Admin only)
export const closePoll = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) return res.status(404).json({ error: "Poll not found" });

    poll.closedManually = true;
    await poll.save();

    res.status(200).json({ message: "Poll closed successfully", poll });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error closing poll" });
  }
};




// GET ALL POLLS

export const getPolls = async (req, res) => {
  try {
    const polls = await Poll.find().sort({ createdAt: -1 });
    res.json(polls);
  } catch (err) {
    res.status(500).json({ error: "Error fetching polls" });
  }
};


// GET POLL BY ID

export const getPoll = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    res.json(poll);
  } catch (err) {
    res.status(500).json({ error: "Poll not found" });
  }
};


// DELETE POLL

export const deletePoll = async (req, res) => {
  try {
    await Poll.findByIdAndDelete(req.params.id);
    res.json({ msg: "Poll deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting poll" });
  }
};


// VOTE (Prevents double voting)

export const votePoll = async (req, res) => {
  try {
    const { pollId, optionIndex } = req.body;
    const identifier = req.ip;  // OR userId if JWT auth

    // Check if voter already voted
    const voted = await Vote.findOne({ pollId, identifier });
    if (voted)
      return res.status(400).json({ error: "You already voted!" });

    // Record the vote
    await Vote.create({ pollId, identifier });

    // Update option vote count
    const poll = await Poll.findById(pollId);
    poll.options[optionIndex].votes++;
    await poll.save();

    res.json(poll);
  } catch (err) {
    res.status(500).json({ error: "Error submitting vote" });
  }
};
