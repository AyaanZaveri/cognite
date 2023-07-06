import { Schema, model, models } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, "Please provide a email"],
    unique: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  name: {
    type: String,
    required: [true, "Please provide a name"],
    minLength: [3, "Name cannot be less than 3 characters"],
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
  password: {
    type: String,
    required: [true, "Please enter your email"],
    minLength: [6, "Your password must be at least 6 characters long"],
    select: false, //dont send back password after request
  },
  lastSeen: {
    type: Date,
    default: Date.now,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  avatar: {
    type: String,
    
  }
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = models.User || model("User", UserSchema);

export default User;
