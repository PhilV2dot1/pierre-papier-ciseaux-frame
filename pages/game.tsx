import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Game() {
  const [choice, setChoice] = useState<number | null>(null);
  const [result, setResult] = useState('');
  const [score, setScore] = useState({ wins: 0, losses: 0, ties: 0 });
  const [isInFrame, setIsInFrame] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    setIsInFrame(window.parent !== window);
  }, []);

  const play = async (playerChoice: number) => {
    setChoice(playerChoice);
    setShowResult(false);
    
    // Animation delay
    setTimeout(() => {
      const computerChoice = Math.floor(Math.random() * 3);
      
      const choices = [
        { emoji: '🪨', name: 'Rock' },
        { emoji: '📄', name: 'Paper' },
        { emoji: '✂️', name: 'Scissors' }
      ];
      
      let outcome = '';
      let resultType = '';
      
      if (playerChoice === computerChoice) {
        outcome = '🤝 Tie!';
        resultType = 'tie';
        setScore(prev => ({ ...prev, ties: prev.ties + 1 }));
      } else if (
        (playerChoice === 0 && computerChoice === 2) ||
        (playerChoice === 1 && computerChoice === 0) ||
        (playerChoice === 2 && computerChoice === 1)
      ) {
        outcome = '🎉 You Win!';
        resultType = 'win';
        setScore(prev => ({ ...prev, wins: prev.wins + 1 }));
      } else {
        outcome = '😞 You Lose';
        resultType = 'lose';
        setScore(prev => ({ ...prev, losses: prev.losses + 1 }));
      }
      
      setResult(`${choices[playerChoice].emoji} vs ${choices[computerChoice].emoji} • ${outcome}`);
      setShowResult(true);
    }, 300);
  };

  const resetScore = () => {
    setScore({ wins: 0, losses: 0, ties: 0 });
    setResult('');
    setChoice(null);
    setShowResult(false);
  };

  return (
    <>
      <Head>
        <title>Rock Paper Scissors - On-Chain Game</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>

      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'white',
        padding: '1.5rem',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        position: 'relative',
        overflow: 'hidden'
      }}>
        
        {/* Decorative circles */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
          filter: 'blur(40px)'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-80px',
          left: '-80px',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
          filter: 'blur(60px)'
        }} />

        {/* Header */}
        <div style={{ 
          textAlign: 'center', 
          width: '100%', 
          maxWidth: '500px',
          zIndex: 1,
          marginTop: '1rem'
        }}>
          <div style={{ 
            fontSize: '3.5rem', 
            marginBottom: '0.5rem',
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
          }}>
            🎮
          </div>
          <h1 style={{ 
            fontSize: '1.8rem', 
            marginBottom: '0.3rem',
            fontWeight: '700',
            textShadow: '0 2px 10px rgba(0,0,0,0.2)'
          }}>
            Rock Paper Scissors
          </h1>
          <p style={{ 
            fontSize: '1rem', 
            opacity: 0.95,
            fontWeight: '500'
          }}>
            On-Chain Game • Base Network
          </p>
        </div>

        {/* Score Board */}
        <div style={{
          display: 'flex',
          gap: '0.8rem',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '400px',
          zIndex: 1,
          marginTop: '1rem'
        }}>
          <div style={{
            flex: 1,
            backgroundColor: 'rgba(16, 185, 129, 0.2)',
            backdropFilter: 'blur(10px)',
            padding: '0.8rem',
            borderRadius: '12px',
            textAlign: 'center',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#10b981' }}>
              {score.wins}
            </div>
            <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>Wins</div>
          </div>
          <div style={{
            flex: 1,
            backgroundColor: 'rgba(239, 68, 68, 0.2)',
            backdropFilter: 'blur(10px)',
            padding: '0.8rem',
            borderRadius: '12px',
            textAlign: 'center',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#ef4444' }}>
              {score.losses}
            </div>
            <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>Losses</div>
          </div>
          <div style={{
            flex: 1,
            backgroundColor: 'rgba(251, 191, 36, 0.2)',
            backdropFilter: 'blur(10px)',
            padding: '0.8rem',
            borderRadius: '12px',
            textAlign: 'center',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#fbbf24' }}>
              {score.ties}
            </div>
            <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>Ties</div>
          </div>
        </div>

        {/* Game Area */}
        <div style={{ 
          textAlign: 'center', 
          width: '100%', 
          maxWidth: '500px',
          zIndex: 1,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <h2 style={{ 
            fontSize: '1.3rem', 
            marginBottom: '1.5rem',
            fontWeight: '600'
          }}>
            Choose Your Move
          </h2>
          
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            justifyContent: 'center',
            marginBottom: '2rem',
            flexWrap: 'wrap'
          }}>
            {[
              { emoji: '🪨', name: 'Rock', index: 0 },
              { emoji: '📄', name: 'Paper', index: 1 },
              { emoji: '✂️', name: 'Scissors', index: 2 }
            ].map((option) => (
              <button
                key={option.index}
                onClick={() => play(option.index)}
                style={{
                  fontSize: '3rem',
                  padding: '1.2rem',
                  backgroundColor: choice === option.index 
                    ? 'rgba(255,255,255,0.3)' 
                    : 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(10px)',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  width: '100px',
                  height: '100px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                  transform: choice === option.index ? 'scale(1.05)' : 'scale(1)'
                }}
                onMouseOver={(e) => {
                  if (choice !== option.index) {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.25)';
                    e.currentTarget.style.transform = 'scale(1.05) translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
                  }
                }}
                onMouseOut={(e) => {
                  if (choice !== option.index) {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)';
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
                  }
                }}
              >
                <div>{option.emoji}</div>
                <div style={{ fontSize: '0.7rem', marginTop: '0.3rem', fontWeight: '600' }}>
                  {option.name}
                </div>
              </button>
            ))}
          </div>

          {/* Result */}
          {showResult && result && (
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.95)',
              color: '#1f2937',
              padding: '1.2rem',
              borderRadius: '16px',
              fontSize: '1.2rem',
              fontWeight: '700',
              textAlign: 'center',
              boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
              animation: 'slideUp 0.4s ease-out',
              marginBottom: '1rem'
            }}>
              {result}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ 
          textAlign: 'center', 
          width: '100%',
          zIndex: 1,
          paddingBottom: '1rem'
        }}>
          <button
            onClick={resetScore}
            style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: 'white',
              padding: '0.7rem 1.5rem',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: '600',
              marginBottom: '1rem',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)';
            }}
          >
            🔄 Reset Score
          </button>
          
          <div style={{ fontSize: '0.85rem', opacity: 0.9, marginBottom: '0.3rem' }}>
            Smart Contract on Base
          </div>
          <a 
            href="https://basescan.org/address/0xE7e255228EBA6ad9422E7F8E76aB31ffeb8E8b1B"
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              color: 'white', 
              textDecoration: 'none',
              fontSize: '0.75rem',
              opacity: 0.8,
              borderBottom: '1px solid rgba(255,255,255,0.3)',
              paddingBottom: '2px'
            }}
          >
            0xE7e2...8b1B →
          </a>
        </div>

        <style jsx>{`
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </>
  );
}