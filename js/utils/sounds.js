/**
 * Sound Manager
 * Generates sound effects using Web Audio API
 */

class SoundManager {
    constructor() {
        this.audioContext = null;
        this.enabled = true;
        this.volume = 0.3; // 30% volume
        
        // Initialize on user interaction (required by browsers)
        this.initialized = false;
    }

    /**
     * Initialize audio context (must be called after user interaction)
     */
    init() {
        if (this.initialized) return;
        
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.initialized = true;
            console.log('🔊 Sound enabled');
        } catch (e) {
            console.warn('Web Audio API not supported');
            this.enabled = false;
        }
    }

    /**
     * Play comparison sound
     * Higher pitch for higher values
     */
    playCompare(value1, value2, maxValue = 100) {
        if (!this.enabled || !this.initialized) return;

        const avgValue = (value1 + value2) / 2;
        const frequency = 200 + (avgValue / maxValue) * 600; // 200-800 Hz
        
        this.playTone(frequency, 0.05, 'sine'); // Short beep
    }

    /**
     * Play swap sound
     * Quick click sound
     */
    playSwap(value1, value2, maxValue = 100) {
        if (!this.enabled || !this.initialized) return;

        const avgValue = (value1 + value2) / 2;
        const frequency = 150 + (avgValue / maxValue) * 500; // 150-650 Hz
        
        this.playTone(frequency, 0.08, 'square'); // Click sound
    }

    /**
     * Play completion sound
     * Victory/success jingle
     */
    playComplete() {
        if (!this.enabled || !this.initialized) return;

        // Play ascending notes - victory melody
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        
        notes.forEach((freq, index) => {
            setTimeout(() => {
                this.playTone(freq, 0.15, 'sine');
            }, index * 100);
        });
    }

    /**
     * Play error sound
     */
    playError() {
        if (!this.enabled || !this.initialized) return;

        this.playTone(200, 0.2, 'sawtooth'); // Low buzz
    }

    /**
     * Core tone generation function
     */
    playTone(frequency, duration, waveType = 'sine') {
        if (!this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = waveType;

        // Envelope for smooth sound
        const now = this.audioContext.currentTime;
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(this.volume, now + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);

        oscillator.start(now);
        oscillator.stop(now + duration);
    }

    /**
     * Toggle sound on/off
     */
    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }

    /**
     * Set volume (0.0 to 1.0)
     */
    setVolume(vol) {
        this.volume = Math.max(0, Math.min(1, vol));
    }

    /**
     * Check if sound is enabled
     */
    isEnabled() {
        return this.enabled && this.initialized;
    }
}

// Create global instance
const soundManager = new SoundManager();
