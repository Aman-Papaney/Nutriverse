import { useNavigate } from "react-router-dom"

const Footer = () => {

    const nav = useNavigate()

    function navTo(path) {
		nav(`/${path}`)
	}

  return (
		<div className="footer">

			<div className='footer-items-1'>
				<div onClick={() => navTo("register")} className='footer-item'>
					Sign Up
				</div>

				<div onClick={() => navTo("login")} className='footer-item'>
					Login
				</div>
			</div>

			<div className='footer-items-2'>
				<div className='footer-item'>
					<a href='https://www.facebook.com' target='_'>
						Facebook
					</a>
				</div>

				<div className='footer-item'>
					<a href='https://www.instagram.com' target='_'>
						Instagram
					</a>
				</div>

				<div className='footer-item'>
					<a href='https://www.x.com' target='_'>
						X
					</a>
				</div>
			</div>

		</div>
  )
}

export default Footer
