import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
    { chain: 'Solana', gainers: 45, color: '#14F195' },
    { chain: 'Ethereum', gainers: 32, color: '#627EEA' },
    { chain: 'Base', gainers: 28, color: '#0052FF' },
    { chain: 'ZkSync', gainers: 15, color: '#3366FF' },
];

export default function TopGainersByChain() {
    return (
        <div className="h-[200px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <XAxis dataKey="chain" stroke="#666" fontSize={10} axisLine={false} tickLine={false} />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}
                        itemStyle={{ color: '#fff', fontSize: '12px' }}
                    />
                    <Bar dataKey="gainers" radius={[4, 4, 0, 0]}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}