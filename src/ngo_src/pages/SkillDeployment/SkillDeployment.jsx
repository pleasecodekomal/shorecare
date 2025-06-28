import React, { useState } from "react";
import volunteerSkills from "../../data/volunteerskills";
import jsPDF from "jspdf";

const dummyDrives = [
  { id: "dadar_1", name: "Dadar Beach Cleanup" },
  { id: "versova_2", name: "Versova Beach Sweep" },
];

const predictSkillTag = (volunteer) => {
  // Dummy rule-based prediction
  if (volunteer.preferences.includes("Team Lead") && volunteer.experienceYears >= 2) {
    return "Team Lead";
  } else if (volunteer.preferences.includes("First Aid")) {
    return "First Aider";
  } else if (volunteer.preferences.includes("Waste Sorting")) {
    return "Waste Sorter";
  } else {
    return "General Volunteer";
  }
};

const SkillDeployment = () => {
  const [selectedDrive, setSelectedDrive] = useState("");
  const [deploymentList, setDeploymentList] = useState([]);

  const handleDeploy = () => {
    const taggedList = volunteerSkills.map((v) => ({
      ...v,
      assignedRole: predictSkillTag(v),
    }));
    setDeploymentList(taggedList);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Deployment List for ${selectedDrive}`, 10, 20);

    deploymentList.forEach((v, index) => {
      const y = 30 + index * 10;
      doc.text(`${v.name} - ${v.assignedRole}`, 10, y);
    });

    doc.save(`${selectedDrive}_deployment.pdf`);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Skill Deployment</h2>

      <div className="mb-4">
        <label className="block mb-2 font-semibold">Select Beach Drive:</label>
        <select
          className="border p-2 rounded w-full max-w-xs"
          value={selectedDrive}
          onChange={(e) => setSelectedDrive(e.target.value)}
        >
          <option value="">Select</option>
          {dummyDrives.map((d) => (
            <option key={d.id} value={d.name}>
              {d.name}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleDeploy}
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 mr-4"
        disabled={!selectedDrive}
      >
        Predict & Tag Skills
      </button>

      {deploymentList.length > 0 && (
        <button
          onClick={handleExportPDF}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Export PDF
        </button>
      )}

      {deploymentList.length > 0 && (
        <div className="mt-6">
          <h3 className="text-2xl font-semibold mb-2">Deployment List:</h3>
          <ul className="space-y-2">
            {deploymentList.map((v) => (
              <li
                key={v.id}
                className="p-4 border rounded shadow flex justify-between items-center"
              >
                <div>
                  <p className="font-bold">{v.name}</p>
                  <p>Preferences: {v.preferences.join(", ")}</p>
                </div>
                <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                  {v.assignedRole}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SkillDeployment;
