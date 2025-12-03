
import { Link } from 'react-router-dom';

export function Header() {
    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold tracking-tighter text-white">
                    o THEBALDI
                </Link>
                <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-300">
                    <Link to="/portfolio" className="hover:text-white transition-colors">Portfolio</Link>
                    <Link to="/services" className="hover:text-white transition-colors">Services</Link>
                    <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
                    <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
                </nav>
                <div className="flex items-center gap-4">
                    <Link to="/auth/login" className="text-sm font-medium text-white hover:text-gray-300">
                        Login
                    </Link>
                    <Link to="/quote" className="bg-white text-black px-4 py-2 rounded-full text-sm font-bold hover:bg-gray-200 transition-colors">
                        Start Project
                    </Link>
                </div>
            </div>
        </header>
    );
}
