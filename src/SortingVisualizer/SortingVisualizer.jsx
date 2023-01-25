import React, { useEffect } from 'react'
import './SortingVisualizer.css'

const SortingVisualizer = ({ handleResetArray, sortingArray, isRegenerateBars }) => {

    
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