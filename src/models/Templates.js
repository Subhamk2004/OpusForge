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
  templateFor: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
    required: true,
  },
  formFields: {
    type: [String],
    required: true,
  },
}, {
  timestamps: true, 
});

let Templates = mongoose.models.Template || mongoose.model("Template", templateSchema);

export default Templates;