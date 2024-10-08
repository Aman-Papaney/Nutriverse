import {  useState } from "react"
import { Link , useNavigate} from "react-router-dom"

import useUser from "../contexts/User"

export default function Login() {

    const {  setLoggedUser } = useUser()

    const navigate = useNavigate()
    

    const [userCreds, setUserCreds] = useState({
        email: "",
        password: ""
    })

    const [message, setMessage] = useState({
        type: "invisible-msg",
        text: "Dummy Msg"
    })

    function handleInput(event) {
        setUserCreds((prevState) => {
            return { ...prevState, [event.target.name]: event.target.value };
        })
    }

    function handleSubmit(event) {
        event.preventDefault();

        fetch("http://localhost:8000/login", {
            method: "POST",
            body: JSON.stringify(userCreds),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {

                if (response.status !== 200) {
                    setMessage({ type: "error", text: "Username or Email Doesnt Exist" });
                }

                setTimeout(() => {
                    setMessage({ type: "invisible-msg", text: "" })
                }, 5000)

                return response.json();
            })
            .then((data) => {

                if (data.token !== undefined) {

                    setLoggedUser(data)
                    localStorage.setItem("nutrify-user", JSON.stringify(data))

                    navigate('/')
                }

            })
            .catch((err) => {
                console.log(err);
            })

    }

    

    
    

    return (
        <section className="container">

            <form className="form" onSubmit={handleSubmit}>

                <h1>Login To Fitness</h1>

                <input className="inp" required type="email" onChange={handleInput}
                    placeholder="Enter Email" name="email" value={userCreds.email} />

                <input className="inp" maxLength={8} type="password" onChange={handleInput}
                    placeholder="Enter Password" name="password" value={userCreds.password} />


                <button className="btn">Login</button>

            </form>

            <p>Dont Have a Account ? <Link to="/register">Register Now</Link></p>

            <p className={message.type}>{message.text}</p>

        </section>
    )
}