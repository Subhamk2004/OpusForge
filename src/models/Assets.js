import mongoose from "mongoose";

let assetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    url: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["image", "pdf"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

let Asset = mongoose.models.Asset || mongoose.model("Asset", assetSchema);
export default Asset;
