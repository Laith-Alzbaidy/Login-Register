import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const UsersSchema = new Schema({
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  confirmPassword: {
    type: String,
    required: [true, "confirmPassword is required"],
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "Passwords do not match.",
    },
  },
});

UsersSchema.pre("save", async function (next) {
  // Check if the password is modified, if not
  if (!this.isModified("password")) return next();
  // Hash the password
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

UsersSchema.methods.correctPassword = async function (
  candidatePassword,
  userPasword
) {
  // to Compare the candidate password with the user password using bcrypt
  return await bcrypt.compare(candidatePassword, userPasword);
};

const User = mongoose.models.User || mongoose.model("User", UsersSchema);
export default User;
