import { useEffect, useState } from "react"

import useUser from "../contexts/User"


function Food(props) {

    const [defaultFoods, setDefaultFoods] = useState([])
    const [tempFoods, setTempFoods] = useState([])

    let { loggedUser } = useUser()

    function trackFoodItem(e, id) {
        e.preventDefault()

        let tempDetails = tempFoods.find(obj => obj._id === id ? { obj } : null)
        let tempQuantity = document.getElementById(`${id}`).value

        if (tempQuantity.length !== 0) {

            let trackedItem = {
                user_id: loggedUser.id,
                food_id: id,
                quantity: tempQuantity,
                details: {
                    calories: tempDetails.calories,
                    protein: tempDetails.protein,
                    carbohydrates: tempDetails.carbohydrates,
                    fats: tempDetails.fats,
                    fiber: tempDetails.fiber,

                }
                
            }


            fetch("http://127.0.0.1:8000/add", {
                method: "POST",
                body: JSON.stringify(trackedItem),
                headers: {
                    "Authorization": `Bearer ${loggedUser.token}`,
                    "Content-Type": "application/json"
                }
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                })
                .catch((err) => {
                    console.log(err);

                })
        }
       
    }

    useEffect(() => {
        setTempFoods(props.items)
        setDefaultFoods(props.items)
    }, [props.items])

    function handleCustomQuantity(e, id) {
        e.preventDefault()

        let quantity = e.target.value

        if (quantity.length !== 0) {
            quantity = Number(e.target.value)

            const Foods = tempFoods.map(food =>
                food._id === id ? {
                    ...food,
                    fats: (quantity * defaultFoods.find(obj => obj._id === id).fats / 100),
                    protein: (quantity * defaultFoods.find(obj => obj._id === id).protein / 100),
                    carbohydrates: (quantity * defaultFoods.find(obj => obj._id === id).carbohydrates / 100),
                    calories: (quantity * defaultFoods.find(obj => obj._id === id).calories / 100),
                    fiber: (quantity * defaultFoods.find(obj => obj._id === id).fiber / 100)
                } : food
            );

            setTempFoods(Foods)
        }

        else {
            setTempFoods(props.items)
        }
    }

    return (
        tempFoods.map((item) => {

            return (
                <div className="card" key={item._id}>

                    <div className="food-title"> {item.name} ({item.calories} Cal)</div>

                    <div className="image"></div>

                    <div className="stats">
                        <div className="pro macro">Protein : {item.protein}g</div>
                        <div className="carb macro">Carbohydrates : {item.carbohydrates}g</div>
                        <div className="fiber macro">Fiber : {item.fiber}g</div>
                        <div className="fat macro">Fats : {item.fats}g</div>
                    </div>

                    <div className="track-form">

                        <input className={`track-data ${item._id}`} id={`${item._id}`} onChange={(e) => handleCustomQuantity(e, item._id)}
                            type="number" placeholder="Enter Quantity" required max="1000" min="1" />

                        <button className="track-button" onClick={(e) => trackFoodItem(e, item._id)}
                            type="submit">Track</button>
                    </div>

                </div >
            )
        })
    )
}

export default Food

