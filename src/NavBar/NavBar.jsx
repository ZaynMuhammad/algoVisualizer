import { useState } from "react"
import './NavBar.css'



const NavBar = ({ handleResetArray, mergeSort, quickSort, heapSort }) => {

    return (
        <ul className="navBar-container">
            <li><button className="rightMargin" onClick={handleResetArray}>Generate New Array</button></li>
            <li><button onClick={mergeSort}>Merge Sort</button></li> 
            <li><button onClick={quickSort}>Quick Sort</button></li>
            <li><button onClick={heapSort}>Heap Sort</button></li>
        </ul>
    )
}

export default NavBar