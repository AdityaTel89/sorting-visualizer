/**
 * Main Application File
 * Initializes the application and sets up event listeners
 */

// Global state
let currentAlgorithm = null;

/**
 * Initialize the application
 */
function init() {
    // Generate initial array and render
    const initialArray = arrayGenerator.getArray();
    visualizer.renderBars(initialArray);
    
    // Set initial delay
    const initialDelay = controls.calculateDelay();
    visualizer.setDelay(initialDelay);
    
    // Setup event listeners
    setupEventListeners();
    
    console.log('Sorting Algorithm Visualizer initialized');
}

/**
 * Setup all event listeners
 */
function setupEventListeners() {
    // Randomize Array Button
    const randomizeBtn = document.getElementById('randomize-btn');
    randomizeBtn.addEventListener('click', handleRandomize);

    // Change Size Button
    const changeSizeBtn = document.getElementById('change-size-btn');
    changeSizeBtn.addEventListener('click', handleChangeSize);

    // Algorithm Buttons
    const algoButtons = {
        'bubble-sort-btn': { func: bubbleSort, name: 'Bubble Sort', key: 'BUBBLE' },
        'selection-sort-btn': { func: selectionSort, name: 'Selection Sort', key: 'SELECTION' },
        'insertion-sort-btn': { func: insertionSort, name: 'Insertion Sort', key: 'INSERTION' },
        'quick-sort-btn': { func: quickSort, name: 'Quick Sort', key: 'QUICK' },
        'merge-sort-btn': { func: mergeSort, name: 'Merge Sort', key: 'MERGE' },
        'shell-sort-btn': { func: shellSort, name: 'Shell Sort', key: 'SHELL' }
    };

    Object.keys(algoButtons).forEach(btnId => {
        const btn = document.getElementById(btnId);
        const algo = algoButtons[btnId];
        btn.addEventListener('click', () => handleAlgorithm(algo.func, algo.name, algo.key));
    });

    // Speed Input Changes
    const speedWidth = document.getElementById('speed-width');
    const speedHeight = document.getElementById('speed-height');
    
    speedWidth.addEventListener('change', handleSpeedChange);
    speedHeight.addEventListener('change', handleSpeedChange);
}

/**
 * Handle randomize array button click
 */
function handleRandomize() {
    if (controls.getIsSorting()) {
        alert('Please wait for current sorting to complete');
        return;
    }

    visualizer.resetAllColors();
    const newArray = arrayGenerator.randomize();
    visualizer.renderBars(newArray);
    controls.updateStatus('Array randomized');
    controls.clearAlgorithmInfo();
}

/**
 * Handle change size button click
 */
function handleChangeSize() {
    if (controls.getIsSorting()) {
        alert('Please wait for current sorting to complete');
        return;
    }

    const newSize = controls.promptForSize();
    if (newSize === null) return;

    const success = arrayGenerator.setArraySize(newSize);
    if (success) {
        const newArray = arrayGenerator.getArray();
        visualizer.renderBars(newArray);
        controls.updateStatus(`Array size changed to ${newSize}`);
    }
}

/**
 * Handle algorithm execution
 */
async function handleAlgorithm(algorithmFunc, algorithmName, algorithmKey) {
    if (controls.getIsSorting()) {
        alert('Sorting is already in progress');
        return;
    }

    // Reset visualization
    visualizer.resetAllColors();
    
    // Display algorithm info
    controls.displayAlgorithmInfo(algorithmKey);
    
    // Disable buttons and update status
    controls.disableButtons();
    controls.showSortingStatus(algorithmName);

    try {
        // Execute sorting algorithm
        await algorithmFunc();
    } catch (error) {
        console.error('Error during sorting:', error);
        controls.showError('Sorting failed');
    } finally {
        // Re-enable buttons
        controls.enableButtons();
    }
}

/**
 * Handle speed change
 */
function handleSpeedChange() {
    const newDelay = controls.calculateDelay();
    visualizer.setDelay(newDelay);
    console.log('Animation delay updated to:', newDelay);
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
