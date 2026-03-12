import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('');

    const fetchRecords = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/records');
            setRecords(response.data.data);
        } catch (err) {
            setError('Failed to fetch inference records');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecords();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Delete this prediction record?')) {
            try {
                await axios.delete(`http://localhost:5000/api/records/${id}`);
                setRecords(records.filter(record => record._id !== id));
            } catch (err) {
                alert('Failed to delete record');
            }
        }
    };

    const filteredRecords = records.filter(record =>
        record.recommendedCrop.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="py-8">
            <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
                    <p className="text-slate-500 mt-1">Review and manage historical inference data</p>
                </div>

                <div className="relative w-full sm:w-64">
                    <input
                        type="text"
                        placeholder="Filter by crop..."
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                    <svg className="w-5 h-5 text-slate-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>

            <div className="bg-white shadow-xl rounded-2xl border border-slate-100 overflow-hidden">
                {loading ? (
                    <div className="p-12 pl-2 flex justify-center items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
                    </div>
                ) : error ? (
                    <div className="p-8 text-center text-red-500 bg-red-50">{error}</div>
                ) : records.length === 0 ? (
                    <div className="p-16 text-center">
                        <div className="text-5xl mb-4">📭</div>
                        <h3 className="text-xl font-bold text-slate-700">No Inferences Found</h3>
                        <p className="text-slate-500 mt-2">Generate a recommendation first to populate this view.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Date / Time</th>
                                    <th className="px-6 py-4 font-semibold">Sensor Input</th>
                                    <th className="px-6 py-4 font-semibold text-green-700 bg-green-50/50">Recommended Crop</th>
                                    <th className="px-6 py-4 font-semibold text-blue-700 bg-blue-50/50">Est. Yield</th>
                                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-slate-700">
                                {filteredRecords.map((record) => (
                                    <tr key={record._id} className="hover:bg-slate-50/80 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {new Date(record.createdAt).toLocaleDateString()}
                                            <div className="text-xs text-slate-400">{new Date(record.createdAt).toLocaleTimeString()}</div>
                                        </td>
                                        <td className="px-6 py-4 min-w-[200px]">
                                            <div className="flex flex-wrap gap-1">
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200" title="Soil pH">pH: {record.soil_pH}</span>
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200" title="Nitrogen">N: {record.nitrogen}</span>
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200" title="Phosphorus">P: {record.phosphorus}</span>
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200" title="Potassium">K: {record.potassium}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-green-700 bg-green-50/30 whitespace-nowrap">
                                            {record.recommendedCrop}
                                        </td>
                                        <td className="px-6 py-4 font-bold text-blue-700 bg-blue-50/30 whitespace-nowrap">
                                            {record.predictedYield} t/ha
                                        </td>
                                        <td className="px-6 py-4 text-right whitespace-nowrap">
                                            <button
                                                onClick={() => handleDelete(record._id)}
                                                className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                                                title="Delete Inference"
                                            >
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
