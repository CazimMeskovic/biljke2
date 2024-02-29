

import React from "react"
import { Outlet, Link, NavLink } from "react-router-dom"
import Header from "./Header"
import Podaci from './Podaci'
import "./App.css"
import Footer from './Footer'


export default function PocetnaLayout() {
    return (
        <>

            <div >
                <Header />

                <main>

                    <Outlet />

                </main>


            </div>
        </>
    )
}


