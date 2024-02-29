import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    uid: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    title: { type: String, required: false, default: "" },
    summary: { type: String, required: false, default: "" },
    experience: { type: Object, required: false, default: [] },
    education: { type: Object, required: false, default: [] }
}, { collection: "users" });

const User = mongoose.model("User", userSchema);
export default User;