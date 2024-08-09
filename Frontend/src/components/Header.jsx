import {  useNavigate } from "react-router-dom"

import useUser from "../contexts/User"

function Header() {
	const { loggedUser, setLoggedUser } = useUser()
	const navigate = useNavigate()

	const logOut = () => {
		localStorage.removeItem("nutrify-user")
		setLoggedUser(null)
		navigate("/login")
	}

	function navTo(path) {
		navigate(`/${path}`)
	}

	return (
		<div className=' header-container'>
			<div className='header-items'>
				<button className='header-items left-header' onClick={() => navTo("")}>
					Nutriverse
				</button>

				<div onClick={() => navTo("")} className='header-item'>
					Home
				</div>

				<div onClick={() => navTo("track")} className='header-item'>
					Track Food
				</div>

				<div onClick={() => navTo("stats")} className='header-item'>
					Stats
				</div>

				<div onClick={() => navTo("contact")} className='header-item'>
					Contact Us
				</div>
			</div>

			<div className='right-header'>
				<div className='user-name'>{loggedUser === null ? "" :loggedUser.name}</div>
				<button className='header-item login-button ' onClick={logOut}>
					{loggedUser === null ? "Login" : "Logout"}
				</button>
			</div>
		</div>
	)
}

export default Header

