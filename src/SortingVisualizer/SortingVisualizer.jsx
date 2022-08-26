import React, { useState, useEffect, useCallback } from 'react'
import './SortingVisualizer.css'

const SortingVisualizer = ({ handleResetArray, sortingArray }) => {

    
    useEffect(() => {
        handleResetArray()
    }, [handleResetArray])

    return (
        <div className="array-container">
            {sortingArray.map((value, idx) => (
            <div
                className="array-bar"
                key={idx}
                style={{
                    height: `${value}px`,
                }}></div>
            ))}
        </div>
    )
}



export default SortingVisualizer