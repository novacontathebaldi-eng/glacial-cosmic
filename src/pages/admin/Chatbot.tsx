import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function AdminChatbot() {
    const [memories, setMemories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMemories();
    }, []);

    const fetchMemories = async () => {
        try {
            const { data, error } = await supabase
                .from('chatbot_memories')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setMemories(data || []);
        } catch (error) {
            console.error('Error fetching memories:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading memories...</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Chatbot Memories</h1>

            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Key</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Context</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {memories.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">No memories found.</td>
                            </tr>
                        ) : (
                            memories.map((memory) => (
                                <tr key={memory.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{memory.user_id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{memory.key}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{JSON.stringify(memory.value)}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{memory.context}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
