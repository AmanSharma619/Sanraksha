import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import bodyParser from "body-parser"
import { YourModel } from "./schema.js"

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://amansharmaas536:amansharma@cluster1.k6vos.mongodb.net/UnderRadar?retryWrites=true&w=majority&appName=Cluster1";

const db = await mongoose.connect(MONGODB_URI).then(() => {
  console.log("done")
}).catch((err) => {
  console.log(err);
})

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())

const getClientIp = (req) => {
  return req.headers['x-forwarded-for'] || 
         req.connection.remoteAddress || 
         req.socket.remoteAddress ||
         req.connection.socket.remoteAddress;
};

app.get("/", async (req, res) => {
  try {
    let data = await YourModel.find();
    if (data.length > 0) {
      const response = data.map(item => ({
        _id: item._id,
        Name: item.Name,
        Place: item.Place,
        Review: item.Review,
        Color: item.Color,
        lat: item.lat,
        lng: item.lng,
        votes: item.votes,
      }));
      res.json(response);
    } else {
      res.status(404).json({ message: "No items found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
})

app.post("/", async (req, res) => {
  console.log(req.body);
  const data = new YourModel({
    ...req.body,
    votes: 0,
    voters: []
  });
  try {
    const saved = await data.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Error saving feedback", error });
  }
})

app.put("/vote/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { voteType } = req.body;
    const clientIp = getClientIp(req);
    const feedback = await YourModel.findById(id);

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    const existingVoteIndex = feedback.voters.findIndex(voter => voter.ipAddress === clientIp);

    if (existingVoteIndex !== -1) {
      const existingVote = feedback.voters[existingVoteIndex];

      if (existingVote.voteType === voteType) {
        feedback.voters.splice(existingVoteIndex, 1);
        feedback.votes += voteType === 'upvote' ? -1 : 1;
      } else {
        feedback.voters[existingVoteIndex].voteType = voteType;
        feedback.votes += voteType === 'upvote' ? 2 : -2;
      }
    } else {
      feedback.voters.push({ ipAddress: clientIp, voteType });
      feedback.votes += voteType === 'upvote' ? 1 : -1;
    }

    await feedback.save();
    return res.status(200).json({ votes: feedback.votes });

  } catch (error) {
    console.error("Error handling vote:", error);
    return res.status(500).json({ message: "Server error", error });
  }
});

app.listen(PORT)