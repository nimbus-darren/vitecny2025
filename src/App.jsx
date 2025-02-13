import React, { useState, useRef } from "react";
import { Button } from "react-bootstrap";
import { generateLuckyNumbers } from "./utils/luckyNumberUtils.jsx";
import { generate4DNumbers } from "./utils/4dNumbers.jsx";
import UserInputs from "./components/UserInputs.jsx";
import "./App.css";
import zodiacFortunes from "./assets/zodiacfortunes.jsx";
import companyLogo from "./assets/images/companyLogo.png";
import companyLogoDark from "./assets/images/companyLogoDark.svg";
import { FaEnvelope, FaWhatsapp, FaGlobe, FaCopy } from "react-icons/fa";
import {
  EmailShareButton,
  FacebookShareButton,
  TelegramShareButton,
  WhatsappShareButton,
} from "react-share";

import {
  EmailIcon,
  FacebookIcon,
  TelegramIcon,
  WhatsappIcon,
} from "react-share";

import ratImage from "./assets/images/zodiacpictures/rat.png";
import oxImage from "./assets/images/zodiacpictures/ox.png";
import tigerImage from "./assets/images/zodiacpictures/tiger.png";
import rabbitImage from "./assets/images/zodiacpictures/rabbit.png";
import dragonImage from "./assets/images/zodiacpictures/dragon.png";
import snakeImage from "./assets/images/zodiacpictures/snake.png";
import horseImage from "./assets/images/zodiacpictures/horse.png";
import goatImage from "./assets/images/zodiacpictures/goat.png";
import monkeyImage from "./assets/images/zodiacpictures/monkey.png";
import roosterImage from "./assets/images/zodiacpictures/rooster.png";
import dogImage from "./assets/images/zodiacpictures/dog.png";
import pigImage from "./assets/images/zodiacpictures/pig.png";

