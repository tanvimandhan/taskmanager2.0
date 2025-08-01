import React from "react";
import {MdDashboard,MdOutlineAddTask,MdTaskAlt,MdOutlinePendingActions} from "react-icons/md"
import {FaTasks,FaTrashAlt,FaUsers} from "react-icons/fa"
import { useLocation,useDispatch } from "react-router-dom";


const linkdata=[
    {
        label:"Dashboard",link:"dashboard",icon:<MdDashboard/>,
    },
    {
        label:"Tasks",link:"tasks",icon:<FaTasks/>
    },
    {
        label:"completed",link:"completed/completed",icon:<MdTaskAlt/>
    },
    {
        label:"In Progress",link:"inprogress/ in progress",icon:<MdOutlinePendingActions/>
    }
]

const Sidebar=()=>{
    const {user}=useSelector(state=>state.auth);
    const dispatch=useDispatch()
    const location=useLocation()

    const path=
    return <div>

    </div>
}
export default Sidebar