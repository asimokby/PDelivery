import React from "react";
import "./About.css";
class About extends React.Component {
  render() {
    return (
      <div>
        <div className="curved-div upper">
          <svg viewBox="0 0 1440 319">
            <path
              fill="#3ac569"
              fillOpacity="1"
              d="M0,32L48,80C96,128,192,224,288,224C384,224,480,128,576,90.7C672,53,768,75,864,96C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
        <div className="curved-div">
          <h1>So Who are we?</h1>
          <p>
            Khaled Yassen and Asem Okby are 2 friends from Istanbul Sehir
            University. They started this project after they ran into lots of
            problems sending packages to their families in Egypt. They took the
            matter into their own hands and created a tool that can help anyone
            deliver and receive pacakges as soon as possible! PDelivery is made
            with love and compassion to facilitate peoples' lives and bring them
            ease.
          </p>
          <svg viewBox="0 0 1440 319">
            <path
              fill="#fff"
              fillOpacity="1"
              d="M0,32L48,80C96,128,192,224,288,224C384,224,480,128,576,90.7C672,53,768,75,864,96C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>
    );
  }
}

export default About;
