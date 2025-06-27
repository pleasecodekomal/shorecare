import React from 'react';

const sponsorLogos = [
  { name: "Tata", img: "/assets/logos/tata.png" },
  { name: "Mahindra", img: "/assets/logos/mahindra.png" },
  { name: "Infosys", img: "/assets/logos/infosys.png" },
];

export default function BrandedVisibility() {
  return (
    <div className="space-y-10">

      {/* Section 1: Sponsor Media Carousel */}
      <div>
        <h3 className="text-xl font-semibold mb-4">🎞️ Sponsor Media Carousel</h3>
        <div className="flex gap-4 overflow-x-auto">
          {sponsorLogos.map((sponsor, index) => (
            <div key={index} className="min-w-[220px] bg-white shadow-md rounded-lg p-4 text-center">
              <img src={sponsor.img} alt={sponsor.name} className="h-20 mx-auto mb-2 object-contain" />
              <p className="font-medium">{sponsor.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Co-branded Kits and Invites */}
      <div>
        <h3 className="text-xl font-semibold mb-4">🎽 Co-Branded Kits & Invites</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#e0f7fa] p-6 rounded-xl shadow">
            <h4 className="text-lg font-medium mb-2">Volunteer T-Shirt Preview</h4>
            <img src="/assets/mockData/tshirt_sample.png" alt="T-shirt" className="rounded-lg" />
          </div>
          <div className="bg-[#fff3e0] p-6 rounded-xl shadow">
            <h4 className="text-lg font-medium mb-2">Invitation Card Sample</h4>
            <img src="/assets/mockData/invite_sample.png" alt="Invite" className="rounded-lg" />
          </div>
        </div>
      </div>

      {/* Section 3: Sponsor Spotlight */}
      <div>
        <h3 className="text-xl font-semibold mb-4">🌟 Sponsor Spotlight</h3>
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
          <p className="text-gray-700">
            <span className="font-semibold text-[#0077b6]">Mahindra Group</span> has supported 12 beach drives across 4 states,
            distributing eco-friendly cleaning kits and bringing in over 200 corporate volunteers. Their consistent support has helped
            recover more than 5,000 kg of coastal waste.
          </p>
        </div>
      </div>
    </div>
  );
}
