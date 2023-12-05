import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/actions/actionCreator";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      await dispatch(login(email, password));
      navigate("/");
    } catch (error) {
      setError("Login failed. Please check your credentials.");
      console.log(error);
    }
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "whitesmoke" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-10">
            <div className="card shadow" style={{ borderRadius: "1rem" }}>
              <div className="row">
                <div className="col-md-5 p-0">
                  <div className="card-body p-5 text-center"></div>
                </div>
                <div className="col-md-7 p-0">
                  <div className="card-body p-5">
                    <h3 className="text-center mb-4">LOGIN</h3>
                    <p className="text-center">
                      <b>Login to your account here!</b>
                    </p>
                    <form onSubmit={handleLogin}>
                      <div className="form-group mb-3">
                        <label htmlFor="email">E-mail Address</label>
                        <input
                          id="email"
                          type="text"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="form-control mt-2"
                          autoFocus
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label htmlFor="password">Password</label>
                        <input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="form-control mt-2"
                        />
                      </div>
                      <div className="form-group">
                        <button
                          type="submit"
                          className="btn btn-block mt-3"
                          style={{
                            backgroundColor: "#4F6F52",
                            color: "#ECE3CE",
                          }}
                        >
                          Login
                        </button>
                      </div>
                    </form>
                    {error && (
                      <div className="alert alert-danger mt-3" role="alert">
                        {error}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
