import Footer from "@/components/Footer"
import Header from "@/components/Header"
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


const Package = () => {

    const [loading, setLoading] = useState(true);
    const [packages, setPackages] = useState([]);


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

    return (
        <>
            <Header />

            <div class="space-y-5 px-8 py-12 ms-28 my-20 max-w-7xl">

                {loading ? (
                    <div className="text-center col-span-full py-6">
                        <svg aria-hidden="true" class="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                    </div>
                ) : packages.length > 0 ? (
                    <div className="demo-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {packages.map((p) => (
                            <div key={p.id}
                                class="rounded-[30px] md:rounded-[36px] bg-[#FAFAFA] overflow-hidden border-[1px] border-gray-200 p-8 relative">
                                <div class="h-full z-10 relative">
                                    <div class="flex flex-col flex-1 justify-between h-full space-y-5">
                                        <div class="flex justify-between flex-col">
                                            <div class="text-xl md:text-2xl font-bold text-gray-900 flex justify-between">
                                                <span>{p.name}</span>
                                            </div>
                                            <div class="pt-5 text-gray-500 font-medium text-base space-y-1">
                                                <div class="flex items-center align-bottom"><span class="pt-1.5">Rs.</span>
                                                    <div class="ml-1 mr-2 text-2xl md:text-3xl font-bold text-gray-900"><span>{p.amount}</span>
                                                    </div><span class="pt-1.5">{.00}</span>
                                                </div>
                                            </div>
                                            <div class="">
                                                <ul class="space-y-2 pt-8">
                                                    <li class="flex items-center font-medium space-x-2 text-black">
                                                        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M16.4444 3.03947C15.1056 2.37412 13.5965 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 11.6244 21.9793 11.2537 21.939 10.8889M9 11L12 14L22 4"
                                                                stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                                stroke-linejoin="round"></path>
                                                        </svg><span>{p.description}</span>
                                                    </li>
                                                    <li class="flex items-center font-medium space-x-2 text-black">
                                                        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M16.4444 3.03947C15.1056 2.37412 13.5965 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 11.6244 21.9793 11.2537 21.939 10.8889M9 11L12 14L22 4"
                                                                stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                                stroke-linejoin="round"></path>
                                                        </svg><span>{p.feature}</span>
                                                    </li>
                                                    <li class="flex items-center font-medium space-x-2 text-black">
                                                        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M16.4444 3.03947C15.1056 2.37412 13.5965 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 11.6244 21.9793 11.2537 21.939 10.8889M9 11L12 14L22 4"
                                                                stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                                stroke-linejoin="round"></path>
                                                        </svg><span>{p.feature}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="pt-2">
                                            <a href="/billing" type="button" target="_blank"
                                                class="inline-flex items-center group space-x-2.5 bg-blue-700 text-white py-4 px-5 rounded-2xl cursor-pointer"><span
                                                    class="w-full font-semibold text-base">Select Package</span>
                                                <svg class="inline-block h-6" viewBox="0 0 24 25" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M3 12.4999H21L14 19.4999M14 5.5L18 9.5" stroke="currentColor"
                                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-6">No packages found.</div>
                )}
            </div>
            <Footer />
        </>
    )
}

export default Package