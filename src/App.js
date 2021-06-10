import "./styles.css";
import Pin from "./Pin";
import District from "./District";
import { useState } from "react";
export default function App() {
  const [dist, setdist] = useState(false);
  const [pin, setpin] = useState(true);
  function func() {
    setdist(true);
    setpin(false);
  }
  function funct() {
    setdist(false);
    setpin(true);
  }
  return (
    <>
      <div className="App">
        <h1>VACCINE SLOT FINDER</h1>
        <h3>#VaccineForIndia</h3>

        <div className="choices">
          <span> Search by-</span>
          <button className="choice-btn" onClick={() => func()}>
            District
          </button>
          <button className="choice-btn" onClick={() => funct()}>
            PinCode
          </button>
        </div>
        {pin ? <Pin /> : <District />}
      </div>
    </>
  );
}
