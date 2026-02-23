import Box from '@mui/material/Box';
import Navigator from './Navigator';
import Header from './Header';
import Content from './Content';

export default function Paperbase() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Box component="nav" sx={{ width: 256, flexShrink: 0 }}>
        <Navigator />
      </Box>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />
        {/* Box-ul de mai jos este acum transparent și fără margini */}
        <Box component="main" sx={{ flex: 1, width: '100%' }}>
          <Content />
        </Box>
      </Box>
    </Box>
  );
}