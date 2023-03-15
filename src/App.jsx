import React, { useRef } from "react";
import { useState } from "react";
import "./App.css";
import json from "./data.json";
import { FaGlobe, FaLock, FaLockOpen } from "react-icons/fa";
import { BsInfoCircleFill, BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { TbGenderFemale, TbGenderMale } from "react-icons/tb";
import { RiBarChartFill, RiSettings5Fill } from "react-icons/ri";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import ReactFlagsSelect from "react-flags-select";
import Donutchart from "./components/Donutchart";
import Popup from "./components/Popup";

const App = () => {
  const [filterData, setFilterData] = useState(json.Hospitals);
  const [data, setData] = useState(json.Hospitals);
  const [region, setRegion] = useState(false);
  const [perform, setPerform] = useState(false);
  const [totalYear, setTotalYear] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(false);
  const [gender, setGender] = useState(false);
  const [category, setCategory] = useState(false);
  const [regionSelect, setRegionSelect] = useState("");
  const [performSelect, setPerformSelect] = useState("");
  const [totalSelect, setTotalSelect] = useState("");
  const [lastSelect, setLastSelect] = useState("");
  const [categorySelect, setCategorySelect] = useState("");
  const [loading, setLoading] = useState(false);
  const [genderSelect, setGenderSelect] = useState({
    gender: "",
    min1: "",
    max1: "",
    min2: "",
    max2: "",
  });
  const [save, setSave] = useState([]);
  const [scroll, setScroll] = useState({
    left: true,
    right: false,
  });
  const element = useRef();

  let performArr = [];
  let categoryArr = [];
  let lastUpdateArr = [
    1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001,
    2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013,
    2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023,
  ];

  const scrollLeft = () => {
    let width = element.current.scrollWidth - element.current.clientWidth - 1;

    if (element.current.scrollLeft === 0 && scroll.right === false) {
      setScroll({ ...scroll, right: true });
    }

    element.current.scrollLeft += 50;

    if (element.current.scrollLeft >= width) {
      setScroll({ ...scroll, left: false });
    }
  };
  const scrollRight = () => {
    let width = element.current.scrollWidth - element.current.clientWidth - 1;

    if (element.current.scrollLeft <= width && scroll.left === false) {
      setScroll({ ...scroll, left: true });
    }

    element.current.scrollLeft -= 50;

    if (element.current.scrollLeft === 0) {
      setScroll({ ...scroll, right: false });
    }
  };

  const bookMark = (e) => {
    if (save.includes(e)) {
      save.map((ele, ind) => {
        if (ele === e) {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
          }, 1);
          save.splice(ind, 1);
          setSave(save);
        }
      });
    } else {
      setSave([...save, e]);
    }
  };

  const filter = (e) => {
    let arr = [];
    if (e === "Region") {
      filterData.map((ele) => {
        if (regionSelect === ele.region) {
          arr.push(ele);
        }
      });
    } else if (e === "Perform") {
      filterData.map((ele) => {
        if (performSelect === ele.perform) {
          arr.push(ele);
        }
      });
    } else if (e === "Total/Year") {
      filterData.map((ele) => {
        if (
          (totalSelect === "1 - 5" &&
            +ele.totalYear >= 1 &&
            +ele.totalYear <= 5) ||
          (totalSelect === "6 - 10" &&
            +ele.totalYear >= 6 &&
            +ele.totalYear <= 10) ||
          (totalSelect === "11 - 15" &&
            +ele.totalYear >= 11 &&
            +ele.totalYear <= 15) ||
          (totalSelect === "16 - 20" &&
            +ele.totalYear >= 16 &&
            +ele.totalYear <= 20) ||
          (totalSelect === "20+" && +ele.totalYear > 20)
        ) {
          arr.push(ele);
        }
      });
    } else if (e === "Last Update") {
      filterData.map((ele) => {
        if (lastSelect === ele.lastUpdate) {
          arr.push(ele);
        }
      });
    } else if (e === "Gender") {
      filterData.map((ele) => {
        if (
          (genderSelect.gender === ele.gender[0] &&
            +genderSelect.min1 >= ele.gender[1] &&
            +genderSelect.max1 <= ele.gender[2]) ||
          (genderSelect.gender === ele.gender[0] &&
            +genderSelect.min2 >= ele.gender[1] &&
            +genderSelect.max2 <= ele.gender[2])
        ) {
          arr.push(ele);
        }
      });
    } else if (e === "Category") {
      filterData.map((ele) => {
        if (categorySelect === ele.category) {
          arr.push(ele);
        }
      });
    }
    setData(arr);
  };

  return (
    <div className="mainDiv">
      <div className="container" ref={element}>
        {loading ? (
          <></>
        ) : (
          <table>
            <thead>
              <tr>
                <th className="hospitalHeading">Hospitals</th>
                <th
                  onClick={() => {
                    setCategory(true);
                    setRegion(false);
                    setPerform(false);
                    setTotalYear(false);
                    setLastUpdate(false);
                    setGender(false);
                  }}
                  className="categoryHeading"
                >
                  {category ? (
                    <Popup
                      heading="Category"
                      click={setCategory}
                      filter={filter}
                    >
                      <select
                        name="category"
                        value={categorySelect}
                        onChange={(e) => {
                          setCategorySelect(e.target.value);
                        }}
                      >
                        {filterData.map((ele, ind) => {
                          if (!categoryArr.includes(ele.category)) {
                            categoryArr.push(ele.category);
                            return (
                              <option key={ind} value={ele.category}>
                                {ele.category}
                              </option>
                            );
                          }
                        })}
                      </select>
                    </Popup>
                  ) : (
                    <p>Category</p>
                  )}
                </th>
                <th
                  onClick={() => {
                    setRegion(true);
                    setPerform(false);
                    setTotalYear(false);
                    setLastUpdate(false);
                    setCategory(false);
                    setGender(false);
                  }}
                  className="region"
                >
                  {region ? (
                    <Popup heading="Region" click={setRegion} filter={filter}>
                      <ReactFlagsSelect
                        style={{ borderRadius: "20px" }}
                        selected={regionSelect}
                        onSelect={(code) => setRegionSelect(code)}
                      />
                    </Popup>
                  ) : (
                    <p>Region</p>
                  )}
                </th>
                <th
                  onClick={() => {
                    setPerform(true);
                    setRegion(false);
                    setTotalYear(false);
                    setLastUpdate(false);
                    setGender(false);
                    setCategory(false);
                  }}
                  className="perform"
                >
                  {perform ? (
                    <Popup heading="Perform" click={setPerform} filter={filter}>
                      <select
                        name="perform"
                        value={performSelect}
                        onChange={(e) => {
                          setPerformSelect(e.target.value);
                        }}
                      >
                        {filterData.map((ele, ind) => {
                          if (!performArr.includes(ele.perform)) {
                            performArr.push(ele.perform);
                            return (
                              <option key={ind} value={ele.perform}>
                                {ele.perform}
                              </option>
                            );
                          }
                        })}
                      </select>
                    </Popup>
                  ) : (
                    <p>Perform</p>
                  )}
                </th>
                <th
                  onClick={() => {
                    setTotalYear(true);
                    setPerform(false);
                    setRegion(false);
                    setLastUpdate(false);
                    setGender(false);
                    setCategory(false);
                  }}
                  className="total"
                >
                  {totalYear ? (
                    <Popup
                      heading="Total/Year"
                      click={setTotalYear}
                      filter={filter}
                    >
                      <select
                        name="totalYear"
                        value={totalSelect}
                        onChange={(e) => setTotalSelect(e.target.value)}
                      >
                        <option value="1 - 5">1 - 5</option>
                        <option value="6 - 10">6 - 10</option>
                        <option value="11 - 15">11 - 15</option>
                        <option value="16 - 20">16 - 20</option>
                        <option value="20+">20+</option>
                      </select>
                    </Popup>
                  ) : (
                    <p>Total/Year</p>
                  )}
                </th>
                <th
                  onClick={() => {
                    setLastUpdate(true);
                    setPerform(false);
                    setTotalYear(false);
                    setRegion(false);
                    setGender(false);
                    setCategory(false);
                  }}
                  className="last"
                >
                  {lastUpdate ? (
                    <Popup
                      heading="Last Update"
                      click={setLastUpdate}
                      filter={filter}
                    >
                      <select
                        name="lastUpdate"
                        value={lastSelect}
                        onChange={(e) => setLastSelect(e.target.value)}
                      >
                        {lastUpdateArr.map((ele, ind) => {
                          return (
                            <option value={ele} key={ind}>
                              {ele}
                            </option>
                          );
                        })}
                      </select>
                    </Popup>
                  ) : (
                    <p>Last Update</p>
                  )}
                </th>
                <th>Access</th>
                <th>Goal</th>
                <th>Subscribers</th>
                <th>Live Peoples</th>
                <th>Stats</th>
                <th
                  onClick={() => {
                    setGender(true);
                    setPerform(false);
                    setTotalYear(false);
                    setLastUpdate(false);
                    setRegion(false);
                    setCategory(false);
                  }}
                  className="gender"
                >
                  {gender ? (
                    <Popup heading="Gender" click={setGender} filter={filter}>
                      <section>
                        <TbGenderFemale
                          className="female"
                          onClick={() => {
                            setGenderSelect({
                              ...genderSelect,
                              gender: "female",
                            });
                          }}
                          style={{
                            color:
                              genderSelect.gender === "female"
                                ? "#EF1378"
                                : "#c2c3c3",
                          }}
                        />
                        <input
                          type="number"
                          value={genderSelect.min1}
                          placeholder="Min %"
                          onChange={(e) =>
                            setGenderSelect({
                              ...genderSelect,
                              min1: e.target.value,
                              min2: "",
                            })
                          }
                        />
                        <input
                          type="number"
                          value={genderSelect.max1}
                          placeholder="Max %"
                          onChange={(e) =>
                            setGenderSelect({
                              ...genderSelect,
                              max1: e.target.value,
                              max2: "",
                            })
                          }
                        />
                      </section>
                      <section>
                        <TbGenderMale
                          className="male"
                          onClick={() => {
                            setGenderSelect({
                              ...genderSelect,
                              gender: "male",
                            });
                          }}
                          style={{
                            color:
                              genderSelect.gender === "male"
                                ? "#01A7E7"
                                : "#c2c3c3",
                          }}
                        />
                        <input
                          type="number"
                          value={genderSelect.min2}
                          placeholder="Min %"
                          onChange={(e) =>
                            setGenderSelect({
                              ...genderSelect,
                              min2: e.target.value,
                              min1: "",
                            })
                          }
                        />
                        <input
                          type="number"
                          value={genderSelect.max2}
                          placeholder="Max %"
                          onChange={(e) =>
                            setGenderSelect({
                              ...genderSelect,
                              max2: e.target.value,
                              max1: "",
                            })
                          }
                        />
                      </section>
                    </Popup>
                  ) : (
                    <p>Gender</p>
                  )}
                </th>
                <th>Age</th>
                <th>Country</th>
                <th>Posts</th>
                <th>Oxbat</th>
                <th>EP</th>
                <th>Source</th>
              </tr>
            </thead>
            <tbody>
              {data.map((ele, ind) => {
                return (
                  <tr key={ind}>
                    <td className="hospital">{ele.name}</td>
                    <td>
                      {ele.category === "web" ? (
                        <FaGlobe className="category1" />
                      ) : (
                        <RiSettings5Fill className="category2" />
                      )}
                    </td>
                    <td className="country">
                      <img
                        src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${ele.region}.svg`}
                        alt="flag image"
                      />
                    </td>
                    <td>{ele.perform}</td>
                    <td>{ele.totalYear}</td>
                    <td>{ele.lastUpdate}</td>
                    <td>
                      {ele.access === "admin" ? (
                        <FaLock className="access1" />
                      ) : ele.access === "access" ? (
                        <FaLockOpen className="access2" />
                      ) : (
                        <FaLock className="access3" />
                      )}
                    </td>
                    <td>
                      <BsInfoCircleFill className="goal" />
                    </td>
                    <td>{ele.subscribers}</td>
                    <td className="livePeoples">
                      {ele.livePeoples[0] + ele.livePeoples[1]}
                      <span>{ele.livePeoples[2]}</span>
                    </td>
                    <td>{ele.stats}</td>
                    <td className="donut">
                      <Donutchart min={ele.gender[1]} max={ele.gender[2]} />
                    </td>
                    <td>
                      <RiBarChartFill className="age" />
                    </td>
                    <td className="country">
                      <img
                        src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${ele.country}.svg`}
                        alt="flag image"
                      />
                    </td>
                    <td>{ele.posts}</td>
                    <td>{ele.oxbat}</td>
                    <td>{ele.ep}</td>
                    <td className="source">{ele.source}</td>
                    <td className="save" onClick={() => bookMark(ind)}>
                      {save.includes(ind) ? (
                        <BsBookmarkFill className="saveIcon2" />
                      ) : (
                        <BsBookmark className="saveIcon1" />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {data[0] === undefined ? (
          <div className="notfound">
            <h1>No Results Found!</h1>
          </div>
        ) : (
          <></>
        )}
        {scroll.right ? (
          <button className="scrollBtn2" onClick={scrollRight}>
            <IoIosArrowBack />
          </button>
        ) : (
          <></>
        )}
        {scroll.left ? (
          <button className="scrollBtn" onClick={scrollLeft}>
            <IoIosArrowForward />
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default App;
