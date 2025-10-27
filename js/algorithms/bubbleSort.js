/**
 * Bubble Sort Algorithm
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 */

async function bubbleSort() {
    const array = arrayGenerator.getArray();
    const n = array.length;

    for (let i = 0; i < n - 1; i++) {
        let swapped = false;

        for (let j = 0; j < n - i - 1; j++) {
            // Highlight bars being compared
            await visualizer.compareBars(j, j + 1);

            if (array[j] > array[j + 1]) {
                // Swap in array
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                arrayGenerator.updateArray(array);

                // Swap visual bars
                await visualizer.swapBars(j, j + 1, array);
                swapped = true;
            } else {
                // Reset colors if no swap
                visualizer.resetBarColor(j);
                visualizer.resetBarColor(j + 1);
            }
        }

        // Mark the last element of this pass as sorted
        visualizer.markAsSorted(n - i - 1);

        // If no swaps occurred, array is sorted
        if (!swapped) {
            break;
        }
    }

    // Mark all remaining elements as sorted
    visualizer.markAllAsSorted();
    controls.showCompletionStatus('Bubble Sort');
}
