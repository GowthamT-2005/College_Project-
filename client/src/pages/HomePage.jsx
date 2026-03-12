import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="flex flex-col gap-12 pt-4 pb-12">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-white rounded-3xl shadow-xl border border-slate-100">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-green-50 blur-3xl opacity-60 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-emerald-50 blur-3xl opacity-60 pointer-events-none"></div>

                <div className="relative px-8 py-20 sm:px-16 text-center lg:text-left flex flex-col lg:flex-row items-center gap-12">
                    <div className="lg:w-1/2 flex flex-col items-center lg:items-start space-y-8 text-slate-900">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold shadow-sm">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                            AI-Based Fruits and Vegetables Recommendation & Farm Resource Allocation System
                        </div>
                        <h1 className="text-4xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-500">AI-Based Fruits and Vegetables Recommendation<br />& Farm Resource Allocation System</span>
                        </h1>
                        <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
                            Empower your farming decisions with advanced Machine Learning. Input your soil and climate data to instantly receive highly accurate crop recommendations and forecasted yields.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full justify-center lg:justify-start">
                            <Link to="/recommend" className="inline-flex justify-center items-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-green-600 hover:bg-green-700 hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300">
                                Start Recommendation
                                <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                            </Link>
                            <Link to="/about" className="inline-flex justify-center items-center px-8 py-4 border-2 border-slate-200 text-base font-medium rounded-xl text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all duration-300">
                                Learn How It Works
                            </Link>
                        </div>
                    </div>

                    {/* Hero Visual Display */}
                    <div className="lg:w-1/2 flex justify-center lg:justify-end w-full">
                        <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-green-400 to-emerald-600 p-8 flex items-center justify-center transform hover:scale-105 transition-transform duration-500">
                            <div className="absolute inset-0 bg-white/20 backdrop-blur-sm -skew-y-12 transform origin-top-left -z-10"></div>
                            <div className="glass-panel p-6 rounded-2xl w-full flex flex-col gap-6 transform shadow-2xl bg-white text-slate-800">
                                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                    <div className="font-bold text-slate-700 flex items-center gap-2">
                                        <span className="text-xl">📊</span> Analysis Matrix
                                    </div>
                                    <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">LIVE</span>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                                        <div className="text-sm font-medium text-slate-500">Predicted Yield</div>
                                        <div className="text-lg font-black text-green-600">14.2 t/ha</div>
                                    </div>
                                    <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                                        <div className="text-sm font-medium text-slate-500">Optimal Crop</div>
                                        <div className="text-lg font-black text-emerald-600">Apple</div>
                                    </div>
                                </div>

                                <div className="mt-2 pt-4 border-t border-slate-100 flex gap-4 items-center">
                                    <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center text-xl shadow-inner border border-blue-100">
                                        💧
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <div className="text-xs font-bold text-slate-400 uppercase">Irrigation Status</div>
                                        <div className="text-sm font-bold text-slate-700 border-l-2 border-blue-400 pl-2">Adequate Moisture</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-900">Why choose AgriSmart?</h2>
                    <p className="mt-4 text-slate-500 max-w-xl mx-auto">Our platform combines cutting edge statistical models with an intuitive interface to optimize your agricultural output.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { icon: '🧠', title: 'Pre-Trained AI', desc: 'Utilizes robust ML models trained on vast historical datasets for precision accuracy.' },
                        { icon: '⚡', title: 'Real-Time Inference', desc: 'Get instantaneous recommendations ensuring no delay in your planning cycle.' },
                        { icon: '📊', title: 'Historical Tracking', desc: 'Store and analyze all your past inferences via the built-in admin dashboard.' }
                    ].map((feature, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                            <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center text-3xl mb-6 shadow-inner border border-green-100">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                            <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HomePage;
