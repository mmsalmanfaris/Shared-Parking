import register from "../assets/images/register/register.jpg"

const Login = () => {
    return (

        <form>
            <div className="flex justify-center items-center min-h-screen my-10">
                <form className="flex gap-8 max-w-6xl w-full border rounded-2xl overflow-hidden">
                    {/* Form Content */}
                    <div className="p-10 flex-1">
                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                            {/* Full Name */}
                            <div>
                                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-700">Full Name</label>
                                <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Salman Faris" required />
                            </div>
                            {/* NIC */}
                            <div>
                                <label htmlFor="nic" className="block mb-2 text-sm font-medium text-gray-700">National Identity Card</label>
                                <input type="text" id="nic" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Faris" required />
                            </div>
                            {/* Address */}
                            <div>
                                <label htmlFor="Address" className="block mb-2 text-sm font-medium text-gray-700">House Address</label>
                                <input type="text" id="Address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
                            </div>
                            {/* Contact */}
                            <div>
                                <label htmlFor="Contact" className="block mb-2 text-sm font-medium text-gray-700">Contact</label>
                                <input type="tel" id="Contact" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
                            </div>
                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email Address</label>
                                <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="john.doe@company.com" required />
                            </div>
                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Password</label>
                                <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="•••••••••" required />
                            </div>
                            {/* Vehicle Brand */}
                            <div>
                                <label htmlFor="vehicle_brand" className="block mb-2 text-sm font-medium text-gray-700">Vehicle Brand</label>
                                <input type="text" id="vehicle_brand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Toyota" required />
                            </div>
                            {/* Vehicle Model */}
                            <div>
                                <label htmlFor="vehicle_model" className="block mb-2 text-sm font-medium text-gray-700">Vehicle Model</label>
                                <input type="text" id="vehicle_model" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Corolla" required />
                            </div>
                            {/* Car Color */}
                            <div>
                                <label htmlFor="car_color" className="block mb-2 text-sm font-medium text-gray-700">Car Color</label>
                                <input type="text" id="car_color" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Red" required />
                            </div>
                            {/* Plate Number */}
                            <div>
                                <label htmlFor="plate_number" className="block mb-2 text-sm font-medium text-gray-700">Plate Number</label>
                                <input type="text" id="plate_number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="ABC-1234" required />
                            </div>
                            {/* Number Plate Photo */}
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="file_input">Number Plate Photo</label>
                                <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" id="file_input" type="file" />
                            </div>
                            {/* Car Photos */}
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="file_input">Car Photos (4)</label>
                                <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" id="file_input" type="file" multiple />
                            </div>
                        </div>
                        {/* Terms and Conditions */}
                        <div className="flex items-start mb-6">
                            <div className="flex items-center h-5">
                                <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300" required />
                            </div>
                            <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-700">I agree with the <a href="#" className="text-blue-600 hover:underline">terms and conditions</a>.</label>
                        </div>
                        {/* Submit Button */}
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center">Submit</button>
                    </div>
                    {/* Image Section */}
                    <div className="w-110 hidden lg:block">
                        <img src={register} alt="Login" className="object-cover h-full w-full" />
                    </div>
                </form>
            </div>
        </form>

    )
}

export default Login