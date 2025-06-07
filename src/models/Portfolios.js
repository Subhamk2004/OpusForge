import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    repoName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    userData: {
      type: Object,
      required: true,
    },
    templateId: {
      type: String,
      required: true,
    },
    portfolioImage: {
      type: String,
      required: true,
    },
    deployedUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Portfolios =
  mongoose.models.Portfolios || mongoose.model("Portfolios", portfolioSchema);
export default Portfolios;
