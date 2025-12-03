import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

export default function ClientFiles() {
    const { user } = useAuth();
    const [files, setFiles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchFiles();
        }
    }, [user]);

    const fetchFiles = async () => {
        try {
            // List files from 'client-files' bucket in the user's folder
            const { data, error } = await supabase
                .storage
                .from('client-files')
                .list(user?.id + '/');

            if (error) throw error;
            setFiles(data || []);
        } catch (error) {
            console.error('Error fetching files:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading files...</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">My Files</h1>

            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {files.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">No files shared yet.</td>
                            </tr>
                        ) : (
                            files.map((file, i) => (
                                <tr key={i}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{file.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(file.metadata?.size / 1024).toFixed(2)} KB</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.metadata?.mimetype}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-blue-600 hover:text-blue-900">Download</button>
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
