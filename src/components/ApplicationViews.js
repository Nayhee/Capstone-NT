import React from "react"
import { Route, Routes, Navigate } from "react-router-dom"
import { Home } from "../Home"
import { DiscList } from './disc/DiscList.js'
import { DiscForm} from './disc/DiscForm'
import { DiscEditForm } from "./disc/DiscEditForm"
import { RoundList } from './round/RoundList.js'
import { RoundForm } from "./round/RoundForm"
import { RoundEditForm } from "./round/RoundEditForm"
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";

//I tell the app to display certain components when the URL matches each of these patterns.

export const ApplicationViews = ({ isAuthenticated, setIsAuthenticated }) => {
    
    //Function limiting access to child component until user IsAuthenticated. 
    const PrivateRoute = ({children}) => {
		return isAuthenticated ? children : <Navigate to="/login"/>;
	}
    //Function to set a user in session storage and then sets the state of IsAuthenticated (passed from Capstone.js)
    const setAuthUser = (user) => {
        sessionStorage.setItem("putt_user", JSON.stringify(user))
        setIsAuthenticated(sessionStorage.getItem("putt_user") !== null)
    }

    //we use UseParams in the Edit Forms so that we can store that disc/round's ID property.  
    
    return (
        <>
            <Routes>
                    <Route exact path="/" element={
                        <PrivateRoute>
                            <Home/>
                        </PrivateRoute> 
                    } />

                    <Route exact path="/discs" element={
                        <PrivateRoute>
                            <DiscList/>
                        </PrivateRoute>
                    } />
                    <Route path="/discs/create" element={<DiscForm/>}/>
                    <Route path="/discs/:discId/edit" element={
                        <PrivateRoute>
                            <DiscEditForm/>
                        </PrivateRoute>
                    }/>
                    <Route exact path="/rounds" element={
                        <PrivateRoute>
                            <RoundList/>
                        </PrivateRoute>
                    }/>
                    <Route path="/rounds/create" element={<RoundForm/>}/>
                    <Route path="/rounds/:roundId/edit" element={
                        <PrivateRoute>
                            <RoundEditForm/>
                        </PrivateRoute>
                    }/> 
                    <Route exact path="/login" element={<Login setAuthUser={setAuthUser}/>}/>
                    <Route exact path="/register" element={<Register setAuthUser={setAuthUser}/>}/>
            </Routes>
        </>
    )
}