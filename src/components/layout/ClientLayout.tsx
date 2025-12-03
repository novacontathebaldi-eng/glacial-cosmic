
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ClientLayout() {
    const { signOut, profile } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
                <div className="p-6 border-b border-gray-200">
                    <Link to="/" className="text-xl font-bold tracking-tighter">o THEBALDI</Link>
                    <span className="block text-xs text-gray-500 mt-1">Client Area</span>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <Link to="/client/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Dashboard</Link>
                    <Link to="/client/projects" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Projects</Link>
                    <Link to="/client/files" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Files</Link>
                    <Link to="/client/messages" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Messages</Link>
                    <Link to="/client/meetings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Meetings</Link>
                </nav>

                <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-bold">
                            {profile?.full_name?.[0] || 'U'}
                        </div>
                        <div className="text-sm">
                            <p className="font-medium">{profile?.full_name || 'User'}</p>
                            <p className="text-gray-500 text-xs truncate w-32">{profile?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg text-left"
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
