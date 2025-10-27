# 🎨 Sorting Algorithm Visualizer

An interactive web application that visualizes how different sorting algorithms work in real-time. Built with vanilla JavaScript, HTML5, and CSS3.

![Sorting Visualizer Demo](screenshot.png)

## ✨ Features

- **6 Sorting Algorithms**: Bubble, Selection, Insertion, Quick, Merge, and Shell Sort
- **Real-time Visualization**: Watch algorithms sort step-by-step with color-coded states
- **Interactive Controls**: Adjust animation speed and array size
- **Algorithm Information**: View time and space complexity for each algorithm
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **No Dependencies**: Pure vanilla JavaScript

## 🚀 Live Demo

[View Live Demo](https://yourusername.github.io/sorting-visualizer)

## 📸 Screenshots

[Add screenshots here]

## 🛠️ Technologies Used

- HTML5
- CSS3 (Flexbox, Grid, Animations)
- JavaScript (ES6+)
- Async/Await for animations

## 📦 Installation

1. Clone the repository:
git clone https://github.com/yourusername/sorting-visualizer.git

2. Navigate to project directory:
cd sorting-visualizer

3. Open `index.html` in your browser:

On macOS
open index.html

On Linux
xdg-open index.html

On Windows
start index.html

No build process or dependencies required!

## 🎮 Usage

1. **Randomize Array**: Click to generate a new random array
2. **Select Algorithm**: Choose any sorting algorithm button
3. **Watch**: Observe the visualization in real-time
4. **Adjust Speed**: Modify animation speed using the input fields
5. **Change Size**: Adjust the number of elements to sort

## 🎨 Color Coding

- **Blue**: Unsorted elements
- **Red**: Elements being compared
- **Gold**: Pivot element (Quick Sort)
- **Green**: Sorted elements

## 📊 Algorithm Complexity

| Algorithm | Best | Average | Worst | Space |
|-----------|------|---------|-------|-------|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) |
| Shell Sort | O(n log n) | O(n log²n) | O(n²) | O(1) |

## 📁 Project Structure

sorting-visualizer/
├── index.html
├── css/
│ ├── style.css
│ └── responsive.css
├── js/
│ ├── main.js
│ ├── config.js
│ ├── algorithms/
│ │ ├── bubbleSort.js
│ │ ├── selectionSort.js
│ │ ├── insertionSort.js
│ │ ├── quickSort.js
│ │ ├── mergeSort.js
│ │ └── shellSort.js
│ └── utils/
│ ├── arrayGenerator.js
│ ├── visualizer.js
│ └── controls.js
└── docs/
└── README.md

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- Inspired by VisuAlgo and other sorting visualizers
- Algorithm implementations based on standard CS textbooks

## 📞 Contact

Have questions or feedback? Feel free to reach out!

---

⭐ Star this repo if you find it helpful!
