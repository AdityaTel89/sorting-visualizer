/**
 * Main Application File with All Features Including Sound
 */

let currentAlgorithm = null;
let sortingInProgress = false;

function init() {
    const initialArray = arrayGenerator.getArray();
    visualizer.renderBars(initialArray);
    
    const initialDelay = controls.getCurrentDelay();
    visualizer.setDelay(initialDelay);
    
    setupEventListeners();
    setupModalListeners();
    setupKeyboardShortcuts();
    setupThemeToggle();
    setupSoundToggle();
    setupShortcutsPanel();
    
    console.log('✅ Sorting Algorithm Visualizer initialized');
    console.log('⌨️ Keyboard shortcuts enabled');
    console.log('🔊 Sound effects ready (click to enable)');
}

function setupEventListeners() {
    const randomizeBtn = document.getElementById('randomize-btn');
    if (randomizeBtn) {
        randomizeBtn.addEventListener('click', handleRandomize);
    }

    const changeSizeBtn = document.getElementById('change-size-btn');
    if (changeSizeBtn) {
        changeSizeBtn.addEventListener('click', handleChangeSize);
    }

    const pauseBtn = document.getElementById('pause-btn');
    if (pauseBtn) {
        pauseBtn.addEventListener('click', handlePause);
    }

    const skipBackBtn = document.getElementById('skip-back-btn');
    if (skipBackBtn) {
        skipBackBtn.addEventListener('click', handleSkipBack);
    }

    const stepBackBtn = document.getElementById('step-back-btn');
    if (stepBackBtn) {
        stepBackBtn.addEventListener('click', handleStepBack);
    }

    const stepForwardBtn = document.getElementById('step-forward-btn');
    if (stepForwardBtn) {
        stepForwardBtn.addEventListener('click', handleStepForward);
    }

    const skipForwardBtn = document.getElementById('skip-forward-btn');
    if (skipForwardBtn) {
        skipForwardBtn.addEventListener('click', handleSkipForward);
    }

    const changeCanvasBtn = document.getElementById('change-canvas-btn');
    if (changeCanvasBtn) {
        changeCanvasBtn.addEventListener('click', handleChangeCanvas);
    }

    // Speed slider with live display
    const speedSlider = document.getElementById('speed-slider');
    const speedValue = document.getElementById('speed-value');
    if (speedSlider && speedValue) {
        speedSlider.addEventListener('input', () => {
            const delay = parseInt(speedSlider.value);
            speedValue.textContent = `${delay} ms`;
        });
    }

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
        if (btn) {
            const algo = algoButtons[btnId];
            btn.addEventListener('click', () => handleAlgorithm(algo.func, algo.name, algo.key));
        }
    });
}

/**
 * Setup keyboard shortcuts
 */
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ignore if typing in input
        if (e.target.tagName === 'INPUT') return;
        
        switch(e.code) {
            case 'Space':
                e.preventDefault();
                if (controls.getIsSorting()) {
                    handlePause();
                }
                break;
            case 'KeyR':
                if (!controls.getIsSorting()) {
                    handleRandomize();
                }
                break;
            case 'ArrowLeft':
                e.preventDefault();
                handleStepBack();
                break;
            case 'ArrowRight':
                e.preventDefault();
                handleStepForward();
                break;
        }
    });
}

/**
 * Setup theme toggle (Dark Mode)
 */
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        if (themeIcon) themeIcon.textContent = '☀️';
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            
            if (themeIcon) {
                themeIcon.textContent = isDark ? '☀️' : '🌙';
            }
            
            // Save preference
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            
            // Update status
            controls.updateStatus(isDark ? 'Dark mode enabled' : 'Light mode enabled');
        });
    }
}

/**
 * Setup sound toggle
 */