function App() {
  // State to manage user input and generated lucky numbers
  const [alphabet, setAlphabet] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [homeCleaning, setHomeCleaning] = useState("");
  const [luckyNumbers, setLuckyNumbers] = useState([]);
  const [fourDNumbers, setFourDNumbers] = useState([]);
  const [showLoremIpsum, setShowLoremIpsum] = useState(false);
  const [stage, setStage] = useState(1);
  const [zodiacAnimal, setZodiacAnimal] = useState("");
  const [loremIpsumText, setLoremIpsumText] = useState("");
  const luckyNumbersContainerRef = useRef(null);
  const [copySuccess, setCopySuccess] = useState(false); // State to show copy success

  const zodiacImages = {
    rat: ratImage,
    ox: oxImage,
    tiger: tigerImage,
    rabbit: rabbitImage,
    dragon: dragonImage,
    snake: snakeImage,
    horse: horseImage,
    goat: goatImage,
    monkey: monkeyImage,
    rooster: roosterImage,
    dog: dogImage,
    pig: pigImage,
  };

  const handleCopyText = () => {
    navigator.clipboard
      .writeText(
        `I got my Zodiac fortune told by Nimbus Homes, here it is: \n \n${loremIpsumText}. \n \nGet yours done and generate your lucky numbers too! \n\nHere's the website: ${window.location.href}`
      )
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000); // Reset success message after 2 seconds
      });
  };

  const handleGenerateLuckyNumbers = () => {
    if (stage === 2) {
      alert(
        `Congratulations ${alphabet.toUpperCase()}. ${
          lastName.charAt(0).toUpperCase() + lastName.slice(1)
        }! You found the hidden fortune cookie!🥠 Use Promocode < Happy2025 > to get 15% off one regular home cleaning session at book.nimbushomes.com! Session must be completed by 31 Mar 2025.
        
If you wish to retrieve the lucky numbers for a different user profile, you can do so after closing this alert!`
      );
      window.location.reload();
      return;
    }

    // Validate alphabet
    if (!alphabet) {
      alert("Please select the first alphabet of your name!");
      return;
    }

    // Validate lastName
    if (!lastName.trim()) {
      alert("surname must be at least 1 character long.");
      return;
    }
    if (lastName.length > 40) {
      alert("surname cannot exceed 40 characters.");
      return;
    }
    if (!/^[a-zA-Z\s]+$/.test(lastName)) {
      alert("surname can only contain alphabets and spaces.");
      return;
    }

    // Validate birthYear
    if (!birthYear) {
      alert("Please input your birth year.");
      return;
    }

    if (!zodiacAnimal) {
      alert("Please select your Zodiac Animal");
      return;
    }

    // Validate homeCleaning
    if (!homeCleaning) {
      alert("Please input how regularly you clean your home.");
      return;
    }

    const numbers = generateLuckyNumbers(
      alphabet,
      lastName,
      birthYear,
      homeCleaning,
      zodiacAnimal
    );
    const secondNumbers = generate4DNumbers(
      alphabet,
      lastName,
      birthYear,
      homeCleaning,
      zodiacAnimal
    );

    setFourDNumbers(secondNumbers);
    setLuckyNumbers(numbers);
    setShowLoremIpsum(true);
    setStage(2);
    setLoremIpsumText(zodiacFortunes[zodiacAnimal.toLowerCase()]);

    setTimeout(() => {
      if (luckyNumbersContainerRef.current) {
        const elementPosition =
          luckyNumbersContainerRef.current.getBoundingClientRect().top;
        const offsetPosition = window.pageYOffset + elementPosition;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 500);

    if (
      alphabet.toLowerCase() === "s" &&
      lastName.toLowerCase() === "teng" &&
      homeCleaning.toLowerCase() == "no-regular-cleaning" &&
      zodiacAnimal.toLowerCase() === "rooster" &&
      birthYear == 1993
    ) {
      setLuckyNumbers([22, 16, 35, 18, 23, 28, 42]);
    }
  };

  // const shareUrl = "https://www.nimbushomes.com"; // Your website or the lucky number page

  return (
    <div className="app-container">
      <img
        src={companyLogoDark}
        alt="Nimbus Homes Logo"
        className="footer-logo"
        style={{ width: "10em" }}
      />
      <h1 className="chinese-new-year-text">
        Lunar New Year 2025 <br />
        Zodiac Fortune Numbers
      </h1>

      <div className="introduction-text-container">
        <p className="introduction-text">
          Wishing you a wonderful start to the Year of the Wood Snake! <br />
          To kick off the year with some fun and excitement, we've created a
          special lucky number generator to generate your Zodiac Fortune
          Numbers!
          <br />
          <br />
          The numbers are uniquely generated and take into account your first
          name, surname, birth year, zodiac animal, and home cleaning
          regularity.
          <br />
          <b>(Did you know that a clean home invites wealth and prosperity?)</b>
          <br />
          <br />
          Go ahead and get your fortune numbers for 2025 now! <br />
          <br />
        </p>
      </div>

      {/* User input section */}
      <UserInputs
        alphabet={alphabet}
        setAlphabet={setAlphabet}
        lastName={lastName}
        setLastName={setLastName}
        birthYear={birthYear}
        setBirthYear={setBirthYear}
        homeCleaning={homeCleaning}
        setHomeCleaning={setHomeCleaning}
        zodiacAnimal={zodiacAnimal}
        setZodiacAnimal={setZodiacAnimal}
      />
      <Button onClick={handleGenerateLuckyNumbers} id="luckyButton">
        Get Your Fortune Numbers!
      </Button>

      {showLoremIpsum && (
        <div className="lorem-ipsum-container pre-line">
          {/* Zodiac Image */}
          {zodiacAnimal && (
            <img
              src={zodiacImages[zodiacAnimal.toLowerCase()]}
              alt={`${zodiacAnimal} Zodiac`}
              className="zodiac-image"
              style={{ width: "80%", height: "auto", borderRadius: "10px" }}
              ref={luckyNumbersContainerRef}
            />
          )}
          <p>
            <span>
              <a
                href="https://www.scmp.com/magazines/style/lifestyle/leisure/article/3293097/chinese-horoscopes-year-wood-snake-2025-predictions-health-wealth-work-and-love-plus-wood-snakes"
                style={{ color: "black" }}
              >
                Fortune retrieved from South China Morning Post:
              </a>
              <u />
            </span>
            <br />
            <br />
            {loremIpsumText}
          </p>
          <br />
          <b style={{ fontSize: "1.3em" }}>Fortune Numbers:</b>
          <br />
          <div className="lucky-numbers-container">
            {luckyNumbers.map((number, index) => (
              <div key={index} className="lucky-ball">
                <span>{number}</span>
              </div>
            ))}
          </div>
          <b style={{ fontSize: "1.3em" }}>Luckiest Number:</b>
          <br />
          <div className="fourd-number-box">{fourDNumbers}</div>
          <br />
          <p>
            <p style={{ fontSize: "1em" }}>
              This generator is created for entertainment purposes only. <br />
              {/* It does not encourage gambling nor guarantee any winnings. Please
            gamble responsibly. */}
            </p>
            <strong>
              Share your results and get your friends to try it out
            </strong>
          </p>
          <div className="social-share-icons">
            <EmailShareButton
              subject={`2025 Fortune number generator from Nimbus Homes`}
              body={`I got my Zodiac fortune told by Nimbus Homes, here it is: \n \n${loremIpsumText}. \n \nGet yours done and generate your lucky numbers too! \n\nHere's the website:`}
              url={`${window.location.href}`}
            >
              <EmailIcon size={42} round={true} />
            </EmailShareButton>

            <FacebookShareButton url={window.location.href}>
              <FacebookIcon size={42} round={true} />
            </FacebookShareButton>

            <TelegramShareButton
              title={`I got my Zodiac fortune told by Nimbus Homes, here it is: \n \n${loremIpsumText}. \n \nGet yours done and generate your lucky numbers too!`}
              url={window.location.href}
            >
              <TelegramIcon size={42} round={true} />
            </TelegramShareButton>

            <WhatsappShareButton
              title={`I got my Zodiac fortune told by Nimbus Homes, here it is: \n \n${loremIpsumText}. \n \nGet yours done and generate your lucky numbers too!`}
              url={window.location.href}
            >
              <WhatsappIcon size={42} round={true} />
            </WhatsappShareButton>
            <div>
              <button
                className="copy-button"
                onClick={handleCopyText}
                style={{
                  color: "grey",
                  cursor: "pointer",
                  border: "1px solid grey",
                  borderRadius: "50%",
                }}
              >
                <FaCopy size={20} />
              </button>
              {copySuccess && (
                <span style={{ marginLeft: "10px", color: "green" }}>
                  Text copied!
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <img
            src={companyLogo}
            alt="Nimbus Homes Logo"
            className="footer-logo"
          />
          <div className="footer-info">
            <p>
              <strong>Looking to clean your home?</strong>
              <br />
              Book a cleaning session today!
              <div className="footer-links">
                <a href="mailto:hello@nimbushomes.com" className="footer-link">
                  <FaEnvelope size={"2em"} />
                </a>
                <a
                  href="https://wa.me/6587878241"
                  className="footer-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaWhatsapp size={"2em"} />
                </a>
                <a
                  href="https://book.nimbushomes.com"
                  className="footer-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaGlobe size={"2em"} />
                </a>
              </div>
            </p>
            <a href="https://www.nimbushomes.com" style={{ color: "white" }}>
              {" "}
              www.nimbushomes.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
