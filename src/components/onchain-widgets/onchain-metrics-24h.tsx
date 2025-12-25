export default function OnchainMetrics24h() {
    const metrics = [
        { label: "Active Addresses", value: "1.24M" },
        { label: "Netflow", value: "-$320M" },
        { label: "Tx Count", value: "18.7M" },
    ];

    return (
        <div className="space-y-4">
            {metrics.map((m) => (
                <div key={m.label} className="flex justify-between text-sm">
                    <span className="text-neutral-400">{m.label}</span>
                    <span className="font-medium text-white">{m.value}</span>
                </div>
            ))}
        </div>
    );
}
