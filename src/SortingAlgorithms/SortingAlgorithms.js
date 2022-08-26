export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
}

function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
) {
    // Array is of size 1, so it's sorted alread
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    // Passing in first half of array  
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    // Pass in second half of array  
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}
  
function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([i, j]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([i, j]);
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
        } else {
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
        }
    }

    // The first half of the array has more elements than the second half, 
    // so we need to go through the remaining elements
    while (i <= middleIdx) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([i, i]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([i, i]);
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
    }
    // The second half is bigger than the first half, 
    // so we need to go through the remaining elements
    while (j <= endIdx) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([j, j]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([j, j]);
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
    }
}

export function getQuickSortAnimations(array) {
    const animations = [];

    quickSortRecurse(animations, array, 0, array.length-1);

    return animations;
}

function quickSortRecurse(animations, array, low, high) {
    if( low < high ) {
        const partition = partitionQuickSort(animations, array, low, high);

        quickSortRecurse(animations, array, low, partition - 1);
        quickSortRecurse(animations, array, partition + 1, high);
    }
}

function partitionQuickSort(animations, array, low, high) {

    let pivotValue = array[high];
    let i = (low - 1);
    let temp;
    for (let j = low; j <= high - 1; j++) {
        if (array[j] < pivotValue) {
            i++;
            animations.push([i, j]);
            animations.push([i, j]);
            // Since swapping happens in-place quick sort,
            // the two values being pushed at this index in the animations array
            // are the values for the heights of the bars
            animations.push([array[i], array[j]]);
            temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }
    animations.push([i+1, high]);
    animations.push([i+1, high]);
    animations.push([array[i+1], array[high]]);
    temp = array[i+1];
    array[i+1] = array[high];
    array[high] = temp;

    return (i+1);
}

export function getHeapSortAnimations(array) {
    const animations = []
    heapSort(array, animations)
    return animations
}

function heapSort(array, animations) {
    const N = array.length

    // Build heap
    for (let i = Math.floor(N / 2) - 1; i >= 0; i--) {
        heapify(array, N, i)
    }

    // One by one extract an element from heap
    for (let i = N - 1; i > 0; i--) {
        // Move current root to end
        animations.push([0, i])
        animations.push([0, i])
        animations.push([array[0], array[i]])
        let temp = array[0]
        array[0] = array[i]
        array[i] = temp

        // Call max heapify on the reduced heap
        heapify(array, i, 0)
    }
}

function heapify(array, N, i) {
    let largest = i
    const left = 2 * i + 1
    const right = 2 * i + 2

    if (left < N && array[left] > array[largest])
        largest = left
    
    if (right < N && array[right] > array[largest])
        largest = right
    
    if (largest !== i) {
        let swap = array[i]
        array[i] = array[largest]
        array[largest] = swap

        heapify(array, N, largest)
    }   
}

