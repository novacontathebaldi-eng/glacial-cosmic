

export default function AdminSettings() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Settings</h1>
            <div className="bg-white p-8 rounded-lg border border-gray-200">
                <p className="text-gray-500">System settings configuration.</p>
                <div className="mt-4 space-y-4">
                    <div>
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" className="rounded border-gray-300" />
                            <span>Enable New User Registration</span>
                        </label>
                    </div>
                    <div>
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" className="rounded border-gray-300" />
                            <span>Maintenance Mode</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}
