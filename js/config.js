/**
 * Configuration file for Sorting Algorithm Visualizer
 * Contains all global constants and settings
 */

const CONFIG = {
    // Array Configuration
    ARRAY_SIZE: 50,
    MIN_ARRAY_SIZE: 10,
    MAX_ARRAY_SIZE: 100,
    MIN_VALUE: 5,
    MAX_VALUE: 100,
    
    // Animation Configuration
    DEFAULT_DELAY: 50, // milliseconds
    MIN_DELAY: 1,
    MAX_DELAY: 1000,
    
    // Visualization Configuration
    CONTAINER_HEIGHT: 400, // pixels
    BAR_GAP: 2, // pixels between bars
    
    // Color Scheme
    COLORS: {
        UNSORTED: '#6495ED',      // Cornflower Blue
        COMPARING: '#FF0000',      // Red
        PIVOT: '#FFD700',          // Gold
        SORTED: '#31E20D',         // Light Green
        SWAPPING: '#FF6347'        // Tomato
    },
    
    // Algorithm Information
    ALGORITHMS: {
        BUBBLE: {
            name: 'Bubble Sort',
            timeComplexity: {
                best: 'O(n)',
                average: 'O(n²)',
                worst: 'O(n²)'
            },
            spaceComplexity: 'O(1)',
            description: 'Bubble Sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in wrong order.'
        },
        SELECTION: {
            name: 'Selection Sort',
            timeComplexity: {
                best: 'O(n²)',
                average: 'O(n²)',
                worst: 'O(n²)'
            },
            spaceComplexity: 'O(1)',
            description: 'Selection Sort divides the input into a sorted and unsorted region, repeatedly selecting the smallest element from the unsorted region.'
        },
        INSERTION: {
            name: 'Insertion Sort',
            timeComplexity: {
                best: 'O(n)',
                average: 'O(n²)',
                worst: 'O(n²)'
            },
            spaceComplexity: 'O(1)',
            description: 'Insertion Sort builds the final sorted array one item at a time by inserting each element into its correct position.'
        },
        QUICK: {
            name: 'Quick Sort',
            timeComplexity: {
                best: 'O(n log n)',
                average: 'O(n log n)',
                worst: 'O(n²)'
            },
            spaceComplexity: 'O(log n)',
            description: 'Quick Sort picks a pivot element and partitions the array around it, recursively sorting the sub-arrays.'
        },
        MERGE: {
            name: 'Merge Sort',
            timeComplexity: {
                best: 'O(n log n)',
                average: 'O(n log n)',
                worst: 'O(n log n)'
            },
            spaceComplexity: 'O(n)',
            description: 'Merge Sort divides the array into halves, recursively sorts them, and then merges the sorted halves.'
        },
        SHELL: {
            name: 'Shell Sort',
            timeComplexity: {
                best: 'O(n log n)',
                average: 'O(n log²n)',
                worst: 'O(n²)'
            },
            spaceComplexity: 'O(1)',
            description: 'Shell Sort is an optimization of Insertion Sort that allows the exchange of items that are far apart.'
        }
    }
};

// Make CONFIG globally accessible
window.CONFIG = CONFIG;
