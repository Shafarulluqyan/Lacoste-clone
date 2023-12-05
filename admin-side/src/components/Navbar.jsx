import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/actions/actionCreator";
import Swal from "sweetalert2";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("access_token");
        navigate("/login");
      }
    });
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to={"/"} className="navbar-brand">
            Admin Lacoste
          </Link>
          <img
            src="https://c0.klipartz.com/pngpicture/416/932/gratis-png-quinta-avenida-lacoste-logo-de-la-marca-comercial-lacoste.png"
            alt="Lacoste Logo"
            style={{ width: "50px", height: "auto" }}
          />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  to={"/products"}
                  className="nav-link active"
                  aria-current="page"
                >
                  Product
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/categories"} className="nav-link">
                  Category
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/register-admin"} className="nav-link">
                  Register Admin
                </Link>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="nav-link">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
