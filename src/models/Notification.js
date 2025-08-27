import mongoose from "mongoose";

let NotificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, default: "New feature", required: true },
    image: { type: String },
    externalLink: { type: String },
    externalLinkMessage: { type: String },
  },
  { timestamps: true }
);

let Notification =
  mongoose.models.Notification ||
  mongoose.model("Notification", NotificationSchema);
export default Notification;
