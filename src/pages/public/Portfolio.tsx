import { useState } from 'react';


interface Project {
    id: number;
    title: string;
    category: string;
    image: string;
    description: string;
}

const PROJECTS: Project[] = [
    { id: 1, title: 'Modern E-commerce', category: 'Web', image: 'https://placehold.co/600x400/111/fff?text=E-commerce', description: 'Full-stack e-commerce platform.' },
    { id: 2, title: 'Luxury Villa', category: 'Architecture', image: 'https://placehold.co/600x400/222/fff?text=Villa', description: 'Residential architecture project.' },
    { id: 3, title: 'AI Chatbot', category: 'AI', image: 'https://placehold.co/600x400/333/fff?text=AI', description: 'Customer support automation.' },
    { id: 4, title: 'Corporate Site', category: 'Web', image: 'https://placehold.co/600x400/444/fff?text=Corporate', description: 'Business identity website.' },
];

export default function Portfolio() {

    const [filter, setFilter] = useState('All');

    const filteredProjects = filter === 'All'
        ? PROJECTS
        : PROJECTS.filter(p => p.category === filter);

    return (
        <div className="min-h-screen bg-black text-white pt-20 pb-20">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-12 text-center">Portfolio</h1>

                {/* Filters */}
                <div className="flex justify-center gap-4 mb-12 flex-wrap">
                    {['All', 'Web', 'Architecture', 'AI'].map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-6 py-2 rounded-full border transition-all ${filter === cat
                                ? 'bg-white text-black border-white'
                                : 'bg-transparent text-gray-400 border-white/20 hover:border-white hover:text-white'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map(project => (
                        <div key={project.id} className="group relative overflow-hidden rounded-xl aspect-video cursor-pointer">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-center p-4">
                                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                                <p className="text-gray-300">{project.description}</p>
                                <span className="mt-4 px-4 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm">
                                    {project.category}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
