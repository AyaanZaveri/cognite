import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, "Please provide a email"],
    unique: true,
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      "Please provide a valid email",
    ],
  },
  name: {
    type: String,
    required: [true, "Please provide a name"],
    minLength: [3, "Name cannot be less than 3 characters"],
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    select: false,
  },
});

const User = models.User || model("User", UserSchema);

export default User;
