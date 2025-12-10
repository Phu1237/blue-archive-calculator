import { expData } from '../data/expData.js';

export const calculateNeededExp = (currentLevel, currentExp, targetLevel) => {
    if (currentLevel >= targetLevel) {
        return {
            totalExpNeeded: 0,
            baseExpNeeded: 0,
        };
    }

    let totalExpNeeded = 0;
    let baseExpNeeded = 0;

    // We iterate level by level
    for (let lvl = currentLevel; lvl < targetLevel; lvl++) {
        const levelData = expData.find((d) => d.level === lvl);
        if (!levelData) continue; // Should not happen if data is complete

        let expForThisLevel = levelData.expToNext;

        // If it's the first level we are calculating, subtract current progress
        if (lvl === currentLevel) {
            expForThisLevel = Math.max(0, expForThisLevel - currentExp);
        }

        totalExpNeeded += expForThisLevel;

        // Apply Bonus Multiplier
        // Level 1~20: +200% (3x)
        // Level 21~40: +150% (2.5x)
        // Level 41~60: +100% (2x)
        // Level 61~70: +50% (1.5x)
        // Level 71+: +0% (1x)

        let multiplier = 1;
        if (lvl < 21) {
            multiplier = 3;
        } else if (lvl < 41) {
            multiplier = 2.5;
        } else if (lvl < 61) {
            multiplier = 2;
        } else if (lvl < 71) {
            multiplier = 1.5;
        } else {
            multiplier = 1;
        }

        baseExpNeeded += expForThisLevel / multiplier;
    }

    return {
        totalExpNeeded,
        baseExpNeeded: Math.ceil(baseExpNeeded), // Round up to nearest integer
    };
};
