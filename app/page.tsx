import AppsAtAGlance from "@/components/home/AppsAtAGlance";
import EnterpriseProjectOverview from "@/components/home/EnterpriseProjectOverview";
import HomeStatusCards from "@/components/home/Home-status";
import RecentActivity from "@/components/home/RecentActivity";
import React from "react";

const page = () => {
  return (
    <div className="p-6 space-y-6">
      <HomeStatusCards />
      <AppsAtAGlance />
      <EnterpriseProjectOverview />
      <RecentActivity />
    </div>
  );
};

export default page;
