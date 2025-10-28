/**
 * Controls Module
 * Manages button states, user interactions, timer, and pause functionality
 */

class Controls {
    constructor() {
        this.isSorting = false;
        this.isPaused = false;
        this.shouldStop = false;
        this.startTime = null;
        this.endTime = null;
        this.pauseTime = 0;
        this.comparisonCount = 0;
        this.swapCount = 0;
        
        this.buttons = {
            randomize: document.getElementById('randomize-btn'),
            changeSize: document.getElementById('change-size-btn'),
            algorithms: document.querySelectorAll('.algo-btn'),
            pause: document.getElementById('pause-btn'),
            skipBack: document.getElementById('skip-back-btn'),
            stepBack: document.getElementById('step-back-btn'),
            stepForward: document.getElementById('step-forward-btn'),
            skipForward: document.getElementById('skip-forward-btn')
        };
        
        this.elements = {
            statusText: document.getElementById('status-text'),
            speedSlider: document.getElementById('speed-slider'),
            pauseIcon: document.getElementById('pause-icon'),
            pauseText: document.getElementById('pause-text')
        };

        this.setupSliderListeners();
    }

    /**
     * Setup slider event listeners
     */
    setupSliderListeners() {
        if (this.elements.speedSlider) {
            this.elements.speedSlider.addEventListener('input', (e) => {
                const delay = parseInt(e.target.value);
                visualizer.setDelay(delay);
            });
        }
    }

    /**
     * Toggle pause state
     */
    togglePause() {
        this.isPaused = !this.isPaused;
        
        if (this.elements.pauseIcon && this.elements.pauseText) {
            if (this.isPaused) {
                this.elements.pauseIcon.textContent = '▶️';
                this.elements.pauseText.textContent = 'Resume';
            } else {
                this.elements.pauseIcon.textContent = '⏸️';
                this.elements.pauseText.textContent = 'Pause';
            }
        }

        return this.isPaused;
    }

    /**
     * Check if paused and wait
     */
    async checkPause() {
        while (this.isPaused && this.isSorting && !this.shouldStop) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        if (this.shouldStop) {
            throw new Error('Sorting stopped by user');
        }
    }

    /**
     * Reset pause state
     */
    resetPause() {
        this.isPaused = false;
        this.shouldStop = false;
        if (this.elements.pauseIcon && this.elements.pauseText) {
            this.elements.pauseIcon.textContent = '⏸️';
            this.elements.pauseText.textContent = 'Pause';
        }
    }

    /**
     * Stop sorting immediately
     */
    stopSorting() {
        this.shouldStop = true;
        this.isPaused = false;
        this.resetPause();
    }

    /**
     * Increment comparison counter
     */
    incrementComparisons() {
        this.comparisonCount++;
        const counter = document.getElementById('comparison-count');
        if (counter) {
            counter.textContent = `Comparisons: ${this.comparisonCount}`;
        }
    }

    /**
     * Increment swap counter
     */
    incrementSwaps() {
        this.swapCount++;
        const counter = document.getElementById('swap-count');
        if (counter) {
            counter.textContent = `Swaps: ${this.swapCount}`;
        }
    }

    /**
     * Reset counters
     */
    resetCounters() {
        this.comparisonCount = 0;
        this.swapCount = 0;
        
        const compCounter = document.getElementById('comparison-count');
        const swapCounter = document.getElementById('swap-count');
        
        if (compCounter) compCounter.textContent = 'Comparisons: 0';
        if (swapCounter) swapCounter.textContent = 'Swaps: 0';
    }

    /**
     * Start the timer
     */
    startTimer() {
        this.startTime = performance.now();
        this.pauseTime = 0;
        this.shouldStop = false;
        this.resetCounters();
    }

    /**
     * Stop the timer and return elapsed time
     */
    stopTimer() {
        this.endTime = performance.now();
        return this.getElapsedTime();
    }

    /**
     * Get elapsed time in milliseconds
     */
    getElapsedTime() {
        if (this.startTime && this.endTime) {
            return (this.endTime - this.startTime - this.pauseTime).toFixed(2);
        }
        return 0;
    }

