import './TokenHoldings.css'

const holders = [
  { name: "Alice", wallet: "0xabc...123", tokensHeld: 1200 },
  { name: "Bob", wallet: "0xdef...456", tokensHeld: 3000 },
  { name: "Carol", wallet: "0x789...789", tokensHeld: 500 },
];

export default function TokenHoldings() {
  return (
 <div className="token-holdings-container">
    <h1 className="token-holdings-title">Token Holdings</h1>

    <div className="token-holdings-table">
      {/* Header */}
      <div className="token-holdings-row token-holdings-header">
        <p className="col">Member</p>
        <p className="col">Wallet</p>
        <p className="col text-right">Tokens</p>
      </div>

      {/* Rows */}
      {holders.map((holder) => (
        <div key={holder.wallet} className="token-holdings-row">
          <p className="col truncate">{holder.name}</p>
          <p className="col truncate">{holder.wallet}</p>
          <p className="col text-right">{holder.tokensHeld}</p>
        </div>
      ))}
    </div>
  </div>
  );
}
