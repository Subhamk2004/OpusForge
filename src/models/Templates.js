import mongoose from "mongoose";

const templateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  htmlString: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});
const Template = mongoose.model("Template", templateSchema);
export default Template;
