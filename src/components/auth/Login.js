import React, { useRef } from "react"
import { Link } from "react-router-dom";
import { useNavigate} from "react-router-dom"
import "./Login.css"

export const Login = ({setAuthUser}) => {
    const email = useRef()
    const existDialog = useRef()
    const navigate = useNavigate()

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?email=${email.current.value}`)
            .then(res => res.json())
            .then(user => user.length ? user[0] : false)
    }

    const handleLogin = (e) => {
        e.preventDefault()

        existingUserCheck()
            .then(exists => {
                if (exists) {
                    setAuthUser(exists)
                    navigate("/")
                } else {
                    existDialog.current.showModal()
                }
            })
    }

    return (
        <main className="container--login">
            
            <dialog className="dialog dialog--auth" ref={existDialog}>
                <div>User does not exist</div>
                <button className="button--close" onClick={e => existDialog.current.close()}>Close</button>
            </dialog>

            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Welcome to Putt Tracker!</h1>
                    <p>The Putting App for Disc Golfers</p>
                    <h2>Please Sign In</h2>
                    <fieldset>
                        <label className="login-label" htmlFor="inputEmail"> Email Address </label>
                        <input ref={email} type="email"
                            id="email"
                            className="form-control"
                            placeholder="Email Address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button className="signInButton" type="submit">
                            Sign In
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                New to Putt Tracker? <Link to="/register"> Register</Link>
            </section>
        </main>
    )
}