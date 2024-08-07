import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axiosClient";

export default function UserForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        id: null,
        name: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        if (id) {
            setLoading(true);
            axiosClient.get(`/users/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setUser(data);
                })
                .catch(() => {
                    setLoading(false);
                });
        }
    }, [id]);

    const onSubmit = ev => {
        ev.preventDefault();
        if (user.id) {
            axiosClient.put(`/users/${user.id}`, user)
                .then(() => {
                    navigate('/users');
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        } else {
            axiosClient.post('/users', user)
                .then(() => {
                    navigate('/users');
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        }
    };

    return (
        <div className="container mt-5">
            {user.id ? <h1>Update User: {user.name}</h1> : <h1>New User</h1>}
            <div className="card p-4">
                {loading && (
                    <div className="text-center">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                )}
                {errors && (
                    <div className="alert alert-danger">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}
                {!loading && (
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                id="name"
                                type="text"
                                className="form-control"
                                value={user.name}
                                onChange={ev => setUser({ ...user, name: ev.target.value })}
                                placeholder="Enter your name"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                className="form-control"
                                value={user.email}
                                onChange={ev => setUser({ ...user, email: ev.target.value })}
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                className="form-control"
                                value={user.password}
                                onChange={ev => setUser({ ...user, password: ev.target.value })}
                                placeholder="Enter your password"
                            />
                        </div>

                        <div className="form-group d-flex justify-content-between">
                            <Link className="btn btn-secondary" to={'/Users/'}>Back</Link>
                            <button type="submit" className="btn btn-primary">Save</button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
