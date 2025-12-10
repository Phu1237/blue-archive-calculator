import React from 'react';
import { X, ShoppingBag } from 'lucide-react';
import { pyroRefreshData } from '../data/pyroRefreshData';

const DailyPurchaseModal = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[1000] animate-[fadeIn_0.2s_ease-out]" onClick={onClose}>
            <div className="bg-white border border-ba-border rounded-2xl w-[90%] max-w-[600px] p-6 relative shadow-xl animate-[slideUp_0.3s_cubic-bezier(0.16,1,0.3,1)] flex flex-col h-[85vh] md:h-auto md:max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
                <button className="absolute top-4 right-4 bg-transparent border-none text-ba-text-sub cursor-pointer p-2 rounded-full transition-all flex items-center justify-center hover:bg-ba-bg hover:text-ba-text-main" onClick={onClose}>
                    <X size={20} />
                </button>

                <div className="flex items-center gap-4 mb-6">
                    <div className="bg-blue-500/10 text-ba-blue-primary p-3 rounded-xl flex items-center justify-center">
                        <ShoppingBag size={24} />
                    </div>
                    <h3 className="m-0 text-xl font-semibold text-ba-text-main">Daily Purchase Info</h3>
                </div>

                <div className="flex-1 overflow-hidden flex flex-col border border-ba-border rounded-lg">
                    <div className="flex bg-ba-bg border-b border-ba-border text-xs font-semibold uppercase text-ba-text-sub pr-2">
                        <div className="p-3 w-[20%] text-center">Times #</div>
                        <div className="p-3 w-[25%] text-right">Price</div>
                        <div className="p-3 w-[25%] text-right">Total Price</div>
                        <div className="p-3 w-[30%] text-right">Total AP Gained</div>
                    </div>

                    <div className="flex-1 overflow-y-auto overflow-x-hidden">
                        {pyroRefreshData.map((row) => (
                            <div
                                key={row.refill}
                                className="flex border-b border-ba-border text-sm text-ba-text-main transition-colors last:border-b-0 hover:bg-ba-bg/50"
                            >
                                <div className="p-2.5 px-3 flex items-center justify-center w-[20%] font-medium text-ba-text-sub">{row.refill}</div>
                                <div className="p-2.5 px-3 flex items-center justify-end w-[25%]">{row.price}</div>
                                <div className="p-2.5 px-3 flex items-center justify-end w-[25%]">{row.totalPrice}</div>
                                <div className="p-2.5 px-3 flex items-center justify-end w-[30%] font-semibold text-ba-blue-primary">+{row.totalApGained}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DailyPurchaseModal;
