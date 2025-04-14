import SideBar from "@/components/admin/SideBar"
import TopBar from "@/components/admin/TopBar"
import { Link } from "react-router-dom"

const Users = () => {
    return (
        <div class="flex h-screen">
            {/* <!-- Sidebar --> */}
            <aside class="w-64 bg-gray-900 text-white">
                <SideBar />
            </aside>

            {/* <!-- Main Content --> */}
            <main class="flex-1  bg-gray-100">
                <TopBar />

                <div className="p5">

                </div>
            </main>
        </div>
    )
}

export default Users