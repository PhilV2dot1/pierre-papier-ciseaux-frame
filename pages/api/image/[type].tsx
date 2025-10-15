// pages/api/image/[type].tsx
import { NextApiRequest, NextApiResponse } from 'next';
import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextApiRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');

  // Image de démarrage
  if (type === 'start') {
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1a1a2e',
            backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          }}
        >
          <div style={{ fontSize: 80, marginBottom: 20 }}>🎮</div>
          <div style={{ fontSize: 60, fontWeight: 'bold', color: 'white', marginBottom: 10 }}>
            Pierre Papier Ciseaux
          </div>
          <div style={{ fontSize: 30, color: '#e0e0e0', marginBottom: 30 }}>
            On-Chain Game
          </div>
          <div style={{ display: 'flex', gap: 30 }}>
            <div style={{ fontSize: 50 }}>🪨</div>
            <div style={{ fontSize: 50 }}>📄</div>
            <div style={{ fontSize: 50 }}>✂️</div>
          </div>
          <div style={{ fontSize: 24, color: '#ffd700', marginTop: 40 }}>
            Choisissez votre arme !
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  }

  // Image de résultat
  if (type === 'result') {
    const player = parseInt(searchParams.get('player') || '0');
    const computer = parseInt(searchParams.get('computer') || '0');
    const result = searchParams.get('result') || 'tie';

    const choices = [
      { emoji: '🪨', name: 'Pierre' },
      { emoji: '📄', name: 'Papier' },
      { emoji: '✂️', name: 'Ciseaux' }
    ];

    const resultConfig = {
      win: { text: 'VICTOIRE !', color: '#4ade80', bg: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' },
      lose: { text: 'DÉFAITE', color: '#f87171', bg: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' },
      tie: { text: 'ÉGALITÉ', color: '#fbbf24', bg: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }
    };

    const config = resultConfig[result as keyof typeof resultConfig];

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: config.bg,
          }}
        >
          <div style={{ fontSize: 70, fontWeight: 'bold', color: 'white', marginBottom: 40 }}>
            {config.text}
          </div>
          
          <div style={{ display: 'flex', gap: 60, alignItems: 'center', marginBottom: 40 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: 30, color: 'white', marginBottom: 15 }}>Vous</div>
              <div style={{ fontSize: 120 }}>{choices[player].emoji}</div>
              <div style={{ fontSize: 35, color: 'white', marginTop: 15 }}>{choices[player].name}</div>
            </div>
            
            <div style={{ fontSize: 80, color: 'white' }}>VS</div>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: 30, color: 'white', marginBottom: 15 }}>Ordi</div>
              <div style={{ fontSize: 120 }}>{choices[computer].emoji}</div>
              <div style={{ fontSize: 35, color: 'white', marginTop: 15 }}>{choices[computer].name}</div>
            </div>
          </div>

          <div style={{ fontSize: 28, color: 'white', opacity: 0.9 }}>
            Choisissez votre prochain coup !
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  }

  // Image de statistiques
  if (type === 'stats') {
    const victories = parseInt(searchParams.get('v') || '0');
    const defeats = parseInt(searchParams.get('d') || '0');
    const ties = parseInt(searchParams.get('e') || '0');
    const currentStreak = parseInt(searchParams.get('s') || '0');
    const bestStreak = parseInt(searchParams.get('b') || '0');
    
    const total = victories + defeats + ties;
    const winRate = total > 0 ? Math.round((victories / total) * 100) : 0;

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1e293b',
            backgroundImage: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            padding: 60,
          }}
        >
          <div style={{ fontSize: 60, fontWeight: 'bold', color: 'white', marginBottom: 50 }}>
            📊 Vos Statistiques
          </div>

          <div style={{ display: 'flex', gap: 40, marginBottom: 40 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'rgba(74, 222, 128, 0.1)', padding: 30, borderRadius: 20 }}>
              <div style={{ fontSize: 70, fontWeight: 'bold', color: '#4ade80' }}>{victories}</div>
              <div style={{ fontSize: 28, color: '#94a3b8' }}>Victoires</div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'rgba(248, 113, 113, 0.1)', padding: 30, borderRadius: 20 }}>
              <div style={{ fontSize: 70, fontWeight: 'bold', color: '#f87171' }}>{defeats}</div>
              <div style={{ fontSize: 28, color: '#94a3b8' }}>Défaites</div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'rgba(251, 191, 36, 0.1)', padding: 30, borderRadius: 20 }}>
              <div style={{ fontSize: 70, fontWeight: 'bold', color: '#fbbf24' }}>{ties}</div>
              <div style={{ fontSize: 28, color: '#94a3b8' }}>Égalités</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 60, marginTop: 30 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: 50, color: '#60a5fa' }}>🔥 {currentStreak}</div>
              <div style={{ fontSize: 24, color: '#94a3b8' }}>Série actuelle</div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: 50, color: '#fbbf24' }}>🏆 {bestStreak}</div>
              <div style={{ fontSize: 24, color: '#94a3b8' }}>Meilleure série</div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: 50, color: '#a78bfa' }}>📈 {winRate}%</div>
              <div style={{ fontSize: 24, color: '#94a3b8' }}>Taux victoire</div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  }

  // Image du classement
  if (type === 'leaderboard') {
    const names = searchParams.get('names')?.split(',') || [];
    const victories = searchParams.get('victories')?.split(',').map(Number) || [];
    const streaks = searchParams.get('streaks')?.split(',').map(Number) || [];

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0f172a',
            backgroundImage: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            padding: 40,
          }}
        >
          <div style={{ fontSize: 60, fontWeight: 'bold', color: 'white', marginBottom: 40 }}>
            🏆 Classement Global
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 15, width: '100%', maxWidth: 1000 }}>
            {names.slice(0, 5).map((name, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: index === 0 ? 'rgba(251, 191, 36, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  padding: 20,
                  borderRadius: 15,
                  border: index === 0 ? '3px solid #fbbf24' : '2px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                  <div style={{ fontSize: 40, fontWeight: 'bold', color: index === 0 ? '#fbbf24' : index === 1 ? '#94a3b8' : index === 2 ? '#cd7f32' : '#64748b', width: 60 }}>
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                  </div>
                  <div style={{ fontSize: 35, color: 'white', fontWeight: '600' }}>
                    {name}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 40 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ fontSize: 40, fontWeight: 'bold', color: '#4ade80' }}>
                      {victories[index]}
                    </div>
                    <div style={{ fontSize: 20, color: '#94a3b8' }}>victoires</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ fontSize: 40, fontWeight: 'bold', color: '#fbbf24' }}>
                      {streaks[index]}
                    </div>
                    <div style={{ fontSize: 20, color: '#94a3b8' }}>meilleure série</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  }

  // Image d'erreur
  if (type === 'error') {
    const message = searchParams.get('msg') || 'Une erreur est survenue';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#dc2626',
            backgroundImage: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
          }}
        >
          <div style={{ fontSize: 100, marginBottom: 30 }}>⚠️</div>
          <div style={{ fontSize: 50, fontWeight: 'bold', color: 'white', textAlign: 'center', marginBottom: 20 }}>
            Erreur
          </div>
          <div style={{ fontSize: 32, color: '#fee2e2', textAlign: 'center', maxWidth: 800 }}>
            {message}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  }

  // Image de bienvenue
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#6366f1',
          backgroundImage: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        }}
      >
        <div style={{ fontSize: 70, marginBottom: 20 }}>👋</div>
        <div style={{ fontSize: 50, fontWeight: 'bold', color: 'white', textAlign: 'center', marginBottom: 30 }}>
          Bienvenue !
        </div>
        <div style={{ fontSize: 32, color: '#e0e0e0', textAlign: 'center', maxWidth: 800 }}>
          Créez votre profil pour commencer à jouer et suivre vos statistiques on-chain !
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}