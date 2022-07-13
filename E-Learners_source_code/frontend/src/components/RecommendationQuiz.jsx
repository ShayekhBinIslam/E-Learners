import React from "react";
import "../styles/RecommendationQuiz.css";

export default function RecommendationQuiz() {
  return (
    <div className="RQ-container">
      <div className="titleRQ">
        <h3>Take a quiz if you don't know where to start</h3>
      </div>

      <div class="cards-listRQ">
        <div class="cardRQ">
            
          <div class="imggRQ">
            <img
              src={require("../assets/card/algo.png")}
              alt="no internet connection"
            />
          </div>
          <div class="card_titleRQ title-black">
            <h2>Recommnedation Quiz</h2>
          </div>
          <div>
            <h5>Suggestions based on your personalized interest</h5>
          </div>
          <div>
            <button>Start now</button>
          </div>

          <div class="card_imageRQ">
            <img src="https://media.giphy.com/media/10SvWCbt1ytWCc/giphy.gif" />
          </div>
        </div>
      </div>
    </div>
  );
}