function setupSoundToggle() {
    const soundToggle = document.getElementById('sound-toggle');
    const soundIcon = document.getElementById('sound-icon');
    
    // Check for saved preference
    const savedSound = localStorage.getItem('sound') || 'on';
    if (savedSound === 'off') {
        soundManager.enabled = false;
        if (soundIcon) soundIcon.textContent = '🔇';
    }
    
    if (soundToggle) {
        soundToggle.addEventListener('click', () => {
            // Initialize on first click (required by browsers)
            if (!soundManager.initialized) {
                soundManager.init();
            }
            
            const isEnabled = soundManager.toggle();
            
            if (soundIcon) {
                soundIcon.textContent = isEnabled ? '🔊' : '🔇';
            }
            
            // Save preference
            localStorage.setItem('sound', isEnabled ? 'on' : 'off');
            
            // Update status
            controls.updateStatus(isEnabled ? '🔊 Sound enabled' : '🔇 Sound muted');
            
            // Play test sound if enabled
            if (isEnabled && soundManager.initialized) {
                soundManager.playComplete();
            }
        });
    }
}

/**
 * Setup shortcuts panel toggle
 */
function setupShortcutsPanel() {
    const shortcutsToggle = document.getElementById('shortcuts-toggle');
    const shortcutsPanel = document.getElementById('shortcuts-panel');
    
    if (shortcutsToggle && shortcutsPanel) {
        shortcutsToggle.addEventListener('click', () => {
            shortcutsPanel.classList.toggle('hidden');
        });
    }
}

/**
 * Setup modal event listeners
 */
function setupModalListeners() {
    const modal = document.getElementById('size-modal');
    const closeBtn = document.getElementById('modal-close-btn');
    const cancelBtn = document.getElementById('modal-cancel-btn');
    const applyBtn = document.getElementById('modal-apply-btn');
    const sizeInput = document.getElementById('array-size-input');
    const sizeSlider = document.getElementById('array-size-slider');
    const sizeDisplay = document.getElementById('current-size-display');
    
    const closeModal = () => {
        modal.classList.remove('show');
    };
    
    if (sizeSlider && sizeInput && sizeDisplay) {
        sizeSlider.addEventListener('input', () => {
            const value = sizeSlider.value;
            sizeInput.value = value;
            sizeDisplay.textContent = value;
        });
        
        sizeInput.addEventListener('input', () => {
            const value = parseInt(sizeInput.value);
            if (value >= 10 && value <= 100) {
                sizeSlider.value = value;
                sizeDisplay.textContent = value;
            }
        });
    }
    
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }
    
    if (applyBtn && sizeInput) {
        applyBtn.addEventListener('click', () => {
            const newSize = parseInt(sizeInput.value);
            
            if (isNaN(newSize) || newSize < 10 || newSize > 100) {
                sizeInput.style.borderColor = '#FF0000';
                sizeInput.style.animation = 'shake 0.3s';
                setTimeout(() => {
                    sizeInput.style.borderColor = '';
                    sizeInput.style.animation = '';
                }, 500);
                return;
            }
            
            const success = arrayGenerator.setArraySize(newSize);
            if (success) {
                visualizer.clearHistory();
                const newArray = arrayGenerator.getArray();
                visualizer.renderBars(newArray);
                controls.updateStatus(`Array size: ${newSize} elements`);
                controls.resetCounters();
            }
            
            closeModal();
        });
    }
    
    if (sizeInput && applyBtn) {
        sizeInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') applyBtn.click();
        });
    }
}

function handleRandomize() {
    if (controls.getIsSorting()) {
        alert('Please wait for current sorting to complete');
        return;
    }

    visualizer.clearHistory();
    visualizer.resetAllColors();
    const newArray = arrayGenerator.randomize();
    visualizer.renderBars(newArray);
    controls.updateStatus('Array randomized - Ready to sort');
    controls.clearAlgorithmInfo();
    controls.resetCounters();
}

function handleChangeSize() {
    if (controls.getIsSorting()) {
        alert('Please wait for current sorting to complete');
        return;
    }

    const modal = document.getElementById('size-modal');
    const sizeInput = document.getElementById('array-size-input');
    const sizeSlider = document.getElementById('array-size-slider');
    const sizeDisplay = document.getElementById('current-size-display');
    
    const currentSize = arrayGenerator.getArraySize();
    if (sizeInput) sizeInput.value = currentSize;
    if (sizeSlider) sizeSlider.value = currentSize;
    if (sizeDisplay) sizeDisplay.textContent = currentSize;
    
    if (modal) {
        modal.classList.add('show');
        if (sizeInput) sizeInput.focus();
    }
}

