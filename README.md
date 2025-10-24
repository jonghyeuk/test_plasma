# 반도체 공정 플라즈마 시뮬레이터 (Semiconductor Plasma Process Simulator)

An interactive educational tool for learning semiconductor plasma processes, including DC and RF plasma principles, frequency effects, Debye length, and electron temperature.

## 🎯 Features

### 1. DC 플라즈마 기본 원리 (DC Plasma Fundamentals)
- Interactive 3-step animation showing ion movement, secondary electron emission, and ionization
- Comparison between "Without Plasma" and "With Plasma" states
- Detailed explanation of Sheath formation mechanism
- Plasma Potential vs Floating Potential visualization

### 2. RF 플라즈마 원리 (RF Plasma Principles)
- Real-time RF waveform visualization (13.56 MHz)
- Synchronized Sheath Potential animation
- Comparison between equal and unequal electrode area ratios
- Interactive play/pause controls

### 3. 주파수 효과 (Frequency Effects)
- Adjustable RF frequency (0.1 - 100 MHz)
- RF power control (50 - 1000 W)
- Electrode area ratio adjustment (1:1 to 10:1)
- Real-time calculation of plasma frequency, Self-bias, ion energy, skin depth, and plasma density

### 4. 드바이렝스 (Debye Length)
- Interactive electron density control (10¹⁰ - 10¹² cm⁻³)
- Electron temperature adjustment (1 - 10 eV)
- Pattern size comparison (10 - 1000 nm)
- Quasi-neutrality condition validation

### 5. 전자 온도 (Electron Temperature)
- Electron temperature control (1 - 15 eV)
- Gas pressure adjustment (10 - 200 mTorr)
- RF power control (50 - 500 W)
- Ionization rate visualization
- Active species density and etch rate calculations

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd test_plasma
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 📦 Build

To create a production build:

```bash
npm run build
```

The optimized files will be in the `build` folder.

## 🛠️ Technology Stack

- **React** 18.2.0 - UI framework
- **Tailwind CSS** - Styling via CDN
- **SVG Animations** - Interactive visualizations
- **React Hooks** - State management (useState, useEffect)

## 📚 Educational Content

This simulator covers:

1. **DC Plasma Formation**
   - Mobility difference between electrons and ions
   - Space Charge region formation
   - Cathode and Anode Sheath
   - Secondary electron emission

2. **RF Plasma Dynamics**
   - 13.56 MHz frequency operation
   - Time-varying Sheath potential
   - Self-bias formation
   - Electrode area ratio effects

3. **Plasma Parameters**
   - Plasma frequency
   - Debye length
   - Electron temperature
   - Ionization rate

4. **Process Control**
   - Frequency effects on uniformity
   - Power effects on density
   - Electrode geometry effects on bias
   - Pattern size vs Debye length

## 🎓 Learning Objectives

- Understand the fundamental difference between DC and RF plasma
- Visualize Sheath formation and evolution
- Learn the importance of electrode area ratio in RF plasma
- Grasp the concept of Debye length and quasi-neutrality
- Comprehend electron temperature effects on plasma chemistry

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📝 License

This project is [MIT](LICENSE) licensed.

## 👨‍💻 Author

Educational tool for semiconductor process engineering students and professionals.

## 🙏 Acknowledgments

- Based on plasma physics principles and semiconductor manufacturing processes
- Educational animations designed for intuitive understanding
- Interactive sliders for hands-on parameter exploration
