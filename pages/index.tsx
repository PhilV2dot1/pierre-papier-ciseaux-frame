import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content={`${process.env.NEXT_PUBLIC_URL}/api/image/start`} />
        <meta property="fc:frame:button:1" content="🪨 Pierre" />
        <meta property="fc:frame:button:2" content="📄 Papier" />
        <meta property="fc:frame:button:3" content="✂️ Ciseaux" />
        <meta property="fc:frame:button:4" content="📊 Mes Stats" />
        <meta property="fc:frame:post_url" content={`${process.env.NEXT_PUBLIC_URL}/api/play`} />
        
        <title>Pierre Papier Ciseaux - Farcaster Frame</title>
        <meta name="description" content="Jouez à Pierre-Papier-Ciseaux on-chain sur Farcaster !" />
      </Head>
      
      <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
        <h1>🎮 Pierre Papier Ciseaux On-Chain</h1>
        <p>Jouez directement depuis Farcaster et suivez vos statistiques sur la blockchain !</p>
        
        <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
          <h2>Comment jouer :</h2>
          <ol>
            <li>Cliquez sur Pierre, Papier ou Ciseaux</li>
            <li>Le contrat génère le choix de l&apos;ordinateur</li>
            <li>Consultez vos stats et votre classement</li>
          </ol>
        </div>

        <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#e3f2fd', borderRadius: '8px' }}>
          <h2>Fonctionnalités :</h2>
          <ul>
            <li>✅ Statistiques complètes (victoires, défaites, égalités)</li>
            <li>🔥 Système de séries de victoires</li>
            <li>🏆 Classement global des meilleurs joueurs</li>
            <li>📈 Analyse de vos choix favoris</li>
            <li>🎯 Événements spéciaux tous les 10 victoires</li>
          </ul>
        </div>

        <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#fff3e0', borderRadius: '8px' }}>
          <h2>⚙️ Configuration requise :</h2>
          <p>Adresse du contrat : <code>[VOTRE_ADRESSE_CONTRAT]</code></p>
          <p>Network : Base / Optimism / Ethereum</p>
        </div>
      </main>
    </>
  );
}