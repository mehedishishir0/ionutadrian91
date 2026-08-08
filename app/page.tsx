import { 
  ShieldAlert, 
  MapPin, 
  HeartPulse, 
  TriangleAlert,
  MapPin as MapPinIcon,
  Users as UsersIcon,
  Calendar as CalendarIcon,
  User as UserIcon,
  LogIn,
  FilePlus2,
  FileEdit,
  Truck,
  CheckCircle2,
  ChevronRight
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="flex-1 p-8 overflow-y-auto bg-[#FDFCF8] text-gray-900 custom-scrollbar">
      
      {/* Top Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-10">
        {/* Card 1 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center relative overflow-hidden h-[140px]">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#10B981]"></div>
          <span className="text-[42px] font-bold text-[#10B981] leading-none mb-2">10</span>
          <span className="text-[12px] font-bold text-gray-800 uppercase tracking-wide">Engineers out today</span>
          <span className="text-[12px] text-gray-500 mt-1">Across all three teams</span>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center relative overflow-hidden h-[140px]">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#3B82F6]"></div>
          <span className="text-[42px] font-bold text-[#3B82F6] leading-none mb-2">15</span>
          <span className="text-[12px] font-bold text-gray-800 uppercase tracking-wide">Home safe</span>
          <span className="text-[12px] text-gray-500 mt-1">34 of 38 engineers in</span>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center relative overflow-hidden h-[140px]">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#F59E0B]"></div>
          <span className="text-[42px] font-bold text-[#F59E0B] leading-none mb-2">321</span>
          <span className="text-[12px] font-bold text-gray-800 uppercase tracking-wide">Still travelling</span>
          <span className="text-[12px] text-gray-500 mt-1">On site or heading home</span>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center relative overflow-hidden h-[140px]">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#0EA5E9]"></div>
          <span className="text-[42px] font-bold text-[#0EA5E9] leading-none mb-2">10</span>
          <span className="text-[12px] font-bold text-gray-800 uppercase tracking-wide">Active Alerts</span>
          <span className="text-[12px] text-gray-500 mt-1">Overdue Or Missed Static</span>
        </div>
      </div>

      {/* Your apps at a glance */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-baseline gap-2">
            <h2 className="text-[18px] font-bold text-gray-900">Your apps at a glance</h2>
            <span className="text-[14px] text-gray-500">- 7 apps - all running</span>
          </div>
          <button className="text-[14px] text-gray-600 hover:text-gray-900 font-medium flex items-center gap-1">
            Manage <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {/* App Card 1 */}
          <div className="bg-white rounded-[20px] p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 border-l-[4px] border-l-[#4381FF] flex flex-col h-[180px]">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#4381FF]">
                  <ShieldAlert className="w-5 h-5 fill-[#4381FF]/20" />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-gray-900 leading-tight">Risk Assessments</h3>
                  <p className="text-[12px] text-gray-400 font-medium">Compliance</p>
                </div>
              </div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#4381FF] shadow-[0_0_8px_rgba(67,129,255,0.7)] mt-1 mr-1"></div>
            </div>
            <div className="flex-1 flex items-center">
              <div className="bg-[#F8F9FA] w-full rounded-xl p-3 flex items-baseline gap-2">
                <span className="text-[28px] font-bold text-gray-900 leading-none">2</span> 
                <span className="text-[14px] text-gray-500 font-medium">ready to sign</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-[12px] mt-4 pt-1">
              <span className="bg-[#E8F8F3] text-[#10B981] px-2.5 py-1 rounded-full font-bold">All signed</span>
              <button className="font-bold text-gray-900 hover:underline">View all</button>
            </div>
          </div>

          {/* App Card 2 */}
          <div className="bg-white rounded-[20px] p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 border-l-[4px] border-l-[#00D0FF] flex flex-col h-[180px]">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-50 flex items-center justify-center text-[#00D0FF]">
                  <MapPin className="w-5 h-5 fill-[#00D0FF]/20" />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-gray-900 leading-tight">Whereabouts</h3>
                  <p className="text-[12px] text-gray-400 font-medium">Work plans</p>
                </div>
              </div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#00D0FF] shadow-[0_0_8px_rgba(0,208,255,0.7)] mt-1 mr-1"></div>
            </div>
            <div className="flex-1 flex items-center">
              <div className="bg-[#F8F9FA] w-full rounded-xl p-3 flex items-baseline gap-2">
                <span className="text-[28px] font-bold text-gray-900 leading-none">8</span> 
                <span className="text-[14px] text-gray-500 font-medium">plans in for today</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-[12px] mt-4 pt-1">
              <span className="text-[#4381FF] font-bold">2 for your OK</span>
              <button className="font-bold text-gray-900 hover:underline">Review plans</button>
            </div>
          </div>

          {/* App Card 3 */}
          <div className="bg-white rounded-[20px] p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 border-l-[4px] border-l-[#FF6B93] flex flex-col h-[180px]">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-[#FF6B93]">
                  <HeartPulse className="w-5 h-5 fill-[#FF6B93]/20" />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-gray-900 leading-tight">Duty of Care</h3>
                  <p className="text-[12px] text-gray-400 font-medium">Lone worker</p>
                </div>
              </div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF6B93] shadow-[0_0_8px_rgba(255,107,147,0.7)] mt-1 mr-1"></div>
            </div>
            <div className="flex-1 flex items-center">
              <div className="bg-[#F8F9FA] w-full rounded-xl p-3 flex items-baseline gap-2">
                <span className="text-[28px] font-bold text-gray-900 leading-none">34/38</span> 
                <span className="text-[14px] text-gray-500 font-medium">home safe</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-[12px] mt-4 pt-1">
              <span className="bg-[#E8F8F3] text-[#10B981] px-2.5 py-1 rounded-full font-bold">4 need attention</span>
              <span className="font-bold text-gray-900">4 alerts</span>
            </div>
          </div>

          {/* App Card 4 */}
          <div className="bg-white rounded-[20px] p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 border-l-[4px] border-l-[#FF5B5B] flex flex-col h-[180px]">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-[#FF5B5B]">
                  <TriangleAlert className="w-5 h-5 fill-[#FF5B5B]/20" />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-gray-900 leading-tight">Incident Reports</h3>
                  <p className="text-[12px] text-gray-400 font-medium">Health & safety</p>
                </div>
              </div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5B5B] shadow-[0_0_8px_rgba(255,91,91,0.7)] mt-1 mr-1"></div>
            </div>
            <div className="flex-1 flex items-center">
              <div className="bg-[#F8F9FA] w-full rounded-xl p-3 flex items-baseline gap-2">
                <span className="text-[28px] font-bold text-gray-900 leading-none">2</span> 
                <span className="text-[14px] text-gray-500 font-medium">open / investigating</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-[12px] mt-4 pt-1">
              <span className="text-[#4381FF] font-bold">1 Riddor</span>
              <button className="font-bold text-gray-900 hover:underline">Review reports</button>
            </div>
          </div>
        </div>
      </div>

      {/* Enterprise Project Overview */}
      <div className="mb-10">
        <h2 className="text-[18px] font-bold text-gray-900 mb-4">Enterprise Project Overview</h2>
        
        <div className="grid grid-cols-4 gap-6">
          {/* Project 1 */}
          <div className="bg-white rounded-[20px] p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-[#FBEBB5] flex flex-col">
            <div className="flex justify-between items-start mb-5">
              <div>
                <h3 className="text-[15px] font-bold text-gray-900 leading-tight">Network Expansion</h3>
                <p className="text-[12px] text-gray-500 mt-1">Fiber Installation</p>
              </div>
              <span className="px-3 py-1.5 bg-[#E8F8F3] text-[#10B981] text-[11px] font-bold rounded-full">Active</span>
            </div>
            <div className="space-y-3 mb-5 flex-1">
              <div className="flex items-center gap-3 text-[13px] text-gray-700">
                <MapPinIcon className="w-[18px] h-[18px] text-gray-400 stroke-[1.5]" /> Manchester
              </div>
              <div className="flex items-center gap-3 text-[13px] text-gray-700">
                <UsersIcon className="w-[18px] h-[18px] text-gray-400 stroke-[1.5]" /> 8 Engineers Assigned
              </div>
            </div>
            <div className="flex items-center gap-2 text-[12px] text-gray-500 pt-4 border-t border-[#FBEBB5]/60 font-medium">
              <CalendarIcon className="w-4 h-4 stroke-[1.5]" /> Due 02 Aug 2026
            </div>
          </div>

          {/* Project 2 */}
          <div className="bg-white rounded-[20px] p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-[#FBEBB5] flex flex-col">
            <div className="flex justify-between items-start mb-5">
              <div>
                <h3 className="text-[15px] font-bold text-gray-900 leading-tight">Server Upgrade</h3>
                <p className="text-[12px] text-gray-500 mt-1">Hardware Replacement</p>
              </div>
              <span className="px-3 py-1.5 bg-[#FFF8ED] text-[#F59E0B] text-[11px] font-bold rounded-full">On Hold</span>
            </div>
            <div className="space-y-3 mb-5 flex-1">
              <div className="flex items-center gap-3 text-[13px] text-gray-700">
                <MapPinIcon className="w-[18px] h-[18px] text-gray-400 stroke-[1.5]" /> Bristol
              </div>
              <div className="flex items-center gap-3 text-[13px] text-gray-700">
                <UsersIcon className="w-[18px] h-[18px] text-gray-400 stroke-[1.5]" /> 5 Technicians Assigned
              </div>
            </div>
            <div className="flex items-center gap-2 text-[12px] text-gray-500 pt-4 border-t border-[#FBEBB5]/60 font-medium">
              <CalendarIcon className="w-4 h-4 stroke-[1.5]" /> Due 15 Sep 2026
            </div>
          </div>

          {/* Project 3 */}
          <div className="bg-white rounded-[20px] p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-[#FBEBB5] flex flex-col">
            <div className="flex justify-between items-start mb-5">
              <div>
                <h3 className="text-[15px] font-bold text-gray-900 leading-tight">Cloud Migration</h3>
                <p className="text-[12px] text-gray-500 mt-1">Data Transfer</p>
              </div>
              <span className="px-3 py-1.5 bg-[#E8F8F3] text-[#10B981] text-[11px] font-bold rounded-full">Active</span>
            </div>
            <div className="space-y-3 mb-5 flex-1">
              <div className="flex items-center gap-3 text-[13px] text-gray-700">
                <MapPinIcon className="w-[18px] h-[18px] text-gray-400 stroke-[1.5]" /> London
              </div>
              <div className="flex items-center gap-3 text-[13px] text-gray-700">
                <UsersIcon className="w-[18px] h-[18px] text-gray-400 stroke-[1.5]" /> 12 Engineers Assigned
              </div>
            </div>
            <div className="flex items-center gap-2 text-[12px] text-gray-500 pt-4 border-t border-[#FBEBB5]/60 font-medium">
              <CalendarIcon className="w-4 h-4 stroke-[1.5]" /> Due 30 Nov 2026
            </div>
          </div>

          {/* Project 4 */}
          <div className="bg-white rounded-[20px] p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-[#FBEBB5] flex flex-col">
            <div className="flex justify-between items-start mb-5">
              <div>
                <h3 className="text-[15px] font-bold text-gray-900 leading-tight">Security Audit</h3>
                <p className="text-[12px] text-gray-500 mt-1">Vulnerability Assessment</p>
              </div>
              <span className="px-3 py-1.5 bg-[#ECFDF5] text-[#059669] text-[11px] font-bold rounded-full">Scheduled</span>
            </div>
            <div className="space-y-3 mb-5 flex-1">
              <div className="flex items-center gap-3 text-[13px] text-gray-700">
                <MapPinIcon className="w-[18px] h-[18px] text-gray-400 stroke-[1.5]" /> Edinburgh
              </div>
              <div className="flex items-center gap-3 text-[13px] text-gray-700">
                <UsersIcon className="w-[18px] h-[18px] text-gray-400 stroke-[1.5]" /> 3 Security Analysts Assigned
              </div>
              <div className="flex items-center gap-3 text-[13px] text-gray-700">
                <UserIcon className="w-[18px] h-[18px] text-gray-400 stroke-[1.5]" /> Supervisor: Sarah Johnson
              </div>
            </div>
            <div className="flex items-center gap-2 text-[12px] text-gray-500 pt-4 border-t border-[#FBEBB5]/60 font-medium">
              <CalendarIcon className="w-4 h-4 stroke-[1.5]" /> Due 10 Oct 2026
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-[18px] font-bold text-gray-900 mb-4">Recent Activity</h2>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="space-y-6">
            
            {/* Activity 1 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-500">
                  <LogIn className="w-4 h-4" />
                </div>
                <span className="text-[14px] text-gray-700">James Whitfield checked in at Manchester North Hub</span>
              </div>
              <span className="text-[13px] text-gray-400 flex items-center gap-1">
                <CalendarIcon className="w-3.5 h-3.5" /> 2 min ago
              </span>
            </div>

            {/* Activity 2 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                  <FilePlus2 className="w-4 h-4" />
                </div>
                <span className="text-[14px] text-gray-700">New assignment created for Priya Chandran</span>
              </div>
              <span className="text-[13px] text-gray-400 flex items-center gap-1">
                <CalendarIcon className="w-3.5 h-3.5" /> 18 min ago
              </span>
            </div>

            {/* Activity 3 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                  <FileEdit className="w-4 h-4" />
                </div>
                <span className="text-[14px] text-gray-700">Fibre Expansion Ph.2 project updated to 41% complete</span>
              </div>
              <span className="text-[13px] text-gray-400 flex items-center gap-1">
                <CalendarIcon className="w-3.5 h-3.5" /> 34 min ago
              </span>
            </div>

            {/* Activity 4 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-500">
                  <Truck className="w-4 h-4" />
                </div>
                <span className="text-[14px] text-gray-700">VAN-025 assigned to Priya Chandran</span>
              </div>
              <span className="text-[13px] text-gray-400 flex items-center gap-1">
                <CalendarIcon className="w-3.5 h-3.5" /> 1 hr ago
              </span>
            </div>

            {/* Activity 5 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <span className="text-[14px] text-gray-700">Risk assessment submitted for Substation Upgrade</span>
              </div>
              <span className="text-[13px] text-gray-400 flex items-center gap-1">
                <CalendarIcon className="w-3.5 h-3.5" /> 2 hrs ago
              </span>
            </div>

            {/* Activity 6 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-500">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-[14px] text-gray-700">Sarah Nkemelu's leave request approved</span>
              </div>
              <span className="text-[13px] text-gray-400 flex items-center gap-1">
                <CalendarIcon className="w-3.5 h-3.5" /> 3 hrs ago
              </span>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
