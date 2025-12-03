import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Home() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Hero Section */}
            <section className="h-screen flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-black pointer-events-none" />

                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                    o THEBALDI
                </h1>

                <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mb-10">
                    High-end digital architecture, web development, and AI solutions.
                </p>

                <div className="flex gap-4 z-10">
                    <Link
                        to="/portfolio"
                        className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all transform hover:scale-105"
                    >
                        {t('common.projects')}
                    </Link>
                    <Link
                        to="/contact"
                        className="px-8 py-3 border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-all"
                    >
                        Contact
                    </Link>
                </div>
            </section>

            {/* Services Preview */}
            <section className="py-24 bg-zinc-900">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-12 text-center">Services</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: 'Web Development', desc: 'Modern, fast, and responsive websites.' },
                            { title: 'Architecture', desc: 'Digital and physical space planning.' },
                            { title: 'AI Solutions', desc: 'Chatbots and automation integration.' }
                        ].map((service, i) => (
                            <div key={i} className="p-8 bg-black/50 rounded-2xl border border-white/5 hover:border-white/20 transition-colors">
                                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                                <p className="text-gray-400">{service.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
