/**
 * Quick Sort Algorithm
 * Time Complexity: O(n log n) average, O(n²) worst case
 * Space Complexity: O(log n)
 */

async function quickSort(arr = null, low = 0, high = null) {
    // Initialize on first call
    if (arr === null) {
        arr = arrayGenerator.getArray();
        high = arr.length - 1;
    }

    if (low < high) {
        // Partition the array
        const pivotIndex = await partition(arr, low, high);

        // Recursively sort elements before and after partition
        await quickSort(arr, low, pivotIndex - 1);
        await quickSort(arr, pivotIndex + 1, high);
    }

    // Mark as sorted when recursion completes
    if (low === 0 && high === arr.length - 1) {
        visualizer.markAllAsSorted();
        controls.showCompletionStatus('Quick Sort');
    }
}

/**
 * Partition helper function for Quick Sort
 */
async function partition(arr, low, high) {
    // Choose the rightmost element as pivot
    const pivot = arr[high];
    visualizer.highlightPivot(high);
    await visualizer.sleep(visualizer.getDelay());

    let i = low - 1; // Index of smaller element

    for (let j = low; j < high; j++) {
        // Highlight comparison
        await visualizer.compareBars(j, high);

        if (arr[j] < pivot) {
            i++;

            // Swap elements
            [arr[i], arr[j]] = [arr[j], arr[i]];
            arrayGenerator.updateArray(arr);
            await visualizer.swapBars(i, j, arr);
        } else {
            visualizer.resetBarColor(j);
        }
    }

    // Swap pivot to its correct position
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    arrayGenerator.updateArray(arr);
    await visualizer.swapBars(i + 1, high, arr);

    // Mark pivot as sorted
    visualizer.markAsSorted(i + 1);

    return i + 1;
}


async function quickSort(arr = null, low = 0, high = null) {
    if (arr === null) {
        arr = arrayGenerator.getArray();
        high = arr.length - 1;
    }

    if (low < high) {
        const pivotIndex = await partition(arr, low, high);
        await quickSort(arr, low, pivotIndex - 1);
        await quickSort(arr, pivotIndex + 1, high);
    }

    if (low === 0 && high === arr.length - 1) {
        visualizer.markAllAsSorted();
        // Timer is handled in main.js
    }
}

async function partition(arr, low, high) {
    const pivot = arr[high];
    visualizer.highlightPivot(high);
    await visualizer.sleep(visualizer.getDelay());

    let i = low - 1;

    for (let j = low; j < high; j++) {
        await visualizer.compareBars(j, high);

        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            arrayGenerator.updateArray(arr);
            await visualizer.swapBars(i, j, arr);
        } else {
            visualizer.resetBarColor(j);
        }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    arrayGenerator.updateArray(arr);
    await visualizer.swapBars(i + 1, high, arr);

    visualizer.markAsSorted(i + 1);

    return i + 1;
}
