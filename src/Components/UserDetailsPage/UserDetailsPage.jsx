import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import style from "./userDetailsPage.module.scss";
import { URLS } from "../../environment/environment";
import axios from "axios";
import { Button, Select, Spin } from "antd";
import Modal from "../Modal/Modal";

const UserDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;
  const [countries, setCountries] = useState([]);
  const [clockPause, setClockPause] = useState(true);
  const [pausedTime, setPausedTime] = useState(null);
  const [country, setCountry] = useState("Asia/Kolkata");
  const [time, setTime] = useState(new Date());
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpenVal, setModalOpenVal] = useState({
    open: false,
    title: "",
    description: "",
  });
  const getCountries = useCallback(() => {
    axios.get(URLS.countires).then((response) => setCountries(response.data));
  }, []);

  const getSelectedCountryTime = useCallback((value) => {
    axios.get(`${URLS.countryTime}${value}`).then((response) => {
      setTime(new Date(response.data.datetime));
    });
  }, []);
  const getUserPosts = useCallback(() => {
    setLoading(true);
    axios.get(`${URLS.userPosts}?userId=${data.id}`).then((response) => {
      setPosts(response.data);
      setLoading(false);
    });
  }, []);

  const getCountryOptions = useMemo(() => {
    return countries.map((countryVal) => ({
      value: countryVal,
      label: countryVal,
    }));
  }, [countries]);

  const handleChange = useCallback((value) => {
    setCountry(value);
  }, []);

  const toggleClock = () => {
    setClockPause(!clockPause);
  };

  const resumeClock = () => {
    setPausedTime(null);
    setClockPause(true);
  };

  const adjustedTime = (pausedTime || time).toLocaleString("en-US", {
    timeZone: country,
  });
  const formattedTime = String(adjustedTime).split(",")[1];

  useEffect(() => {
    getCountries();
    getUserPosts();
  }, []);

  useEffect(() => {
    let timeInterval;
    if (clockPause) {
      timeInterval = setInterval(() => {
        setTime((prevTime) => new Date(prevTime.getTime() + 1000));
      }, 1000);
    } else {
      clearInterval(timeInterval);
      if (!pausedTime) {
        setPausedTime(time);
      }
    }
    return () => clearInterval(timeInterval);
  }, [clockPause, pausedTime, country]);

  useEffect(() => {
    getSelectedCountryTime(country);
  }, [country]);

  return (
    <div className={style["detailsContainer"]}>
      <div className={style["borderArea"]}>
        <div className={style["headerContainer"]}>
          <Button
            className={style["backButton"]}
            type="primary"
            onClick={() => navigate("/")}
          >
            Back
          </Button>
          <div className={style["header"]}>Profile Details</div>
          <div></div>
        </div>
        <div className={style["timeZoneContainer"]}>
          <Select
            defaultValue={"Asia/Kolkata"}
            style={{ width: 200 }}
            options={getCountryOptions}
            onChange={handleChange}
          />
          <div className={style["timeContainer"]}>{formattedTime}</div>
          {clockPause ? (
            <Button style={{ width: 100 }} type="primary" onClick={toggleClock}>
              Pause
            </Button>
          ) : (
            <Button style={{ width: 100 }} onClick={resumeClock}>
              Resume
            </Button>
          )}
        </div>
        <div className={style["profileDetails"]}>
          <div className={style["nameContainer"]}>
            <div>{data.name}</div>
            <div>
              <span>{data.username}</span>
              {"  |  "}
              <span>{data.company.catchPhrase}</span>
            </div>
          </div>
          <div className={style["nameContainer"]}>
            <div>{data.address.street}</div>
            <div>{data.address.suite}</div>
            <div>{data.address.city}</div>
            <div>{data.address.zipcode}</div>
            <div>
              <span>{data.email}</span>
              {"  |  "}
              <span>{data.phone}</span>
            </div>
          </div>
        </div>
        {loading && (
          <div className={style["loader"]}>
            <Spin size="large" />
          </div>
        )}

        {posts.length > 0 && (
          <div>
            <div className={style["postsHeader"]}>Posts:</div>
            <div className={style["postsContainer"]}>
              {posts.map((postVal) => {
                return (
                  <div
                    className={style["posts"]}
                    key={postVal.id}
                    onClick={() =>
                      setModalOpenVal({
                        open: true,
                        title: postVal.title,
                        description: postVal.body,
                      })
                    }
                  >
                    <div className={style["postsTitle"]}>{postVal.title}</div>
                    <div className={style["postsBody"]}>{postVal.body}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {modalOpenVal.open && (
          <Modal
            setModalOpenVal={setModalOpenVal}
            modalOpenVal={modalOpenVal}
          />
        )}
      </div>
    </div>
  );
};

export default UserDetailsPage;
