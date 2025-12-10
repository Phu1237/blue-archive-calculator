import { useState, useMemo, useEffect } from 'react';
import { calculateNeededExp } from './utils/calculateExp';
import BonusInfoModal from './components/BonusInfoModal';
import ExpTableModal from './components/ExpTableModal';
import DailyPurchaseModal from './components/DailyPurchaseModal';
import CafeInfoModal from './components/CafeInfoModal';
import { cafeNo1Data } from './data/cafeData';
import { calculateDailyAp, calculateTimeNeeded, calculateDailyPyroCost, calculateDailyPvpCost } from './utils/calculateTime';
import { expData } from './data/expData';
import {
  Calculator,
  Gamepad2,
  Gem,
  Calendar,
  TrendingUp,
  Zap,
  Coffee,
  ShoppingBag,
  Info,
  List
} from 'lucide-react';


const getStoredValue = (key, defaultValue) => {
  const saved = localStorage.getItem(key);
  if (saved !== null) {
    return parseInt(saved, 10);
  }
  return defaultValue;
};

function App() {
  const [currentLevel, setCurrentLevel] = useState(() => getStoredValue('ba_calc_currentLevel', 1));
  const [currentExp, setCurrentExp] = useState(() => getStoredValue('ba_calc_currentExp', 0));
  const [targetLevel, setTargetLevel] = useState(() => getStoredValue('ba_calc_targetLevel', 90));

  const [cafeRank, setCafeRank] = useState(() => getStoredValue('ba_calc_cafeRank', 1));
  const [pvpRefreshes, setPvpRefreshes] = useState(() => getStoredValue('ba_calc_pvpRefreshes', 0));
  const [pyroRefreshes, setPyroRefreshes] = useState(() => getStoredValue('ba_calc_pyroRefreshes', 0));
  const [showBonusInfo, setShowBonusInfo] = useState(false);
  const [showExpTable, setShowExpTable] = useState(false);
  const [showDailyPurchaseModal, setShowDailyPurchaseModal] = useState(false);
  const [showCafeInfoModal, setShowCafeInfoModal] = useState(false);

  useEffect(() => {
    localStorage.setItem('ba_calc_currentLevel', currentLevel);
    localStorage.setItem('ba_calc_currentExp', currentExp);
    localStorage.setItem('ba_calc_targetLevel', targetLevel);
    localStorage.setItem('ba_calc_cafeRank', cafeRank);
    localStorage.setItem('ba_calc_pvpRefreshes', pvpRefreshes);
    localStorage.setItem('ba_calc_pyroRefreshes', pyroRefreshes);
  }, [currentLevel, currentExp, targetLevel, cafeRank, pvpRefreshes, pyroRefreshes]);

  const maxLevel = 90;

  const expToNextLevel = useMemo(() => {
    const levelInfo = expData.find(d => d.level === parseInt(currentLevel));
    return levelInfo ? levelInfo.expToNext : 0;
  }, [currentLevel]);

  const result = useMemo(() => {
    const cLevel = parseInt(currentLevel);
    const tLevel = parseInt(targetLevel);
    const cExp = parseInt(currentExp) || 0;

    if (isNaN(cLevel) || isNaN(tLevel)) return null;

    return calculateNeededExp(cLevel, cExp, tLevel);
  }, [currentLevel, currentExp, targetLevel]);

  const dailyApData = useMemo(() => {
    return calculateDailyAp(parseInt(cafeRank), parseInt(pvpRefreshes), parseInt(pyroRefreshes));
  }, [cafeRank, pvpRefreshes, pyroRefreshes]);

  // dailyApData is now { total, breakdown: {...} }

  const dailyPyroCost = useMemo(() => {
    return calculateDailyPyroCost(parseInt(pyroRefreshes));
  }, [pyroRefreshes]);

  const dailyPvpCost = useMemo(() => {
    return calculateDailyPvpCost(parseInt(pvpRefreshes));
  }, [pvpRefreshes]);

  const timeEstimate = useMemo(() => {
    if (!result) return null;
    return calculateTimeNeeded(result.baseExpNeeded, dailyApData.total);
  }, [result, dailyApData]);

  const handleCurrentLevelChange = (e) => {
    let val = parseInt(e.target.value);
    if (!isNaN(val)) {
      if (val > maxLevel) val = maxLevel;
      if (val < 1) val = 1;
      setCurrentLevel(val);
      const newExpMax = expData.find(d => d.level === val)?.expToNext || 0;
      if (currentExp >= newExpMax) setCurrentExp(0);
    }
  };

  const currentLevelProgress = useMemo(() => {
    if (!expToNextLevel) return 0;
    return Math.min(100, Math.max(0, (currentExp / expToNextLevel) * 100));
  }, [currentExp, expToNextLevel]);

  return (
    <div className="max-w-[1000px] mx-auto p-4 md:p-8 min-h-screen">
      <header className="mb-10 relative flex items-center gap-4">
        <div className="flex items-center gap-3 bg-white py-3 px-6 rounded-full shadow-sm">
          <Calculator className="text-ba-blue-primary" size={28} />
          <h1 className="m-0 text-xl font-extrabold text-ba-text-main tracking-tight">Sensei EXP Calculator</h1>
        </div>
        <div className="hidden"></div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_340px] gap-8 items-start">
        {/* LEFT COLUMN: INPUTS */}
        <div className="flex flex-col gap-6">

          {/* SENSEI DATA CARD */}
          <section className="bg-ba-card-bg backdrop-blur-xl border border-white/50 rounded-lg p-6 shadow-md transition-transform hover:-translate-y-0.5 hover:shadow-lg">
            <h2 className="m-0 mb-6 text-base font-bold text-ba-text-sub uppercase tracking-wider flex items-center gap-2">
              <div className="flex items-center justify-between w-full">
                <span className="flex items-center gap-2"><TrendingUp size={20} /> Sensei Status</span>
                <div className="flex gap-2">
                  <button
                    className="bg-transparent border border-ba-border text-ba-text-sub w-7 h-7 rounded flex items-center justify-center cursor-pointer transition-all hover:bg-ba-bg hover:text-ba-blue-primary hover:border-ba-blue-primary"
                    onClick={() => setShowExpTable(true)}
                    title="View EXP Table"
                  >
                    <List size={16} />
                  </button>
                  <button
                    className="bg-transparent border border-ba-border text-ba-text-sub w-7 h-7 rounded flex items-center justify-center cursor-pointer transition-all hover:bg-ba-bg hover:text-ba-blue-primary hover:border-ba-blue-primary"
                    onClick={() => setShowBonusInfo(true)}
                    title="View Bonus Rates"
                  >
                    <Info size={16} />
                  </button>
                </div>
              </div>
            </h2>

            <div className="flex flex-col sm:flex-row gap-6 mb-6">
              <label className="flex-1 block cursor-pointer">
                <span className="block text-sm font-semibold text-ba-text-sub mb-2">Current Level</span>
                <input
                  type="number"
                  value={currentLevel}
                  onChange={handleCurrentLevelChange}
                  min="1"
                  max={maxLevel}
                  className="w-full py-3 px-4 rounded-md border-2 border-transparent bg-white text-ba-text-main text-base font-semibold transition-all shadow-sm focus:outline-none focus:border-ba-cyan focus:ring-4 focus:ring-[rgba(0,209,255,0.15)]"
                />
              </label>

              <label className="flex-1 block cursor-pointer">
                <span className="block text-sm font-semibold text-ba-text-sub mb-2">Target Level</span>
                <input
                  type="number"
                  value={targetLevel}
                  onChange={(e) => setTargetLevel(Math.min(maxLevel, Math.max(1, parseInt(e.target.value) || 1)))}
                  min={currentLevel}
                  max={maxLevel}
                  className="w-full py-3 px-4 rounded-md border-2 border-transparent bg-white text-ba-text-main text-base font-semibold transition-all shadow-sm focus:outline-none focus:border-ba-cyan focus:ring-4 focus:ring-[rgba(0,209,255,0.15)]"
                />
              </label>
            </div>

            <label className="block mt-6 cursor-pointer">
              <div className="flex justify-between mb-2">
                <span className="block text-sm font-semibold text-ba-text-sub">Current EXP</span>
                <span className="text-sm font-bold text-ba-blue-primary">{currentExp} / {expToNextLevel}</span>
              </div>
              <div>
                <input
                  type="number"
                  value={currentExp}
                  onChange={(e) => setCurrentExp(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full py-3 px-4 rounded-md border-2 border-transparent bg-white text-ba-text-main text-base font-semibold transition-all shadow-sm focus:outline-none focus:border-ba-cyan focus:ring-4 focus:ring-[rgba(0,209,255,0.15)]"
                  placeholder="0"
                />
              </div>
              <div className="h-1.5 bg-slate-200 rounded-full mt-2 overflow-hidden relative">
                <div className="bg-gradient-to-r from-ba-blue-primary to-ba-cyan h-full rounded-full transition-[width] duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)]" style={{ width: `${currentLevelProgress}%` }}></div>
              </div>
            </label>
          </section>

          {/* AP SETTINGS CARD */}
          <section className="bg-ba-card-bg backdrop-blur-xl border border-white/50 rounded-lg p-6 shadow-md transition-transform hover:-translate-y-0.5 hover:shadow-lg">
            <h2 className="m-0 mb-6 text-base font-bold text-ba-text-sub uppercase tracking-wider flex items-center gap-2">
              <Zap size={20} /> AP Settings
            </h2>

            <div className="mb-6 last:mb-0">
              <label className="mb-2 block cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-ba-text-main"><Coffee size={16} /> Cafe Rank</span>
                  <button
                    className="bg-transparent border border-ba-border text-ba-text-sub w-6 h-6 rounded flex items-center justify-center cursor-pointer transition-all hover:bg-ba-bg hover:text-ba-blue-primary hover:border-ba-blue-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowCafeInfoModal(true);
                    }}
                    title="View Cafe Production"
                  >
                    <Info size={14} />
                  </button>
                </div>
                <select
                  value={cafeRank}
                  onChange={(e) => setCafeRank(parseInt(e.target.value))}
                  className="w-full py-3 px-4 rounded-md border-2 border-transparent bg-white text-ba-text-main text-base font-semibold transition-all shadow-sm focus:outline-none focus:border-ba-cyan focus:ring-4 focus:ring-[rgba(0,209,255,0.15)]"
                >
                  {cafeNo1Data.map((data) => (
                    <option key={data.rank} value={data.rank}>Rank {data.rank}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mb-6 last:mb-0">
              <span className="flex items-center gap-1.5 text-sm font-semibold text-ba-text-main mb-2"><Gamepad2 size={16} /> Tactical Challenge Shop</span>
              <div className="flex bg-slate-200 p-1 rounded-md">
                {[0, 1, 2, 3, 4].map(num => (
                  <button
                    key={num}
                    className={`flex-1 border-none bg-transparent p-2 rounded-sm text-ba-text-sub font-semibold text-sm cursor-pointer transition-all hover:text-ba-text-main ${pvpRefreshes === num ? 'bg-white text-ba-blue-primary shadow-sm' : ''}`}
                    onClick={() => setPvpRefreshes(num)}
                  >
                    {num > 0 ? `${num}x` : 'None'}
                  </button>
                ))}
              </div>
              <div className="text-xs text-slate-400 mt-1.5 ml-0.5">90 AP per purchase</div>
            </div>

            <div className="mb-6 last:mb-0">
              <label className="mb-2 block cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-ba-text-main"><ShoppingBag size={16} /> Daily Purchase</span>
                  <button
                    className="bg-transparent border border-ba-border text-ba-text-sub w-6 h-6 rounded flex items-center justify-center cursor-pointer transition-all hover:bg-ba-bg hover:text-ba-blue-primary hover:border-ba-blue-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowDailyPurchaseModal(true);
                    }}
                    title="View Cost Table"
                  >
                    <Info size={14} />
                  </button>
                </div>
                <select
                  value={pyroRefreshes}
                  onChange={(e) => setPyroRefreshes(parseInt(e.target.value))}
                  className="w-full py-3 px-4 rounded-md border-2 border-transparent bg-white text-ba-text-main text-base font-semibold transition-all shadow-sm focus:outline-none focus:border-ba-cyan focus:ring-4 focus:ring-[rgba(0,209,255,0.15)]"
                >
                  {Array.from({ length: 21 }, (_, i) => (
                    <option key={i} value={i}>{i} times {i > 0 && `(${i * 120} AP)`}</option>
                  ))}
                </select>
              </label>
              <div className="text-xs text-slate-400 mt-1.5 ml-0.5">30~300 Pyroxenes cost scaling</div>
            </div>

          </section>
        </div>

        {/* RIGHT COLUMN: RESULTS */}
        <div className="sticky top-8">

          {/* AP BREAKDOWN */}
          <section className="bg-white border border-[rgba(18,137,244,0.1)] rounded-lg p-6 shadow-md mb-6">
            <h3 className="m-0 mb-4 text-sm text-ba-text-sub text-center">Daily AP Breakdown</h3>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between text-sm text-ba-text-main">
                <span className="text-ba-text-sub">Natural & Missions</span>
                <span className="font-semibold font-mono">{dailyApData.breakdown.base}</span>
              </div>
              <div className="flex justify-between text-sm text-ba-text-main">
                <span className="text-ba-text-sub">Cafe Income</span>
                <span className="font-semibold font-mono">+{dailyApData.breakdown.cafe}</span>
              </div>
              <div className="flex justify-between text-sm text-ba-text-main">
                <span className="text-ba-text-sub">PVP Shop</span>
                <span className="font-semibold font-mono">+{dailyApData.breakdown.pvp}</span>
              </div>
              <div className="flex justify-between text-sm text-ba-text-main">
                <span className="text-ba-text-sub">Daily Purchase</span>
                <span className="font-semibold font-mono">+{dailyApData.breakdown.pyro}</span>
              </div>
              <div className="h-px bg-slate-100 my-1"></div>
              <div className="flex justify-between text-base text-ba-text-main">
                <span className="text-ba-text-sub">Total Daily AP</span>
                <span className="text-ba-blue-primary text-lg font-extrabold font-mono">{dailyApData.total}</span>
              </div>
            </div>

            {dailyPyroCost > 0 && (
              <div className="mt-4 flex items-center justify-center gap-1.5 bg-red-50 text-red-600 text-sm font-semibold p-2 rounded-sm">
                <Gem size={16} /> -{dailyPyroCost} Pyroxenes / day
              </div>
            )}
          </section>

          {/* TIME ESTIMATES */}
          {result && timeEstimate && (
            <section className="bg-gradient-to-br from-ba-blue-primary to-ba-cyan text-white text-center border-none rounded-lg p-6 shadow-md mb-6">
              <div className="mb-6">
                <div className="flex items-center justify-center gap-3 mb-1">
                  <Calendar size={24} />
                  <span className="text-6xl font-extrabold leading-none">{timeEstimate.days}</span>
                  <span className="text-base font-medium opacity-90 self-end mb-2">Days</span>
                </div>
                <div className="text-sm opacity-90">~{timeEstimate.months} Months</div>
                <div className="text-lg font-semibold text-white/90 mt-1">Estimated: {timeEstimate.estimatedDate}</div>
              </div>



              <div className="bg-black/10 p-4 rounded-md text-left">
                <div className="flex justify-between text-sm mb-2 opacity-90 last:mb-0">
                  <span>Base EXP Needed</span>
                  <strong className="opacity-100 text-base">{result.baseExpNeeded.toLocaleString()}</strong>
                </div>
                <div className="flex justify-between text-sm mb-2 opacity-90 last:mb-0">
                  <span>Raw EXP</span>
                  <strong className="opacity-100 text-base">{result.totalExpNeeded.toLocaleString()}</strong>
                </div>
              </div>

              {(dailyPyroCost > 0 || dailyPvpCost > 0) && (
                <>
                  <div className="section-divider"></div>
                  <h4 className="text-xs uppercase tracking-wider text-white/80 m-0 mb-3 mt-4 pt-4 border-t border-white/30">Total Estimated Cost</h4>
                  <div className="bg-black/10 p-4 rounded-md text-left">
                    {dailyPyroCost > 0 && (
                      <div className="flex justify-between text-sm mb-2 opacity-90 last:mb-0">
                        <span>Pyroxenes</span>
                        <strong className="opacity-100 text-base">{(dailyPyroCost * timeEstimate.days).toLocaleString()}</strong>
                      </div>
                    )}
                    {dailyPvpCost > 0 && (
                      <div className="flex justify-between text-sm mb-2 opacity-90 last:mb-0">
                        <span>Tactical Coins</span>
                        <strong className="opacity-100 text-base">{(dailyPvpCost * timeEstimate.days).toLocaleString()}</strong>
                      </div>
                    )}
                  </div>
                </>
              )}

            </section>
          )}

        </div>
      </div>

      {
        showBonusInfo && (
          <BonusInfoModal onClose={() => setShowBonusInfo(false)} />
        )
      }

      {
        showExpTable && (
          <ExpTableModal
            onClose={() => setShowExpTable(false)}
            currentLevel={parseInt(currentLevel)}
            expData={expData}
          />
        )
      }

      {
        showDailyPurchaseModal && (
          <DailyPurchaseModal onClose={() => setShowDailyPurchaseModal(false)} />
        )
      }

      {
        showCafeInfoModal && (
          <CafeInfoModal onClose={() => setShowCafeInfoModal(false)} />
        )
      }
    </div >
  );
}

export default App;
