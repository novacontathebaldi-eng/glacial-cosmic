import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';

export default function Quote() {
    const { items, removeItem, clearCart } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        notes: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 1. Create quote record in Supabase
            const { error } = await supabase
                .from('quotes')
                .insert({
                    guest_info: formData,
                    items: items,
                    status: 'submitted'
                });

            if (error) throw error;

            // 2. Clear cart and redirect
            clearCart();
            alert('Quote request submitted successfully! We will contact you soon.');
            navigate('/');

            // TODO: Trigger Brevo email via Edge Function (backend logic)
        } catch (err: any) {
            console.error('Error submitting quote:', err);
            alert('Failed to submit quote. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl font-bold mb-8">Request a Quote</h1>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Cart Items */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Selected Services</h2>
                        {items.length === 0 ? (
                            <p className="text-gray-500">Your cart is empty. Browse our services to add items.</p>
                        ) : (
                            <div className="space-y-4">
                                {items.map((item, index) => (
                                    <div key={`${item.id}-${index}`} className="flex justify-between items-center p-4 bg-zinc-900 rounded-lg border border-white/5">
                                        <div>
                                            <h3 className="font-bold">{item.title}</h3>
                                            <p className="text-sm text-gray-400">{item.price}</p>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-red-500 hover:text-red-400 text-sm"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Checkout Form */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Your Details</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-300">Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2 bg-zinc-900 border border-white/10 rounded focus:outline-none focus:border-white/50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-300">Email</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-2 bg-zinc-900 border border-white/10 rounded focus:outline-none focus:border-white/50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-300">Phone</label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-4 py-2 bg-zinc-900 border border-white/10 rounded focus:outline-none focus:border-white/50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-300">Company (Optional)</label>
                                <input
                                    type="text"
                                    value={formData.company}
                                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                                    className="w-full px-4 py-2 bg-zinc-900 border border-white/10 rounded focus:outline-none focus:border-white/50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-300">Project Notes</label>
                                <textarea
                                    rows={4}
                                    value={formData.notes}
                                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                                    className="w-full px-4 py-2 bg-zinc-900 border border-white/10 rounded focus:outline-none focus:border-white/50"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading || items.length === 0}
                                className="w-full py-3 bg-white text-black font-bold rounded hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                            >
                                {loading ? 'Submitting...' : 'Submit Request'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
