import React from 'react';

const AboutPage = () => {
    return (
        <div className="max-w-4xl mx-auto py-8">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">

                {/* Header */}
                <div className="bg-gradient-to-r from-emerald-600 to-green-500 px-8 py-12 text-white">
                    <h1 className="text-4xl font-extrabold mb-4">About the Project</h1>
                    <p className="text-emerald-50 text-lg max-w-2xl">
                        An advanced Machine Learning integration designed to solve modern agricultural resource allocation challenges.
                    </p>
                </div>

                {/* Content */}
                <div className="p-8 space-y-12">

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                            <span className="text-green-500">🎯</span> Problem Statement
                        </h2>
                        <p className="text-slate-600 leading-relaxed text-lg">
                            Modern farming relies heavily on intuition rather than data, leading to suboptimal crop yields and inefficient use of fertilizers and water. The objective of this system is to bridge the gap between complex statistical analysis and accessible agricultural planning.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                            <span className="text-green-500">⚙️</span> System Architecture
                        </h2>
                        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 mt-4">
                            <ul className="space-y-4 text-slate-700">
                                <li className="flex items-start gap-3">
                                    <div className="min-w-6 mt-1 text-green-600 font-bold">01</div>
                                    <div>
                                        <strong className="block text-slate-900">Client-Side Data Collection</strong>
                                        <span className="text-sm text-slate-500">React Frontend capturing 7 localized geographic and chemical features with strict UX validation.</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="min-w-6 mt-1 text-green-600 font-bold">02</div>
                                    <div>
                                        <strong className="block text-slate-900">Decoupled ML Processing</strong>
                                        <span className="text-sm text-slate-500">Node.js spawning isolated child processes to execute the Python `joblib` environment without blocking the main event loop.</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="min-w-6 mt-1 text-green-600 font-bold">03</div>
                                    <div>
                                        <strong className="block text-slate-900">Data Persistence</strong>
                                        <span className="text-sm text-slate-500">MongoDB schemas establishing historical inference tracking for long-term farm analysis.</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                            <span className="text-green-500">📊</span> Dataset & Features
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            The underlying model is trained on precision agriculture datasets containing historical metrics for diverse crop types. We isolate the most deterministic features to reduce user friction while maintaining high prediction confidence:
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                            {['Nitrogen (N)', 'Phosphorus (P)', 'Potassium (K)', 'Temperature', 'Humidity', 'Rainfall', 'Soil pH'].map(feature => (
                                <div key={feature} className="bg-green-50 text-green-800 rounded-lg px-4 py-3 text-center text-sm font-semibold border border-green-100">
                                    {feature}
                                </div>
                            ))}
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default AboutPage;
