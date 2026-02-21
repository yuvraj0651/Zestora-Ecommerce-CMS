import React from 'react'
import Sidebar from '../../UI/Sidebar/Sidebar'
import { Outlet } from 'react-router'

const HomePage = () => {
    return (
        <>
            <div className="flex">
                <Sidebar />
                <main className="flex-1 p-4">
                    <Outlet />
                </main>
            </div>
        </>
    )
}

export default HomePage