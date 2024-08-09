import mongoose from "mongoose";

const trackingSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    food_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "foods",
        required: true
    },
    details: {
        calories: Number,
        protein: Number,
        carbohydrates: Number,
        fats: Number,
        fiber: Number,

    },
    quantity: {
        type: Number,
        min: 1,
        required: true
    },
    date: {
        type: String,
        default: new Date().toLocaleDateString()
    }
})

const trackingModel = mongoose.model("trackings", trackingSchema)

export default trackingModel
