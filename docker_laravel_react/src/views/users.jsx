/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axiosClient from "../axiosClient";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUsers();
  }, []); // Empty dependency array ensures this runs only once on mount

  const onDeleteClick = (user) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }
    axiosClient.delete(`/users/${user.id}`)
      .then(() => {
        getUsers(); // Refresh the list after deleting
      })
      .catch(() => {
        // Handle error if necessary
      });
  };

  const getUsers = () => {
    setLoading(true);
    axiosClient.get('/users')
      .then(({ data }) => {
        setUsers(data.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        // Handle error if necessary
      });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
        <h1>Users</h1>
        <Link className="btn-add" to="/users/new">Add new</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          {loading && (
            <tbody>
              <tr>
                <td colSpan="4" className="text-center">
                  Loading...
                </td>
              </tr>
            </tbody>
          )}
          {!loading && (
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <Link className="btn-edit" to={'/users/' + u.id}>Edit</Link>
                    &nbsp;
                    <button className="btn-delete" onClick={() => onDeleteClick(u)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}
