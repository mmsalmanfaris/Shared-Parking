import Footer from '@/components/Footer'
import Header from '@/components/Header'

const Contact = () => {
    return (
        <>
            <Header />

            <section class="py-12 bg-gray-50 mt-20">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* <!-- Card 1: Call --> */}
                        <div class="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
                            <div class="flex justify-center items-center h-12 w-12 mx-auto rounded-full bg-blue-500 text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.68l1.284 2.568A2 2 0 0010.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                                </svg>
                            </div>
                            <h3 class="mt-4 text-lg font-semibold text-gray-800">Call Us</h3>
                            <p class="mt-2 text-sm text-gray-500">+1 (234) 567-890</p>
                        </div>

                        {/* <!-- Card 2: Address --> */}
                        <div class="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
                            <div class="flex justify-center items-center h-12 w-12 mx-auto rounded-full bg-green-500 text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 12.414a2 2 0 00-2.828 0l-4.243 4.243a2 2 0 002.828 2.828l4.243-4.243a2 2 0 000-2.828zM19 10v10a2 2 0 01-2 2H7a2 2 0 01-2-2V10"></path>
                                </svg>
                            </div>
                            <h3 class="mt-4 text-lg font-semibold text-gray-800">Address</h3>
                            <p class="mt-2 text-sm text-gray-500">123 Main Street, Suite 4B<br />New York, NY 10001</p>
                        </div>

                        {/* <!-- Card 3: Email --> */}
                        <div class="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
                            <div class="flex justify-center items-center h-12 w-12 mx-auto rounded-full bg-indigo-500 text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                            </div>
                            <h3 class="mt-4 text-lg font-semibold text-gray-800">Email Us</h3>
                            <p class="mt-2 text-sm text-gray-500">info@example.com</p>
                        </div>

                        {/* <!-- Card 4: Location --> */}
                        <div class="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
                            <div class="flex justify-center items-center h-12 w-12 mx-auto rounded-full bg-red-500 text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 12.414a2 2 0 00-2.828 0l-4.243 4.243a2 2 0 002.828 2.828l4.243-4.243a2 2 0 000-2.828zM19 10v10a2 2 0 01-2 2H7a2 2 0 01-2-2V10"></path>
                                </svg>
                            </div>
                            <h3 class="mt-4 text-lg font-semibold text-gray-800">Location</h3>
                            <p class="mt-2 text-sm text-gray-500">Find us on Google Maps</p>
                            <a href="https://maps.google.com" target="_blank" class="mt-2 inline-block text-sm font-medium text-blue-500 hover:text-blue-700">
                                View Map
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section class="py-16 bg-gray-50 mb-20">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 border rounded-2xl flex justify-center items-center">
                        {/* <!-- Left Side: Google Map --> */}
                        <div class="overflow-hidden">
                            <iframe
                                className='rounded-2xl'
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1029.1003855421484!2d81.81827955714586!3d7.436211250071621!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae53fa27974f103%3A0xe6cce1080acb838a!2sDigital%20Partner%20-%20Web%20Solution%20and%20Digital%20Marketing!5e0!3m2!1sen!2slk!4v1745048192968!5m2!1sen!2slk"
                                width="600"
                                height="520"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Google Maps"
                            ></iframe>
                        </div>

                        {/* <!-- Right Side: Contact Form --> */}
                        <div class="p-10">
                            <h2 class="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h2>
                            <form class="space-y-4">
                                <div>
                                    <label for="name" class="sr-only">Name</label>
                                    <input type="text" id="name" placeholder="Your Name"
                                        class="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:border-[#007bff] focus:ring-[#007bff] transition-all duration-300" />
                                </div>
                                <div>
                                    <label for="email" class="sr-only">Email</label>
                                    <input type="email" id="email" placeholder="Your Email"
                                        class="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:border-[#007bff] focus:ring-[#007bff] transition-all duration-300" />
                                </div>
                                <div>
                                    <label for="subject" class="sr-only">Subject</label>
                                    <input type="text" id="subject" placeholder="Subject"
                                        class="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:border-[#007bff] focus:ring-[#007bff] transition-all duration-300" />
                                </div>
                                <div>
                                    <label for="message" class="sr-only">Message</label>
                                    <textarea id="message" rows="5" placeholder="Your Message"
                                        class="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:border-[#007bff] focus:ring-[#007bff] transition-all duration-300 resize-none"></textarea>
                                </div>
                                <button type="submit"
                                    class="w-full px-6 py-3 text-sm font-semibold text-white bg-[#007bff] hover:bg-blue-600 rounded-md transition-all duration-300">
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div >
            </section >


            <Footer />
        </>
    )
}

export default Contact