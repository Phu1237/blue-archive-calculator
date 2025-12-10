import React, { useState, useMemo, useEffect, useRef } from 'react';
import { X, List, ChevronUp } from 'lucide-react';

const ExpTableModal = ({ onClose, currentLevel, expData }) => {
    const [showAll, setShowAll] = useState(false);
    const scrollRef = useRef(null);

    // Filter data based on showAll state
    const displayedData = useMemo(() => {
        if (showAll) {
            return expData;
        }
        // Show from current level to max
        return expData.filter(d => d.level >= currentLevel);
    }, [expData, currentLevel, showAll]);

    // Handle "Show Previous" click
    const handleShowMore = () => {
        setShowAll(true);
    };

    // Scroll to current level when showing all, or on mount if already showing subset?
    // Actually, if we just showed "previous levels", user probably wants to see them.
    // But if we first open, we might want to ensure we see the top.

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[1000] animate-[fadeIn_0.2s_ease-out]" onClick={onClose}>
            <div className="bg-white border border-ba-border rounded-2xl w-[90%] max-w-[500px] p-6 relative shadow-xl animate-[slideUp_0.3s_cubic-bezier(0.16,1,0.3,1)] flex flex-col h-[85vh]" onClick={(e) => e.stopPropagation()}>
                <button className="absolute top-4 right-4 bg-transparent border-none text-ba-text-sub cursor-pointer p-2 rounded-full transition-all flex items-center justify-center hover:bg-ba-bg hover:text-ba-text-main" onClick={onClose}>
                    <X size={20} />
                </button>

                <div className="flex items-center gap-4 mb-6">
                    <div className="bg-blue-500/10 text-ba-blue-primary p-3 rounded-xl flex items-center justify-center">
                        <List size={24} />
                    </div>
                    <h3 className="m-0 text-xl font-semibold text-ba-text-main">Experience Table</h3>
                </div>

                <div className="flex-1 overflow-hidden flex flex-col">
                    {!showAll && currentLevel > 1 && (
                        <button className="w-full p-3 mb-4 border border-dashed border-ba-border bg-ba-bg text-ba-blue-primary rounded-lg cursor-pointer font-medium flex items-center justify-center gap-2 transition-all shrink-0 hover:bg-ba-blue-primary/5 hover:border-ba-blue-primary" onClick={handleShowMore}>
                            <ChevronUp size={16} />
                            Show Previous Levels ({1} - {currentLevel - 1})
                        </button>
                    )}

                    <div className="flex-1 flex flex-col overflow-hidden border border-ba-border rounded-lg">
                        <div className="flex bg-ba-bg border-b border-ba-border text-xs font-semibold uppercase text-ba-text-sub pr-2">
                            <div className="p-3 w-1/4">Level</div>
                            <div className="p-3 w-[35%]">Next Level EXP</div>
                            <div className="p-3 w-[40%]">Total EXP</div>
                        </div>

                        <div className="flex-1 overflow-y-auto overflow-x-hidden" ref={scrollRef}>
                            {displayedData.map((row) => (
                                <div
                                    key={row.level}
                                    className={`flex border-b border-ba-border text-sm text-ba-text-main transition-colors last:border-b-0 ${row.level === currentLevel ? 'bg-ba-blue-primary/10' : ''}`}
                                >
                                    <div className={`p-2.5 px-4 flex items-center w-1/4 ${row.level === currentLevel ? 'text-ba-blue-primary font-semibold' : ''}`}>Lv. {row.level}</div>
                                    <div className={`p-2.5 px-4 flex items-center w-[35%] ${row.level === currentLevel ? 'text-ba-blue-primary font-semibold' : ''}`}>{row.expToNext.toLocaleString()}</div>
                                    <div className={`p-2.5 px-4 flex items-center w-[40%] ${row.level === currentLevel ? 'text-ba-blue-primary font-semibold' : ''}`}>{row.totalExp.toLocaleString()}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpTableModal;
