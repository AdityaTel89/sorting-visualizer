/**
 * Array Generator Module
 * Handles array generation, randomization, and state management
 */

class ArrayGenerator {
    constructor() {
        this.array = [];
        this.arraySize = CONFIG.ARRAY_SIZE;
        this.initialize();
    }

    /**
     * Initialize the array with random values
     */
    initialize() {
        this.array = [];
        for (let i = 0; i < this.arraySize; i++) {
            const value = this.getRandomValue(CONFIG.MIN_VALUE, CONFIG.MAX_VALUE);
            this.array.push(value);
        }
    }

    /**
     * Generate a random integer between min and max (inclusive)
     */
    getRandomValue(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Randomize the current array
     */
    randomize() {
        this.initialize();
        return this.array;
    }

    /**
     * Get the current array
     */
    getArray() {
        return [...this.array];
    }

    /**
     * Set array size and regenerate
     */
    setArraySize(size) {
        if (size < CONFIG.MIN_ARRAY_SIZE || size > CONFIG.MAX_ARRAY_SIZE) {
            console.warn(`Array size must be between ${CONFIG.MIN_ARRAY_SIZE} and ${CONFIG.MAX_ARRAY_SIZE}`);
            return false;
        }
        this.arraySize = size;
        this.initialize();
        return true;
    }

    /**
     * Get current array size
     */
    getArraySize() {
        return this.arraySize;
    }

    /**
     * Update array with new values
     */
    updateArray(newArray) {
        this.array = [...newArray];
    }

    /**
     * Swap two elements in the array
     */
    swap(index1, index2) {
        if (index1 < 0 || index1 >= this.array.length || 
            index2 < 0 || index2 >= this.array.length) {
            console.error('Invalid swap indices');
            return false;
        }
        
        const temp = this.array[index1];
        this.array[index1] = this.array[index2];
        this.array[index2] = temp;
        return true;
    }

    /**
     * Get value at specific index
     */
    getValue(index) {
        if (index < 0 || index >= this.array.length) {
            console.error('Index out of bounds');
            return null;
        }
        return this.array[index];
    }

    /**
     * Set value at specific index
     */
    setValue(index, value) {
        if (index < 0 || index >= this.array.length) {
            console.error('Index out of bounds');
            return false;
        }
        this.array[index] = value;
        return true;
    }

    /**
     * Check if array is sorted
     */
    isSorted() {
        for (let i = 0; i < this.array.length - 1; i++) {
            if (this.array[i] > this.array[i + 1]) {
                return false;
            }
        }
        return true;
    }
}

// Create global instance
const arrayGenerator = new ArrayGenerator();
