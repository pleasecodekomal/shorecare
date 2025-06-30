import React, { useState } from "react";

const predefinedSkills = [
  "Beach Cleaning",
  "Event Coordination",
  "First Aid",
  "Waste Segregation",
  "Photography",
  "Social Media",
];

export default function JoinDriveForm({ driveId, onSuccess }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [customSkills, setCustomSkills] = useState([""]);
  const [motivation, setMotivation] = useState("");
  const [availability, setAvailability] = useState("");

  const toggleSkill = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleCustomSkillChange = (index, value) => {
    const updated = [...customSkills];
    updated[index] = value;
    setCustomSkills(updated);
  };

  const addCustomSkillField = () => {
    if (customSkills.length < 3) setCustomSkills([...customSkills, ""]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const allSkills = [...selectedSkills, ...customSkills.filter((s) => s.trim())];

    const res = await fetch("http://localhost:8001/api/join-drive", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        drive_id: driveId,
        name,
        phone,
        skills: allSkills,
        motivation,
        availability,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("You have joined the drive!");
      if (onSuccess) onSuccess();
    } else {
      alert(data.detail || "Something went wrong.");
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold">Join Drive</h2>

      <input
        type="text"
        placeholder="Full Name"
        className="p-2 border w-full rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="tel"
        placeholder="Phone Number"
        className="p-2 border w-full rounded"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />

      <div>
        <label className="block font-medium mb-1">Select Your Skills (tick max 5):</label>
        <div className="grid grid-cols-2 gap-2 mb-2">
          {predefinedSkills.map((skill) => (
            <label key={skill} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={skill}
                checked={selectedSkills.includes(skill)}
                onChange={() => toggleSkill(skill)}
                disabled={
                  !selectedSkills.includes(skill) && selectedSkills.length >= 5
                }
              />
              <span>{skill}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block font-medium mb-1">Other Skills:</label>
        {customSkills.map((skill, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Custom Skill ${index + 1}`}
            className="p-2 border w-full rounded mb-1"
            value={skill}
            onChange={(e) => handleCustomSkillChange(index, e.target.value)}
          />
        ))}
        {customSkills.length < 3 && (
          <button
            type="button"
            onClick={addCustomSkillField}
            className="text-blue-500 mt-1"
          >
            + Add Custom Skill
          </button>
        )}
      </div>

      <textarea
        placeholder="Why do you want to join? (optional)"
        className="p-2 border w-full rounded"
        value={motivation}
        onChange={(e) => setMotivation(e.target.value)}
      />

      <input
        type="text"
        placeholder="Availability (e.g. weekends only)"
        className="p-2 border w-full rounded"
        value={availability}
        onChange={(e) => setAvailability(e.target.value)}
      />

      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded font-bold"
      >
        Submit
      </button>
    </form>
  );
}
