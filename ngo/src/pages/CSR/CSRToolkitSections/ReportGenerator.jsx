import React from 'react';

export default function ReportGenerator() {
  const handleDownload = () => {
    // Replace with actual file download logic
    const link = document.createElement("a");
    link.href = "/assets/mockData/sample_report.pdf";
    link.download = "CSR_Impact_Report.pdf";
    link.click();
  };

  const handleEmailMock = () => {
    alert("📧 Report emailed to registered CSR contact (mock).");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow border border-gray-200 space-y-6">

      {/* Summary Report Card */}
      <div>
        <h3 className="text-xl font-semibold mb-4">📄 CSR Impact Summary</h3>
        <div className="grid sm:grid-cols-2 gap-6 text-gray-800">
          <div className="p-4 bg-[#f1f9ff] rounded-lg">
            <p className="font-medium">🌊 Total Waste Removed:</p>
            <p className="text-xl font-bold">3,250 kg</p>
          </div>
          <div className="p-4 bg-[#e0f7fa] rounded-lg">
            <p className="font-medium">👥 Volunteer Hours Logged:</p>
            <p className="text-xl font-bold">820 hrs</p>
          </div>
          <div className="p-4 bg-[#fff3e0] rounded-lg">
            <p className="font-medium">🏝️ Drives Sponsored:</p>
            <p className="text-xl font-bold">18 Drives</p>
          </div>
          <div className="p-4 bg-[#f3e8ff] rounded-lg">
            <p className="font-medium">🌿 CO₂ Offset:</p>
            <p className="text-xl font-bold">1,540 kg</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={handleDownload}
          className="bg-[#0077b6] text-white px-6 py-2 rounded-lg hover:bg-[#005f73] transition"
        >
          📥 Download Report (PDF)
        </button>
        <button
          onClick={handleEmailMock}
          className="bg-gray-100 px-6 py-2 rounded-lg border hover:bg-gray-200 transition"
        >
          📧 Email to CSR Contact
        </button>
      </div>

      {/* Optional: Note */}
      <p className="text-sm text-gray-600 mt-2">
        Report includes branding, highlights, and verified impact metrics powered by ShoreCare.
      </p>
    </div>
  );
}
