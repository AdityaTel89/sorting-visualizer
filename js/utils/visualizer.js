/**
 * Visualizer Module with State History and Animation Replay
 */

class Visualizer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.bars = [];
        this.animationDelay = CONFIG.DEFAULT_DELAY;
        
        // State history for step back/forward
        this.history = [];
        this.currentStep = -1;
        this.isRecording = false;
    }

    /**
     * Start recording history
     */
    startRecording() {
        this.history = [];
        this.currentStep = -1;
        this.isRecording = true;
        
        // Save initial state
        const initialArray = arrayGenerator.getArray();
        this.recordState(initialArray, 'initial', []);
    }

    /**
     * Stop recording
     */
    stopRecording() {
        this.isRecording = false;
    }

    /**
     * Record a state with indices and action
     */
    recordState(array, action = 'step', indices = []) {
        if (!this.isRecording) return;
        
        const state = {
            array: [...array],
            action: action,
            indices: indices
        };
        
        this.history.push(state);
        this.currentStep = this.history.length - 1;
    }

    /**
     * Step back one state with animation
     */
    async stepBackward() {
        if (this.currentStep > 0) {
            this.currentStep--;
            const state = this.history[this.currentStep];
            
            // Update array
            arrayGenerator.updateArray(state.array);
            this.updateBars(state.array);
            
            // Replay the animation
            await this.replayState(state);
            
            return true;
        }
        return false;
    }

    /**
     * Step forward one state with animation
     */
    async stepForward() {
        if (this.currentStep < this.history.length - 1) {
            this.currentStep++;
            const state = this.history[this.currentStep];
            
            // Update array
            arrayGenerator.updateArray(state.array);
            this.updateBars(state.array);
            
            // Replay the animation
            await this.replayState(state);
            
            return true;
        }
        return false;
    }

    /**
     * Replay the animation for a given state
     */
    async replayState(state) {
        // Reset all colors first
        this.resetAllColors();
        
        // Highlight based on action type
        if (state.action === 'compare' && state.indices.length >= 2) {
            this.highlightBars(state.indices, CONFIG.COLORS.COMPARING);
            await this.sleep(this.animationDelay * 2);
            this.resetAllColors();
        } 
        else if (state.action === 'swap' && state.indices.length >= 2) {
            this.highlightBars(state.indices, CONFIG.COLORS.SWAPPING);
            await this.sleep(this.animationDelay * 2);
            this.resetAllColors();
        }
        else if (state.action === 'pivot' && state.indices.length >= 1) {
            this.highlightBars(state.indices, CONFIG.COLORS.PIVOT);
            await this.sleep(this.animationDelay);
        }
        
        // Update the visual state
        this.updateBars(state.array);
    }

    /**
     * Get current step info
     */
    getStepInfo() {
        return {
            current: this.currentStep + 1,
            total: this.history.length
        };
    }

    /**
     * Clear history
     */
    clearHistory() {
        this.history = [];
        this.currentStep = -1;
        this.isRecording = false;
    }

    /**
     * Render bars based on array values
     */
    renderBars(array) {
        this.container.innerHTML = '';
        this.bars = [];

        const containerWidth = this.container.offsetWidth;
        const containerHeight = this.container.offsetHeight;
        const barWidth = (containerWidth / array.length) - CONFIG.BAR_GAP;
        const maxValue = Math.max(...array);

        array.forEach((value, index) => {
            const bar = document.createElement('div');
            bar.classList.add('bar');
            bar.setAttribute('data-index', index);
            bar.setAttribute('data-value', value);

            const barHeight = (value / maxValue) * (containerHeight - 30);
            bar.style.width = `${barWidth}px`;
            bar.style.height = `${barHeight}px`;
            bar.style.backgroundColor = CONFIG.COLORS.UNSORTED;

            const valueLabel = document.createElement('span');
            valueLabel.classList.add('bar-value');
            valueLabel.textContent = value;
            bar.appendChild(valueLabel);

            this.container.appendChild(bar);
            this.bars.push(bar);
        });
    }

    /**
     * Update bar heights based on new array values
     */
    updateBars(array) {
        const containerHeight = this.container.offsetHeight;
        const maxValue = Math.max(...array);

        this.bars.forEach((bar, index) => {
            const value = array[index];
            const barHeight = (value / maxValue) * (containerHeight - 30);
            bar.style.height = `${barHeight}px`;
            bar.setAttribute('data-value', value);
            bar.querySelector('.bar-value').textContent = value;
        });
    }

    /**
     * Highlight specific bars with a color
     */
    highlightBars(indices, color) {
        indices.forEach(index => {
            if (this.bars[index]) {
                this.bars[index].style.backgroundColor = color;
            }
        });
    }

    /**
     * Reset bar color to unsorted state
     */
    resetBarColor(index) {
        if (this.bars[index]) {
            this.bars[index].style.backgroundColor = CONFIG.COLORS.UNSORTED;
        }
    }

    /**
     * Mark bar as sorted
     */
    markAsSorted(index) {
        if (this.bars[index]) {
            this.bars[index].style.backgroundColor = CONFIG.COLORS.SORTED;
            this.bars[index].classList.add('sorted');
        }
    }

    /**
     * Mark multiple bars as sorted
     */
    markRangeAsSorted(startIndex, endIndex) {
        for (let i = startIndex; i <= endIndex; i++) {
            this.markAsSorted(i);
        }
    }

    /**
     * Mark all bars as sorted
     */
    markAllAsSorted() {
        this.bars.forEach((bar, index) => {
            this.markAsSorted(index);
        });
    }

    /**
     * Swap visual representation of two bars - WITH SOUND
     */
    async swapBars(index1, index2, array) {
        if (!this.bars[index1] || !this.bars[index2]) return;

        // Increment swap counter
        controls.incrementSwaps();
        
        this.highlightBars([index1, index2], CONFIG.COLORS.SWAPPING);
        
        // Play swap sound with pitch based on values
        const maxValue = Math.max(...array);
        soundManager.playSwap(array[index1], array[index2], maxValue);
        
        await this.sleep(this.animationDelay);

        this.updateBars(array);
        
        // Record state after swap with indices
        this.recordState(array, 'swap', [index1, index2]);

        this.resetBarColor(index1);
        this.resetBarColor(index2);
    }

    /**
     * Compare two bars visually - WITH SOUND
     */
    async compareBars(index1, index2) {
        // Increment comparison counter
        controls.incrementComparisons();
        
        this.highlightBars([index1, index2], CONFIG.COLORS.COMPARING);
        
        // Record state during comparison with indices
        const array = arrayGenerator.getArray();
        this.recordState(array, 'compare', [index1, index2]);
        
        // Play comparison sound with pitch based on values
        const maxValue = Math.max(...array);
        soundManager.playCompare(array[index1], array[index2], maxValue);
        
        await this.sleep(this.animationDelay);
    }

    /**
     * Highlight pivot element
     */
    highlightPivot(index) {
        if (this.bars[index]) {
            this.bars[index].style.backgroundColor = CONFIG.COLORS.PIVOT;
            
            // Record pivot state
            const array = arrayGenerator.getArray();
            this.recordState(array, 'pivot', [index]);
        }
    }

    /**
     * Sleep/delay function for animations with pause support
     */
    async sleep(ms) {
        await controls.checkPause();
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Set animation delay
     */
    setDelay(delay) {
        this.animationDelay = Math.max(CONFIG.MIN_DELAY, Math.min(delay, CONFIG.MAX_DELAY));
    }

    /**
     * Get current delay
     */
    getDelay() {
        return this.animationDelay;
    }

    /**
     * Reset all bars to unsorted color
     */
    resetAllColors() {
        this.bars.forEach(bar => {
            bar.style.backgroundColor = CONFIG.COLORS.UNSORTED;
            bar.classList.remove('sorted');
        });
    }

    /**
     * Get bar element by index
     */
    getBar(index) {
        return this.bars[index];
    }

    /**
     * Get all bars
     */
    getAllBars() {
        return this.bars;
    }
}

// Create global instance
const visualizer = new Visualizer('bars-container');
