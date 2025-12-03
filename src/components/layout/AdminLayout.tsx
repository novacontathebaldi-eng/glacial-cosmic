import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminLayout() {
    const { signOut, profile } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-zinc-900 text-white hidden md:flex flex-col">
                <div className="p-6 border-b border-zinc-800">
                    <Link to="/" className="text-xl font-bold tracking-tighter">o THEBALDI</Link>
                    <span className="block text-xs text-gray-400 mt-1">Admin Panel</span>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <Link to="/admin/dashboard" className="block px-4 py-2 text-gray-300 hover:bg-zinc-800 hover:text-white rounded-lg">Dashboard</Link>
                    <Link to="/admin/clients" className="block px-4 py-2 text-gray-300 hover:bg-zinc-800 hover:text-white rounded-lg">Clients</Link>
                    <Link to="/admin/projects" className="block px-4 py-2 text-gray-300 hover:bg-zinc-800 hover:text-white rounded-lg">Projects</Link>
                    <Link to="/admin/files" className="block px-4 py-2 text-gray-300 hover:bg-zinc-800 hover:text-white rounded-lg">Files</Link>
                    <Link to="/admin/blog" className="block px-4 py-2 text-gray-300 hover:bg-zinc-800 hover:text-white rounded-lg">Blog</Link>
                    <Link to="/admin/meetings" className="block px-4 py-2 text-gray-300 hover:bg-zinc-800 hover:text-white rounded-lg">Meetings</Link>
                    <Link to="/admin/chatbot" className="block px-4 py-2 text-gray-300 hover:bg-zinc-800 hover:text-white rounded-lg">Chatbot AI</Link>
                    <Link to="/admin/settings" className="block px-4 py-2 text-gray-300 hover:bg-zinc-800 hover:text-white rounded-lg">Settings</Link>
                </nav>

                <div className="p-4 border-t border-zinc-800">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-zinc-700 rounded-full flex items-center justify-center text-sm font-bold">
                            {profile?.full_name?.[0] || 'A'}
                        </div>
                        <div className="text-sm">
                            <p className="font-medium">{profile?.full_name || 'Admin'}</p>
                            <p className="text-gray-500 text-xs truncate w-32">{profile?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="w-full px-4 py-2 text-sm text-red-400 hover:bg-red-900/20 rounded-lg text-left"
                    >
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 md:hidden">
                    <Link to="/" className="font-bold">o THEBALDI</Link>
                    <button className="text-gray-500">Menu</button>
                </header>
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
