import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { ChevronDown } from "lucide-react";
import { ReportChart } from "@/components/dashboard/ReportChart";
import Analytics  from "@/components/dashboard/Analytics";
import RecentOrders from "@/components/dashboard/RecentOrders";
import TopSellingProducts from "@/components/dashboard/TopSellingProducts";

function Dashboard() {
  return (
    <>
      
        <div className="bg-[#E5E5E5] dark:bg-slate-900 md:w-[calc(100vw-17rem)] w-full h-screen overflow-x-hidden">
          <div className="flex justify-between items-center m-2 md:m-5 mt-0 pt-5 ">
            <div>
              <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Dashboard</h1>
            </div>
            <div className="flex gap-2">
              <div className="flex gap-1 items-center bg-white dark:bg-slate-800 dark:text-slate-200 rounded p-2">
                10-06-21 <ChevronDown />
              </div>
              <div className="flex gap-1 items-center bg-white dark:bg-slate-800 dark:text-slate-200 rounded p-2">
                10-10-21 <ChevronDown />
              </div>
            </div>
          </div>
            <div className="flex md:justify-between md:pr-10 gap-5 mx-2 md:mx-5 max-w-[100vw] md:min-w-full mt-5 overflow-x-auto mb-4">
              <DashboardCard
                title="Saved Products"
                value="178+"
                icon="/icons/icon-1.png"
              />
              <DashboardCard
                title="Stock Products"
                value="20+"
                icon="/icons/icon-2.png"
              />
              <DashboardCard
                title="Sales Products"
                value="190+"
                icon="/icons/icon-3.png"
              />
              <DashboardCard
                title="Job Applications"
                value="12+"
                icon="/icons/icon-4.png"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-7  mx-2 md:mx-5">
              <div className="md:col-span-2">
                <ReportChart />
              </div>
              <div>
                <Analytics />
              </div>
              <div className="mb-5 md:col-span-2">
                <RecentOrders />
              </div>
              <div className="mb-5">
                <TopSellingProducts />
              </div>
            </div>

        </div>
      
    </>
  );
}

export default Dashboard;
