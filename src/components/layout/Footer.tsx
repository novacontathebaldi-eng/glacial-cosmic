

export function Footer() {
    return (
        <footer className="bg-black text-gray-400 py-12 border-t border-white/10">
            <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-white font-bold text-lg mb-4">o THEBALDI</h3>
                    <p className="text-sm">
                        High-end digital architecture and development.
                        <br />
                        Vitória, ES - Brasil.
                    </p>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-4">Links</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/portfolio" className="hover:text-white">Portfolio</a></li>
                        <li><a href="/services" className="hover:text-white">Services</a></li>
                        <li><a href="/blog" className="hover:text-white">Blog</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-4">Legal</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
                        <li><a href="/terms" className="hover:text-white">Terms of Service</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-4">Newsletter</h4>
                    <p className="text-sm mb-4">Subscribe for updates.</p>
                    {/* Newsletter form will go here */}
                    <div className="flex gap-2">
                        <input type="email" placeholder="Email" className="bg-white/5 border border-white/10 rounded px-3 py-2 text-sm w-full" />
                        <button className="bg-white text-black px-4 py-2 rounded text-sm font-bold">Go</button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
