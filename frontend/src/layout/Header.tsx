
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function Header() {
  return (
    <AppBar position="sticky" sx={{ bgcolor: '#fff', color: '#000', borderBottom: '3px solid #d32f2f' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold', color: '#d32f2f' }}>
          CARFIX SERVICE
        </Typography>
        <Stack direction="row" spacing={2}>
          <Typography sx={{ alignSelf: 'center', fontWeight: 'bold' }}>060 000 000</Typography>
          <Button variant="contained" sx={{ bgcolor: '#d32f2f' }}>PROGRAMARE</Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
