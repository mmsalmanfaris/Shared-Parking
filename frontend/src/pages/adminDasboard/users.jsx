import SideBar from "@/components/admin/SideBar"
import TopBar from "@/components/admin/TopBar"
import { Link } from "react-router-dom"

const Users = () => {
    return (
        <body class="bg-gray-100">
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

            {/* <script>
                // Dropdown functionality
                document.querySelectorAll('button[aria-controls]').forEach(button => {
                    button.addEventListener('click', () => {
                        const isExpanded = button.getAttribute('aria-expanded') === 'true';
                        const dropdownContent = document.getElementById(button.getAttribute('aria-controls'));

                        button.setAttribute('aria-expanded', !isExpanded);
                        dropdownContent.classList.toggle('hidden');
                        button.querySelector('svg:last-child').classList.toggle('rotate-180');
                    });
                });
            </script> */}
        </body>
    )
}

export default Users