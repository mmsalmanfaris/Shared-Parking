import SideBar from "@/components/admin/SideBar";
import TopBar from "@/components/admin/TopBar";
import { useEffect, useState } from "react";
import AddPackageModel from "@/components/admin/AddPackageModel";
import { toast } from "react-toastify";
import axios from "axios";
import { MdOutlineDelete } from "react-icons/md";

const Packages = () => {
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [packages, setPackages] = useState([]);
    const [selectedPackageId, setSelectedPackageId] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/package/");

                console.log(response);
                if (response.status !== 200) {
                    throw new Error("Failed to fetch packages.");
                }
                setPackages(response.data);
            } catch (error) {
                toast.error("Failed to fetch packages.");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchPackages();
    }, []);


    const handleDeletePackage = async (packageId) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/package/${packageId}`);
            toast.success("Package deleted successfully!");
            setPackages((prev) => prev.filter((pkg) => pkg.id !== packageId));
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.detail || "Failed to delete package.");
        }
    };

    const confirmDelete = () => {
        if (selectedPackageId) {
            handleDeletePackage(selectedPackageId);
            setSelectedPackageId(null);
            setIsDeleteModalOpen(false);
        }
    };


    // Example usage of confirmDelete
    useEffect(() => {
        const modal = document.getElementById("popup-modal");
        if (modal) {
            modal.addEventListener("click", confirmDelete);
        }
        return () => {
            if (modal) {
                modal.removeEventListener("click", confirmDelete);
            }
        };
    }, [selectedPackageId]);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = (formData) => {
        setPackages((prev) => [...prev, { id: Date.now(), ...formData }]);
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 text-white">
                <SideBar />
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-gray-100">
                <TopBar />

                <div className="p-6">
                    <div className="flex justify-end mb-4">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-800"
                        >
                            Add Package
                        </button>
                    </div>

                    <AddPackageModel
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                        onSubmit={handleSubmit}
                    />

                    {loading ? (
                        <div className="text-center col-span-full py-6">
                            <svg aria-hidden="true" class="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                        </div>
                    ) : packages.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {packages.map((p) => (
                                <div
                                    key={p.id}
                                    className="bg-white border shadow rounded-xl overflow-hidden"
                                >
                                    {/* Header */}
                                    <div className="flex justify-between items-center px-4 py-3 bg-gray-50 border-b">
                                        <h2 className="text-lg font-semibold">{p.name || "No Name"}</h2>
                                        <button
                                            onClick={() => {
                                                setSelectedPackageId(p.id);
                                                setIsDeleteModalOpen(true); // ✅ open modal via state
                                            }}
                                            className="text-red-600 hover:text-red-800"
                                            title="Delete"
                                        >
                                            <MdOutlineDelete size={20} />
                                        </button>
                                    </div>

                                    {/* Body */}
                                    <div className="p-4 space-y-2">
                                        <p><strong>Description:</strong> {p.description || "N/A"}</p>
                                        <p><strong>Features:</strong> {p.feature || "N/A"}</p>
                                        <p><strong>Amount:</strong> ${p.amount || "N/A"}</p>
                                        <p><strong>Created:</strong> {p.created_at ? new Date(p.created_at).toLocaleString() : "N/A"}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-6">No packages found.</div>
                    )}
                </div>

                {/* Delete Modal */}
                {isDeleteModalOpen && (
                    <div className="overflow-y-auto overflow-x-hidden fixed flex z-50 justify-center items-center w-full h-full bg-black/60  md:inset-0 h-[calc(100%-1rem)] "
                    >
                        <div className="relative p-4 w-full max-w-md max-h-full">
                            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                                <button
                                    type="button"
                                    className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    onClick={() => { setIsDeleteModalOpen(false) }}
                                >
                                    <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                                <div className="p-4 md:p-5 text-center">
                                    <svg
                                        className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                        />
                                    </svg>
                                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                        Are you sure you want to delete this vehicle?
                                    </h3>
                                    <button
                                        onClick={confirmDelete}
                                        className="text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
                                    >
                                        Yes, I'm sure
                                    </button>
                                    <button
                                        onClick={() => setIsDeleteModalOpen(false)}
                                        className="text-sm px-5 py-2.5 font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100"
                                    >
                                        No, cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Packages;
