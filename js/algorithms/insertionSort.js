/**
 * Insertion Sort Algorithm
 * Time Complexity: O(n²) average, O(n) best case
 * Space Complexity: O(1)
 */

async function insertionSort() {
    const array = arrayGenerator.getArray();
    const n = array.length;

    // First element is considered sorted
    visualizer.markAsSorted(0);

    for (let i = 1; i < n; i++) {
        const key = array[i];
        let j = i - 1;

        // Highlight the key element being inserted
        visualizer.highlightPivot(i);
        await visualizer.sleep(visualizer.getDelay());

        // Move elements greater than key one position ahead
        while (j >= 0 && array[j] > key) {
            // Highlight comparison
            visualizer.highlightBars([j, j + 1], CONFIG.COLORS.COMPARING);
            await visualizer.sleep(visualizer.getDelay());

            // Shift element
            array[j + 1] = array[j];
            arrayGenerator.updateArray(array);
            visualizer.updateBars(array);

            j--;
        }

        // Insert key at correct position
        array[j + 1] = key;
        arrayGenerator.updateArray(array);
        visualizer.updateBars(array);

        // Mark sorted portion
        visualizer.markRangeAsSorted(0, i);
        await visualizer.sleep(visualizer.getDelay());
    }

    visualizer.markAllAsSorted();
    controls.showCompletionStatus('Insertion Sort');
}
