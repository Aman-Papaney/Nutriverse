import foodModel from "../models/food.js"
import trackingModel from "../models/tracking.js"

export async function foodsRoute(req, res) {

    try {
        let foods = await foodModel.find()
        res.status(200).send(foods)
    }
    catch (err) {
        res.status(500).send({ message: "Error Occurred" })
    }
}

export async function foodListRoute(req, res) {
    const foodName = req.params.name

    try {
        const food = await foodModel.find({ name: { $regex: foodName, $options: 'i' } })
        res.status(200).send(food)
    }
    catch (err) {
        res.status(500).send({ message: "Error Occurred" })
    }

}

// app.get("/add/:userId/:date", verifyToken, trackDataRoute)
export async function trackDataRoute(req, res) {
    const uId = req.params.userId
    let date = new Date(req.params.date)
    date = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear()

    try {
        let data = await trackingModel.find({ user_id: uId, date: date })
            .populate("user_id").populate("food_id")
        res.status(200).send(data)
    }
    catch (err) {
        res.status(500).send({ message: "Error Occurred" })
    }
}