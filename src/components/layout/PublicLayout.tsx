
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export default function PublicLayout() {
    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
            <Header />
            <main className="pt-16">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
