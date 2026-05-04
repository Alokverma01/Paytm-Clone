import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcrypt";

// interface

export interface IUser extends Document {
  name: string;
  email: string;
  mobile: string;
  password: string;
  created_at: Date;
}
const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  const user = this as IUser;

  if (!user.isModified("password")) return;

  user.password = await bcrypt.hash(user.password, 10);
});
const userModel: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default userModel;
