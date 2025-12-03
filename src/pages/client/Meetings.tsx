import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

export default function ClientMeetings() {
    const { user } = useAuth();
    const [meetings, setMeetings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchMeetings();
        }
    }, [user]);

    const fetchMeetings = async () => {
        try {
            const { data, error } = await supabase
                .from('meetings')
                .select('*')
                .eq('user_id', user?.id)
                .order('scheduled_at', { ascending: true });

            if (error) throw error;
            setMeetings(data || []);
        } catch (error) {
            console.error('Error fetching meetings:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading meetings...</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">My Meetings</h1>

            <div className="grid gap-4">
                {meetings.length === 0 ? (
                    <p className="text-gray-500">No upcoming meetings.</p>
                ) : (
                    meetings.map(meeting => (
                        <div key={meeting.id} className="bg-white p-6 rounded-lg border border-gray-200 flex justify-between items-center">
                            <div>
                                <div className="text-lg font-bold mb-1">
                                    {new Date(meeting.scheduled_at).toLocaleDateString()} at {new Date(meeting.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                                <div className="text-gray-600 capitalize">{meeting.type} Meeting</div>
                                {meeting.location_details && (
                                    <div className="text-sm text-gray-500 mt-1">{meeting.location_details}</div>
                                )}
                            </div>
                            <div>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${meeting.status === 'approved' ? 'bg-green-100 text-green-800' :
                                    meeting.status === 'declined' ? 'bg-red-100 text-red-800' :
                                        'bg-yellow-100 text-yellow-800'
                                    }`}>
                                    {meeting.status}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
