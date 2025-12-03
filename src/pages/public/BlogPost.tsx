import { useParams, Link } from 'react-router-dom';

export default function BlogPost() {
    const { slug } = useParams();

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-20">
            <article className="container mx-auto px-4 max-w-3xl">
                <Link to="/blog" className="text-gray-500 hover:text-white mb-8 inline-block">
                    ← Back to Blog
                </Link>

                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    Post Title for {slug}
                </h1>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-12">
                    <span>October 15, 2025</span>
                    <span>•</span>
                    <span>5 min read</span>
                </div>

                <img
                    src="https://placehold.co/1200x600/111/fff?text=Cover+Image"
                    alt="Cover"
                    className="w-full rounded-2xl mb-12"
                />

                <div className="prose prose-invert prose-lg max-w-none">
                    <p>
                        This is a placeholder for the blog post content. In a real application,
                        this would be fetched from the database based on the slug <strong>{slug}</strong>.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <h2>The Future is Now</h2>
                    <p>
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </div>
            </article>
        </div>
    );
}
