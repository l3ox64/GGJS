import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { useTheme } from "./ThemeProvider"

export default function() {
    const {dark, toggleTheme} = useTheme()
    const switchTheme = () => {
        toggleTheme()
        //document.body.setAttribute("data-bs-theme", localStorage.getItem("theme"))
        console.log(document.documentElement.getAttribute("data-bs-theme"))
    }

    return (
        <>
            <i className="bi bi-moon" style={{cursor: "pointer"}} onClick={switchTheme}></i>
        </>
    )
}