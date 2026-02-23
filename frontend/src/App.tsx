function App() {
  const handleNav = (sectiune: string) => {
    console.log("Navigare către:", sectiune);
    alert("Navigăm către secțiunea: " + sectiune);
  };

  return (
    <div style={{ width: '100%', margin: 0, padding: 0, fontFamily: 'Arial, sans-serif' }}>
      
      {/* NAVBAR - Întins pe tot ecranul */}
      <nav style={{ 
        width: '100%', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '15px 10%', 
        backgroundColor: '#fff',
        borderBottom: '1px solid #eee',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div style={{ fontWeight: 'bold', fontSize: '1.8rem', color: '#d32f2f', cursor: 'pointer' }}>
          CAR<span style={{ color: '#333' }}>FIX</span>
        </div>
        
        {/* Link-uri care acum "lucrează" (la click dau un mesaj) */}
        <div style={{ display: 'flex', gap: '30px', fontWeight: 'bold', color: '#444', cursor: 'pointer' }}>
          <span onClick={() => handleNav('Acasa')}>ACASĂ</span>
          <span onClick={() => handleNav('Servicii')}>SERVICII ⌄</span>
          <span onClick={() => handleNav('Despre')}>DESPRE NOI</span>
          <span onClick={() => handleNav('Recenzii')}>RECENZII</span>
          <span onClick={() => handleNav('Contact')}>CONTACT</span>
        </div>

        <button 
          onClick={() => handleNav('Contact')}
          style={{ backgroundColor: '#ff4d29', color: '#fff', border: 'none', padding: '12px 25px', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          Contactează-ne
        </button>
      </nav>

      {/* CONȚINUT CENTRAT */}
      <main style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '60px 20px',
        textAlign: 'center' 
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '10px', color: '#222' }}>Bun venit în atelierul nostru!</h1>
        <p style={{ maxWidth: '800px', color: '#666', fontSize: '1.2rem', marginBottom: '40px' }}>
          Știm cât de importantă este siguranța ta la drum. Echipa noastră te primește cu profesionalism și soluții rapide pentru orice problemă tehnică.
        </p>

        {/* CARDUL CENTRAT: Cu ce te putem ajuta? */}
        <div style={{ 
          maxWidth: '600px', 
          width: '100%',
          padding: '40px', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)', 
          borderRadius: '20px', 
          backgroundColor: '#fff',
          borderLeft: '5px solid #ff4d29',
          textAlign: 'left' // Textul din interiorul cardului rămâne la stânga pentru citire ușoară
        }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#222' }}>Cu ce te putem ajuta?</h3>
          <p style={{ fontStyle: 'italic', color: '#ff4d29', fontWeight: 'bold', marginBottom: '15px' }}>
            Echipa noastră se ocupă de orice problemă, de la diagnoză la mecanica grea.
          </p>
          <p style={{ color: '#555', lineHeight: '1.6' }}>
            Te așteptăm la noi pentru a-ti pune mașina la punct rapid și corect.
          </p>
        </div>
      </main>

    </div>
  );
}

export default App;