function handlePause() {
    if (!controls.getIsSorting()) {
        controls.updateStatus('No sorting in progress');
        return;
    }

    const isPaused = controls.togglePause();
    
    if (isPaused) {
        controls.updateStatus('⏸️ Paused - Press Space or click Resume');
    } else {
        controls.updateStatus('▶️ Resumed sorting...');
    }
}

function handleSkipBack() {
    if (controls.getIsSorting()) {
        controls.stopSorting();
        controls.enableButtons();
    }
    
    visualizer.clearHistory();
    visualizer.resetAllColors();
    const newArray = arrayGenerator.getArray();
    visualizer.renderBars(newArray);
    controls.updateStatus('⏮️ Reset to beginning');
    controls.resetCounters();
}

/**
 * Handle step back button - UPDATED TO ASYNC WITH ANIMATION
 */
async function handleStepBack() {
    const success = await visualizer.stepBackward();
    
    if (success) {
        const info = visualizer.getStepInfo();
        controls.updateStatus(`◀️ Step ${info.current} of ${info.total}`);
    } else {
        controls.updateStatus('Already at the beginning');
    }
}

/**
 * Handle step forward button - UPDATED TO ASYNC WITH ANIMATION
 */
async function handleStepForward() {
    const success = await visualizer.stepForward();
    
    if (success) {
        const info = visualizer.getStepInfo();
        controls.updateStatus(`▶️ Step ${info.current} of ${info.total}`);
    } else {
        controls.updateStatus('Already at the end');
    }
}

function handleSkipForward() {
    if (controls.getIsSorting()) {
        controls.stopSorting();
        controls.enableButtons();
    }
    
    const array = arrayGenerator.getArray();
    array.sort((a, b) => a - b);
    arrayGenerator.updateArray(array);
    visualizer.renderBars(array);
    visualizer.markAllAsSorted();
    controls.updateStatus('⏭️ Skipped to sorted state');
}

function handleChangeCanvas() {
    if (controls.getIsSorting()) {
        alert('Please wait for current sorting to complete');
        return;
    }

    const widthInput = document.getElementById('speed-width-input');
    const heightInput = document.getElementById('speed-height-input');
    
    if (widthInput && heightInput) {
        const width = parseInt(widthInput.value);
        const height = parseInt(heightInput.value);
        
        const container = document.getElementById('bars-container');
        if (container) {
            container.style.width = `${width}px`;
            container.style.height = `${height}px`;
            
            const currentArray = arrayGenerator.getArray();
            visualizer.renderBars(currentArray);
            
            controls.updateStatus(`Canvas: ${width}x${height}px`);
        }
    }
}

/**
 * Handle algorithm execution - WITH SOUND
 */
async function handleAlgorithm(algorithmFunc, algorithmName, algorithmKey) {
    if (controls.getIsSorting()) {
        alert('Sorting is already in progress');
        return;
    }

    // Initialize sound on first algorithm run (required by browsers)
    if (!soundManager.initialized) {
        soundManager.init();
    }

    visualizer.startRecording();
    visualizer.resetAllColors();
    controls.displayAlgorithmInfo(algorithmKey);
    controls.disableButtons();
    controls.showSortingStatus(algorithmName);
    controls.startTimer();
    controls.resetCounters();

    try {
        await algorithmFunc();
        
        const elapsedTime = controls.stopTimer();
        controls.showCompletionStatus(algorithmName, elapsedTime);
        visualizer.stopRecording();
        
        // Play completion sound
        soundManager.playComplete();
        
        const info = visualizer.getStepInfo();
        console.log(`✅ ${algorithmName} completed`);
        console.log(`⏱️ Time: ${controls.formatTime(elapsedTime)}`);
        console.log(`📊 Steps: ${info.total}`);
        console.log(`🔄 Comparisons: ${controls.comparisonCount}`);
        console.log(`↔️ Swaps: ${controls.swapCount}`);
    } catch (error) {
        console.error('❌ Error during sorting:', error);
        controls.showError('Sorting interrupted');
        visualizer.stopRecording();
        
        // Play error sound
        soundManager.playError();
    } finally {
        controls.enableButtons();
    }
}

document.addEventListener('DOMContentLoaded', init);
