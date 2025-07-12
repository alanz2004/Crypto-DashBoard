const holders = [
  { name: "Alice", wallet: "0xabc...123", tokensHeld: 1200 },
  { name: "Bob", wallet: "0xdef...456", tokensHeld: 3000 },
  { name: "Carol", wallet: "0x789...789", tokensHeld: 500 },
];

export default function TokenHoldings() {
  return (
   <div className="token-holdings-container">

      <h1>Token Holdings</h1>
      <div className="min-w-full max-w-screen-xl mx-auto divide-y divide-gray-200">
        {/* Header */}
        <div className="flex py-2 font-semibold text-gray-700">
          <p className="w-1/3">Member</p>
          <p className="w-1/3">Wallet</p>
          <p className="w-1/3 text-right">Tokens</p>
        </div>

        {/* Rows */}
        {holders.map((holder) => (
          <div
            key={holder.wallet}
            className="flex py-2 items-center hover:bg-gray-50 border-b border-gray-100"
          >
            <p className="w-1/3 truncate overflow-hidden whitespace-nowrap">
              {holder.name}
            </p>
            <p className="w-1/3 truncate overflow-hidden whitespace-nowrap">
              {holder.wallet}
            </p>
            <p className="w-1/3 text-right font-medium">
              {holder.tokensHeld}
            </p>
          </div>
        ))}
      </div>
</div>
  );
}
