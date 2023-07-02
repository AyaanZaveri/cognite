import { Schema, model, models } from "mongoose";

const CogSchema = new Schema({
  user: {
    type: String,
    required: [true, "Please provide a user"],
    maxlength: [20, "Name cannot be more than 60 characters"],
  },
  name: {
    type: String,
    required: [true, "Please provide a name"],
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
  description: {
    type: String,
    required: [true, "Please provide a description"],
    maxlength: [200, "Description cannot be more than 200 characters"],
  },
  embeddings: [
    {
      dimensions: {
        type: Number,
        required: [true, "Please provide a dimensions"],
      },
      similarity: {
        type: String,
        required: [true, "Please provide a similarity"],
      },
      type: {
        type: String,
        required: [true, "Please provide a type"],
      },
    },
  ],
  date: {
    type: Date,
    required: [true, "Please provide a date"],
  },
  raw: {
    type: String,
    required: [true, "Please provide a raw"],
    maxlength: [2000, "Raw cannot be more than 2000 characters"],
  },
  type: {
    type: String,
    required: [true, "Please provide a type"],
  },
  slug: {
    type: String,
    unique: true,
    required: [true, "Please provide a slug"],
    maxlength: [200, "Slug cannot be more than 200 characters"],
  },
});

const Cog = models.Cog || model("Cog", CogSchema);

export default Cog;
