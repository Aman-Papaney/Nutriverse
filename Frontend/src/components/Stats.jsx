import { useEffect, useState } from "react"

import useUser from "../contexts/User"
import Footer from "./Footer"

function Diet() {
	const { loggedUser } = useUser()

	const [trackedData, setTrackedData] = useState([])

	const [dailyStats, setDailyStats] = useState({
		totalprotein: 0,
		totalfiber: 0,
		totalcalories: 0,
		totalfats: 0,
		totalcarbohydrates: 0,
	})

	const [date, setDate] = useState(new Date())

	useEffect(() => {
		fetch(`http://127.0.0.1:8000/add/${loggedUser.id}/${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`, {
	
			method: "GET",
			headers: {
				Authorization: `Bearer ${loggedUser.token}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				setTrackedData(data)
				console.log(data)
			})

			.catch((err) => {
				console.log(err)
			})

	}, [date])

	useEffect(() => {
		let temp = {
			totalprotein: 0,
			totalfiber: 0,
			totalcalories: 0,
			totalfats: 0,
			totalcarbohydrates: 0,
		}

		for (let i = 0; i < trackedData.length; i++) {
			temp.totalprotein += trackedData[i].details.protein
			temp.totalcalories += trackedData[i].details.calories
			temp.totalfiber += trackedData[i].details.fiber
			temp.totalfats += trackedData[i].details.fats
			temp.totalcarbohydrates+= trackedData[i].details.carbohydrates
		}

		setDailyStats(temp)

	}, [trackedData])




	function newDateStats(e) {
		setDate(new Date(e.target.value))
		
	}

	if (trackedData.length !== 0) {
		return (
			<div className='container'>
				<input type='date' id='date-input' onChange={(e) => newDateStats(e)} />

				<div className='daily-stats-div'>
					<div className='macro-info'>Total Macros consumed on {trackedData[0].date}</div>

					<div className='macro-details'>
						<div className='macro-detail'>Calories : {dailyStats.totalcalories}g</div>
						<div className='macro-detail'>Protein : {dailyStats.totalprotein}g</div>
						<div className='macro-detail'>Fats : {dailyStats.totalfats}g</div>
						<div className='macro-detail'>Fiber : {dailyStats.totalfiber}g</div>
						<div className='macro-detail'>Carbohydrates : {dailyStats.totalcarbohydrates}g</div>
					</div>
					<div className='results'>
						{trackedData.map((data) => {
							return (
								<div className='card' key={data._id}>
									<div className='food-title'>
										{data.food_id.name} : ({data.food_id.calories} Cal)
									</div>

									<div className='image'></div>

									<div className='stats'>
										<div className='pro macro'>Protein : {data.details.protein}g</div>
										<div className='carb macro'>Carbohydrates : {data.details.carbohydrates}g</div>
										<div className='fiber macro'>Fiber : {data.details.fiber}g</div>
										<div className='fat macro'>Fats : {data.details.fats}g</div>
									</div>
								</div>
							)
						})}
					</div>
				</div>
				<Footer/>
			</div>
		)
	} else {
		return (
			<div className='container'>
				<input type='date' onChange={(e) => setDate(new Date(e.target.value))} />
				<div className=' data-not-found-container'>
					<h1>Start Tracking food to view them</h1>
				</div>
				<Footer />
			</div>
		)
		
	}
}

export default Diet

{
	/* <div className='macro-detail'></div>fats :{" "}
							{trackedData[0].details.fats}g<div className='macro-detail'></div>fiber : {trackedData[0].details.fiber}g<div className='macro-detail'></div>carbohydrates :{" "}
							{trackedData[0].details.carbohydrates}g */
}

// trackedData.map((data) => {
//     return (
//         <div className="tracked-item" key="id">
//             {data.food_id.name}
//         </div>
//     )
// })

// 0: Object { _id: "66b3b062141a4617b84d1089", quantity: 211, date: "8/7/2024", … }

// __v: 0

// _id: "66b3b062141a4617b84d1089"

// date: "8/7/2024"

// details: Object { calories: 1266, protein: 25.32, carbohydrates: 168.8, … }

// calories: 1266

// carbohydrates: 168.8

// fiber: 21.1

// protein: 25.32

//     < prototype >: Object { … }

// food_id: Object { _id: "66977841154780d0059e6548", name: "Chole Bhature", carbohydrates: "80", … }

// _id: "66977841154780d0059e6548"

// calories: "600"

// carbohydrates: "80"

// fats: "20"

// fiber: "10"

// name: "Chole Bhature"

// protein: "12"

// quantity: 211

// user_id: Object { _id: "66af360a325b710c88cf967b", name: "ee", email: "ee@gmail.com", … }

// __v: 0

// _id: "66af360a325b710c88cf967b"

// age: 21

// createdAt: "2024-08-04T08:04:26.808Z"

// email: "ee@gmail.com"

// name: "ee"

// password: "$2a$05$wE.npY2D7cLi08cpgvS3v.OnkEfve9DRN69b2p2qT/IA7.9xzzhom"

// updatedAt: "2024-08-04T08:04:26.808Z"
