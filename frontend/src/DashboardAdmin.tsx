export default function DashboardAdmin({ onLogout }: any) {
  return (
    <div style={{ padding: 40 }}>
      <h1>ADMIN DASHBOARD</h1>

      <button onClick={onLogout}>Logout</button>

      <p>Aici admin poate gestiona serviciile.</p>
    </div>
  );
}