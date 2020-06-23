import React from "react";
import pic from "../../Imgs/undraw_mail1_uab6-removebg-preview.png";
import pic2 from "../../Imgs/undraw_deliveries_131a.png";

class SlideCarousel extends React.Component {
  render() {
    return (
      <div>
        <div className="container" style={{ backgroundColor: "#" }}>
          <div className="row">
            <div className="column-66">
              <h1 className="xlarge-font" style={{ color: "#3ac569" }}>
                <b>
                  <strong>Anytime, Anywhere!</strong>
                </b>
              </h1>
              <h1 className="large-font" style={{ color: "#75757575" }}>
                <b>
                  <strong>How?</strong>
                </b>
              </h1>

              <p>
                PDelivery is a newly innovated way of sending and receiving
                packages. Cargo companies use their customers and charge way too
                much for a simple service. PDelivery allows you to easily search
                for another person who is going on a trip soon, or wants to send
                a package to somewhere. This approach allows for transperancy,
                easy of access, and a win-win sum game!
              </p>
            </div>
            <div className="column-33">
              <img
                src={pic}
                className="img"
                width="550"
                alt="packages pic"
              ></img>
            </div>
          </div>
        </div>
        <svg viewBox="0 0 1440 320">
          <path
            fill="#3ac569"
            fillOpacity="1"
            d="M0,32L26.7,80C53.3,128,107,224,160,245.3C213.3,267,267,213,320,170.7C373.3,128,427,96,480,69.3C533.3,43,587,21,640,48C693.3,75,747,149,800,181.3C853.3,213,907,203,960,192C1013.3,181,1067,171,1120,154.7C1173.3,139,1227,117,1280,90.7C1333.3,64,1387,32,1413,16L1440,0L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"
          ></path>
        </svg>
        <div className="container">
          <div className="row">
            <div className="column-33">
              <img
                src={pic2}
                className="img"
                width="550"
                alt="packages pic"
              ></img>
            </div>
            <div className="column-66">
              <h1 className="xlarge-font" style={{ color: "#3ac569" }}>
                <b>PDelivery</b>
              </h1>
              <h1 className="large-font" style={{ color: "#3F3D56" }}>
                <b>Why Sign up?</b>
              </h1>
              <p>
                Joining our family doesn't only mean that you get to help other
                fellow humans get about their lives. It also means that you
                instantly become a part of who we are. You become your own
                employee and your own boss. Who doesn't want to have that?
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default SlideCarousel;
