/**
 * Shell Sort Algorithm
 * Time Complexity: O(n²) to O(n log n) depending on gap sequence
 * Space Complexity: O(1)
 */

async function shellSort() {
    const array = arrayGenerator.getArray();
    const n = array.length;

    // Start with a large gap and reduce it
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        // Perform gapped insertion sort
        for (let i = gap; i < n; i++) {
            let temp = array[i];
            let j = i;

            // Highlight elements being compared
            visualizer.highlightBars([i], CONFIG.COLORS.COMPARING);
            await visualizer.sleep(visualizer.animationDelay);

            while (j >= gap) {
                // IMPORTANT: Call compareBars to increment counter
                await visualizer.compareBars(j - gap, j);
                
                if (array[j - gap] > temp) {
                    // Swap elements
                    array[j] = array[j - gap];
                    
                    // Increment swap counter
                    controls.incrementSwaps();
                    
                    // Update visualization
                    visualizer.updateBars(array);
                    visualizer.highlightBars([j, j - gap], CONFIG.COLORS.SWAPPING);
                    await visualizer.sleep(visualizer.animationDelay);
                    
                    j -= gap;
                } else {
                    break;
                }
            }

            array[j] = temp;
            visualizer.updateBars(array);
            visualizer.resetBarColor(j);
        }
    }

    // Mark all as sorted
    visualizer.markAllAsSorted();
}
