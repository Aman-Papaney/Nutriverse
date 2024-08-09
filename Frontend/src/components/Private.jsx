import { Navigate } from "react-router-dom"

import useUser from '../contexts/User'

function Private(props) {

    const { loggedUser } = useUser()


    return (
        (loggedUser !== null) ? <props.Component /> : <Navigate to="/login" />
    )
}

export default Private
