import React, { useRef } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import { addDisc } from "../../modules/DiscManager"

export const Register = ({setAuthUser}) => {
    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    const conflictDialog = useRef()
    const navigate = useNavigate()

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?email=${email.current.value}`)
            .then(res => res.json())
            .then(user => !!user.length)
    }

    const handleRegister = (e) => {
        e.preventDefault()

        existingUserCheck()
            .then((userExists) => {
                if (!userExists) {
                    fetch("http://localhost:8088/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email: email.current.value,
                            firstName: `${firstName.current.value}`,
                            lastName: `${lastName.current.value}`
                        })
                    })
                        .then(res => res.json())
                        .then(createdUser => {
                            if (createdUser.hasOwnProperty("id")) {
                                setAuthUser(createdUser)

                                //default disc!
                                const currentUser = JSON.parse(sessionStorage.getItem('putt_user'))
                                const currentUserId = currentUser.id;
                                const currentUsersName = currentUser.firstName;
                                
                                let defaultDisc = {
                                    userId: currentUserId,
                                    name: "Default Disc",
                                    typeId: 1,
                                    brandId: 3,
                                    weight: "173g",
                                    image: "/images/d2.png"
                                }
                                addDisc(defaultDisc).then(() => navigate("/"))

                            }
                        })
                }
                else {
                    conflictDialog.current.showModal()
                }
            })
        
    }

    return (
        <main style={{ textAlign: "center" }}>

            <dialog className="dialog dialog--password" ref={conflictDialog}>
                <div>Account with that email address already exists</div>
                <button className="button--close" onClick={e => conflictDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="registerHeader">Register for Putt Tracker</h1>
                <fieldset>
                    <label htmlFor="firstName">First Name</label>
                    <input ref={firstName} type="text" name="firstName" className="form-control" maxLength="13" placeholder="First name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName">Last Name</label>
                    <input ref={lastName} type="text" name="lastName" className="form-control" placeholder="Last name" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputEmail">Email address</label>
                    <input ref={email} type="email" name="email" className="form-control" placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <button className="registerButton" type="submit">Register</button>
                </fieldset>
            </form>
        </main>
    )
}