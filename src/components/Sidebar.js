/* eslint-disable arrow-body-style */
import React from 'react'
import DashboardToggle from './dashboard/DashboardToggle'
import CreateRoomModal from './CreateRoomModal'



const Sidebar = () => {
    return (
        <div className = "h-100 pt-2">
            <div>
                <DashboardToggle />
                <CreateRoomModal/>
            </div>
            
        </div>
    )
}

export default Sidebar
