import React from 'react';
import { X, TrendingUp, AlertCircle } from 'lucide-react';

const BonusInfoModal = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[1000] animate-[fadeIn_0.2s_ease-out]" onClick={onClose}>
            <div className="bg-white border border-ba-border rounded-2xl w-[90%] max-w-[500px] p-6 relative shadow-xl animate-[slideUp_0.3s_cubic-bezier(0.16,1,0.3,1)]" onClick={(e) => e.stopPropagation()}>
                <button className="absolute top-4 right-4 bg-transparent border-none text-ba-text-sub cursor-pointer p-2 rounded-full transition-all flex items-center justify-center hover:bg-ba-bg hover:text-ba-text-main" onClick={onClose}>
                    <X size={20} />
                </button>

                <div className="flex items-center gap-4 mb-6">
                    <div className="bg-blue-500/10 text-ba-blue-primary p-3 rounded-xl flex items-center justify-center">
                        <TrendingUp size={24} />
                    </div>
                    <h3 className="m-0 text-xl font-semibold text-ba-text-main">Experience Bonus Rates</h3>
                </div>

                <div>
                    <p className="text-ba-text-sub text-base leading-relaxed mb-6">
                        Sensei gains bonus EXP based on their current level. This helps newer players catch up faster!
                    </p>

                    <div className="border border-ba-border rounded-xl overflow-hidden mb-6">
                        <table className="w-full border-collapse text-sm">
                            <thead>
                                <tr>
                                    <th className="bg-ba-bg text-ba-text-sub text-left p-3 font-medium text-xs uppercase tracking-wider">Level Range</th>
                                    <th className="bg-ba-bg text-ba-text-sub text-left p-3 font-medium text-xs uppercase tracking-wider">Bonus</th>
                                    <th className="bg-ba-bg text-ba-text-sub text-left p-3 font-medium text-xs uppercase tracking-wider">Multiplier</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="p-3 border-t border-ba-border text-ba-text-main">Lv. 1 - 20</td>
                                    <td className="p-3 border-t border-ba-border text-emerald-500 font-semibold">+200%</td>
                                    <td className="p-3 border-t border-ba-border text-ba-text-main">3.0x</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border-t border-ba-border text-ba-text-main">Lv. 21 - 40</td>
                                    <td className="p-3 border-t border-ba-border text-emerald-400 font-semibold">+150%</td>
                                    <td className="p-3 border-t border-ba-border text-ba-text-main">2.5x</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border-t border-ba-border text-ba-text-main">Lv. 41 - 60</td>
                                    <td className="p-3 border-t border-ba-border text-blue-400 font-semibold">+100%</td>
                                    <td className="p-3 border-t border-ba-border text-ba-text-main">2.0x</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border-t border-ba-border text-ba-text-main">Lv. 61 - 70</td>
                                    <td className="p-3 border-t border-ba-border text-amber-400 font-semibold">+50%</td>
                                    <td className="p-3 border-t border-ba-border text-ba-text-main">1.5x</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border-t border-ba-border text-ba-text-main">Lv. 71+</td>
                                    <td className="p-3 border-t border-ba-border text-ba-text-sub">0%</td>
                                    <td className="p-3 border-t border-ba-border text-ba-text-main">1.0x</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-ba-text-sub bg-ba-bg p-3 rounded-lg">
                        <AlertCircle size={16} />
                        <span>Bonus applies per 1 EXP gained.</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BonusInfoModal;
