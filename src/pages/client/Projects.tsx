import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

interface Project {
    id: string;
    title: string;
    status: string;
    description: string;
    start_date: string;
}

export default function ClientProjects() {
    const { user } = useAuth();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchProjects();
        }
    }, [user]);

    const fetchProjects = async () => {
        try {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .eq('client_id', user?.id);

            if (error) throw error;
            setProjects(data || []);
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading projects...</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">My Projects</h1>

            {projects.length === 0 ? (
                <div className="bg-white p-8 rounded-lg border border-gray-200 text-center">
                    <p className="text-gray-500">No projects found.</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {projects.map(project => (
                        <div key={project.id} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-xl font-bold">{project.title}</h2>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${project.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                        project.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                                            'bg-yellow-100 text-yellow-800'
                                    }`}>
                                    {project.status.replace('_', ' ')}
                                </span>
                            </div>
                            <p className="text-gray-600 mb-4">{project.description}</p>
                            <div className="text-sm text-gray-500">
                                Started: {new Date(project.start_date).toLocaleDateString()}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
