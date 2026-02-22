export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="card">Doctor Approval</div>
        <div className="card">ERP Control</div>
        <div className="card">Finance</div>
        <div className="card">Analytics</div>
      </div>
    </div>
  );
}
