function App() {
  return (
    <div className="App" style={{ fontFamily: 'Arial, sans-serif', color: '#333', lineHeight: '1.6' }}>
      
      {/* O primire călduroasă */}
      <header style={{ background: '#1a1a1a', color: '#ffd700', padding: '40px 20px', textAlign: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '2.5rem' }}>CarFix</h1>
        <p style={{ margin: '10px 0 0', fontSize: '1.1rem' }}>Suntem aici să avem grijă de mașina ta, ca să poți conduce fără griji.</p>
      </header>
      
      <main style={{ padding: '40px 20px', maxWidth: '700px', margin: '0 auto' }}>
        
        <section style={{ textAlign: 'center' }}>
          <h2 style={{ color: '#d32f2f' }}>Bun venit în atelierul nostru!</h2>
          <p>
            Știm cât de importantă este siguranța ta la drum. Fie că ai nevoie de o simplă verificare 
            sau de o reparație complexă, echipa noastră te primește cu profesionalism și cafea proaspătă.
          </p>
        </section>

        <section style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f4f4f4', borderRadius: '10px' }}>
          <h3 style={{ borderBottom: '2px solid #ffd700', display: 'inline-block' }}>Cu ce te putem ajuta?</h3>
          <p style={{ fontStyle: 'italic' }}>Echipa noastră se ocupă de orice problemă, de la diagnoză la mecanica grea.</p>
          <p>Te așteptăm la noi pentru a-ți pune mașina la punct rapid și corect.</p>
        </section>

      </main>
    </div>
  );
}

export default App;