/**
 * Controls Module
 * Manages button states and user interactions
 */

class Controls {
    constructor() {
        this.isSorting = false;
        this.buttons = {
            randomize: document.getElementById('randomize-btn'),
            changeSize: document.getElementById('change-size-btn'),
            algorithms: document.querySelectorAll('.algo-btn'),
            pause: document.getElementById('pause-btn'),
            stepForward: document.getElementById('step-forward-btn'),
            stepBack: document.getElementById('step-back-btn')
        };
        this.statusText = document.getElementById('status-text');
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
        if (this.statusText) {
            this.statusText.textContent = message;
        }
    }

    /**
     * Show sorting in progress message
     */
    showSortingStatus(algorithmName) {
        this.updateStatus(`Sorting with ${algorithmName}...`);
    }

    /**
     * Show completion message
     */
    showCompletionStatus(algorithmName) {
        this.updateStatus(`${algorithmName} completed!`);
    }

    /**
     * Show error message
     */
    showError(message) {
        this.updateStatus(`Error: ${message}`);
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
     * Get speed input values
     */
    getSpeedValues() {
        const widthInput = document.getElementById('speed-width');
        const heightInput = document.getElementById('speed-height');
        
        return {
            width: widthInput ? parseInt(widthInput.value) : 1000,
            height: heightInput ? parseInt(heightInput.value) : 500
        };
    }

    /**
     * Prompt user for new array size
     */
    promptForSize() {
        const currentSize = arrayGenerator.getArraySize();
        const newSize = prompt(
            `Enter new array size (${CONFIG.MIN_ARRAY_SIZE}-${CONFIG.MAX_ARRAY_SIZE}):`,
            currentSize
        );

        if (newSize === null) return null; // User cancelled

        const size = parseInt(newSize);
        if (isNaN(size) || size < CONFIG.MIN_ARRAY_SIZE || size > CONFIG.MAX_ARRAY_SIZE) {
            alert(`Please enter a valid number between ${CONFIG.MIN_ARRAY_SIZE} and ${CONFIG.MAX_ARRAY_SIZE}`);
            return null;
        }

        return size;
    }

    /**
     * Calculate delay from speed inputs
     */
    calculateDelay() {
        const speedValues = this.getSpeedValues();
        // Convert width/height to delay (inverse relationship)
        // Higher values = slower animation
        const delay = Math.floor(speedValues.width / 20);
        return Math.max(CONFIG.MIN_DELAY, Math.min(delay, CONFIG.MAX_DELAY));
    }
}

// Create global instance
const controls = new Controls();
