import { useState } from "react";
import { ChevronDown, ChevronUp, MessageCircle, Download } from "lucide-react";
import safetyProtocols from '../data/safetyProtocols'
const Section = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6 border border-gray-200">
      <button
        className="flex items-center justify-between w-full text-left text-xl font-semibold text-[#005f73]"
        onClick={() => setOpen(!open)}
      >
        {title}
        {open ? <ChevronUp /> : <ChevronDown />}
      </button>
      {open && (
        <div className="mt-4 text-gray-700 space-y-2 text-sm">{children}</div>
      )}
    </div>
  );
};
<br />;
export default function Guidance() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="p-6 bg-[#fdf6e3] min-h-screen relative">
      <br />
      <h2 className="text-3xl font-bold mb-6 text-[#005f73]">
        🧭 Volunteer Guidance
      </h2>
      {/* Sections */}
      <Section title="✅ Task Checklist">
        {[
          "Register & confirm participation via the app",
          "Carry personal protective equipment (gloves, mask)",
          "Report at the designated check-in zone",
          "Follow instructions from on-ground coordinator",
          "Collect & segregate waste in provided bags",
          "Update status and photo after your shift",
        ].map((task, idx) => (
          <label key={idx} className="flex items-center space-x-3 py-1">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-[#0077b6] transition duration-150"
              onChange={(e) =>
                e.target.checked
                  ? e.target.parentElement.classList.add(
                      "line-through",
                      "text-gray-400"
                    )
                  : e.target.parentElement.classList.remove(
                      "line-through",
                      "text-gray-400"
                    )
              }
            />
            <span>{task}</span>
          </label>
        ))}
      </Section>

<Section title="🦺 Safety Protocols">
  <ul className="space-y-3">
    {safetyProtocols.map((item, idx) => (
      <li
        key={idx}
        className="flex items-start justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition"
      >
        <span className="text-gray-800">{item.task}</span>
        <a
          href={item.videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline text-sm hover:text-blue-800"
        >
          ▶️ Watch Video
        </a>
      </li>
    ))}
  </ul>

  {/* Download Manual Button */}
  <div className="mt-6 flex justify-end">
    <a
      href="/manuals/safety_manual.pdf" // 📝 Replace with actual path later
      download
      className="btn-outline flex items-center gap-2"
    >
      <Download size={18} /> Download Manual
    </a>
  </div>
</Section>
      <Section title="♻️ Waste Handling & Segregation">
        <ul className="list-disc pl-5">
          <li>Separate plastic, glass, and metal into color-coded bags</li>
          <li>Use black bags for general waste and biohazards</li>
          <li>Do not mix recyclables with organic waste</li>
          <li>Ensure bags are sealed and placed at collection points</li>
        </ul>
      </Section>

      {/* 📩 Chatbot Toggle */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 bg-[#0077b6] text-white rounded-full p-3 shadow-lg hover:bg-[#023e8a] transition-all z-50"
      >
        <MessageCircle size={24} />
      </button>

      {/* Chatbot Box */}
      {chatOpen && (
        <div className="fixed bottom-20 right-6 bg-white rounded-xl shadow-xl w-72 max-h-[400px] overflow-hidden border border-gray-300 z-50">
          <div className="bg-[#0077b6] text-white p-3 font-semibold">
            🤖 ShoreBot
          </div>
          <div className="p-4 text-sm text-gray-800">
            <p>
              Hi! I’m ShoreBot. Ask me anything about today’s event, safety, or
              checklists!
            </p>
            {/* Add your chatbot embed or logic here */}
            <p className="mt-2 italic text-xs text-gray-500"></p>
          </div>
        </div>
      )}
    </div>
  );
}
