import React from 'react';

const ResultCard = ({ result, features, onReset }) => {
    // Mock logic to suggest fertilizer based on dominating inputs
    const analyzeFertilizer = () => {
        let suggestion = "Balanced NPK Mix (10-10-10)";
        if (features.nitrogen < 50) suggestion = "High Nitrogen Fertilizer (Urea)";
        else if (features.phosphorus < 40) suggestion = "High Phosphorus (DAP)";
        else if (features.potassium < 40) suggestion = "High Potassium (MOP)";
        return suggestion;
    };

    const getWaterReq = () => {
        if (features.rainfall < 50) return "High irrigation required (+40%)";
        if (features.rainfall < 100) return "Moderate supplemental irrigation";
        return "Adequate natural rainfall based on current data";
    };

    return (
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden transform transition-all animate-fade-in-up max-w-2xl mx-auto">

            {/* Result Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-green-500 p-8 text-white relative overflow-hidden text-center">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-white opacity-10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-emerald-900 opacity-20 rounded-full blur-2xl"></div>

                <h2 className="text-xl font-medium text-emerald-50 mb-2 relative z-10">Optimal Recommendation</h2>
                <div className="text-5xl font-extrabold tracking-tight relative z-10 drop-shadow-md">
                    {result.recommendedCrop}
                </div>
            </div>

            {/* Viable Alternatives Grid (New Feature) */}
            {result.alternatives && result.alternatives.length > 0 && (
                <div className="bg-emerald-800 text-white px-8 py-4 border-b border-emerald-900 shadow-inner">
                    <h4 className="text-sm font-semibold text-emerald-200 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                        Other Viable Crops for Current Conditions
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                        {result.alternatives.map((alt, idx) => (
                            <div key={idx} className="bg-emerald-900/50 rounded-lg p-3 border border-emerald-700/50 flex justify-between items-center group hover:bg-emerald-700/50 transition-colors">
                                <div>
                                    <div className="font-bold text-emerald-50 text-lg">{alt.crop}</div>
                                    <div className="text-xs text-emerald-300">Confidence: {alt.confidence}%</div>
                                </div>
                                <div className="text-right">
                                    <div className="font-mono font-bold text-emerald-400">{alt.yield}</div>
                                    <div className="text-[10px] text-emerald-500 uppercase">t/ha</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Result Metrics Grid */}
            <div className="p-8 pb-4">
                <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2 mb-6 flex items-center gap-2">
                    <span className="text-green-500">📈</span> Yield Prediction
                </h3>

                <div className="flex flex-col sm:flex-row items-center gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                    <div className="w-20 h-20 rounded-full border-4 border-green-500 flex items-center justify-center bg-white shadow-inner flex-shrink-0 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-green-100 h-1/2 bottom-0 w-full transform origin-bottom transition-all duration-1000 group-hover:h-3/4"></div>
                        <span className="relative z-10 text-2xl font-black text-slate-900">{result.predictedYield}</span>
                    </div>
                    <div className="text-center sm:text-left">
                        <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Estimated Output</div>
                        <div className="text-2xl font-black text-slate-800">{result.predictedYield} <span className="text-lg text-slate-500 font-medium">Tons / Hectare</span></div>
                        <p className="text-sm text-slate-500 mt-2">Based on current soil metrics and historical climate averages.</p>
                    </div>
                </div>
            </div>

            {/* Actionable Insights */}
            <div className="px-8 py-4">
                <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2 mb-4 flex items-center gap-2">
                    <span className="text-blue-500">💡</span> Actionable Insights
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                        <h4 className="font-bold text-blue-900 text-sm mb-1">Water Requirement</h4>
                        <p className="text-sm text-blue-700">{getWaterReq()}</p>
                    </div>
                    <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100">
                        <h4 className="font-bold text-amber-900 text-sm mb-1">Fertilizer Suggestion</h4>
                        <p className="text-sm text-amber-700">{analyzeFertilizer()}</p>
                    </div>
                </div>
            </div>

            <div className="p-8 bg-slate-50 border-t border-slate-100 text-center flex flex-col items-center">
                <p className="text-sm text-green-600 font-medium mb-6 bg-green-100 px-4 py-2 rounded-lg inline-flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                    Record saved automatically to Dashboard
                </p>
                <button
                    onClick={onReset}
                    className="w-full sm:w-auto px-8 py-3 bg-slate-800 text-white rounded-xl font-medium hover:bg-slate-700 transition-colors shadow-sm"
                >
                    Calculate Another Field
                </button>
            </div>
        </div>
    );
};

export default ResultCard;
