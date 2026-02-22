---
title: "Return on Investment Visualizer"
description: "Frontend-only tool comparing long-term outcomes of stocks/funds, rental properties, precious metals, and fixed-income instruments via interactive charts."
url: "https://return-on-investment-visualizer.vercel.app/"
github: ""
tech:
  - "React"
  - "TypeScript"
  - "Vite"
  - "Tailwind CSS"
  - "Recharts"
  - "Vitest"
image: ""
status: "active"
---

ROI Visualizer is a frontend-only investment comparison tool that helps users visualize and compare the long-term performance of different asset classes including:

- **Stocks/Funds**: Equity investments with customizable growth rates
- **Rental Properties**: Real estate with mortgage, rental income, and appreciation
- **Precious Metals**: Gold, silver, and other commodities
- **Fixed-Income Instruments**: Bonds and other fixed-return investments

The tool uses deterministic models (no randomness) to generate interactive charts powered by Recharts, allowing users to compare multiple investment scenarios side-by-side over customizable time periods.

## Key Features

- **Pure Frontend**: No backend required, all calculations run in the browser
- **Strict Interface**: All assets implement a unified `InvestmentAsset` interface with `computeValueOverTime(years): number[]` method
- **Deterministic Models**: Pure functions with zero React dependencies for predictable results
- **Debounced Updates**: Chart updates are debounced (300ms) for smooth performance
- **Comprehensive Validation**: Numeric bounds at the model layer, required-field checks at the UI layer

## Architecture

The app follows a strict separation between model logic and UI components:
- **Models Layer**: Pure TypeScript functions for each asset type with built-in validation
- **Components Layer**: React components for forms, charts, and landing page
- **Hooks**: Custom hooks like `useDebounce` for performance optimization

All investment models are thoroughly tested with Vitest to ensure accuracy and reliability.
