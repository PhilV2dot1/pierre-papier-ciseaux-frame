import { useEffect, useState } from 'react';
import sdk from '@farcaster/frame-sdk';

export default function Game() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [context, setContext] = useState<any>(null);
  const [choice, setChoice] = useState<number | null>(null);
  const [result, setResult] = useState('');

  useEffect(() => {
    const load = async () => {
      const ctx = await sdk.context;
      setContext(ctx);
      sdk.actions.ready();
      setIsSDKLoaded(true);
    };
    
    if (sdk) {
      load();
    }
  }, []);

  const play = async (playerChoice: number) => {
    setChoice(playerChoice);
    const computerChoice = Math.floor(Math.random() * 3);
    
    const choices = ['🪨 Pierre', '📄 Papier', '✂️ Ciseaux'];
    
    let outcome = '';
    if (playerChoice === computerChoice) {
      outcome = 'Égalité !';
    } else if (
      (playerChoice === 0 && computerChoice === 2) ||
      (playerChoice === 1 && computerChoice === 0) ||
      (playerChoice === 2 && computerChoice === 1)
    ) {
      outcome = '🎉 VICTOIRE !';
    } else {
      outcome = '😞 Défaite';
    }
    
    setResult(`Vous: ${choices[playerChoice]} | Ordi: ${choices[computerChoice]} | ${outcome}`);
    
    // Notifier Farcaster
    sdk.actions.openUrl(`https://basescan.org/address/0xE7e255228EBA6ad9422E7F8E76aB31ffeb8E8b1B`);
  };

  if (!isSDKLoaded) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        fontSize: '1.5rem'
      }}>
        Chargement...
      </div>
    );
  }

  return (
    <div style={{
      height: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      padding: '2rem'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎮 Pierre Papier Ciseaux</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>On-Chain Game</p>
      
      {context && (
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <p>Bienvenue @{context.user?.username || 'Joueur'} !</p>
        </div>
      )}

      <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
        <button
          onClick={() => play(0)}
          style={{
            fontSize: '4rem',
            padding: '2rem',
            backgroundColor: 'rgba(255,255,255,0.2)',
            border: '3px solid white',
            borderRadius: '20px',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
        >
          🪨
        </button>
        <button
          onClick={() => play(1)}
          style={{
            fontSize: '4rem',
            padding: '2rem',
            backgroundColor: 'rgba(255,255,255,0.2)',
            border: '3px solid white',
            borderRadius: '20px',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
        >
          📄
        </button>
        <button
          onClick={() => play(2)}
          style={{
            fontSize: '4rem',
            padding: '2rem',
            backgroundColor: 'rgba(255,255,255,0.2)',
            border: '3px solid white',
            borderRadius: '20px',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
        >
          ✂️
        </button>
      </div>

      {result && (
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.9)',
          color: '#333',
          padding: '1.5rem',
          borderRadius: '15px',
          fontSize: '1.3rem',
          fontWeight: 'bold',
          textAlign: 'center',
          maxWidth: '500px'
        }}>
          {result}
        </div>
      )}

      <div style={{ marginTop: '3rem', textAlign: 'center' }}>
        <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
          Contrat sur Base Mainnet
        </p>
        <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>
          0xE7e2...8b1B
        </p>
      </div>
    </div>
  );
}