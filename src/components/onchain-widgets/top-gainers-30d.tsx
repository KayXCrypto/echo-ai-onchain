export default function TopGainers30d() {
    const data = [
        { chain: "Ethereum", token: "PEPE", change: "+18.2%" },
        { chain: "Solana", token: "WIF", change: "+22.5%" },
        { chain: "Base", token: "DEGEN", change: "+31.4%" },
    ];

    return (
        <ul className="space-y-3" >
            {
                data.map((i) => (
                    <li key={i.token} className="flex justify-between text-sm" >
                        <span className="text-neutral-400" >
                            {i.chain} · {i.token}
                        </span>
                        < span className="text-green-400 font-medium" > {i.change} </span>
                    </li>
                ))
            }
        </ul>
    );
}
