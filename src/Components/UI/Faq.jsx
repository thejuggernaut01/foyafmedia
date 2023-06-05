import React from "react";
import SingleQuestion from "./FaqQuestion";
import classes from "./Faq.module.css";

const FAQ_QUESTION = [
  {
    id: 1,
    title: "Is The Platform Always Open?",
    info: "Yes! Most especially when there are events at hand.",
  },
  {
    id: 2,
    title: "How Do You Guys Distribute Tickets?",
    info: "We mostly distribute e-tickets which enables easy distribution and for security measures. Tickets are only distributed when the organizers of an event ask us explicitly and provide us with hard copy tickets.",
  },
  {
    id: 3,
    title: "How Do I Get A Confirmation & Proof Of Payment?",
    info: "You will receive a message via provided email, to confirm payment. Name of Event, Locations, No. of Ticket Purchased, QR codes, and more will be included in the message",
  },
];

const App = () => {
  return (
    <>
      <main className={classes.main}>
        <div className={classes.container}>
          <h3 className={classes.h3}>Frequently Asked Question</h3>
          <section className="info">
            {FAQ_QUESTION.map((question) => (
              <SingleQuestion key={question.id} {...question} />
            ))}
            <p className="text-lg">
              If you still can’t find an answer to your question, please give
              our Customer Service guys a call on
            </p>
          </section>
        </div>
      </main>
    </>
  );
};
// +2348186543308 or drop us an email at jason@afrisplug.com

export default App;
