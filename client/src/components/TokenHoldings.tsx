const holders = [
  { name: "Alice", wallet: "0xabc...123", tokensHeld: 1200 },
  { name: "Bob", wallet: "0xdef...456", tokensHeld: 3000 },
  { name: "Carol", wallet: "0x789...789", tokensHeld: 500 },
];

export default function TokenHoldings() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-3xl mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4 text-brand-primary">Token Holdings</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="text-left border-b border-gray-200">
            <th className="py-2">Member</th>
            <th className="py-2">Wallet</th>
            <th className="py-2 text-right">Tokens</th>
          </tr>
        </thead>
        <tbody>
          {holders.map((holder) => (
            <tr key={holder.wallet} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-2">{holder.name}</td>
              <td className="py-2">{holder.wallet}</td>
              <td className="py-2 text-right font-medium">{holder.tokensHeld}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
