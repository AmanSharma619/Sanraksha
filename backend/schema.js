import mongoose, { Mongoose } from "mongoose";

const yourSchema = new mongoose.Schema({
    Name: String,
    Place: String,
    Review: String,
    Color: String,
    lat: mongoose.Types.Decimal128,
    lng: mongoose.Types.Decimal128,
    votes: { type: Number, default: 0 },
    voters: [{ 
      ipAddress: String, 
      voteType: String
    }]
  });
  
export const YourModel = mongoose.model("sanraksha", yourSchema);
