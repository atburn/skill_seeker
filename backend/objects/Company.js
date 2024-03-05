import mongoose from "mongoose";


const companySchema = new mongoose.Schema({
    uid: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    summary: { type: String, required: false, default: "" },
    jobs: { type: Object, required: false, default: {} },
    applicants: { type: Array, required: false, default: [] }
}, { collection: "companies" });

const Company = mongoose.model("Company", companySchema);
export default Company;