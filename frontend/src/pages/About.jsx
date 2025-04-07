import Footer from "@/components/Footer"
import Header from "@/components/Header"

const About = () => {
    return (
        <>
            <Header />

            <section class="overflow-hidden bg-white py-8 sm:py-16">
                <div class="mx-auto max-w-7xl px-6 lg:px-8">
                    <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        <div class="lg:pr-8 lg:pt-4">
                            <div class="lg:max-w-lg mt-15">
                                <h2 class="text-base font-semibold leading-7 text-blue-700">Park faster</h2>
                                <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Redefining Smart Parking</p>
                                <dl class="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                                    <div class="relative pl-9">
                                        <dt class="inline font-semibold text-gray-900"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                            fill="currentColor" aria-hidden="true" class="absolute left-1 top-1 h-5 w-5 text-blue-700">
                                            <path
                                                d="M3.196 12.87l-.825.483a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.758 0l7.25-4.25a.75.75 0 000-1.294l-.825-.484-5.666 3.322a2.25 2.25 0 01-2.276 0L3.196 12.87z">
                                            </path>
                                            <path
                                                d="M3.196 8.87l-.825.483a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.758 0l7.25-4.25a.75.75 0 000-1.294l-.825-.484-5.666 3.322a2.25 2.25 0 01-2.276 0L3.196 8.87z">
                                            </path>
                                            <path
                                                d="M10.38 1.103a.75.75 0 00-.76 0l-7.25 4.25a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.76 0l7.25-4.25a.75.75 0 000-1.294l-7.25-4.25z">
                                            </path>
                                        </svg>Template driven
                                        </dt>
                                        <dd class="inline">Inspired by Sendgrid, Mailchimp, and Postmark, we allow you to create and apply
                                            templated content to your media.
                                        </dd>
                                    </div>
                                    <div class="relative pl-9">
                                        <dt class="inline font-semibold text-gray-900">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                                                class="absolute left-1 top-1 h-5 w-5 text-blue-700">
                                                <path fill-rule="evenodd"
                                                    d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm3.75-2.75a.75.75 0 001.5 0V9.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0l-3.25 3.5a.75.75 0 101.1 1.02l1.95-2.1v4.59z"
                                                    clip-rule="evenodd"></path>
                                            </svg>
                                            Simple, REST
                                        </dt>
                                        <dd class="inline">A simple REST API that allows you to create, generate, and manage your content.</dd>
                                    </div>
                                    <div class="relative pl-9">
                                        <dt class="inline font-semibold text-gray-900"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                            fill="currentColor" aria-hidden="true" class="absolute left-1 top-1 h-5 w-5 text-blue-700">
                                            <path fill-rule="evenodd"
                                                d="M14.5 10a4.5 4.5 0 004.284-5.882c-.105-.324-.51-.391-.752-.15L15.34 6.66a.454.454 0 01-.493.11 3.01 3.01 0 01-1.618-1.616.455.455 0 01.11-.494l2.694-2.692c.24-.241.174-.647-.15-.752a4.5 4.5 0 00-5.873 4.575c.055.873-.128 1.808-.8 2.368l-7.23 6.024a2.724 2.724 0 103.837 3.837l6.024-7.23c.56-.672 1.495-.855 2.368-.8.096.007.193.01.291.01zM5 16a1 1 0 11-2 0 1 1 0 012 0z"
                                                clip-rule="evenodd"></path>
                                            <path
                                                d="M14.5 11.5c.173 0 .345-.007.514-.022l3.754 3.754a2.5 2.5 0 01-3.536 3.536l-4.41-4.41 2.172-2.607c.052-.063.147-.138.342-.196.202-.06.469-.087.777-.067.128.008.257.012.387.012zM6 4.586l2.33 2.33a.452.452 0 01-.08.09L6.8 8.214 4.586 6H3.309a.5.5 0 01-.447-.276l-1.7-3.402a.5.5 0 01.093-.577l.49-.49a.5.5 0 01.577-.094l3.402 1.7A.5.5 0 016 3.31v1.277z">
                                            </path>
                                        </svg>Developer friendly </dt>
                                        <dd class="inline">Documented and easy to use, we make it easy to integrate with your existing workflow.
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                            <div class="mt-10 flex items-center gap-x-6">
                                <a href="#"
                                    class="rounded-md bg-blue-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-800  focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Start
                                    for one month
                                </a>
                                <a href="#" class="text-sm font-semibold leading-6 text-gray-700">Free Package
                                    <span aria-hidden="true">→</span>
                                </a>
                            </div>
                        </div><img src="https://plus.unsplash.com/premium_photo-1661916866784-cdea580d93f7?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product screenshot" class="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0" width="2432" height="1000" />
                    </div>
                </div>
            </section>


            <section>
                <section class=" my-20">
                    <div class="py-12 bg-white">
                        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                            <div class="lg:text-center">
                                <h2
                                    class="font-heading mb-4 bg-orange-100 text-orange-800 px-4 py-2 rounded-lg md:w-64 md:mx-auto text-xs font-semibold tracking-widest text-black uppercase title-font">
                                    Why choose us?
                                </h2>
                                <p class="font-heading mt-2 text-3xl leading-8 font-semibold tracking-tight text-gray-900 sm:text-4xl">
                                    We know tech, we know finance. We are fintech experts.
                                </p>
                                <p class="mt-4 max-w-2xl text-lg text-gray-500 lg:mx-auto">
                                    We know how to handle taxation for all the
                                    countried we operate in. We care for our users and help them manage cashflows.
                                </p>
                            </div>

                            <div class="mt-10">
                                <dl class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                                    <div class="relative">
                                        <dt>
                                            <div
                                                class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                                                <img src="https://www.svgrepo.com/show/503163/api-settings.svg" />
                                            </div>
                                            <p class="font-heading ml-16 text-lg leading-6 font-bold text-gray-700">Automated Parking</p>
                                        </dt>
                                        <dd class="mt-2 ml-16 text-base text-gray-500">
                                            Lorem ipsum, dolor sit amet consectetur
                                            adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate
                                            blanditiis ratione.
                                        </dd>
                                    </div>
                                    <div class="relative">
                                        <dt>
                                            <div
                                                class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                                                <img src="https://www.svgrepo.com/show/503138/webpack.svg" />
                                            </div>
                                            <p class="font-heading ml-16 text-lg leading-6 font-bold text-gray-700">Flexible Payments
                                            </p>
                                        </dt>
                                        <dd class="mt-2 ml-16 text-base text-gray-500"> Lorem ipsum, dolor sit amet consectetur
                                            adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate
                                            blanditiis ratione.
                                        </dd>
                                    </div>
                                    <div class="relative">
                                        <dt>
                                            <div
                                                class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                                                <img src="https://www.svgrepo.com/show/511771/dashboard-671.svg" />

                                            </div>
                                            <p class="font-heading ml-16 text-lg leading-6 font-bold text-gray-700">Free one day Trail
                                            </p>
                                        </dt>
                                        <dd class="mt-2 ml-16 text-base text-gray-500"> Lorem ipsum, dolor sit amet consectetur
                                            adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate
                                            blanditiis ratione.
                                        </dd>
                                    </div>
                                    <div class="relative">
                                        <dt>
                                            <div
                                                class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                                                <img src="https://www.svgrepo.com/show/76267/free-commercial-label.svg" />

                                            </div>
                                            <p class="font-heading ml-16 text-lg leading-6 font-bold text-gray-700">Multiple Vehicles
                                            </p>
                                        </dt>
                                        <dd class="mt-2 ml-16 text-base text-gray-500"> Lorem ipsum, dolor sit amet consectetur
                                            adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate
                                            blanditiis ratione.
                                        </dd>
                                    </div>
                                </dl>
                            </div>

                        </div>
                    </div>
                </section>
            </section>

            <Footer />
        </>
    )
}

export default About