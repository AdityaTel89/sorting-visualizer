/**
 * Shell Sort Algorithm
 * Time Complexity: O(n log n) to O(n²)
 * Space Complexity: O(1)
 */

async function shellSort() {
    const array = arrayGenerator.getArray();
    const n = array.length;

    // Start with a large gap, then reduce the gap
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        // Do a gapped insertion sort
        for (let i = gap; i < n; i++) {
            const temp = array[i];
            
            // Highlight current element
            visualizer.highlightPivot(i);
            await visualizer.sleep(visualizer.getDelay());

            let j = i;

            // Shift earlier gap-sorted elements up until correct location is found
            while (j >= gap && array[j - gap] > temp) {
                // Highlight comparison
                visualizer.highlightBars([j, j - gap], CONFIG.COLORS.COMPARING);
                await visualizer.sleep(visualizer.getDelay());

                // Shift element
                array[j] = array[j - gap];
                arrayGenerator.updateArray(array);
                visualizer.updateBars(array);

                visualizer.resetBarColor(j);
                j -= gap;
            }

            // Put temp in its correct location
            array[j] = temp;
            arrayGenerator.updateArray(array);
            visualizer.updateBars(array);
            visualizer.resetBarColor(j);

            await visualizer.sleep(visualizer.getDelay());
        }
    }

    visualizer.markAllAsSorted();
    controls.showCompletionStatus('Shell Sort');
}
