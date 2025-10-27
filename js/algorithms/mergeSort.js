/**
 * Merge Sort Algorithm
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */

async function mergeSort(arr = null, left = 0, right = null) {
    // Initialize on first call
    if (arr === null) {
        arr = arrayGenerator.getArray();
        right = arr.length - 1;
    }

    if (left < right) {
        const mid = Math.floor((left + right) / 2);

        // Sort first and second halves
        await mergeSort(arr, left, mid);
        await mergeSort(arr, mid + 1, right);

        // Merge the sorted halves
        await merge(arr, left, mid, right);
    }

    // Mark all as sorted when complete
    if (left === 0 && right === arr.length - 1) {
        visualizer.markAllAsSorted();
        controls.showCompletionStatus('Merge Sort');
    }
}

/**
 * Merge helper function for Merge Sort
 */
async function merge(arr, left, mid, right) {
    const n1 = mid - left + 1;
    const n2 = right - mid;

    // Create temp arrays
    const leftArr = new Array(n1);
    const rightArr = new Array(n2);

    // Copy data to temp arrays
    for (let i = 0; i < n1; i++) {
        leftArr[i] = arr[left + i];
    }
    for (let j = 0; j < n2; j++) {
        rightArr[j] = arr[mid + 1 + j];
    }

    // Merge the temp arrays back
    let i = 0, j = 0, k = left;

    while (i < n1 && j < n2) {
        // Highlight elements being compared
        visualizer.highlightBars([left + i, mid + 1 + j], CONFIG.COLORS.COMPARING);
        await visualizer.sleep(visualizer.getDelay());

        if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            i++;
        } else {
            arr[k] = rightArr[j];
            j++;
        }

        // Update visualization
        arrayGenerator.updateArray(arr);
        visualizer.updateBars(arr);
        visualizer.highlightBars([k], CONFIG.COLORS.SORTED);
        await visualizer.sleep(visualizer.getDelay());

        k++;
    }

    // Copy remaining elements of leftArr
    while (i < n1) {
        arr[k] = leftArr[i];
        arrayGenerator.updateArray(arr);
        visualizer.updateBars(arr);
        visualizer.highlightBars([k], CONFIG.COLORS.SORTED);
        await visualizer.sleep(visualizer.getDelay());
        i++;
        k++;
    }

    // Copy remaining elements of rightArr
    while (j < n2) {
        arr[k] = rightArr[j];
        arrayGenerator.updateArray(arr);
        visualizer.updateBars(arr);
        visualizer.highlightBars([k], CONFIG.COLORS.SORTED);
        await visualizer.sleep(visualizer.getDelay());
        j++;
        k++;
    }

    // Reset colors for merged range
    for (let idx = left; idx <= right; idx++) {
        visualizer.resetBarColor(idx);
    }
}
