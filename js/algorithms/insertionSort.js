/**
 * Insertion Sort Algorithm
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 */

async function insertionSort() {
    const array = arrayGenerator.getArray();
    const n = array.length;

    for (let i = 1; i < n; i++) {
        let key = array[i];
        let j = i - 1;

        // Highlight the key being inserted
        visualizer.highlightBars([i], CONFIG.COLORS.COMPARING);
        await visualizer.sleep(visualizer.animationDelay);

        // Move elements greater than key one position ahead
        while (j >= 0) {
            // IMPORTANT: Call compareBars to increment counter
            await visualizer.compareBars(j, i);
            
            if (array[j] > key) {
                array[j + 1] = array[j];
                
                // Update visualization
                visualizer.updateBars(array);
                
                // Increment swap counter (this counts as a swap/shift)
                controls.incrementSwaps();
                
                j--;
            } else {
                break;
            }
        }

        array[j + 1] = key;
        visualizer.updateBars(array);

        // Mark the inserted position
        visualizer.markAsSorted(j + 1);
        await visualizer.sleep(visualizer.animationDelay / 2);
        visualizer.resetBarColor(j + 1);
    }

    // Mark all as sorted
    visualizer.markAllAsSorted();
}
