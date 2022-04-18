import React from "react"
import { Route, Routes, Outlet, Navigate } from "react-router-dom"
import { Home } from "../Home"
import { DiscList } from './disc/DiscList.js'
import { DiscDetail } from "./disc/DiscDetail.js"
import { DiscForm} from './disc/DiscForm'
import { DiscEditForm } from "./disc/DiscEditForm"
import { RoundList } from './round/RoundList.js'
import { RoundDetail } from "./round/RoundDetail.js"
import { RoundForm } from "./round/RoundForm"
import { RoundEditForm } from "./round/RoundEditForm"
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";

export const ApplicationViews = ({ isAuthenticated, setIsAuthenticated }) => {
    
    const PrivateOutlet = () => {
		return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
	}
    
    const setAuthUser = (user) => {
        sessionStorage.setItem("putt_user", JSON.stringify(user))
        setIsAuthenticated(sessionStorage.getItem("putt_user") !== null)
    }
    
    return (
        <>
            <Routes>
                <Route path="/" element={<PrivateOutlet/>}/>
                    <Route path="/home" element={<Home/>} />
                    <Route path="/discs" element={<DiscList/>} />
                    <Route path="/discs/create" element={<DiscForm/>}/>
                    <Route path="/discs/:discId" element={<DiscDetail/>}/>
                    <Route path="/discs/:discId/edit" element={<DiscEditForm/>}/>

                    <Route path="/rounds" element={<RoundList/>}/>
                    <Route path="/rounds/create" element={<RoundForm/>}/>
                    <Route path="/rounds/:roundId" element={<RoundDetail/>}/>
                    <Route path="/rounds/:roundId/edit" element={<RoundEditForm/>}/>

                    <Route path="/login" element={<Login setAuthUser={setAuthUser}/>}/>
                    <Route path="/register" element={<Register/>}/>
            </Routes>
        </>

    )

}