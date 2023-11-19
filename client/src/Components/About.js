import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-box">
      <div className="about-data">
        <div className="about-img">
          <img
            src="https://images.unsplash.com/photo-1583468982228-19f19164aee2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=913&q=80"
            alt=""
          />
        </div>
        <div className="about-text">
          <h1 className="about-quotes">
            A reader lives a thousand lives before he dies
          </h1>
          <br />
          <br />
          George R.R. Martin
          <br />
          <br />A Dance with Dragons
        </div>
      </div>
    </div>
  );
}

export default About;
