<div align="center">

# ⚡ BinaryNBeyond
### Interactive Number Systems & Digital Logic Engine

An educational, high-precision web platform engineered for Computer Science & Engineering students to master binary calculations, digital logic, and radix conversions with step-by-step textbook traces.

<br/>

[![Tests](https://img.shields.io/badge/Tests-20%2F20_Passing-00ff9d?style=for-the-badge&logo=node.js&logoColor=white)](https://github.com/HyperJay-456)
[![Vanilla Architecture](https://img.shields.io/badge/Stack-Vanilla_JS_%7C_CSS3_%7C_HTML5-00e5ff?style=for-the-badge&logo=javascript&logoColor=black)](https://github.com/HyperJay-456)
[![Execution](https://img.shields.io/badge/Compute-100%25_Client--Side_Offline-blueviolet?style=for-the-badge&logo=googlechrome&logoColor=white)](https://github.com/HyperJay-456)
[![Theme](https://img.shields.io/badge/UI-Antigravity_Glassmorphism-6366f1?style=for-the-badge&logo=firefox-browser&logoColor=white)](https://github.com/HyperJay-456)

</div>

---

> [!IMPORTANT]  
> **Domain Notice & Live Version Disclaimer**  
> The original public domain formerly associated with this project is no longer owned or maintained by our team. Any active website hosted on that old URL does **not** reflect the latest updates, bug fixes, or the Antigravity-inspired glassmorphic redesign.  
> 
> **This repository represents the authentic, updated source code.** To run and experience the complete, latest version with 100% textbook-accurate logic and enhanced UI, please follow the [Quick Start & Local Run](#-quick-start--running-locally) instructions below or host via GitHub Pages.

---

## 🌟 Core Features

### 1. 🔄 Universal Radix & Base Converter
- Instant, bidirectional conversions across **Binary (Base 2)**, **Octal (Base 8)**, **Decimal (Base 10)**, and **Hexadecimal (Base 16)**.
- Fractional and floating-point conversion support with precision truncation.
- Dynamic input validation preventing illegal characters based on the active base.

### 2. 🧮 Textbook-Accurate Binary Arithmetic Engine
- Full support for **Binary Addition**, **Subtraction**, **Multiplication**, and **Division**.
- **Step-by-Step Execution Traces**: Detailed carry-lookahead breakdown, sign-bit propagation, and textbook step visualizations.
- **1's and 2's Complement Computations**: Handles negative numbers, bitwise inversion, and arithmetic overflow detection.

### 3. ⚡ Bitwise Operations Studio
- Visual bit manipulation: `AND (&)`, `OR (|)`, `XOR (^)`, `NOT (~)`, `Left Shift (<<)`, and `Right Shift (>>)`.
- Bit-chip visualization rendering each operand like physical hardware register memory slots.
- Real-time truth table comparisons and mask explanations.

### 4. 🎨 Modern Antigravity Design System
- **Cosmic Obsidian Dark Mode** & **Clean Slate Light Mode** with persistent theme toggle.
- Frosted glassmorphism HUD cards (`backdrop-filter: blur(20px)`), ambient glowing borders, and radiant accent states.
- High-contrast typography optimized for technical clarity using **Plus Jakarta Sans** for UI and **JetBrains Mono** for equations and binary registers.

### 5. 🔒 Zero Latency & Privacy-Preserving
- 100% client-side computation: No server round-trips, zero latency, and fully capable of operating completely offline.

---

## 📁 Repository Structure

```plaintext
BinaryNBeyond/
├── index.html              # Home portal & features landing showcase
├── arithmetic.html         # Binary arithmetic engine (add, sub, mul, div)
├── bitwise.html            # Bitwise logic studio & register visualizer
├── numberConversions.html  # Universal radix converter
├── about.html              # Core architecture, mission & educational principles
├── team.html               # Engineering team profiles & credentials
├── css/
│   ├── style.css           # Global Antigravity design system & tokens
│   ├── about.css           # About page styling & feature cards
│   ├── team.css            # Team grid & contributor cards
│   └── index.css           # Hero section & interactive banners
├── js/
│   ├── script.js           # Navigation bar, footer components & theme engine
│   ├── arithmetic.js       # Arithmetic calculation logic & step tracing
│   ├── bitwise.js          # Bitwise operand processing
│   └── conversion.js       # Radix conversion mathematical algorithms
└── tests/                  # Automated unit test suite (20/20 test suites)
    ├── arithmetic.test.mjs
    ├── bitwise.test.mjs
    └── conversion.test.mjs
```

---

## 🚀 Quick Start & Running Locally

Because BinaryNBeyond is built on standard web standards with zero compilation overhead, getting it running takes seconds:

### Prerequisites
- Any modern web browser (Google Chrome, Firefox, Edge, Brave, Safari).
- *(Optional)* [Node.js](https://nodejs.org/) if you want to run the automated test suite or serve via a local HTTP server.

### 1. Clone the Repository
```bash
git clone https://github.com/HyperJay-456/BinaryNBeyond.git
cd BinaryNBeyond
```

### 2. Run in Browser

**Option A: Direct Open (Easiest)**  
Simply double-click `index.html` or open it in your favorite browser.

**Option B: Local Development Server**  
Using Node's lightweight serve utility:
```bash
npx serve . -l 3000
```
Then navigate to: `http://localhost:3000`

---

## 🧪 Automated Testing

BinaryNBeyond contains a comprehensive unit test suite validating radix conversions, 2's complement edge cases, and bitwise carry handling.

To run the automated tests via Node's native test runner:

```bash
node --test tests/*.test.mjs
```

**Test Coverage:**
- ✅ Binary Arithmetic (Addition, Subtraction, Multiplication, Division)
- ✅ Negative Number 2's Complement Tracing
- ✅ Radix Base Conversions (Arbitrary base, hex, octal, decimal)
- ✅ Bitwise Logic Masks & Shift Operations
- **Pass Rate:** 20/20 test suites passed (100%)

---

## 👥 Engineering Team & Credits

| Contributor | Role | Focus Areas |
| :--- | :--- | :--- |
| **Arpit Chalke** | Lead Architect & Engine Developer | Core Algorithms, Base Conversion Logic, Mathematical Engine |
| **Jay Thakur** | Core Systems & UI Engineer | Antigravity Design System, Interactive Traces, Test Suites & Frontend Architecture |
| **Shreekant Nannaware** | Marketing & Growth Strategist | Documentation, Pedagogical Structure, User Experience & Outreach |

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use, modify, and build upon it for educational and open-source purposes.
