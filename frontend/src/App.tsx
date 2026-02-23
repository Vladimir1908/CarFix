function App() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ width: '100vw', margin: 0, padding: 0, overflowX: 'hidden', fontFamily: 'Arial, sans-serif' }}>
      
      {/* NAVBAR - Butoanele tale sunt aici */}
      <nav style={{ 
        width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        padding: '15px 5%', backgroundColor: '#fff', borderBottom: '1px solid #eee', 
        position: 'sticky', top: 0, zIndex: 1000 
      }}>
        <div style={{ fontWeight: 'bold', fontSize: '1.8rem', color: '#d32f2f' }}>
          CAR<span style={{ color: '#333' }}>FIX</span>
        </div>
        <div style={{ display: 'flex', gap: '25px', fontWeight: 'bold', color: '#444', cursor: 'pointer' }}>
          <span onClick={() => scrollToSection('acasa')}>ACASĂ</span>
          <span onClick={() => scrollToSection('servicii')}>SERVICII</span>
          <span onClick={() => scrollToSection('despre')}>DESPRE NOI</span>
          <span onClick={() => scrollToSection('recenzii')}>RECENZII</span>
          <span onClick={() => scrollToSection('contact')}>CONTACT</span>
        </div>
        <button style={{ backgroundColor: '#ff4d29', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '25px', fontWeight: 'bold', cursor: 'pointer' }}>
          Contactează-ne
        </button>
      </nav>

      {/* SECȚIUNEA HERO */}
      <div style={{ display: 'flex', width: '100%', minHeight: '90vh', flexWrap: 'wrap' }}>
        
        {/* IMAGINE STÂNGA - Acum va folosi mecanic.webp din public */}
        <div style={{ 
          flex: '1 1 500px', 
          minHeight: '600px',
          backgroundImage: 'url("/mecanic.webp")', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          backgroundColor: '#f5f5f5' 
        }}>
        </div>

        {/* TEXT DREAPTA + CARDURI */}
        <div style={{ flex: '1 1 500px', padding: '60px 5%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1 id="acasa" style={{ fontSize: '3.5rem', color: '#222', marginBottom: '20px' }}>
            Bun venit în atelierul nostru!
          </h1>
          <p style={{ color: '#666', fontSize: '1.2rem', marginBottom: '40px', lineHeight: '1.6' }}>
            Știm cât de importantă este siguranța ta la drum. Echipa noastră te primește cu profesionalism și soluții rapide pentru orice problemă tehnică.
          </p>

          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {/* Card 1 */}
            <div style={{ flex: '1', minWidth: '250px', padding: '30px', boxShadow: '0 15px 35px rgba(0,0,0,0.1)', borderRadius: '20px', borderTop: '5px solid #ff4d29' }}>
              <h3 style={{ marginBottom: '10px' }}>Cu ce te putem ajuta?</h3>
              <p style={{ color: '#ff4d29', fontWeight: 'bold' }}>Echipa noastră se ocupă de orice problemă.</p>
              <p style={{ color: '#777' }}>De la diagnoză la mecanica grea.</p>
            </div>

            {/* Card 2 */}
            <div style={{ flex: '1', minWidth: '250px', padding: '30px', boxShadow: '0 15px 35px rgba(0,0,0,0.1)', borderRadius: '20px', borderTop: '5px solid #ff4d29' }}>
              <h3 style={{ marginBottom: '10px' }}>De ce noi?</h3>
              <p style={{ color: '#ff4d29', fontWeight: 'bold' }}>Calitate garantată la orice reparație.</p>
              <p style={{ color: '#777' }}>Piese de origine și specialiști dedicați.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;