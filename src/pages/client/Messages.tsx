import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

export default function ClientMessages() {
    const { user } = useAuth();
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchMessages();
        }
    }, [user]);

    const fetchMessages = async () => {
        try {
            const { data, error } = await supabase
                .from('messages')
                .select('*')
                .eq('user_id', user?.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setMessages(data || []);
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading messages...</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Messages & Recados</h1>

            <div className="space-y-4">
                {messages.length === 0 ? (
                    <p className="text-gray-500">No messages found.</p>
                ) : (
                    messages.map(msg => (
                        <div key={msg.id} className="bg-white p-4 rounded-lg border border-gray-200">
                            <div className="flex justify-between mb-2">
                                <span className="font-bold capitalize">{msg.type}</span>
                                <span className="text-xs text-gray-500">{new Date(msg.created_at).toLocaleString()}</span>
                            </div>
                            <p className="text-gray-700">{msg.content}</p>
                            <div className="mt-2 text-xs text-gray-400 uppercase">{msg.status}</div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
