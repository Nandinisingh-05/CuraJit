export default function DoctorDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Doctor Dashboard</h1>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="card">Schedule</div>
        <div className="card">Patient Details</div>
        <div className="card">Write Prescription</div>
      </div>
    </div>
  );
}
