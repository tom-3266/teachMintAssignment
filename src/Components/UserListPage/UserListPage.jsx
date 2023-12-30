import React, { useCallback, useEffect, useState } from "react";
import style from "./userListPage.module.scss";
import axios from "axios";
import { URLS } from "../../environment/environment";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";

const UserListPage = () => {
  let navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUserListAPICall = useCallback((url) => {
    setLoading(true);
    axios.get(url).then((respose) => {
      setUsers(respose.data);
      setLoading(false);
    });
  }, []);
  const getAllPostsAPICall = useCallback((url) => {
    axios.get(url).then((respose) => {
      setPosts(respose.data);
    });
  }, []);

  const getUserPostAndCount = useCallback(() => {
    const userIdCount = {};
    posts.length > 0 &&
      posts.forEach((entry) => {
        const userId = entry.userId;
        if (userIdCount[userId]) {
          userIdCount[userId]++;
        } else {
          userIdCount[userId] = 1;
        }
      });

    const usersCount = users.map((user, index) => ({
      ...user,
      postCount: userIdCount[index + 1],
    }));

    return usersCount;
  }, [posts, users]);

  useEffect(() => {
    getUserListAPICall(URLS.users);
    getAllPostsAPICall(URLS.posts);
  }, []);

  useEffect(() => {
    getUserPostAndCount();
  }, [posts]);

  return (
    <div className={style["userList--container"]}>
      <div className={style["header"]}>Directory</div>
      <div className={style["borderArea"]}>
        {loading && (
          <div className={style["loader"]}>
            <Spin size="large" />
          </div>
        )}
        {getUserPostAndCount().map((user) => {
          return (
            <div
              className={style["individualUser"]}
              key={user.id}
              onClick={() => {
                navigate(`/userDetails?userId=${user.id}`, { state: user });
              }}
            >
              <div className={style["userName"]}>Name: {user.name}</div>
              <div className={style["userPostNumber"]}>
                Posts: {user.postCount}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserListPage;
