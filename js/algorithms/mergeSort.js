/**
 * Merge Sort Algorithm
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */

async function mergeSort() {
    const array = arrayGenerator.getArray();
    await mergeSortHelper(array, 0, array.length - 1);
    visualizer.markAllAsSorted();
}

async function mergeSortHelper(array, left, right) {
    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);

    // Highlight the section being divided
    visualizer.highlightBars([mid], CONFIG.COLORS.PIVOT);
    await visualizer.sleep(visualizer.animationDelay / 2);
    visualizer.resetBarColor(mid);

    // Recursively sort left and right halves
    await mergeSortHelper(array, left, mid);
    await mergeSortHelper(array, mid + 1, right);

    // Merge the sorted halves
    await merge(array, left, mid, right);
}

async function merge(array, left, mid, right) {
    const leftArray = array.slice(left, mid + 1);
    const rightArray = array.slice(mid + 1, right + 1);

    let i = 0, j = 0, k = left;

    // Merge the two arrays
    while (i < leftArray.length && j < rightArray.length) {
        // IMPORTANT: Increment comparison counter
        controls.incrementComparisons();
        
        // Highlight elements being compared
        visualizer.highlightBars([k], CONFIG.COLORS.COMPARING);
        await visualizer.sleep(visualizer.animationDelay);

        if (leftArray[i] <= rightArray[j]) {
            array[k] = leftArray[i];
            i++;
        } else {
            array[k] = rightArray[j];
            j++;
        }

        // Increment swap/merge counter
        controls.incrementSwaps();
        
        // Update visualization
        arrayGenerator.updateArray(array);
        visualizer.updateBars(array);
        await visualizer.sleep(visualizer.animationDelay);
        visualizer.resetBarColor(k);
        
        k++;
    }

    // Copy remaining elements from leftArray
    while (i < leftArray.length) {
        array[k] = leftArray[i];
        
        // Increment swap counter
        controls.incrementSwaps();
        
        arrayGenerator.updateArray(array);
        visualizer.updateBars(array);
        visualizer.highlightBars([k], CONFIG.COLORS.SWAPPING);
        await visualizer.sleep(visualizer.animationDelay / 2);
        visualizer.resetBarColor(k);
        
        i++;
        k++;
    }

    // Copy remaining elements from rightArray
    while (j < rightArray.length) {
        array[k] = rightArray[j];
        
        // Increment swap counter
        controls.incrementSwaps();
        
        arrayGenerator.updateArray(array);
        visualizer.updateBars(array);
        visualizer.highlightBars([k], CONFIG.COLORS.SWAPPING);
        await visualizer.sleep(visualizer.animationDelay / 2);
        visualizer.resetBarColor(k);
        
        j++;
        k++;
    }

    // Mark the merged section
    for (let idx = left; idx <= right; idx++) {
        visualizer.highlightBars([idx], CONFIG.COLORS.SORTED);
        await visualizer.sleep(visualizer.animationDelay / 4);
    }
    
    for (let idx = left; idx <= right; idx++) {
        visualizer.resetBarColor(idx);
    }
}
