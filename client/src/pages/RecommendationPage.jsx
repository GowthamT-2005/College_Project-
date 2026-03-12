import React, { useState } from 'react';
import axios from 'axios';
import ResultCard from '../components/ResultCard';

const RecommendationPage = () => {
    const [formData, setFormData] = useState({
        soil_pH: '', nitrogen: '', phosphorus: '', potassium: '',
        temperature: '', humidity: '', rainfall: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError(null);
    };

    const validateForm = () => {
        for (const key in formData) {
            if (formData[key] === '') return false;
            if (isNaN(formData[key])) return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            setError('Please fill all fields with valid numeric values.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // In a real app, API URL would be in .env
            const response = await axios.post('http://localhost:5000/api/predict', {
                soil_pH: Number(formData.soil_pH),
                nitrogen: Number(formData.nitrogen),
                phosphorus: Number(formData.phosphorus),
                potassium: Number(formData.potassium),
                temperature: Number(formData.temperature),
                humidity: Number(formData.humidity),
                rainfall: Number(formData.rainfall)
            });

            setResult(response.data.data);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to connect to the prediction server. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    if (result) {
        return (
            <div className="py-8 animate-fade-in">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Analysis Complete</h1>
                    <p className="mt-2 text-slate-500 text-lg">Based on your farm's unique profile.</p>
                </div>
                <ResultCard
                    result={result}
                    features={formData}
                    onReset={() => {
                        setResult(null);
                        setFormData({ soil_pH: '', nitrogen: '', phosphorus: '', potassium: '', temperature: '', humidity: '', rainfall: '' });
                    }}
                />
            </div>
        );
    }

    const inputFields = [
        { name: 'nitrogen', label: 'Nitrogen (N)', placeholder: 'e.g. 90', icon: '🍃' },
        { name: 'phosphorus', label: 'Phosphorus (P)', placeholder: 'e.g. 42', icon: '🌾' },
        { name: 'potassium', label: 'Potassium (K)', placeholder: 'e.g. 43', icon: '🍌' },
        { name: 'temperature', label: 'Temperature (°C)', placeholder: 'e.g. 20.8', icon: '🌡️' },
        { name: 'humidity', label: 'Humidity (%)', placeholder: 'e.g. 82.0', icon: '💧' },
        { name: 'soil_pH', label: 'Soil pH', placeholder: 'e.g. 6.5', icon: '🧪' },
        { name: 'rainfall', label: 'Rainfall (mm)', placeholder: 'e.g. 202.9', icon: '🌧️' }
    ];

    return (
        <div className="max-w-3xl mx-auto py-8">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Site Analysis Form</h1>
                <p className="mt-3 text-slate-500 text-lg max-w-2xl mx-auto">
                    Enter the current chemical and geographical metrics of your farm to receive ML-powered crop and yield recommendations.
                </p>
            </div>

            <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-emerald-400 to-green-600"></div>
                <div className="p-8 sm:p-12">

                    {error && (
                        <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg text-red-700 flex items-center gap-3 animate-shake">
                            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {inputFields.map((field) => (
                                <div key={field.name} className="relative group">
                                    <label htmlFor={field.name} className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                        <span className="text-lg opacity-80">{field.icon}</span>
                                        {field.label}
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            step="any"
                                            id={field.name}
                                            name={field.name}
                                            value={formData[field.name]}
                                            onChange={handleChange}
                                            placeholder={field.placeholder}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 group-hover:border-green-300"
                                            required
                                        />
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                                            <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-6 border-t border-slate-100">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg shadow-green-500/30 text-lg font-bold text-white transition-all duration-300 ${loading
                                        ? 'bg-green-400 cursor-not-allowed'
                                        : 'bg-green-600 hover:bg-green-700 hover:-translate-y-1'
                                    }`}
                            >
                                {loading ? (
                                    <span className="flex items-center gap-3">
                                        <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Running Analysis Matrix...
                                    </span>
                                ) : (
                                    'Generate Recommendation'
                                )}
                            </button>
                        </div>

                        <p className="text-center text-xs text-slate-400 mt-4 px-8">
                            By clicking generate, your data will be anonymously processed by our machine learning models and logged for historical accuracy tracking.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RecommendationPage;
