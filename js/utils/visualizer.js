/**
 * Visualizer Module
 * Handles DOM manipulation and visual representation of the array
 */

class Visualizer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.bars = [];
        this.animationDelay = CONFIG.DEFAULT_DELAY;
        this.isPaused = false;
    }

    /**
     * Create and render bars based on array values
     */
    renderBars(array) {
        // Clear existing bars
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

            // Calculate bar height proportionally
            const barHeight = (value / maxValue) * (containerHeight - 30);
            bar.style.width = `${barWidth}px`;
            bar.style.height = `${barHeight}px`;
            bar.style.backgroundColor = CONFIG.COLORS.UNSORTED;

            // Add value label
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
     * Swap visual representation of two bars
     */
    async swapBars(index1, index2, array) {
        if (!this.bars[index1] || !this.bars[index2]) return;

        // Highlight bars being swapped
        this.highlightBars([index1, index2], CONFIG.COLORS.SWAPPING);
        await this.sleep(this.animationDelay);

        // Update heights and values
        this.updateBars(array);

        // Reset colors
        this.resetBarColor(index1);
        this.resetBarColor(index2);
    }

    /**
     * Compare two bars visually
     */
    async compareBars(index1, index2) {
        this.highlightBars([index1, index2], CONFIG.COLORS.COMPARING);
        await this.sleep(this.animationDelay);
    }

    /**
     * Highlight pivot element
     */
    highlightPivot(index) {
        if (this.bars[index]) {
            this.bars[index].style.backgroundColor = CONFIG.COLORS.PIVOT;
        }
    }

    /**
     * Sleep/delay function for animations
     */
    sleep(ms) {
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
