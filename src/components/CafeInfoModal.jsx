import React from 'react';
import { cafeNo1Data } from '../data/cafeData';
import { X } from 'lucide-react';

const CafeInfoModal = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <div
                className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                    <h3 className="text-lg font-bold text-ba-text-main m-0">Cafe AP Production</h3>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full text-ba-text-sub hover:bg-gray-100 hover:text-red-500 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-0 max-h-[70vh] overflow-y-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-ba-text-sub sticky top-0">
                            <tr>
                                <th className="px-6 py-3 font-semibold">Rank</th>
                                <th className="px-6 py-3 font-semibold">AP / Hour</th>
                                <th className="px-6 py-3 font-semibold">Daily AP</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {cafeNo1Data.map((row) => {
                                const dailyAp = Math.round(row.apProduction * 24 * 100) / 100;
                                return (
                                    <tr key={row.rank} className="hover:bg-ba-bg/50 transition-colors">
                                        <td className="px-6 py-3 font-medium text-ba-text-main">
                                            Rank {row.rank}
                                        </td>
                                        <td className="px-6 py-3 text-ba-text-sub">
                                            {row.apProduction}
                                        </td>
                                        <td className="px-6 py-3 font-bold text-ba-blue-primary font-mono">
                                            +{dailyAp}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 bg-gray-50 text-xs text-ba-text-sub border-t border-gray-100">
                    * Calculated as Hourly Rate × 24.
                </div>
            </div>
        </div>
    );
};

export default CafeInfoModal;
