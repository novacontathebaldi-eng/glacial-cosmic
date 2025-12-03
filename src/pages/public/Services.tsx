import { Link } from 'react-router-dom';

export default function Services() {


    const services = [
        {
            title: 'Web Development',
            description: 'Custom websites, web apps, and e-commerce solutions built with modern technologies like React, Next.js, and Supabase.',
            features: ['SPA/MPA', 'E-commerce', 'CMS Integration', 'Performance Optimization'],
            price: 'From R$ 5.000'
        },
        {
            title: 'Architecture Projects',
            description: 'Digital and physical architectural planning, 3D visualization, and interior design.',
            features: ['3D Rendering', 'Floor Plans', 'Interior Design', 'Consulting'],
            price: 'From R$ 3.000'
        },
        {
            title: 'AI Integration',
            description: 'Custom AI chatbots, automation workflows, and intelligent system integration.',
            features: ['Custom Chatbots', 'Process Automation', 'Data Analysis', 'LLM Integration'],
            price: 'From R$ 4.000'
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white pt-20 pb-20">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-12 text-center">Services</h1>

                <div className="grid md:grid-cols-3 gap-8">
                    {services.map((service, i) => (
                        <div key={i} className="bg-zinc-900 rounded-2xl p-8 border border-white/5 hover:border-white/20 transition-all hover:-translate-y-2">
                            <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                            <p className="text-gray-400 mb-6 min-h-[80px]">{service.description}</p>

                            <ul className="space-y-3 mb-8">
                                {service.features.map((feature, j) => (
                                    <li key={j} className="flex items-center text-sm text-gray-300">
                                        <svg className="w-4 h-4 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-auto">
                                <p className="text-sm text-gray-500 mb-4">Estimated: {service.price}</p>
                                <Link
                                    to="/quote"
                                    className="block w-full py-3 bg-white text-black text-center font-bold rounded hover:bg-gray-200 transition-colors"
                                >
                                    Get a Quote
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
