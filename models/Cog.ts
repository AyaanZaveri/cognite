import { Schema, model, models } from "mongoose";

/* CogSchema will correspond to a collection in your MongoDB database. */

const CogSchema = new Schema({
  user: {
    /* The user who uploaded the cog */
    type: String,
    required: [true, "Please provide a user"],
    maxlength: [20, "Name cannot be more than 60 characters"],
  },
  name: {
    /* The name of the cog */
    type: String,
    required: [true, "Please provide a name"],
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
  description: {
    /* The description of the cog */
    type: String,
    required: [true, "Please provide a description"],
    maxlength: [200, "Description cannot be more than 200 characters"],
  },
  embeddings: [
    {
      /* The embeddings of the cog */
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
    /* The date of the cog */
    type: Date,
    required: [true, "Please provide a date"],
  },
  raw: {
    /* The raw text of the cog */
    type: String,
    required: [true, "Please provide a raw"],
    maxlength: [2000, "Raw cannot be more than 2000 characters"],
  },
  type: {
    /* The type of the cog */
    type: String,
    required: [true, "Please provide a type"],
  },
  slug: {
    /* The slug of the cog */
    type: String,
    required: [true, "Please provide a slug"],
    maxlength: [200, "Slug cannot be more than 200 characters"],
  },
});

console.log("models?.Cog", models?.Cog);

export default models?.Cog || model("Cog", CogSchema, "cogs");
