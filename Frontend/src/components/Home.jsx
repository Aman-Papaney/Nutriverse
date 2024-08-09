import {useNavigate} from "react-router-dom"

import feature_bg_Image from "../assets/image.jpeg"
import Footer from "./Footer"

const Home = () => {

  const nav = useNavigate()

  function toRegister(){
    nav("/register")
  }

	return (
		<div className='container home-image-container'>
			<div className='home-banner'>
				<div className='home-primary-text'>Your Journey Towards A Healthy Future</div>

				<div className='home-secondary-text'>Start Tracking Your Foods With Our Intutive System. Say Goodbye to Unhealthy Eating.</div>

				<button onClick={toRegister} className='home-primary-button'>
					Start Tracking
				</button>
			</div>

			<div className='features'>
				<div className='feature_image'>
					<img src={feature_bg_Image} alt='' />
				</div>

				<div className='home-vertival-sep'></div>

				<div className='feature_text'>
					<p className='feature_headline'>Track your food items</p>
					<p className='feature_headline_desc'>Easily log and monitor what you eat</p>

					<p className='feature_headline'>Nutritional insights</p>
					<p className='feature_headline_desc'>Analyze your daily intake</p>
				</div>
			</div>

			<Footer />
		</div>
	)
}

export default Home
