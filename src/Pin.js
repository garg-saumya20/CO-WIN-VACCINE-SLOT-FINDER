import { useState } from "react";
import "./styles.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
export default function Pin() {
  const [pin, setPincode] = useState("");
  const [data, setdata] = useState([]);

  const [Loading, setLoading] = useState(false);

  const date = new Date();
  var month = date.getMonth() + 1;
  const year = date.getFullYear();
  var dte = date.getDate();
  if (dte < 10) {
    dte = "0" + dte;
  }
  if (month < 10) {
    month = "0" + month;
  }

  const todaydate = `${dte}-${month}-${year}`;
  const fetchAPI = async () => {
    if (!pin) {
      toast.error("Please enter Pincode");
    } else if (pin.length > 6 || pin.length < 6) {
      toast.error("Pincode should be of 6 digits");
      setPincode("");
    } else {
      setLoading(true);
      const URL = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${todaydate}`;
      const response = await fetch(URL);
      var resJson = await response.json();
      setdata(resJson.sessions);
      setLoading(false);
      toast.success("Data fetched successfully..");
    }
  };

  function FltCV() {
    setdata(
      data.filter((inf) => {
        if (inf.vaccine === "COVAXIN") {
          return inf;
        }
      })
    );
  }
  function FltS() {
    setdata(
      data.filter((inf) => {
        if (inf.vaccine === "SPUTNIK V") {
          return inf;
        }
      })
    );
  }
  function FltCS() {
    setdata(
      data.filter((inf) => {
        if (inf.vaccine === "COVISHIELD") {
          return inf;
        }
      })
    );
  }
  function FltF() {
    setdata(
      data.filter((inf) => {
        if (inf.fee_type === "Free") {
          return inf;
        }
      })
    );
  }
  function FltP() {
    setdata(
      data.filter((inf) => {
        if (inf.fee_type === "Paid") {
          return inf;
        }
      })
    );
  }
  function FltY() {
    setdata(
      data.filter((inf) => {
        if (inf.min_age_limit === 18) {
          return inf;
        }
      })
    );
  }
  function FltO() {
    setdata(
      data.filter((inf) => {
        if (inf.min_age_limit === 45) {
          return inf;
        }
      })
    );
  }
  function FltA() {
    setdata(
      data.filter((inf) => {
        if (inf.available_capacity !== 0) {
          return inf;
        }
      })
    );
  }
  function FltDO() {
    setdata(
      data.filter((inf) => {
        if (inf.available_capacity_dose1 !== 0) {
          return inf;
        }
      })
    );
  }
  function FltDT() {
    setdata(
      data.filter((inf) => {
        if (inf.available_capacity_dose2 !== 0) {
          return inf;
        }
      })
    );
  }
  return (
    <>
      <div className=" bigbox">
        <h3> Enter your pincode:</h3>
        <div className="top">
          <input
            onChange={(e) => setPincode(e.target.value)}
            className="input"
            type="number"
            placeholder="Enter 6 digit pincode"
          />
          <button className="search" onClick={() => fetchAPI()}>
            {" "}
            Search
          </button>
        </div>
        <div className="warning">
          <p>
            The data is sourced real-time from Co-WIN.Please use the Co-Win app
            to book vaccination appointments.
          </p>
        </div>
        <div className="options">
          <button onClick={() => FltCV()} className="btn covaxin">
            Covaxin
          </button>
          <button onClick={(SPUTNIK_V) => FltS()} className="btn sputnik">
            Sputnik V
          </button>
          <button onClick={(COVISHIELD) => FltCS()} className="btn covishield">
            Covishield
          </button>
          <button onClick={(Free) => FltF()} className="btn free">
            Free
          </button>
          <button onClick={(Paid) => FltP()} className="btn paid">
            Paid
          </button>
          <button onClick={(young) => FltY()} className="btn xyz">
            18+
          </button>
          <button onClick={(old) => FltO()} className="btn abc">
            45+
          </button>
          <button
            onClick={(available_capacity_dose1) => FltDO()}
            className="btn dose-1"
          >
            DOSE-1
          </button>
          <button
            onClick={(available_capacity_dose2) => FltDT()}
            className="btn dose-2"
          >
            DOSE-2
          </button>
          <button
            onClick={(available_capacity) => FltA()}
            className="btn avai_slots"
          >
            Availaible Slots
          </button>
        </div>
      </div>
      {/* /* {data.length === 0 ? 
      <p>N/A</p> : 
      (
        <p>Availaible</p> */}
      {Loading && (
        <div className="load">
          <h3>Loading...</h3>
        </div>
      )}

      {data === [] ? (
        <div className="load">
          {" "}
          <h3>Sorry....</h3>{" "}
        </div>
      ) : (
        <div className="container">
          {data.map((element) => (
            <>
              <div className="box">
                <div className="element-box">
                  <h2>{element.name}</h2>

                  <br />
                  <span>{element.address},</span>
                  <br />
                  <spam>{element.district_name},</spam>
                  <br />
                  <spam>{element.state_name}</spam>
                  <br />
                  <span>{element.pincode}</span>
                </div>

                {!element.available_capacity ? (
                  <div className="slots_NA">
                    <h3>SLOTS NOT AVAILABLE</h3>
                  </div>
                ) : (
                  <div className="slots">
                    <h2>{element.available_capacity} slots</h2>
                  </div>
                )}
                <div className="age_limit">
                  <h3>Age Limit : {element.min_age_limit}</h3>
                </div>
                <div className="vaccine">
                  <h3>{element.vaccine}</h3>
                </div>

                {element.fee_type === "Free" ? (
                  <div className="vaccine_free">
                    <h3>Free</h3>
                  </div>
                ) : (
                  <div className="vaccine_paid">
                    <h3>Paid</h3>
                  </div>
                )}
              </div>
            </>
          ))}
        </div>
      )}

      <div className="footer">
        <h3>
          Copyright © 2021 All rights reserved.
          <br />
          Made by Saumya Garg
          <br />
        </h3>
      </div>
    </>
  );
}
