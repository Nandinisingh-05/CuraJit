export default function PatientDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Patient Dashboard</h1>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="card">Appointments</div>
        <div className="card">Video Call</div>
        <div className="card">Prescriptions</div>
        <div className="card">Reports</div>
      </div>
    </div>
  );
}
