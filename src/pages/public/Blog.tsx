import { Link } from 'react-router-dom';

const POSTS = [
    {
        id: 1,
        slug: 'future-of-web-development',
        title: 'The Future of Web Development in 2025',
        excerpt: 'How AI and Server Components are reshaping the landscape.',
        date: '2025-10-15',
        image: 'https://placehold.co/800x400/111/fff?text=Web+Dev'
    },
    {
        id: 2,
        slug: 'architecture-in-digital-age',
        title: 'Architecture in the Digital Age',
        excerpt: 'Merging physical spaces with digital experiences.',
        date: '2025-10-10',
        image: 'https://placehold.co/800x400/222/fff?text=Architecture'
    },
    {
        id: 3,
        slug: 'ai-automation-business',
        title: 'Why AI Automation is Crucial for Business',
        excerpt: 'Streamlining operations with intelligent agents.',
        date: '2025-10-05',
        image: 'https://placehold.co/800x400/333/fff?text=AI+Automation'
    }
];

export default function Blog() {
    return (
        <div className="min-h-screen bg-black text-white pt-20 pb-20">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-12 text-center">Blog</h1>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {POSTS.map(post => (
                        <Link key={post.id} to={`/blog/${post.slug}`} className="group block">
                            <div className="bg-zinc-900 rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-all hover:-translate-y-2">
                                <div className="aspect-video overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <div className="p-6">
                                    <span className="text-sm text-gray-500 mb-2 block">{post.date}</span>
                                    <h2 className="text-xl font-bold mb-3 group-hover:text-gray-300 transition-colors">{post.title}</h2>
                                    <p className="text-gray-400 text-sm">{post.excerpt}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
