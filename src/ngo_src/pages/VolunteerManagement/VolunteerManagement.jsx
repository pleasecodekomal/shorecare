import React, { useState } from "react";
import volunteersdata from "../../data/volunteerattendance";
import QrScanner from "react-qr-scanner";

const drives = [
  { id: "dadar_1", name: "Dadar Beach Cleanup" },
  { id: "versova_2", name: "Versova Beach Sweep" },
];

const VolunteerManagement = () => {
  const [volunteers, setVolunteers] = useState(volunteersdata);
  const [selectedDrive, setSelectedDrive] = useState("");

  const handleQRScan = (scannedQR) => {
    const volunteerIndex = volunteers.findIndex(
      (v) => v.qrCode === scannedQR && v.drivesRegistered.includes(selectedDrive)
    );

    if (volunteerIndex === -1) {
      alert("Invalid QR: Volunteer not registered for this drive!");
      return;
    }

    const updated = [...volunteers];
    const alreadyMarked = updated[volunteerIndex].drivesAttended.includes(selectedDrive);

    if (alreadyMarked) {
      alert("Already marked present!");
      return;
    }

    updated[volunteerIndex].drivesAttended.push(selectedDrive);
    setVolunteers(updated);
    alert(`Attendance marked for ${updated[volunteerIndex].name}`);
  };

  const handleScan = (data) => {
    if (data) {
      handleQRScan(data.text);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const simulateScan = (qrCode) => {
    handleQRScan(qrCode);
  };

  const handleSendAttendanceQR = () => {
    const registeredVolunteers = volunteers.filter((v) =>
      v.drivesRegistered.includes(selectedDrive)
    );

    registeredVolunteers.forEach((v) => {
      // ✅ Construct a secure unique QR: volunteerID + driveID + timestamp
      const qrContent = `${v.qrCode}|${selectedDrive}|${Date.now()}`;
      // ✅ Here you'd send this by SMS/email in real life
      console.log(
        `📤 Sending Attendance QR to ${v.name} (${v.phone}): ${qrContent}`
      );

      // ✅ Demo: open the QR in a new window so you can test scanning
      const encoded = encodeURIComponent(qrContent);
      window.open(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encoded}`);
    });

    alert(`Attendance QR codes "sent" to ${registeredVolunteers.length} volunteers.`);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Volunteer Management</h2>

      <div className="mb-4">
        <label className="block mb-2 font-semibold">Select Drive:</label>
        <select
          className="border p-2 rounded w-full max-w-xs"
          value={selectedDrive}
          onChange={(e) => setSelectedDrive(e.target.value)}
        >
          <option value="">Select</option>
          {drives.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
      </div>

      {selectedDrive && (
        <>
          <button
            onClick={handleSendAttendanceQR}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 mb-4"
          >
            Send Attendance QR
          </button>

          {/* QR Scanner */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Scan Volunteer QR Code</h3>
            <div className="w-64 h-64 border">
              <QrScanner
                delay={500}
                onError={handleError}
                onScan={handleScan}
                style={{ width: "100%" }}
              />
            </div>
          </div>

          <div className="overflow-x-auto mt-6">
            <table className="min-w-full bg-white border rounded-xl shadow">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Phone</th>
                  <th className="px-4 py-3 text-left">Skills</th>
                  <th className="px-4 py-3 text-left">Drives Registered</th>
                  <th className="px-4 py-3 text-left">Drives Attended</th>
                  <th className="px-4 py-3 text-left">Attendance %</th>
                  <th className="px-4 py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {volunteers
                  .filter((v) => v.drivesRegistered.includes(selectedDrive))
                  .map((v) => (
                    <tr key={v.id} className="border-t">
                      <td className="px-4 py-3">{v.name}</td>
                      <td className="px-4 py-3">{v.phone}</td>
                      <td className="px-4 py-3">{v.skills.join(", ")}</td>
                      <td className="px-4 py-3">{v.drivesRegistered.length}</td>
                      <td className="px-4 py-3">{v.drivesAttended.length}</td>
                      <td className="px-4 py-3">
                        {(
                          (v.drivesAttended.length / v.drivesRegistered.length) *
                          100
                        ).toFixed(0)}
                        %
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => simulateScan(v.qrCode)}
                          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                          Simulate QR Scan
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default VolunteerManagement;
