import { useState } from "react"

import useUser from "../contexts/User"
import Food from "./Food"
import Footer from "./Footer"



function Track() {

	const { loggedUser } = useUser()

	const [foodItems, setFoodItems] = useState([])

	// const [food, setFood] = useState([])

	function searchItem(event) {
		if (event.target.value.length !== 0) {

			fetch(`http://localhost:8000/foods/${event.target.value}`, {
				method: "GET",
				headers: { "Authorization": `Bearer ${loggedUser.token}` }

			})
				.then((response) => response.json())

				.then((data) => {

					if (data.message === undefined) setFoodItems(data);

					else setFoodItems([])

				})

				.catch((err) => console.log(err))
		}

		else setFoodItems([]);
	}

	return (
		<div className='container track-container'>
			<div className='search'>
				<input type='text' placeholder='Enter Food Item' onChange={searchItem} />
				<p className='default-value-info'>*By default all values are according to 100g food</p>
			</div>

			<div className='results'>{foodItems.length !== 0 ? <Food items={foodItems} /> : null}</div>
			<Footer />
		</div>
	)
}

export default Track
