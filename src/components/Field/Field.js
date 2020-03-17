import React, { useState, useRef } from "react";

import s from "./Field.module.css";

const shortid = require("shortid");

// Arrays of "columns", "rows" and "arrows" can have any number of elements.

const columns = [
  { item: "a" },
  { item: "b" },
  { item: "c" },
  { item: "d" }
  // { item: "e" },
  // { item: "f" }
];
const rows = [
  { item: "1" },
  { item: "2" },
  { item: "3" },
  { item: "4" }
  // { item: "5" },
  // { item: "6" },
  // { item: "7" },
  // { item: "8" },
  // { item: "9" },
  // { item: "10" }
];
const arrows = [
  "down",
  "right",
  "down",
  "right",
  "up",
  "left",
  "down",
  "left",
  "up",
  "right"
  // "right",
  // "up",
  // "left",
  // "down",
  // "left",
  // "up",
  // "right",
  // "right",
  // "up",
  // "left"
];

const Field = () => {
  const [addressStart, setAddressStart] = useState([]);
  const [addressFinish, setAddressFinish] = useState([]);
  const [addressWrong, setAddressWrong] = useState([]);
  const [cellInputStyle, setCellInputStyle] = useState({ zIndex: 3 });
  let [cellSpanStyle, setCellSpanStyle] = useState({ transform: "scale(0)" });
  const addressColumn = useRef(null);
  const addressRow = useRef(null);
  let start = "";
  let finish = "";
  let wrong = "";
  let checked = false;

  function handleChange({ target }) {
    const { value } = target;
    addressStart.length === 0 && setAddressStart(value.split(" "));
    addressColumn.current = value.split(" ")[0];
    addressRow.current = value.split(" ")[1];
    setCellInputStyle({ zIndex: 1 });
  }

  function handleClick({ target }) {
    const { value } = target;
    setAddressWrong(value.split(" "));
    setCellSpanStyle({ transform: "scale(1)" });
  }

  function handleAgain() {
    setAddressStart([]);
    setAddressFinish([]);
    setCellInputStyle({ zIndex: 3 });
    setCellSpanStyle({ transform: "scale(0)" });
    addressColumn.current = null;
    addressRow.current = null;
    start = "";
    finish = "";
    wrong = "";
    checked = false;
  }

  function up(arrow) {
    if (arrow === "up") {
      for (let i = 0; i < rows.length; i += 1) {
        if (addressRow.current === rows[i].item) {
          let index;
          if (i - 1 < 0) {
            index = rows.length - 1;
            addressRow.current = rows[index].item;
            break;
          } else {
            index = i - 1;
            addressRow.current = rows[index].item;
            break;
          }
        }
      }
    }
    installAddresFinish();
  }

  function right(arrow) {
    if (arrow === "right") {
      for (let i = 0; i < columns.length; i += 1) {
        if (addressColumn.current === columns[i].item) {
          let index;
          if (i + 1 > columns.length - 1) {
            index = 0;
            addressColumn.current = columns[index].item;
            break;
          } else {
            index = i + 1;
            addressColumn.current = columns[index].item;
            break;
          }
        }
      }
    }
    installAddresFinish();
  }

  function down(arrow) {
    if (arrow === "down") {
      for (let i = 0; i < rows.length; i += 1) {
        if (addressRow.current === rows[i].item) {
          let index;
          if (i + 1 > rows.length - 1) {
            index = 0;
            addressRow.current = rows[index].item;
            break;
          } else {
            index = i + 1;
            addressRow.current = rows[index].item;
            break;
          }
        }
      }
    }
    installAddresFinish();
  }

  function left(arrow) {
    if (arrow === "left") {
      for (let i = 0; i < columns.length; i += 1) {
        if (addressColumn.current === columns[i].item) {
          let index;
          if (i - 1 < 0) {
            index = columns.length - 1;
            addressColumn.current = columns[index].item;
            break;
          } else {
            index = i - 1;
            addressColumn.current = columns[index].item;
            break;
          }
        }
      }
    }
    installAddresFinish();
  }

  function installAddresFinish() {
    const arr = [];
    arr[0] = addressColumn.current;
    arr[1] = addressRow.current;
    addressColumn.current &&
      addressRow.current &&
      addressFinish.length === 0 &&
      setAddressFinish(arr);
  }

  return (
    <div className={s.field}>
      <h2 className={s.title}>
        By clicking on an arbitrary square you will set the "Start" cell.
        Following the arrows you need to find the "Finish" cell. The "Again"
        button will start all over again.
      </h2>
      <div>
        <ul className={s.addressColumns}>
          {columns.map(column => (
            <li className={s.addressColumn} key={column.item}>
              {column.item}
            </li>
          ))}
        </ul>

        <div style={{ display: "flex" }}>
          <ul className={s.addressRows}>
            {rows.map(row => (
              <li className={s.addressRow} key={row.item}>
                {row.item}
              </li>
            ))}
          </ul>

          <ul
            className={s.cellWrap}
            style={{ width: `${15 * columns.length + columns.length - 1}em` }}
          >
            {rows.map(row => {
              return columns.map(column => {
                start = "";
                finish = "";
                wrong = "";
                checked = false;

                if (
                  addressFinish[0] === column.item &&
                  addressFinish[1] === row.item
                ) {
                  finish = "FINISH";
                } else if (
                  addressStart.length !== 0 &&
                  addressWrong[0] === column.item &&
                  addressWrong[1] === row.item
                ) {
                  wrong = "WRONG";
                }

                if (
                  addressStart[0] === column.item &&
                  addressStart[1] === row.item
                ) {
                  start = "START";
                  checked = true;
                }

                return (
                  <li className={s.cell} key={column.item + row.item}>
                    <input
                      id="cell"
                      className={s.cellInput}
                      style={cellInputStyle}
                      type="checkbox"
                      checked={checked}
                      value={column.item + " " + row.item}
                      onChange={handleChange}
                    />
                    <label htmlFor="cell" className={s.cellLabelStart}>
                      {start}
                    </label>

                    <button
                      type="button"
                      value={column.item + " " + row.item}
                      className={s.cellBtnFinish}
                      onClick={handleClick}
                    >
                      <span style={cellSpanStyle}>{finish || wrong}</span>
                    </button>
                  </li>
                );
              });
            })}
          </ul>
        </div>
      </div>

      <ul className={s.arrowWrap}>
        {arrows.map(arrow => {
          const classArrow = [s.arrow];
          classArrow.push(s[arrow]);

          up(arrow);
          right(arrow);
          down(arrow);
          left(arrow);

          return (
            <li className={classArrow.join(" ")} key={shortid.generate()}>
              <span>&#8679;</span>
            </li>
          );
        })}
      </ul>

      <button className={s.again} type="button" onClick={handleAgain}>
        AGAIN
      </button>
    </div>
  );
};

export default Field;
