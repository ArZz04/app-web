import { useState, useEffect } from "react";
import useAxiosPrivate  from "../../hooks/useAxiosPrivate";
import "../css/usersPage.css";

const Users = () => {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  

  useEffect(() => {
    let isMounted = true;

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/user", {

        });
        console.log(response.data);
        isMounted && setUsers(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    

    getUsers();

    return () => {
      isMounted = false;

    };
  }, []);

  return (
    <div className="body">
      <article>
        <div className="users-container">
          <h2 className="users-heading">Users</h2>
          <div className="users-box">
            {users?.length ? (
              <ul>
                {users.map((user, i) => (
                  <li key={i}>{user?.username}</li>
                ))}
              </ul>
            ) : (
              <p>No users to display</p>
            )}
          </div>
        </div>
      </article>
    </div>
  );
};

export default Users;
