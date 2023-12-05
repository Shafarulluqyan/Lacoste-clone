import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../store/actions/actionCreator";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await dispatch(fetchCategories());
      } catch (err) {
        console.log("Error:", err);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <footer className="footer_section">
      <div className="container">
        <div className="row">
          <div className="col-md-4 footer-col">
            <div className="footer_contact">
              <h4>About Us</h4>
              <div className="contact_link_box">
                <a href="#">
                  <i className="fa fa-map-marker" aria-hidden="true"></i>
                  <span>The Lacoste Group</span>
                </a>
                <a href="#">
                  <i className="fa fa-phone" aria-hidden="true"></i>
                  <span>Careers</span>
                </a>
                <a href="#">
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                  <span>Brand protection</span>
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4 footer-col">
            <div className="footer_detail">
              <a href="/categories" className="footer-logo">
                Categories
              </a>
              <div className="footer_social">
                <ul>
                  {categories.map((category, idx) => (
                    <li key={idx}>{category.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-4 footer-col">
            <h4>HELP & CONTACTS</h4>
            <p>
              Find the perfect fit with our Lacoste size chart. Need help or
              have questions? Contact us through our FAQ or by email.
            </p>
          </div>
        </div>
        <div className="footer-info">
          <p>
            &copy; {currentYear} All Rights Reserved By{" "}
            <a href="https://html.design/">LACOSTE</a>
            <br />
            &copy; {currentYear} Distributed By <h3>Shafarul Luqyan</h3>
          </p>
        </div>
      </div>
    </footer>
  );
}
