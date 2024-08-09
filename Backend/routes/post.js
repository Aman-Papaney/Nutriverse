
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import trackingModel from "../models/tracking.js"
import userModel from "../models/user.js"

export async function addDataRoute(req, res)  {

    const trackData = req.body

    try {
        let data = await trackingModel.create(trackData)
        
        res.status(201).send({ message: "Food Added for Tracking" })
    }
    catch (err) {
        res.status(500).send({ message: "Error Occurred" })
    }

}

export async function registerRoute(req, res) {

    let user = req.body
    

    bcrypt.genSalt(5, (err, salt) => {
        if (!err) {
            bcrypt.hash(user.password, salt, async (err, hash) => {
                if (!err) {
                    try {
                        user.password = hash
                        let data = await userModel.create(user)
                        res.status(201).send({
                            message: "User Registered Successfully",
                            user: data
                        })
                    }
                    catch (err) {
                        res.status(500).send({ message: "Error Occurred" })
                    }
                }
                else {

                    res.status(500).send({ message: "Error Occurred" })
                }
            })
        }
        else {

            res.status(500).send({ message: "Error Occured" })
        }
    })
}

export async function loginRoute(req, res) {

    let userData = req.body

    try {
        let data = await userModel.findOne({ email: userData.email })
        if (data !== null) {
            bcrypt.compare(userData.password, data.password, (err, result) => {
                if (result === true) {
                    jwt.sign({ email: userData.email }, process.env.JWT_KEY, (err, token) => {
                        if (!err) {
                            res.status(200).send({ message: "Login Success", token: token, name: data.name, id: data._id })
                        }
                    })
                }
                else {
                    res.status(401).send({ message: "Invalid E-mail or Password" })
                }
            })
        }
        else {
            res.status(401).send({ message: "Invalid E-mail or Password" })
        }
    }
    catch (err) {
        res.status(500).send({ message: "Error Occurred" })
    }
}