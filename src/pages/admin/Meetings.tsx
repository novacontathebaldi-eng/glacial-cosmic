import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function AdminMeetings() {
    const [meetings, setMeetings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMeetings();
    }, []);

    const fetchMeetings = async () => {
        try {
            const { data, error } = await supabase
                .from('meetings')
                .select('*, user:user_id(full_name, email)')
                .order('scheduled_at', { ascending: true });

            if (error) throw error;
            setMeetings(data || []);
        } catch (error) {
            console.error('Error fetching meetings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (id: string, status: string) => {
        try {
            const { error } = await supabase
                .from('meetings')
                .update({ status })
                .eq('id', id);

            if (error) throw error;
            fetchMeetings();
        } catch (error) {
            console.error('Error updating meeting:', error);
        }
    };

    if (loading) return <div>Loading meetings...</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Meetings Management</h1>

            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {meetings.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">No meetings found.</td>
                            </tr>
                        ) : (
                            meetings.map((meeting) => (
                                <tr key={meeting.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {new Date(meeting.scheduled_at).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{meeting.user?.full_name || 'Unknown'}</div>
                                        <div className="text-sm text-gray-500">{meeting.user?.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{meeting.type}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${meeting.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                meeting.status === 'declined' ? 'bg-red-100 text-red-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {meeting.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        {meeting.status === 'pending' && (
                                            <>
                                                <button
                                                    onClick={() => handleStatusChange(meeting.id, 'approved')}
                                                    className="text-green-600 hover:text-green-900 mr-4"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => handleStatusChange(meeting.id, 'declined')}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    Decline
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
