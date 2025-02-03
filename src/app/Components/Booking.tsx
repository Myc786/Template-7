import Image from "next/image";
import swi from "@/app/components/public/swi.png";


function BookingSection() {
    return (
        <section className="flex flex-col md:flex-row justify-between items-center p-6 bg-gray-100">
            {/* Pick-Up Form */}
            <div
                className="bg-white p-4 rounded-lg shadow-md flex flex-col "
                style={{ width: "582px", height: "132px" }}
            >
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Pick-Up</h3>
                <form className="space-y-4 w-full">

                    {/* Location, Date, Time in Row */}
                    <div className="grid grid-cols-3 gap-4">
                        {/* Location */}
                        <div>
                            <label className="block text-sm text-gray-500">Locations</label>
                            <select className="w-full p-2 border rounded-lg">
                                <option>Select your city</option>
                                <option>New York</option>
                                <option>Los Angeles</option>
                                <option>San Francisco</option>
                            </select>
                        </div>

                        {/* Date */}
                        <div>
                            <label className="block text-sm text-gray-500">Date</label>
                            <input type="date" className="w-full p-2 border rounded-lg" />
                        </div>

                        {/* Time */}
                        <div>
                            <label className="block text-sm text-gray-500">Time</label>
                            <input type="time" className="w-full p-2 border rounded-lg" />
                        </div>
                    </div>
                </form>
            </div>

            {/* Refresh Icon */}
            <div className="flex justify-center items-center mb-6 md:mb-0">
                <div>
                    <Image src={swi} width={120} height={120} alt="switch"/>
                </div>
            </div>

            {/* Drop-Off Form */}
            <div
                className="bg-white p-4 rounded-lg shadow-md flex flex-col items-"
                style={{ width: "582px", height: "132px" }}
            >

                <h3 className="text-xl font-semibold text-gray-700 mb-2">Drop-Off</h3>
                <form className="space-y-4 w-full">


                    {/* Location, Date, Time in Row */}
                    <div className="grid grid-cols-3 gap-4">
                        {/* Location */}
                        <div>
                            <label className="block text-sm text-gray-500">Locations</label>
                            <select className="w-full p-2 border rounded-lg">
                                <option>Select your city</option>
                                <option>New York</option>
                                <option>Los Angeles</option>
                                <option>San Francisco</option>
                            </select>
                        </div>

                        {/* Date */}
                        <div>
                            <label className="block text-sm text-gray-500">Date</label>
                            <input type="date" className="w-full p-2 border rounded-lg" />
                        </div>

                        {/* Time */}
                        <div>
                            <label className="block text-sm text-gray-500">Time</label>
                            <input type="time" className="w-full p-2 border rounded-lg" />
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default BookingSection;
