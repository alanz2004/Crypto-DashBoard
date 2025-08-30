import React, { useEffect, useState } from 'react';
import './TokenHoldings.css';
import { useAuth } from '../context/AuthContext';
import EmbedContainer from './EmbedContainer';

interface TokenHolder {
  _id: string;
  name: string;
  wallet: string;
  tokensHeld: number;
}

interface TokenHoldingsProps {
  projectId: string;
}

export default function TokenHoldings({ projectId }: TokenHoldingsProps) {
  const { token } = useAuth();
  const [holders, setHolders] = useState<TokenHolder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [showEmbed, setShowEmbed] = useState(false);

  // Add holder states
  const [showAddRow, setShowAddRow] = useState(false);
  const [newHolder, setNewHolder] = useState({ name: '', wallet: '', tokensHeld: 0 });
  const [adding, setAdding] = useState(false);

   const embedCode = `
  <script>
    async function addTokenHolder(name, wallet, tokensHeld) {
      try {
        const response = await fetch("https://yourdomain.com/api/tokenholders/${projectId}", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer YOUR_API_TOKEN"
          },
          body: JSON.stringify({ name, wallet, tokensHeld })
        });
        const data = await response.json();
        console.log("Token Holder Added:", data);
      } catch (error) {
        console.error("Error adding token holder:", error);
      }
    }
    // Example usage:
    // addTokenHolder("Alice", "0x123...", 1000);
  </script>
  `;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode).then(() => {
      alert("Code copied to clipboard!");
    });
  };

  // Fetch token holders
  useEffect(() => {
    if (!token) return;

    const fetchHolders = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/tokenholders/${projectId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Failed to fetch token holders');
        const data = await res.json();
        setHolders(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchHolders();
  }, [projectId, token]);

  // Add token holder
  const handleSave = async () => {
    if (!newHolder.name || !newHolder.wallet || newHolder.tokensHeld <= 0) return;

    try {
      setAdding(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/tokenholders/${projectId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newHolder),
      });

      if (!res.ok) throw new Error('Failed to add token holder');
      const addedHolder: TokenHolder = await res.json();
      setHolders([...holders, addedHolder]);

      // Reset row
      setNewHolder({ name: '', wallet: '', tokensHeld: 0 });
      setShowAddRow(false);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <p>Loading token holders...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="token-holdings-container">
      <h1 className="token-holdings-title">Token Holdings</h1>

              {!showAddRow && (
          <div className="add-row">
            {!showEmbed && (
                 <button className="add-btn" onClick={() => setShowAddRow(true)}>
                    Add Holder
                </button>
            )}
         
            <button onClick={() => setShowEmbed(!showEmbed)}>
                  {showEmbed ? "Back to Table" : "Show Embed Code"}
              </button>
          </div>
        )}

        {!showEmbed ? (
                <div className="token-holdings-table">
        {/* Header */}
        <div className="token-holdings-row token-holdings-header">
          <p className="col">Member</p>
          <p className="col">Wallet</p>
          <p className="col text-right">Tokens</p>
        </div>

        {/* Existing Rows */}
        {holders.map((holder) => (
          <div key={holder._id} className="token-holdings-row">
            <p className="col truncate">{holder.name}</p>
            <p className="col truncate">{holder.wallet}</p>
            <p className="col text-right">{holder.tokensHeld}</p>
          </div>
        ))}

        {/* New Holder Row */}
        {showAddRow && (
            <>

           <div className="token-holdings-row new-holder-row">
                <input
                  type="text"
                  className="col input-cell"
                  placeholder="Name"
                  value={newHolder.name}
                  onChange={(e) => setNewHolder({ ...newHolder, name: e.target.value })}
                />
                <input
                  type="text"
                  className="col input-cell"
                  placeholder="Wallet"
                  value={newHolder.wallet}
                  onChange={(e) => setNewHolder({ ...newHolder, wallet: e.target.value })}
                />
                <input
                  type="number"
                  className="col input-cell"
                  placeholder="Tokens"
                  value={newHolder.tokensHeld || ''}
                  onChange={(e) =>
                    setNewHolder({ ...newHolder, tokensHeld: Number(e.target.value) })
                  }
                />
              </div>

              {/* Save + Cancel row */}
                <div className="action-row">
                  <button
                    className="cancel-btn"
                    onClick={() => {
                      setShowAddRow(false);
                      setNewHolder({ name: '', wallet: '', tokensHeld: 0});
                    }}
                  >
                    Cancel
                  </button>
                  <button className="save-btn" onClick={handleSave} disabled={adding}>
                    {adding ? 'Saving...' : 'Save'}
                  </button>
                  </div>
                </>

        )}
       
      </div>
        ): (
           <EmbedContainer />
        )}
    </div>
  );
}
