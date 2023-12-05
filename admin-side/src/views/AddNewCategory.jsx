import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { postCategory } from "../store/actions/actionCreator";

export default function AddCategory() {
  const [error, setError] = useState("");
  const [categoryName, setCategoryName] = useState(""); // Ganti nama variabelnya
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { value } = event.target;
    setCategoryName(value); // Ganti nama variabelnya
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!categoryName) {
      // Ganti nama variabelnya
      setError("Please enter a category name"); // Ganti pesan kesalahan
      return;
    }

    try {
      await dispatch(postCategory({ name: categoryName })); // Ganti nama variabelnya
      navigate("/categories");
    } catch (err) {
      setError("An error occurred while adding the category.");
      console.log(err);
    }
  };

  return (
    <section
      className="col-12 col-md-6 offset-md-3 my-5"
      id="new-product-section"
    >
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1
          className="display-3 text-center font-weight-bold"
          style={{ color: "#4F6F52" }}
        >
          New Category
        </h1>
      </div>
      <form onSubmit={handleSubmit} id="product-form">
        <div className="mb-3">
          <label htmlFor="product-name">
            Name <span className="text-danger fw-bold">*</span>
          </label>
          <input
            name="name"
            value={categoryName}
            onChange={(e) => handleChange(e)}
            type="text"
            className="form-control"
            id="product-name"
            placeholder="Enter product name"
            required
          />
        </div>
        <div className="row mt-5">
          <div className="col-6 ">
            <Link
              to={"/categories"}
              type="button"
              className="btn btn-block ml-auto"
              style={{
                backgroundColor: "#B2533E",
                color: "#ECE3CE",
              }}
            >
              Cancel
            </Link>
          </div>
          <div className="col-6">
            <button
              type="submit"
              className="btn btn-block"
              style={{
                backgroundColor: "#4F6F52",
                color: "#ECE3CE",
              }}
            >
              Add Product
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
