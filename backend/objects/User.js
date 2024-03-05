import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    uid: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    title: { type: String, required: false, default: "" },
    summary: { type: String, required: false, default: "" },
    experience: { type: Array, required: false, default: [] },
    education: { type: Array, required: false, default: [] },
    appliedJobs: { type: Array, required: false, default: [] }
}, { collection: "users" });

const User = mongoose.model("User", userSchema);
export default User;