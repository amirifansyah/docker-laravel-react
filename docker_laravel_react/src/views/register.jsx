import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";

export default function Register() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(null);

  const { setUser, setToken } = useStateContext();

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    axiosClient.post("/register", payload).then(({ data }) => {
      setUser(data.user);
      setToken(data.token);
    }).catch(err => {
      const response = err.response;
      if (response && response.status === 422) {
        setError(response.data.errors);
      }
    });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3>Create A New Account</h3>
            </div>
            <div className="card-body">
              {error && (
                <div className="alert alert-danger">
                  {Object.keys(error).map((key) => (
                    <div key={key}>{error[key][0]}</div>
                  ))}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input ref={nameRef} type="text" id="name" className="form-control" placeholder="Enter your name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input ref={emailRef} type="email" id="email" className="form-control" placeholder="Enter your email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input ref={passwordRef} type="password" id="password" className="form-control" placeholder="Enter your password" required />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Register</button>
              </form>
            </div>
            <div className="card-footer text-center">
              <p className="message">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
