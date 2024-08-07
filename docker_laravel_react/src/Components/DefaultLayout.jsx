import { useEffect, useState } from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";

export default function DefaultLayout() {
  const { user, token, setUser, setToken } = useStateContext();
  const [redirectToRates, setRedirectToRates] = useState(false);
  const location = useLocation();

  const onLogout = (ev) => {
    ev.preventDefault();
    axiosClient.get('/logout')
      .then(() => {
        setUser(null);
        setToken(null);
      });
  }

  useEffect(() => {
    if (token) {
      axiosClient.get('/user')
        .then(({ data }) => {
          setUser(data);
        })
        .catch(() => {
          setUser(null); // Handle the case where user data fetch fails
          setToken(null);
        });
    }
  }, [token, setUser, setToken]);

  useEffect(() => {
    if (token && user && user.email !== 'admin@gmail.com') {
      if (location.pathname === '/users') {
        setRedirectToRates(true);
      }
    }
  }, [token, user, location.pathname]);

  if (!token) {
    return <Navigate to='/login' />;
  }

  if (redirectToRates) {
    return <Navigate to='/rates' />;
  }

  return (
    <div id="defaultLayout" className="d-flex flex-column min-vh-100">
      <header className="bg-light p-3 shadow-sm">
        <div className="container d-flex justify-content-between align-items-center">
          <h1 className="h4 mb-0">My App</h1>
          <div className="d-flex align-items-center">
            <span className="me-3">{user.name}</span>
            <Link className="btn btn-primary btn-sm me-2 mx-2" to={'/users/'}>User</Link>
            <Link className="btn btn-primary btn-sm me-2 mx-2" to={'/rates/'}>Exchange Rates</Link>
            <a href="#" onClick={onLogout} className="btn btn-danger btn-sm">Logout</a>
          </div>
        </div>
      </header>
      <main className="flex-grow-1 py-4">
        <div className="container">
          <Outlet />
        </div>
      </main>
      <footer className="bg-light p-3 text-center">
        <div className="container">
          <p className="mb-0">© {new Date().getFullYear()} My App</p>
        </div>
      </footer>
    </div>
  );
}
