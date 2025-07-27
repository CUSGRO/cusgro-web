import mongoose, { Schema } from "mongoose";

const waitlistSchema = new Schema(
  {
    name: String,
    email: String,
  },
  {
    timestamps: true,
  }
);

const contactSchema = new Schema(
  {
    name: String,
    email: String,
    company: String,
    message: String,
  },
  {
    timestamps: true,
  }
);

const WaitList = mongoose.models.WaitList || mongoose.model("WaitList", waitlistSchema);
const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default {
  WaitList, Contact
};