import { Link } from "react-router-dom";

import classes from "./EventsList.module.css";

export default function EventsList({ events }) {
  return (
    <>
      <div className={classes.container}>
        {events.map((event) => (
          <div className={classes.card} key={event.id}>
            <img
              src={event.eventImage}
              alt={"Lagos Island Party Art"}
              className={classes["card-img"]}
            />
            <div className={classes["card-body"]}>
              <h3 className={classes["card-title"]}>{event.eventTitle}</h3>
              <p className={classes["card-text"]}>{event.eventDescription}</p>
              <Link
                to={`event/${event.eventId}`}
                className={classes["card-btn"]}
              >
                Check Event
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
