/**
 * Selection Sort Algorithm
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 */

async function selectionSort() {
    const array = arrayGenerator.getArray();
    const n = array.length;

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;

        // Highlight current position
        visualizer.highlightPivot(i);

        for (let j = i + 1; j < n; j++) {
            // Highlight bars being compared
            await visualizer.compareBars(minIndex, j);

            if (array[j] < array[minIndex]) {
                // Reset previous minimum
                visualizer.resetBarColor(minIndex);
                minIndex = j;
                // Highlight new minimum
                visualizer.highlightPivot(minIndex);
            } else {
                visualizer.resetBarColor(j);
            }
        }

        if (minIndex !== i) {
            // Swap in array
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
            arrayGenerator.updateArray(array);

            // Swap visual bars
            await visualizer.swapBars(i, minIndex, array);
        }

        // Mark current position as sorted
        visualizer.markAsSorted(i);
    }

    // Mark the last element as sorted
    visualizer.markAsSorted(n - 1);
    controls.showCompletionStatus('Selection Sort');
}
