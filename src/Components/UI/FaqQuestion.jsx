import React, { useState } from "react";
import classes from "./Faq.module.css";

import { open, close } from "./svg";

const Question = ({ title, info }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className={classes.question}>
      <header onClick={() => setExpanded(!expanded)} className="cursor-pointer">
        <h4 className={`${classes["question-title"]} ${classes.h4}`}>
          {title}
        </h4>
        <button className={classes.btn}>{expanded ? close : open}</button>
      </header>
      {expanded && <p className={classes.p}>{info}</p>}
    </article>
  );
};

export default Question;
