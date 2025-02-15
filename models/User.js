import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number },
    contactNo: { type: String},
    password: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", userSchema);
