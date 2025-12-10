# Blue Archive Resource Calculator

A comprehensive tool for Blue Archive players to plan their resource usage, calculate experience points, and estimate time required for leveling up students.

## Features

-   **Experience (EXP) Calculator**: Calculate the precise amount of Activity Reports and AP required to level up students, taking into account current and target levels.
    -   **Bonus Efficiency Rates**: Supports calculating efficiency based on dynamic bonus rates (e.g., +200% for Levels 1-20, +150% for 21-40).
-   **Time Estimation**: Estimates the number of days and months required to reach a target level based on your daily AP income.
-   **AP Income Analysis**: Detailed breakdown of daily AP sources:
    -   Natural Regeneration
    -   Cafe Production
    -   Daily/Weekly Missions
    -   Club Attendance
    -   Tactical Challenge Shop
-   **Cafe Info**: Reference for Cafe AP and Credit production rates.
-   **Daily Purchase Planner**: Calculate costs and AP gains for purchasing AP with Pyroxenes (up to 20 times daily).
-   **Reference Tables**: Built-in modals for EXP requirements and bonus/efficiency info.

## Tech Stack

-   **Framework**: React 19
-   **Build Tool**: Vite
-   **Styling**: Tailwind CSS v4
-   **Icons**: Lucide React

## Setup & Running

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    ```

3.  **Build for Production**:
    ```bash
    npm run build
    ```

## References & Credits

This project utilizes data and logic inspired by various community resources:

-   **Logic & Inspiration**: [Sensei.lol EXP Calculator](https://sensei.lol/expcalc.html) - Used as a reference for AP income calculations and time estimation logic.
-   **Game Data**: Data regarding Cafe production, Experience tables, and Pyroxene refresh costs were sourced from community compilations and the [Blue Archive Wiki](https://bluearchive.wiki/).
-   **Data Files**:
    -   `exp.csv`: Level experience requirements.
    -   `pyro-refresh.csv`: Daily AP purchase costs.
