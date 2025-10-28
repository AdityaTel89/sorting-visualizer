# 🎨 Sorting Algorithm Visualizer

An interactive web-based tool to visualize and understand various sorting algorithms in real-time with sound effects, step-by-step navigation, and comprehensive metrics tracking.

## ✨ Features

### 🔢 **Sorting Algorithms**
- **Bubble Sort** - Simple comparison-based algorithm
- **Selection Sort** - Finds minimum and swaps
- **Insertion Sort** - Builds sorted array incrementally
- **Quick Sort** - Divide and conquer with pivot
- **Merge Sort** - Recursive divide and merge
- **Shell Sort** - Optimized insertion sort with gaps

### 🎮 **Playback Controls**
- ⏸️ **Pause/Resume** - Control animation flow (Space key)
- ◀️ **Step Back** - Review previous step with animation (← key)
- ▶️ **Step Forward** - Advance one step with animation (→ key)
- ⏮️ **Skip Back** - Reset to unsorted array
- ⏭️ **Skip Forward** - Jump to fully sorted state

### 📊 **Metrics & Analysis**
- **Comparison Counter** - Tracks element comparisons
- **Swap Counter** - Tracks element swaps/moves
- **Timer** - Measures algorithm execution time
- **Complexity Info** - Displays time/space complexity for each algorithm
- **State History** - Complete step-by-step recording

### 🎵 **Sound Effects**
- Musical beeps during comparisons (pitch varies with values)
- Click sounds during swaps
- Victory melody on completion
- Error buzz on interruption
- Toggle on/off with sound button

### 🎨 **Customization**
- **Array Size** - Adjust from 10 to 100 elements via modal
- **Animation Speed** - Control from 1ms to 200ms
- **Canvas Size** - Custom width and height
- **Dark Mode** - Eye-friendly theme toggle
- **Responsive Design** - Works on all devices

### ⌨️ **Keyboard Shortcuts**
- `Space` - Pause/Resume sorting
- `R` - Randomize array
- `←` - Step backward
- `→` - Step forward
- `Esc` - Close modal

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No external dependencies or installations required

### Installation

1. **Clone the repository**
git clone https://github.com/yourusername/sorting-visualizer.git
cd sorting-visualizer

2. **Open in browser**
Simply open index.html in your browser


## 🎯 Usage Guide

### Basic Usage

1. **Select an Algorithm** - Click any sorting algorithm button
2. **Watch the Visualization** - Bars animate to show the sorting process
3. **Control Playback** - Use pause, step forward/back buttons
4. **Adjust Settings** - Change speed, size, or theme as needed

### Step-by-Step Navigation

1. **Run any algorithm** and wait for completion
2. **Click Step Back** (or press ←) to review previous steps
3. **Click Step Forward** (or press →) to advance through steps
4. Each step shows the animation of that comparison/swap

### Sound Effects

1. **Click the 🔊 button** to enable/disable sound
2. **Comparison sounds** - Higher pitches for larger values
3. **Swap sounds** - Distinct click for each swap
4. **Completion melody** - Ascending notes when done

### Dark Mode

1. **Click the 🌙 button** to toggle dark mode
2. Preference is saved in localStorage
3. Automatically loads on page refresh

## 🎨 Color Scheme

- **Unsorted** - Blue (`#6495ED`)
- **Comparing** - Red (`#FF0000`)
- **Swapping** - Purple (animated)
- **Pivot** - Gold (`#FFD700`)
- **Sorted** - Green (`#31E20D`)

## 🔧 Configuration

Edit `js/config.js` to customize:

const CONFIG = {
ARRAY_SIZE: 50, // Default array size
MIN_ARRAY_SIZE: 10, // Minimum size
MAX_ARRAY_SIZE: 100, // Maximum size
DEFAULT_DELAY: 50, // Animation speed (ms)
MIN_DELAY: 1, // Fastest speed
MAX_DELAY: 200, // Slowest speed
BAR_GAP: 2, // Gap between bars (px)
// ... color definitions
};


## 📚 Algorithm Complexity

| Algorithm | Best | Average | Worst | Space |
|-----------|------|---------|-------|-------|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) |
| Shell Sort | O(n log n) | O(n^1.3) | O(n²) | O(1) |

## 🌟 Key Features Explained

### State History System
- Records every comparison and swap during sorting
- Allows complete replay of the sorting process
- Step back/forward with animated visualization

### Web Audio API
- Generates sounds programmatically (no external files)
- Dynamic pitch based on element values
- Musical intervals for pleasing sounds

### Modular Architecture
- Separate files for each component
- Easy to add new algorithms
- Clean separation of concerns

## 🐛 Troubleshooting

**Sound not working?**
- Click the sound toggle button to initialize
- Check browser console for errors
- Some browsers require user interaction first

**Animations too fast/slow?**
- Adjust the speed slider
- Recommended: 30-100ms for best visualization

**Step back/forward not working?**
- Only available after algorithm completes
- Make sure sorting finished successfully

**Dark mode not saving?**
- Check if localStorage is enabled
- Clear browser cache if needed


## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@AdityaTel89](https://github.com/AdityaTel89)
- LinkedIn: [aditya-telsinge](https://www.linkedin.com/in/aditya-telsinge/)
- Portfolio: [adityatelsinge.com](https://adityatelsinge.netlify.app/)

## 🙏 Acknowledgments

- Inspired by visualgo.net and algorithm visualization tools
- Web Audio API documentation
- Modern CSS techniques for animations

## 📧 Contact

For questions or suggestions, please open an issue or reach out at adityatelsinge@gmail.com

---

⭐ If you find this project helpful, please consider giving it a star!

Made with ❤️ and JavaScript

