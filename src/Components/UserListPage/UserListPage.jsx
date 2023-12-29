import React, { useCallback, useEffect, useState } from "react";
import style from "./userListPage.module.scss";
import axios from "axios";
import { URLS } from "../../environment/environment";

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  const getUserListAPICall = useCallback((url) => {
    axios.get(url).then((respose) => {
      setUsers(respose.data);
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

        // Increment the count for the userId
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
    console.log(getUserPostAndCount());
  }, [posts]);

  return (
    <div className={style["userList--container"]}>
      <div className={style["header"]}>Directory</div>
      <div className={style["borderArea"]}>
        {getUserPostAndCount().map((user) => {
          return (
            <div className={style["individualUser"]} key={user.id}>
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
