import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "../HomePage/Home";
import SingIn from "../../Authentication/SingIn";
import SingUp from "../../Authentication/SingUp";
import CreateTask from "../Other Components/CreateTask.jsx/CreateTask";
import ManageTask from "../Other Components/CreateTask.jsx/ManageTask";

const Route = createBrowserRouter([
    {
        path:'/',
        element:<Root></Root>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/SingIn',
                element:<SingIn></SingIn>
            },
            {
                path:'/SingUp',
                element:<SingUp></SingUp>
            },
            {
                path:'/addtask',
                element:<CreateTask></CreateTask>
            },
            {
                path:'mytask',
                element:<ManageTask></ManageTask>
            }
        ]
    }
])

export default Route;