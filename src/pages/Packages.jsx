import Footer from "@/components/Footer"
import Header from "@/components/Header"

const Phones = () => {
    return (
        <>
            <Header />

            <div class="space-y-5 px-8 py-12 ms-28 my-20 max-w-7xl">
                <div class="demo-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    <div
                        class="rounded-[30px] md:rounded-[36px] bg-[#FAFAFA] overflow-hidden border-[1px] border-gray-200 p-8 relative">
                        <div class="h-full">
                            <div class="h-full z-10 relative">
                                <div class="flex flex-col flex-1 justify-between h-full space-y-5">
                                    <div class="flex justify-between flex-col">
                                        <div class="text-xl md:text-2xl font-bold text-gray-900 flex justify-between">
                                            <span>Day Parking</span>
                                        </div>
                                        <div class="pt-5 text-gray-500 font-medium text-base space-y-1">
                                            <div class="flex items-center align-bottom"><span class="pt-1.5">Rs.</span>
                                                <div class="ml-1 mr-2 text-2xl md:text-3xl font-bold text-gray-900"><span>10000</span>
                                                </div><span class="pt-1.5">per month</span>
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
                                                    </svg><span>Everything in Free</span>
                                                </li>
                                                <li class="flex items-center font-medium space-x-2 text-black">
                                                    <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M16.4444 3.03947C15.1056 2.37412 13.5965 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 11.6244 21.9793 11.2537 21.939 10.8889M9 11L12 14L22 4"
                                                            stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round"></path>
                                                    </svg><span>5,000 events / month</span>
                                                </li>
                                                <li class="flex items-center font-medium space-x-2 text-black">
                                                    <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M16.4444 3.03947C15.1056 2.37412 13.5965 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 11.6244 21.9793 11.2537 21.939 10.8889M9 11L12 14L22 4"
                                                            stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round"></path>
                                                    </svg><span>Unlimited seats</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="pt-2">
                                        <a href="/billing" type="button" target="_blank"
                                            class="appearance-none inline-flex hover:shadow-2xl transition-all duration-300 hover:scale-105 items-center group space-x-2.5 bg-blue-700 text-white py-4 px-5 rounded-2xl cursor-pointer"><span
                                                class="w-full font-semibold text-base">Choose Day</span>
                                            <svg class="inline-block h-6" viewBox="0 0 24 25" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3 12.4999H21L14 19.4999M14 5.5L18 9.5" stroke="currentColor"
                                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                                <div class="hidden">
                                    <ul class="space-y-2 pt-8">
                                        <li class="flex items-center font-medium space-x-2 text-black">
                                            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M16.4444 3.03947C15.1056 2.37412 13.5965 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 11.6244 21.9793 11.2537 21.939 10.8889M9 11L12 14L22 4"
                                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                    stroke-linejoin="round"></path>
                                            </svg><span>Everything in Free</span>
                                        </li>
                                        <li class="flex items-center font-medium space-x-2 text-black">
                                            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M16.4444 3.03947C15.1056 2.37412 13.5965 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 11.6244 21.9793 11.2537 21.939 10.8889M9 11L12 14L22 4"
                                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                    stroke-linejoin="round"></path>
                                            </svg><span>5,000 events / month</span>
                                        </li>
                                        <li class="flex items-center font-medium space-x-2 text-black">
                                            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M16.4444 3.03947C15.1056 2.37412 13.5965 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 11.6244 21.9793 11.2537 21.939 10.8889M9 11L12 14L22 4"
                                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                    stroke-linejoin="round"></path>
                                            </svg><span>Unlimited seats</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="rounded-[30px] md:rounded-[36px] bg-[#FAFAFA] overflow-hidden border-[1px] border-gray-200 p-8 relative">
                        <div class="h-full">
                            <div class="h-full z-10 relative">
                                <div class="flex flex-col flex-1 justify-between h-full space-y-5">
                                    <div class="flex justify-between flex-col">
                                        <div class="text-xl md:text-2xl font-bold text-gray-900 flex justify-between">
                                            <span>Night Parking</span>
                                            <svg class="h-6 w-6 animate-ping-slow text-gray-500" viewBox="0 0 50 50" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M30.5 25C30.5 28.0376 28.0376 30.5 25 30.5C21.9624 30.5 19.5 28.0376 19.5 25C19.5 21.9624 21.9624 19.5 25 19.5C28.0376 19.5 30.5 21.9624 30.5 25Z"
                                                    stroke="currentColor" stroke-opacity="0.7" stroke-width="4"
                                                    stroke-linecap="round" stroke-linejoin="round"></path>
                                                <path
                                                    d="M38.75 25C38.75 32.5939 32.5939 38.75 25 38.75C17.4061 38.75 11.25 32.5939 11.25 25C11.25 17.4061 17.4061 11.25 25 11.25C32.5939 11.25 38.75 17.4061 38.75 25Z"
                                                    stroke="currentColor" stroke-opacity="0.4" stroke-width="4.5"
                                                    stroke-linecap="round" stroke-linejoin="round"></path>
                                                <path
                                                    d="M47.5 25C47.5 37.4264 37.4264 47.5 25 47.5C12.5736 47.5 2.5 37.4264 2.5 25C2.5 12.5736 12.5736 2.5 25 2.5C37.4264 2.5 47.5 12.5736 47.5 25Z"
                                                    stroke="currentColor" stroke-opacity="0.1" stroke-width="5"
                                                    stroke-linecap="round" stroke-linejoin="round"></path>
                                            </svg>
                                        </div>
                                        <div class="pt-5 text-gray-500 font-medium text-base space-y-1">
                                            <div class="flex items-center align-bottom"><span class="pt-1.5">Rs.</span>
                                                <div class="ml-1 mr-2 text-2xl md:text-3xl font-bold text-gray-900"><span>15000</span>
                                                </div><span class="pt-1.5">per month</span>
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
                                                    </svg><span>Everything in Starter</span>
                                                </li>
                                                <li class="flex items-center font-medium space-x-2 text-black">
                                                    <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M16.4444 3.03947C15.1056 2.37412 13.5965 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 11.6244 21.9793 11.2537 21.939 10.8889M9 11L12 14L22 4"
                                                            stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round"></path>
                                                    </svg><span>20,000 events / month</span>
                                                </li>
                                                <li class="flex items-center font-medium space-x-2 text-black">
                                                    <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M16.4444 3.03947C15.1056 2.37412 13.5965 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 11.6244 21.9793 11.2537 21.939 10.8889M9 11L12 14L22 4"
                                                            stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round"></path>
                                                    </svg><span>Unlimited seats</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="pt-2">
                                        <a href="/billing" type="button" target="_blank"
                                            class="appearance-none inline-flex hover:shadow-2xl transition-all duration-300 hover:scale-105 items-center group space-x-2.5 bg-blue-700 text-white py-4 px-5 rounded-2xl cursor-pointer"><span
                                                class="w-full font-semibold text-base">Choose Night</span>
                                            <svg class="inline-block h-6" viewBox="0 0 24 25" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3 12.4999H21L14 19.4999M14 5.5L18 9.5" stroke="currentColor"
                                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                                <div class="hidden">
                                    <ul class="space-y-2 pt-8">
                                        <li class="flex items-center font-medium space-x-2 text-black">
                                            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M16.4444 3.03947C15.1056 2.37412 13.5965 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 11.6244 21.9793 11.2537 21.939 10.8889M9 11L12 14L22 4"
                                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                    stroke-linejoin="round"></path>
                                            </svg><span>Everything in Starter</span>
                                        </li>
                                        <li class="flex items-center font-medium space-x-2 text-black">
                                            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M16.4444 3.03947C15.1056 2.37412 13.5965 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 11.6244 21.9793 11.2537 21.939 10.8889M9 11L12 14L22 4"
                                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                    stroke-linejoin="round"></path>
                                            </svg><span>20,000 events / month</span>
                                        </li>
                                        <li class="flex items-center font-medium space-x-2 text-black">
                                            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M16.4444 3.03947C15.1056 2.37412 13.5965 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 11.6244 21.9793 11.2537 21.939 10.8889M9 11L12 14L22 4"
                                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                    stroke-linejoin="round"></path>
                                            </svg><span>Unlimited seats</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="rounded-[30px] md:rounded-[36px] bg-[#FAFAFA] overflow-hidden border-[1px] border-gray-200 p-8 relative">
                        <div class="h-full">
                            <div class="h-full z-10 relative">
                                <div class="flex flex-col flex-1 justify-between h-full space-y-5">
                                    <div class="flex justify-between flex-col">
                                        <div class="text-xl md:text-2xl font-bold text-gray-900 flex justify-between">
                                            <span>Full Day Parking</span>
                                        </div>
                                        <div class="pt-5 text-gray-500 font-medium text-base space-y-1">
                                            <div class="flex items-center align-bottom"><span class="pt-1.5">Rs.</span>
                                                <div class="ml-1 mr-2 text-2xl md:text-3xl font-bold text-gray-900"><span>20000</span>
                                                </div><span class="pt-1.5">per month</span>
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
                                                    </svg><span>Everything in Startup</span>
                                                </li>
                                                <li class="flex items-center font-medium space-x-2 text-black">
                                                    <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M16.4444 3.03947C15.1056 2.37412 13.5965 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 11.6244 21.9793 11.2537 21.939 10.8889M9 11L12 14L22 4"
                                                            stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round"></path>
                                                    </svg><span>80,000 events / mo</span>
                                                </li>
                                                <li class="flex items-center font-medium space-x-2 text-black">
                                                    <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M16.4444 3.03947C15.1056 2.37412 13.5965 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 11.6244 21.9793 11.2537 21.939 10.8889M9 11L12 14L22 4"
                                                            stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round"></path>
                                                    </svg><span>Unlimited seats</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="pt-2">
                                        <a href="/billing" type="button" target="_blank"
                                            class="appearance-none inline-flex hover:shadow-2xl transition-all duration-300 hover:scale-105 items-center group space-x-2.5 bg-blue-700 text-white py-4 px-5 rounded-2xl cursor-pointer"><span
                                                class="w-full font-semibold text-base">Choose Full Day</span>
                                            <svg class="inline-block h-6" viewBox="0 0 24 25" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3 12.4999H21L14 19.4999M14 5.5L18 9.5" stroke="currentColor"
                                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                                <div class="hidden">
                                    <ul class="space-y-2 pt-8">
                                        <li class="flex items-center font-medium space-x-2 text-black">
                                            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M16.4444 3.03947C15.1056 2.37412 13.5965 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 11.6244 21.9793 11.2537 21.939 10.8889M9 11L12 14L22 4"
                                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                    stroke-linejoin="round"></path>
                                            </svg><span>Everything in Startup</span>
                                        </li>
                                        <li class="flex items-center font-medium space-x-2 text-black">
                                            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M16.4444 3.03947C15.1056 2.37412 13.5965 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 11.6244 21.9793 11.2537 21.939 10.8889M9 11L12 14L22 4"
                                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                    stroke-linejoin="round"></path>
                                            </svg><span>80,000 events / mo</span>
                                        </li>
                                        <li class="flex items-center font-medium space-x-2 text-black">
                                            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M16.4444 3.03947C15.1056 2.37412 13.5965 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 11.6244 21.9793 11.2537 21.939 10.8889M9 11L12 14L22 4"
                                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                    stroke-linejoin="round"></path>
                                            </svg><span>Unlimited seats</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="rounded-[30px] md:rounded-[36px] bg-[#FAFAFA] overflow-hidden border-[1px] border-gray-200 p-8 relative lg:col-span-2">
                        <div class="h-full">
                            <div class="h-full z-10 relative lg:flex lg:justify-between lg:w-full lg:pr-8 lg:items-center">
                                <div class="flex flex-col flex-1 justify-between h-full space-y-5">
                                    <div class="flex justify-between flex-col">
                                        <div class="text-xl md:text-2xl font-bold text-gray-900 flex justify-between">
                                            <span>Free Parking</span>
                                        </div>
                                        <div class="pt-5 text-gray-500 font-medium text-base space-y-1">
                                            <div class="flex items-center align-bottom"><span class="pt-1.5">Rs.</span>
                                                <div class="ml-1 mr-2 text-2xl md:text-3xl font-bold text-gray-900"><span>Free</span>
                                                </div><span class="pt-1.5">per Day</span>
                                            </div>
                                        </div>
                                        <div class="lg:hidden">
                                            <ul class="space-y-2 pt-8 lg:pt-0">
                                                <li class="flex items-center font-medium space-x-2 text-black">
                                                    <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M16.4444 3.03947C15.1056 2.37412 13.5965 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 11.6244 21.9793 11.2537 21.939 10.8889M9 11L12 14L22 4"
                                                            stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round"></path>
                                                    </svg><span>No credit card required</span>
                                                </li>
                                                <li class="flex items-center font-medium space-x-2 text-black">
                                                    <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M16.4444 3.03947C15.1056 2.37412 13.5965 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 11.6244 21.9793 11.2537 21.939 10.8889M9 11L12 14L22 4"
                                                            stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round"></path>
                                                    </svg><span>Free forever</span>
                                                </li>
                                                <li class="flex items-center font-medium space-x-2 text-gray-600">
                                                    <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M16.4444 3.03947C15.1056 2.37412 13.5965 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 11.6244 21.9793 11.2537 21.939 10.8889M9 11L12 14L22 4"
                                                            stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round"></path>
                                                    </svg><span>3 seats</span>
                                                </li>
                                                <li class="flex items-center font-medium space-x-2 text-gray-600">
                                                    <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M16.4444 3.03947C15.1056 2.37412 13.5965 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 11.6244 21.9793 11.2537 21.939 10.8889M9 11L12 14L22 4"
                                                            stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round"></path>
                                                    </svg><span>200 events / month</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="pt-2">
                                        <a href="/billing" type="button" target="_blank"
                                            class="appearance-none inline-flex hover:shadow-2xl transition-all duration-300 hover:scale-105 items-center group space-x-2.5 bg-blue-700 text-white py-4 px-5 rounded-2xl cursor-pointer"><span
                                                class="w-full font-semibold text-base">Choose Free</span>
                                            <svg class="inline-block h-6" viewBox="0 0 24 25" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3 12.4999H21L14 19.4999M14 5.5L18 9.5" stroke="currentColor"
                                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                                <div class="hidden lg:block">
                                    <ul class="space-y-2 pt-8 lg:pt-0">
                                        <li class="flex items-center font-medium space-x-2 text-black">
                                            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M16.4444 3.03947C15.1056 2.37412 13.5965 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 11.6244 21.9793 11.2537 21.939 10.8889M9 11L12 14L22 4"
                                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                    stroke-linejoin="round"></path>
                                            </svg><span>No credit card required</span>
                                        </li>
                                        <li class="flex items-center font-medium space-x-2 text-black">
                                            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M16.4444 3.03947C15.1056 2.37412 13.5965 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 11.6244 21.9793 11.2537 21.939 10.8889M9 11L12 14L22 4"
                                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                    stroke-linejoin="round"></path>
                                            </svg><span>Free forever</span>
                                        </li>
                                        <li class="flex items-center font-medium space-x-2 text-gray-600">
                                            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M16.4444 3.03947C15.1056 2.37412 13.5965 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 11.6244 21.9793 11.2537 21.939 10.8889M9 11L12 14L22 4"
                                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                    stroke-linejoin="round"></path>
                                            </svg><span>3 seats</span>
                                        </li>
                                        <li class="flex items-center font-medium space-x-2 text-gray-600">
                                            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M16.4444 3.03947C15.1056 2.37412 13.5965 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 11.6244 21.9793 11.2537 21.939 10.8889M9 11L12 14L22 4"
                                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                    stroke-linejoin="round"></path>
                                            </svg><span>200 events / month</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="rounded-[30px] md:rounded-[36px] bg-[#FAFAFA] overflow-hidden border-[1px] border-gray-200 p-8 relative sm:col-span-2 lg:col-span-1">
                        <div class="h-full">
                            <div class="flex flex-col justify-between h-full space-y-5">
                                <div class="flex justify-between flex-col">
                                    <div class="text-xl md:text-2xl font-bold text-gray-900 flex justify-between">
                                        <span>Weekend Parking</span>
                                    </div>
                                    <div class="pt-5">Contact us for a custom quote and a custom onboarding process.</div>
                                </div>
                                <div class="pt-2">
                                    <a href="#" type="button"
                                        class="appearance-none inline-flex hover:shadow-2xl transition-all duration-300 hover:scale-105 items-center group space-x-2.5 bg-blue-700 text-white py-4 px-5 rounded-2xl cursor-pointer"><span
                                            class="w-full font-semibold text-base">Contact Sales</span>
                                        <svg class="inline-block h-6" viewBox="0 0 24 25" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3 12.4999H21L14 19.4999M14 5.5L18 9.5" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round"></path>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Phones