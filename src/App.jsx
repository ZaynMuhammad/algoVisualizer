import { useState, useCallback } from 'react';

import './App.css';
import SortingVisualizer from './SortingVisualizer/SortingVisualizer'
import NavBar from './NavBar/NavBar'
import { getMergeSortAnimations, getQuickSortAnimations, getHeapSortAnimations } from './SortingAlgorithms/SortingAlgorithms';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 310;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

function App() {
  const [sortingArray, setSortingArray] = useState([])
  const [restoreArrayToSameSeed, setRestoreArrayToSameSeed] = useState([])
  const [isRegenerateBars, setIsRegenerateBars] = useState(false)

  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight
  
  const handleResetArray = useCallback(() => {
    const arrayBars = document.getElementsByClassName('array-bar');

    // Reset color to be pink for unsorted arrays
    for (const arrayBar of arrayBars) {
      arrayBar.style.backgroundColor = 'pink';
    }

    const arr = []
    // For responsiveness
    const amountOfBarsToGenerate = windowWidth / 4
    const maxNumber = windowHeight - 50;

    for (let i = 0; i < amountOfBarsToGenerate; i++) {
        // Start at 5 so we can see the bars for visualizing the sorting
        arr.push(randomIntFromInterval(5, maxNumber))
    }
    setSortingArray(arr)
    setRestoreArrayToSameSeed(arr.slice())
  }, [windowWidth, windowHeight])

  const setColorOnBarComparison = (animations, idx, arrayBars) => {
    const [barOneIdx, barTwoIdx] = animations[idx];
    const barOneStyle = arrayBars[barOneIdx].style;
    const barTwoStyle = arrayBars[barTwoIdx].style;
    const color = idx % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
    setTimeout(() => {
      barOneStyle.backgroundColor = color;
      barTwoStyle.backgroundColor = color;
    }, idx * ANIMATION_SPEED_MS);
  }

  const mergeSort = () => {
    if (restoreArrayToSameSeed.length) 
      setSortingArray(restoreArrayToSameSeed)    

    const animations = getMergeSortAnimations(sortingArray);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        setColorOnBarComparison(animations, i, arrayBars)
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  const quickSort = () => {
    const animations = getQuickSortAnimations(sortingArray);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        setColorOnBarComparison(animations, i, arrayBars)
      } else { 
        setTimeout(() => {
            const [heightOne, heightTwo] = animations[i];
            const [idxOne, idxTwo] = animations[i - 1];
            const idxOneStyle = arrayBars[idxOne].style;
            const idxTwoStyle = arrayBars[idxTwo].style;
            idxOneStyle.height = `${heightTwo}px`;
            idxTwoStyle.height = `${heightOne}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  const heapSort = () => {
    const animations = getHeapSortAnimations(sortingArray);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        setColorOnBarComparison(animations, i, arrayBars)
      } else { 
        setTimeout(() => {
            const [heightOne, heightTwo] = animations[i];
            const [idxOne, idxTwo] = animations[i - 1];
            const idxOneStyle = arrayBars[idxOne].style;
            const idxTwoStyle = arrayBars[idxTwo].style;
            idxOneStyle.height = `${heightTwo}px`;
            idxTwoStyle.height = `${heightOne}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  return (
    <div className="App">
      <NavBar
        handleResetArray={handleResetArray}
        mergeSort={mergeSort}
        quickSort={quickSort}
        heapSort={heapSort}
      />
      <SortingVisualizer
        handleResetArray={handleResetArray}
        sortingArray={sortingArray}
        isRegenerateBars={isRegenerateBars}
      />
    </div>
  );
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default App;
