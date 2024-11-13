import { useEffect, useState } from "react";
import "./App.css";
import arrow2 from "./assets/arrowwww.PNG";
import arrowUp from "./assets/arrow_up.svg";
import arrowDown from "./assets/arrow_down.svg";
function App() {
  const [title, setTitle] = useState("");
  const [dev, setDev] = useState({});
  const [test, setTest] = useState({});
  const [prod, setProd] = useState({});
  const [norm, setNorm] = useState(0);

  const changeDevTest =
    test?.front + test?.back + test?.db - (dev?.front + dev?.back + dev?.db);

  const changeTestProd =
    prod?.front + prod?.back + prod?.db - (test?.front + test?.back + test?.db);

  function chooseHeight(value) {
    if (norm > 100) return value;
    else return value * 7;
  }
  useEffect(() => {
    fetch("https://rcslabs.ru/ttrp1.json")
      .then((res) => res.json())
      .then((res) => {
        const { title, norm, dev, prod, test } = res;
        setDev(dev);
        setTitle(title);
        setNorm(norm);
        setProd(prod);
        setTest(test);
      });
  }, []);

  return (
    <>
      <h2 className="title">Количество пройденных тестов “{title}”</h2>
      <div className="columns">
        <div className="arrows">
          <div className="arrow__container">
            <img src={arrow2} alt="arrow" className="arrow" />
            <div
              className={`change ${
                changeDevTest === 0
                  ? "equalZero"
                  : changeDevTest > 0
                  ? "positive"
                  : "negative"
              }`}
            >
              {changeDevTest === 0 ? (
                <p></p>
              ) : (
                <img
                  src={changeDevTest > 0 ? arrowUp : arrowDown}
                  alt="arrow"
                />
              )}

              <p>{changeDevTest}</p>
            </div>
          </div>
          <div className="arrow__container">
            <img src={arrow2} alt="arrow" className="arrow" />
            <div
              className={`change ${
                changeTestProd === 0
                  ? "equalZero"
                  : changeTestProd > 0
                  ? "positive"
                  : "negative"
              }`}
            >
              {changeTestProd === 0 ? (
                <p></p>
              ) : (
                <img
                  src={changeTestProd > 0 ? arrowUp : arrowDown}
                  alt="arrow"
                />
              )}
              <p>{changeTestProd}</p>
            </div>
          </div>
        </div>
        <div className="columns_row">
          <div className="column">
            <div className="column__data dev">
              <div
                className="column__element front"
                style={{
                  height: `${chooseHeight(dev?.front)}px`,
                  minHeight: "50px",
                  maxHeight: "150px",
                }}
              >
                {dev?.front}
              </div>
              <div
                className="column__element back"
                style={{
                  height: `${chooseHeight(dev?.back)}px`,
                  minHeight: "50px",
                  maxHeight: "150px",
                }}
              >
                {dev?.back}
              </div>
              <div
                className="column__element db"
                style={{
                  height: `${chooseHeight(dev?.db)}px`,
                  minHeight: "50px",
                  maxHeight: "150px",
                }}
              >
                {dev?.db}
              </div>
            </div>
            <p className="column__title">dev</p>
          </div>
          <div className="column">
            <div className="column__data">
              <div
                className="column__element front"
                style={{
                  height: `${chooseHeight(test?.front)}px`,
                  minHeight: "50px",
                  maxHeight: "150px",
                }}
              >
                {test?.front}
              </div>
              <div
                className="column__element back"
                style={{
                  height: `${chooseHeight(test?.back)}px`,
                  minHeight: "50px",
                  maxHeight: "150px",
                }}
              >
                {test?.back}
              </div>
              <div
                className="column__element db"
                style={{
                  height: `${chooseHeight(test?.db)}px`,
                  minHeight: "50px",
                  maxHeight: "150px",
                }}
              >
                {test?.db}
              </div>
            </div>
            <p className="column__title">test</p>
          </div>
          <div className="column">
            <div className="column__data">
              <div
                className="column__element front"
                style={{
                  height: `${chooseHeight(prod?.front)}px`,
                  minHeight: "50px",
                  maxHeight: "150px",
                }}
              >
                {prod?.front}
              </div>
              <div
                className="column__element back"
                style={{
                  height: `${chooseHeight(prod?.back)}px`,
                  minHeight: "50px",
                  maxHeight: "150px",
                }}
              >
                {prod?.back}
              </div>
              <div
                className="column__element db"
                style={{
                  height: `${chooseHeight(prod?.db)}px`,
                  minHeight: "50px",
                  maxHeight: "150px",
                }}
              >
                {prod?.db}
              </div>
            </div>
            <p className="column__title">prod</p>
          </div>
          <div className="column">
            <div
              className="column__data norm"
              style={{
                height: `${norm > 100 ? norm : norm * 7}px`,
                minHeight: "50px",
                maxHeight: "150px",
              }}
            >
              <p className="norm__text">{norm}</p>
            </div>
            <p className="column__title">норматив</p>
          </div>
        </div>
      </div>
      <div className="legend">
        <div className="legend__row">
          <div className="legend__square client"></div>
          <p className="legend__text">Клиентская часть</p>
        </div>
        <div className="legend__row">
          <div className="legend__square server"></div>
          <p className="legend__text">Серверная часть</p>
        </div>
        <div className="legend__row">
          <div className="legend__square database"></div>
          <p className="legend__text">База данных</p>
        </div>
      </div>
    </>
  );
}

export default App;
