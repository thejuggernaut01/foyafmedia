import { location, mail, phone } from "../Components/UI/svg";

const ContactUsPage = () => {
  return (
    <>
      <section className="pb-10 pt-10 xs:ml-20 xs:mr-16 md:ml-5 lg:ml-24">
        <h1 className="opacity-90 text-3xl font-bold pb-5">CONTACT US</h1>
        <div className="md:flex">
          <main className="pb-5 md:pr-6 lg:pr-20">
            <div className="flex items-center pb-3">
              <h6 className="xs:w-24 sm:w-16 md:w-24 h-13 mr-5 pt-2 pb-2 pl-3 pr-3 text-3xl  text-blue-900 border border-blue-900 rounded-lg">
                {location}
              </h6>
              <div>
                <h1 className="font-medium opacity-90">ADDRESS</h1>
                <p>36, Orimolade estate ikeja, Lagos State, Nigeria</p>
              </div>
            </div>
            <div className="flex items-center pb-3">
              <h6 className="w-16 h-13 mr-4 pt-2 pb-2 pl-3 pr-3 text-3xl  text-blue-900 border border-blue-900 rounded-lg">
                {phone}
              </h6>
              <div>
                <h1 className="font-medium opacity-90">PHONE</h1>
                <p>+234-818-6543-308</p>
                <p>+234-812-4913-868</p>
              </div>
            </div>
            <div className="flex items-center">
              <h6 className="w-16 h-13 mr-4 pt-2 pb-2 pl-3 pr-3 text-3xl  text-blue-900 border border-blue-900 rounded-lg">
                {mail}
              </h6>
              <div>
                <h1 className="font-medium opacity-90">EMAIL</h1>
                <p>Afrisplug@gmail.com</p>
                <p>Jason@afrisplug.com</p>
              </div>
            </div>
          </main>

          <form>
            <div className="flex flex-col pb-4">
              <label className="text-lg font-medium" htmlFor="name">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                className="outline-none border border-gray-500 pl-1 rounded-md sm:mr-48 md:mr-2 lg:mr-40 xl:mr-96 "
              />
            </div>
            <div className="flex flex-col pb-4">
              <label className="text-lg font-medium" htmlFor="email">
                Your Email
              </label>
              <input
                type="text"
                id="email"
                className="outline-none border border-gray-500 pl-1 rounded-md sm:mr-48 md:mr-2 lg:mr-40 xl:mr-96 "
              />
            </div>
            <div className="flex flex-col pb-4">
              <label className="text-lg font-medium" htmlFor="subject">
                Complaint Subject
              </label>
              <input
                type="text"
                id="subject"
                className="outline-none border border-gray-500 pl-1 rounded-md sm:mr-48 md:mr-2 lg:mr-40 xl:mr-96 "
              />
            </div>
            <div className="flex flex-col pb-4">
              <label className="text-lg font-medium" htmlFor="complaint">
                Complaint Details
              </label>
              <textarea
                name="complaint"
                cols="60"
                rows="8"
                className="outline-none border border-gray-500 pl-1 rounded-md sm:mr-48 md:mr-2 lg:mr-40 xl:mr-96"
              ></textarea>
            </div>
            <button className="rounded-full border border-blue-700 pl-4 pr-4 hover:bg-blue-900 hover:text-white">
              Submit
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default ContactUsPage;
