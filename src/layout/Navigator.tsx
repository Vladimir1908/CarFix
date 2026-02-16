import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export default function Navigator() {
  return (
    <Drawer variant="permanent" PaperProps={{ sx: { width: 256, bgcolor: '#1c1c1c', color: '#fff' } }}>
      <List>
        <ListItemText primary="SERVICII" sx={{ p: 2, color: '#d32f2f' }} />
        {['Mecanică Auto', 'Diagnoză', 'Schimb Ulei'].map((text) => (
          <ListItemButton key={text}>
            <ListItemText primary={text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}