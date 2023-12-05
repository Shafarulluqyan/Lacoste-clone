import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="Navbar">
      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        style={{ backgroundColor: "#F4F4F4" }}
      >
        <div className="container-fluid">
          <Link to={"/"} className="navbar-brand">
            Lacoste
            <img
              src="https://c0.klipartz.com/pngpicture/416/932/gratis-png-quinta-avenida-lacoste-logo-de-la-marca-comercial-lacoste.png"
              alt="Lacoste Logo"
              style={{ width: "50px", height: "auto" }}
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#"></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Women
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Polo
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Sneakers
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Collections
                </a>
              </li>
              <li className="nav-item dropdown">
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}