    /**
     * Format time for display
     */
    formatTime(milliseconds) {
        const ms = parseFloat(milliseconds);
        if (ms < 1000) {
            return `${ms.toFixed(2)} ms`;
        } else {
            return `${(ms / 1000).toFixed(2)} seconds`;
        }
    }

    /**
     * Disable all algorithm buttons during sorting
     */
    disableButtons() {
        this.isSorting = true;
        this.buttons.algorithms.forEach(btn => {
            btn.disabled = true;
        });
        if (this.buttons.randomize) this.buttons.randomize.disabled = true;
        if (this.buttons.changeSize) this.buttons.changeSize.disabled = true;
    }

    /**
     * Enable all buttons after sorting completes
     */
    enableButtons() {
        this.isSorting = false;
        this.buttons.algorithms.forEach(btn => {
            btn.disabled = false;
        });
        if (this.buttons.randomize) this.buttons.randomize.disabled = false;
        if (this.buttons.changeSize) this.buttons.changeSize.disabled = false;
        
        this.resetPause();
    }

    /**
     * Check if currently sorting
     */
    getIsSorting() {
        return this.isSorting;
    }

    /**
     * Update status text
     */
    updateStatus(message) {
        if (this.elements.statusText) {
            this.elements.statusText.textContent = message;
        }
    }

    /**
     * Show sorting in progress message
     */
    showSortingStatus(algorithmName) {
        this.updateStatus(`Sorting with ${algorithmName}...`);
    }

    /**
     * Show completion message with time
     */
    showCompletionStatus(algorithmName, elapsedTime = null) {
        let message = `✓ ${algorithmName} completed!`;
        if (elapsedTime !== null) {
            message += ` | Time: ${this.formatTime(elapsedTime)}`;
        }
        message += ` | Comparisons: ${this.comparisonCount} | Swaps: ${this.swapCount}`;
        this.updateStatus(message);
    }

    /**
     * Show error message
     */
    showError(message) {
        this.updateStatus(`❌ Error: ${message}`);
    }

    /**
     * Display algorithm information
     */
    displayAlgorithmInfo(algorithmKey) {
        const algo = CONFIG.ALGORITHMS[algorithmKey];
        if (!algo) return;

        const infoContainer = document.getElementById('algorithm-info');
        if (!infoContainer) return;

        infoContainer.innerHTML = `
            <h3>${algo.name}</h3>
            <p>${algo.description}</p>
            <h4>Time Complexity:</h4>
            <ul>
                <li><strong>Best Case:</strong> <code>${algo.timeComplexity.best}</code></li>
                <li><strong>Average Case:</strong> <code>${algo.timeComplexity.average}</code></li>
                <li><strong>Worst Case:</strong> <code>${algo.timeComplexity.worst}</code></li>
            </ul>
            <h4>Space Complexity:</h4>
            <p><code>${algo.spaceComplexity}</code></p>
        `;
    }

    /**
     * Clear algorithm information
     */
    clearAlgorithmInfo() {
        const infoContainer = document.getElementById('algorithm-info');
        if (infoContainer) {
            infoContainer.innerHTML = '<p>Select an algorithm to see the visualization and complexity information.</p>';
        }
    }

    /**
     * Get current delay from slider
     */
    getCurrentDelay() {
        if (this.elements.speedSlider) {
            return parseInt(this.elements.speedSlider.value);
        }
        return CONFIG.DEFAULT_DELAY;
    }

    /**
     * Prompt user for new array size (Not used - modal is used instead)
     */
    promptForSize() {
        const currentSize = arrayGenerator.getArraySize();
        const newSize = prompt(
            `Enter new array size (${CONFIG.MIN_ARRAY_SIZE}-${CONFIG.MAX_ARRAY_SIZE}):`,
            currentSize
        );

        if (newSize === null) return null;

        const size = parseInt(newSize);
        if (isNaN(size) || size < CONFIG.MIN_ARRAY_SIZE || size > CONFIG.MAX_ARRAY_SIZE) {
            alert(`Please enter a valid number between ${CONFIG.MIN_ARRAY_SIZE} and ${CONFIG.MAX_ARRAY_SIZE}`);
            return null;
        }

        return size;
    }
}

// Create global instance
const controls = new Controls();
