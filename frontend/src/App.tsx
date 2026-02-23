function App() {
  // Funcție pentru a derula pagina la secțiunea dorită
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ width: '100%', margin: 0, padding: 0, fontFamily: 'Arial, sans-serif' }}>
      
      {/* NAVBAR - Întins pe tot ecranul */}
      <nav style={{ 
        width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        padding: '15px 10%', backgroundColor: '#fff', borderBottom: '1px solid #eee', 
        position: 'sticky', top: 0, zIndex: 1000 
      }}>
        <div style={{ fontWeight: 'bold', fontSize: '1.8rem', color: '#d32f2f' }}>
          CAR<span style={{ color: '#333' }}>FIX</span>
        </div>
        
        <div style={{ display: 'flex', gap: '30px', fontWeight: 'bold', color: '#444', cursor: 'pointer' }}>
          <span onClick={() => scrollToSection('acasa')}>ACASĂ</span>
          <span onClick={() => scrollToSection('servicii')}>SERVICII ⌄</span>
          <span onClick={() => scrollToSection('despre')}>DESPRE NOI</span>
          <span onClick={() => scrollToSection('recenzii')}>RECENZII</span>
          <span onClick={() => scrollToSection('contact')}>CONTACT</span>
        </div>

        <button 
          onClick={() => scrollToSection('contact')}
          style={{ backgroundColor: '#ff4d29', color: '#fff', border: 'none', padding: '12px 25px', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          Contactează-ne
        </button>
      </nav>

      {/* CONȚINUT CENTRAT */}
      <main style={{ 
        display: 'flex', flexDirection: 'column', alignItems: 'center', 
        padding: '80px 20px', textAlign: 'center' 
      }}>
        <h1 id="acasa" style={{ fontSize: '3rem', color: '#222', marginBottom: '10px' }}>
          Bun venit în atelierul nostru!
        </h1>
        <p style={{ maxWidth: '800px', color: '#666', fontSize: '1.2rem', marginBottom: '50px' }}>
          Știm cât de importantă este siguranța ta la drum. Echipa noastră te primește cu profesionalism și soluții rapide pentru orice problemă tehnică.
        </p>

        {/* CARDUL CENTRAT */}
        <div id="servicii" style={{ 
          maxWidth: '600px', width: '100%', padding: '40px', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)', borderRadius: '20px', 
          backgroundColor: '#fff', borderTop: '5px solid #ff4d29', textAlign: 'center' 
        }}>
          <h3 style={{ fontSize: '1.8rem', marginBottom: '15px', color: '#222' }}>Cu ce te putem ajuta?</h3>
          <p style={{ color: '#ff4d29', fontWeight: 'bold', marginBottom: '15px' }}>
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