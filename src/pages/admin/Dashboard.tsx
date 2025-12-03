import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        clients: 0,
        projects: 0,
        quotes: 0,
        meetings: 0
    });

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        const { count: clients } = await supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'client');
        const { count: projects } = await supabase.from('projects').select('*', { count: 'exact', head: true });
        const { count: quotes } = await supabase.from('quotes').select('*', { count: 'exact', head: true }).eq('status', 'submitted');
        const { count: meetings } = await supabase.from('meetings').select('*', { count: 'exact', head: true }).eq('status', 'pending');

        setStats({
            clients: clients || 0,
            projects: projects || 0,
            quotes: quotes || 0,
            meetings: meetings || 0
        });
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h3 className="text-gray-500 text-sm font-medium uppercase">Total Clients</h3>
                    <p className="text-3xl font-bold mt-2">{stats.clients}</p>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h3 className="text-gray-500 text-sm font-medium uppercase">Active Projects</h3>
                    <p className="text-3xl font-bold mt-2">{stats.projects}</p>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h3 className="text-gray-500 text-sm font-medium uppercase">New Quotes</h3>
                    <p className="text-3xl font-bold mt-2">{stats.quotes}</p>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h3 className="text-gray-500 text-sm font-medium uppercase">Pending Meetings</h3>
                    <p className="text-3xl font-bold mt-2">{stats.meetings}</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h2 className="text-lg font-bold mb-4">Recent Activity</h2>
                    <p className="text-gray-500">No recent activity.</p>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h2 className="text-lg font-bold mb-4">System Status</h2>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Database</span>
                            <span className="text-green-600 font-medium">Connected</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Storage</span>
                            <span className="text-green-600 font-medium">Operational</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Auth</span>
                            <span className="text-green-600 font-medium">Operational</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
