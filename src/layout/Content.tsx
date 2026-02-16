import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function Content() {
  return (
    <Box sx={{ width: '100%' }}>
      {/* BANNER MARE - exact ca la Pelikan */}
      <Box 
        sx={{ 
          width: '100%', 
          height: '450px', 
          position: 'relative',
          bgcolor: '#1c1c1c', // Fundal negru până pui poza
          backgroundImage: 'url("/background-service.jpg")', // Numele pozei tale din public
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          px: 8 // Spațiu în stânga textului de pe banner
        }}
      >
        <Box sx={{ maxWidth: '600px', color: '#fff', zIndex: 2 }}>
          <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
            CARFIX SERVICE
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, color: 'rgba(255,255,255,0.8)' }}>
            Întreținere și reparații profesionale cu garanție oficială.
          </Typography>
          <Button variant="contained" size="large" sx={{ bgcolor: '#d32f2f', p: '12px 30px' }}>
            VEZI SERVICIILE
          </Button>
        </Box>
      </Box>

      {/* SECȚIUNE TEXT SUB BANNER */}
      <Box sx={{ p: 8 }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#1c1c1c', mb: 3 }}>
          Expertiza noastră
        </Typography>
        <Typography variant="body1" sx={{ fontSize: '1.3rem', color: '#666', lineHeight: 1.8 }}>
          La CarFix, ne mândrim cu o echipă de specialiști pregătiți să rezolve 
          cele mai complexe probleme mecanice și electrice. Utilizăm doar piese 
          omologate pentru ca siguranța ta să fie pe primul loc.
        </Typography>
      </Box>
    </Box>
  );
}