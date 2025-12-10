import { cafeNo1Data } from '../data/cafeData';

export const AP_REGEN_MINUTES = 6;
export const AP_REGEN_PER_DAY = (24 * 60) / AP_REGEN_MINUTES; // 240
export const DAILY_MISSION_AP = 150;
export const WEEKLY_MISSION_AP_TOTAL = 350;
export const WEEKLY_MISSION_AP_DAILY = WEEKLY_MISSION_AP_TOTAL / 7; // 50
export const CLUB_CHECKIN_AP = 10;

export const DAILY_BASE_AP = AP_REGEN_PER_DAY + DAILY_MISSION_AP + WEEKLY_MISSION_AP_DAILY + CLUB_CHECKIN_AP; // 450
export const PVP_REFRESH_AP = 90;
export const PYRO_REFRESH_AP = 120;

export const calculateDailyAp = (cafeRank, pvpRefreshes, pyroRefreshes) => {
    const cafeInfo = cafeNo1Data.find(d => d.rank === cafeRank) || cafeNo1Data[0];
    const cafeAp = cafeInfo.apProduction * 24;

    const pvpAp = (Math.max(0, Math.min(4, pvpRefreshes))) * PVP_REFRESH_AP;
    const pyroAp = Math.max(0, pyroRefreshes) * PYRO_REFRESH_AP;

    // Use a slightly rounded value for total if desired, but keeping precision for now
    // Display logic might want to round it.
    // Let's round the cafeAp to 2 decimals for the breakdown to look nice
    const cafeApRounded = Math.round(cafeAp * 100) / 100;

    // Total should also probably be rounded to avoid 450.00000001
    const total = Math.round((DAILY_BASE_AP + cafeApRounded + pvpAp + pyroAp) * 100) / 100;

    return {
        total,
        breakdown: {
            base: DAILY_BASE_AP,
            cafe: cafeApRounded,
            pvp: pvpAp,
            pyro: pyroAp
        }
    };
};

// Costs based on pyro-refresh.csv
// 1-3: 30, 4-6: 60, 7-9: 100, 10-12: 150, 13-15: 200, 16-20: 300
const PYRO_COSTS = [
    ...Array(3).fill(30),
    ...Array(3).fill(60),
    ...Array(3).fill(100),
    ...Array(3).fill(150),
    ...Array(3).fill(200),
    ...Array(5).fill(300)
];

export const calculateDailyPyroCost = (refreshes) => {
    let cost = 0;
    const count = Math.min(refreshes, PYRO_COSTS.length);
    for (let i = 0; i < count; i++) {
        cost += PYRO_COSTS[i];
    }
    return cost;
};

export const calculateDailyPvpCost = (refreshes) => {
    const COIN_COST_30_AP = 15;
    const COIN_COST_60_AP = 30;
    const SET_COST = COIN_COST_30_AP + COIN_COST_60_AP;
    const REFRESH_COST = 10;

    if (refreshes <= 0) return 0;

    // Formula: (Set Cost * count) + (Refresh Cost * (count - 1))
    // 1st set doesn't need refresh.

    return (SET_COST * refreshes) + (REFRESH_COST * (refreshes - 1));
};

export const calculateTimeNeeded = (totalApNeeded, dailyAp) => {
    if (dailyAp <= 0) return { days: Infinity, months: Infinity, estimatedDate: 'Never' };

    const days = Math.ceil(totalApNeeded / dailyAp);
    const months = parseFloat((days / 30).toFixed(1)); // Approx 30 days/month

    const date = new Date();
    date.setDate(date.getDate() + days);
    const estimatedDate = date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return { days, months, estimatedDate };
};
