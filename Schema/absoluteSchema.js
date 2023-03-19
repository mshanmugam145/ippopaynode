import mongoose from "mongoose";

const absoluteSchema = new mongoose.Schema({
    questionArray: String,
    arrayCollectionOne: String,
    arrayCollectionTwo: String,
    result: Number,
    createdAt: Date
});

export default absoluteSchema;