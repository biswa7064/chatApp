/* eslint-disable arrow-body-style */
import React, { useRef, useState, useEffect } from 'react'
import {Divider} from 'rsuite'
import DashboardToggle from './dashboard/DashboardToggle'
import CreateRoomModal from './CreateRoomModal'
import ChatRoomList from './rooms/ChatRoomList'





const Sidebar = () => {

    const topsidebarRef = useRef();

    const [height,setHeight] = useState(0);


    useEffect(()=>{
        if (topsidebarRef.current){
        setHeight(topsidebarRef.current.scrollHeight)
        }
    },[topsidebarRef]); 


    return (
        <div className = "h-100 pt-2">
            <div ref = {topsidebarRef}>
                <DashboardToggle />
                <CreateRoomModal/>
                <Divider>Join conversation</Divider>
            </div>
            <ChatRoomList aboveElHeight = {height} />
        </div>
    )
}

export default Sidebar
