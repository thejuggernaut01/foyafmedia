import { useState, useContext } from "react";
import classes from "./EventForm.module.css";
import { AuthContext } from "../../store/AuthContext";
import { useNavigate } from "react-router-dom";
import { storage, db } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

const EventForm = (props) => {
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [imageUpload, setImageUpload] = useState("");
  const [eventVenue, setEventVenue] = useState("");
  const [eventOrganizer, setEventOrganizer] = useState("");
  const [eventWebsite, setEventWebsite] = useState("");
  const [eventCost, setEventCost] = useState("");

  const [load, setLoad] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // create events collection
  const eventsCollection = collection(db, "events");

  const submitEventHandler = async (event) => {
    event.preventDefault();
    if (currentUser) {
      // Upload image to fire-storage
      try {
        setLoad(true);
        if (imageUpload === "") return;
        const randomFilename = Math.random().toString(36).substring(2);
        const imageRef = ref(storage, `images/${imageUpload + randomFilename}`);
        await uploadBytes(imageRef, imageUpload);

        // retrieve image from fire-storage
        const item = await getDownloadURL(imageRef);
        // add events to the eventsCollection
        await addDoc(eventsCollection, {
          eventTitle,
          eventDescription,
          eventImage: item,
          eventDate,
          eventTime,
          eventVenue,
          eventOrganizer,
          eventWebsite,
          eventCost,
          eventId: eventTitle.split(" ").join("-").toLowerCase(),
        });
        navigate("/");
      } catch (error) {
        console.log(error);
      }
      setLoad(false);
    } else {
      navigate("/user");
    }
  };

  return (
    <>
      <section className="pt-5 pb-10 ">
        <h1 className="font-bold opacity-90 text-3xl text-center pb-5 ">
          Add New Event
        </h1>
        <main className="bg-gray-100 rounded-lg pb-6 xs:ml-10 xs:mr-10 md:ml-28 md:mr-28 lg:ml-48 lg:mr-48">
          <form
            onSubmit={submitEventHandler}
            className="pt-8 xs:pl-10 xs:pr-10 md:pl-14 lg:pl-32"
          >
            {/* Event Title Field */}
            <div className="flex flex-col pb-5">
              <label className="font-semibold text-xl pb-1" htmlFor="">
                Event Title <span className="text-red-800">*</span>
              </label>
              <input
                className="border outline-none h-6 pl-1 rounded-lg md:mr-36 lg:mr-56"
                type="text"
                required
                value={eventTitle}
                onChange={(event) => {
                  setEventTitle(event.target.value);
                }}
              />
            </div>
            {/* Event Description Field */}
            <div className="flex flex-col pb-5">
              <label className="font-semibold text-xl pb-1" htmlFor="">
                Event Description <span className="text-red-800">*</span>
              </label>
              <textarea
                name="description"
                cols="3"
                rows="8"
                required
                className="pl-1 outline-none rounded-lg md:mr-36 lg:mr-56"
                value={eventDescription}
                onChange={(event) => {
                  setEventDescription(event.target.value);
                }}
              ></textarea>
            </div>
            {/* Event Date Field */}
            <div className="flex flex-col pb-5">
              <label className="font-semibold text-xl pb-1">
                Event Date <span className="text-red-800">*</span>
              </label>
              <div className="md:flex flex-row gap-5">
                <div className="pb-2">
                  <input
                    className=" rounded-lg w-[18rem] px-2"
                    type="date"
                    required
                    value={eventDate}
                    onChange={(event) => {
                      setEventDate(event.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            {/* Event Time Field */}
            <div className="flex flex-col pb-5">
              <label className="font-semibold text-xl pb-1">
                Event Time <span className="text-red-800">*</span>
              </label>
              <div className="md:flex flex-row gap-5">
                <div className="pb-2">
                  <input
                    className=" rounded-lg w-[18rem] px-2"
                    type="time"
                    required
                    value={eventTime}
                    onChange={(event) => {
                      setEventTime(event.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            {/* Event Image Field */}
            <div className="flex flex-col pb-5">
              <label htmlFor="images" className={classes["drop-container"]}>
                <span className={classes["drop-title"]}>Drop files here</span>
                or
                <input
                  type="file"
                  id="images"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={(event) => {
                    setImageUpload(event.target.files[0]);
                  }}
                  required
                />
                <p className="text-xs">Choose a .jpg, .png, .jpeg</p>
              </label>
            </div>
            {/* Event Venue Field */}
            <div className="flex flex-col pb-5">
              <label className="font-semibold text-xl pb-1 " htmlFor="">
                Venue Details <span className="text-red-800">*</span>
              </label>
              <input
                className="outline-none h-6 pl-1 rounded-lg md:mr-36 lg:mr-56"
                type="text"
                required
                value={eventVenue}
                onChange={(event) => {
                  setEventVenue(event.target.value);
                }}
              />
            </div>
            {/* Event Organizer Field */}
            <div className="flex flex-col pb-5">
              <label className="font-semibold text-xl pb-1 " htmlFor="">
                Organizer Details <span className="text-red-800">*</span>
              </label>
              <input
                className="outline-none h-6 pl-1 rounded-lg md:mr-36 lg:mr-56"
                type="text"
                required
                value={eventOrganizer}
                onChange={(event) => {
                  setEventOrganizer(event.target.value);
                }}
              />
            </div>
            {/* Event Website Field */}
            <div className="flex flex-col pb-5">
              <label className="font-semibold text-xl pb-1 " htmlFor="">
                Event Website
              </label>
              <input
                className="outline-none h-6 pl-1 rounded-lg md:mr-36 lg:mr-56"
                type="text"
                value={eventWebsite}
                onChange={(event) => {
                  setEventWebsite(event.target.value);
                }}
              />
            </div>
            {/* Event Cost Field */}
            <div className="flex flex-col pb-5">
              <label className="font-semibold text-xl pb-1 " htmlFor="event">
                Event Cost
              </label>
              <input
                className="outline-none h-6 pl-1 rounded-lg md:mr-36 lg:mr-56"
                type="number"
                required
                value={eventCost}
                onChange={(event) => {
                  setEventCost(event.target.value);
                }}
              />
              <p className="text-xs">
                Enter a 0 for free events or leave the field blank
              </p>
            </div>
            <div className="text-center">
              <button
                disabled={load}
                className="border border-blue-900 rounded-lg py-2 px-4 bg-blue-900 text-white hover:scale-105 "
              >
                Submit Event
              </button>
            </div>
          </form>
        </main>
      </section>
    </>
  );
};

export default EventForm;
