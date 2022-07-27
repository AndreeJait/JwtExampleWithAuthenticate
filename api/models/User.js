import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  status: { type: Boolean, default: true },
});

export default mongoose.model("user", UserSchema);
