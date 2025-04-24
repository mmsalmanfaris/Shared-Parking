
import ReportTabs from "@/components/admin/report/ReportTabs";
import SideBar from "@/components/admin/SideBar"
import TopBar from "@/components/admin/TopBar"
import { useState } from "react";


const Reports = () => {


    return (
        <div class="flex h-screen">
            {/* <!-- Sidebar --> */}
            <aside class="w-64 bg-gray-900 text-white">
                <SideBar />
            </aside>

            {/* Main Content */}
            <main className="flex-1">
                <TopBar />

                <div className="w-full">
                    <ReportTabs />
                </div>
            </main>
        </div>
    )
}

export default Reports