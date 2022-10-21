import LogIn from "../Screens/Login"
import SignUp from "../Screens/SignUp"
import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import { Link } from "react-router-dom"
import React from "react"
import Todo from "../Screens/Todo"

function AppRouter () {
    return (
        <div>
        <Router>

            <Routes>
                <Route path="/" element = {<LogIn/>} />
                <Route path="SignUp" element = {<SignUp/>} />
                <Route path="todo" element = {<Todo/>} />
            </Routes>
        </Router>
        </div>
    )
}

export default AppRouter