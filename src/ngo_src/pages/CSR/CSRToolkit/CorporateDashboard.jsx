import VolunteerLogs from '../CSRToolkitSections/VolunteerLogs';
import BrandedVisibility from '../CSRToolkitSections/BrandedVisibility';
import ImpactDashboard from '../CSRToolkitSections/ImpactDashboard';
import ReportGenerator from '../CSRToolkitSections/ReportGenerator';
import CampaignScheduler from '../CSRToolkitSections/CampaignScheduler';

export default function CorporateDashboard() {
  return (
    <div className="p-10 bg-[#f9f9f6] min-h-screen space-y-16">
      <h1 className="text-3xl font-bold text-[#005f73] mb-6">🏢 Corporate CSR Dashboard</h1>
      
      {/* Impact Dashboard */}
      <section id="impact">
        <h2 className="text-2xl font-semibold mb-4">📊 Real-Time Impact Overview</h2>
        <ImpactDashboard />
      </section>

      {/* Volunteer Engagement Logs */}
      <section id="logs">
        <h2 className="text-2xl font-semibold mb-4">🧑‍🤝‍🧑 Volunteer Engagement Logs</h2>
        <VolunteerLogs />
      </section>

      {/* Branded Event Visibility */}
      <section id="branding">
        <h2 className="text-2xl font-semibold mb-4">🪧 Branded Event Visibility</h2>
        <BrandedVisibility />
      </section>

      {/* Automated Reports */}
      <section id="reports">
        <h2 className="text-2xl font-semibold mb-4">📄 Automated CSR Reports</h2>
        <ReportGenerator />
      </section>

      {/* Campaign Scheduler */}
      <section id="scheduler">
        <h2 className="text-2xl font-semibold mb-4">📅 CSR Campaign Scheduler</h2>
        <CampaignScheduler />
      </section>
    </div>
  );
}
