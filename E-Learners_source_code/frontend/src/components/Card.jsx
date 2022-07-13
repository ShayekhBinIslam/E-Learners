import React from "react";
import "../styles/Card.css";

export default function Card() {
  return (
    <div className="card-container">
      <div className="cards-list">
        <div className="card 1">

          <div className="imgg">
            <img
              src={require("../assets/card/web.png")}
              alt="no internet connection"
            />
          </div>

          <div className="card_title title-black">
            <p>Web Dev</p>
          </div>
        </div>

        <div className="card 2">
          <div className="imgg">
            <img
              src={require("../assets/card/math.png")}
              alt="no internet connection"
            />
          </div>
          <div className="card_title title-black">
            <p>Programming</p>
          </div>
        </div>

        <div className="card 3">

          <div className="imgg">
            <img
              src={require("../assets/card/design.png")}
              alt="no internet connection"
            />
          </div>
          <div className="card_title title-black">
            <p>Design</p>
          </div>
        </div>

        <div className="card 4">

          <div className="imgg">
            <img
              src={require("../assets/card/algo.png")}
              alt="no internet connection"
            />
          </div>
          <div className="card_title title-black">
            <p>Algorithm</p>
          </div>
        </div>
      </div>
    </div>
  );
}
