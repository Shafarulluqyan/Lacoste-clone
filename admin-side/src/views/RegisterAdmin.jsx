import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postNewAdmin } from "../store/actions/actionCreator";

export default function RegistrationForm() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formInputs, setFormInputs] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormInputs({
      ...formInputs,
      [name]: value,
    });

    setError("");
  };

  // Function to reset the form inputs
  const resetFormInputs = () => {
    setFormInputs({
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
      address: "",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formInputs.name) {
      setError("Please enter a name");
      return;
    }

    try {
      await dispatch(postNewAdmin(formInputs));
      navigate("/register-admin");

      // Reset the form inputs after a successful registration
      resetFormInputs();
    } catch (err) {
      setError("An error occurred while adding the admin.");
      console.log(err);
    }
  };

  return (
    <>
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-12 col-lg-9 col-xl-7">
              <div
                className="card shadow-2-strong card-registration"
                style={{ borderRadius: "15px" }}
              >
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">
                    Registration New Form
                  </h3>
                  <form onSubmit={handleSubmit}>
                    {/* Row 1: Username and Email */}
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            name="name"
                            value={formInputs.name}
                            type="text"
                            id="username"
                            className="form-control form-control-lg"
                            onChange={handleChange}
                          />
                          <label className="form-label">Username</label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            name="email"
                            value={formInputs.email}
                            type="email"
                            id="email"
                            className="form-control form-control-lg"
                            onChange={handleChange}
                          />
                          <label className="form-label">Email</label>
                        </div>
                      </div>
                    </div>

                    {/* Row 2: Password and Phone Number */}
                    <div className="row">
                      <div className="col-md-6 mb-4 d-flex align-items-center">
                        <div className="form-outline datepicker w-100">
                          <input
                            name="password"
                            value={formInputs.password}
                            type="password"
                            className="form-control form-control-lg"
                            id="password"
                            onChange={handleChange}
                          />
                          <label className="form-label">Password</label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4 d-flex align-items-center">
                        <div className="form-outline datepicker w-100">
                          <input
                            name="phoneNumber"
                            value={formInputs.phoneNumber}
                            type="number"
                            className="form-control form-control-lg"
                            id="phoneNumber"
                            onChange={handleChange}
                          />
                          <label className="form-label">Phone Number</label>
                        </div>
                      </div>
                    </div>

                    {/* Row 3: Address */}
                    <div className="row">
                      <div className="col-md-6 mb-4 pb-2">
                        <div className="form-outline">
                          <input
                            name="address"
                            value={formInputs.address}
                            type="text"
                            id="address"
                            className="form-control form-control-lg"
                            onChange={handleChange}
                          />
                          <label className="form-label">Address</label>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-2 pt-2">
                      <button className="btn btn-primary">SUBMIT</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
