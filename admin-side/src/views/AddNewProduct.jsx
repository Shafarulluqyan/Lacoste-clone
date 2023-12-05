import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchCategories, postProduct } from "../store/actions/actionCreator";

export default function AddProduct() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const categories = useSelector((state) => state.categories.categories);
  const dispatch = useDispatch();

  const [formInputs, setFormInputs] = useState({
    name: "",
    description: "",
    price: "",
    mainImg: "",
    CategoryId: "",
    images: [
      {
        imgUrl: "",
      },
      {
        imgUrl: "",
      },
      {
        imgUrl: "",
      },
    ],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormInputs({
      ...formInputs,
      [name]: value,
    });
    setError("");
  };

  const handleImageInput = (event, idx) => {
    const { name, value } = event.target;
    let newImages = [...formInputs.images];
    newImages[idx].imgUrl = value;
    setFormInputs({
      ...formInputs,
      images: newImages,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formInputs.name) {
      setError("Please enter a name");
      return;
    }

    try {
      await dispatch(postProduct(formInputs));
      navigate("/products");
    } catch (err) {
      setError("An error occurred while adding the product.");
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchCategories());
      } catch (err) {
        console.error("Error:", err);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <section
      className="col-12 col-md-6 offset-md-3 my-5"
      id="new-product-section"
    >
      <div className="d-flex justify-content between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1
          className="display-3 text-center font-weight-bold"
          style={{ color: "#4F6F52" }}
        >
          New Product
        </h1>
      </div>
      <form onSubmit={handleSubmit} id="product-form">
        <div className="mb-3">
          <label htmlFor="product-name">
            Name <span className="text-danger fw-bold">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formInputs.name}
            onChange={handleChange}
            className="form-control"
            id="product-name"
            placeholder="Enter product name"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="product-description">
            Description <span className="text-danger fw-bold">*</span>
          </label>
          <input
            type="text"
            name="description"
            value={formInputs.description}
            onChange={handleChange}
            className="form-control"
            id="product-description"
            placeholder="Enter product description"
            required
          />
        </div>
        <div className="row">
          <div className="col-6">
            <div className="mb-3">
              <label htmlFor="product-price">
                Price <span className="text-danger fw-bold">*</span>
              </label>
              <input
                name="price"
                value={formInputs.price}
                onChange={handleChange}
                type="number"
                min="0"
                className="form-control"
                id="product-price"
                placeholder="Enter price"
                required
              />
            </div>
          </div>
          <div className="col-6">
            <div className="mb-3">
              <label htmlFor="product-image">
                Main Image <span className="text-danger fw-bold">*</span>
              </label>
              <input
                name="mainImg"
                value={formInputs.mainImg}
                onChange={handleChange}
                type="text"
                className="form-control"
                id="product-image"
                placeholder="Enter product image url"
                required
              />
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="product-category">
            Category <span className="text-danger fw-bold">*</span>
          </label>
          <select
            value={formInputs.CategoryId}
            onChange={handleChange}
            name="CategoryId"
            id="product-category"
            className="form-select"
            required
          >
            <option value="" disabled>
              -- Select Category --
            </option>
            {categories?.category?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="row">
          {formInputs.images.map((image, idx) => (
            <div className="col-6" key={idx}>
              <div className="mb-3">
                <label htmlFor={`product-image-${idx}`}>
                  Image <span className="text-danger fw-bold"></span>
                </label>
                <input
                  name={`imgUrl-${idx}`}
                  value={formInputs.images[idx].imgUrl}
                  onChange={(e) => handleImageInput(e, idx)}
                  type="text"
                  className="form-control"
                  id={`product-image-${idx}`}
                  placeholder="Enter product image url"
                />
              </div>
            </div>
          ))}
        </div>

        {error && <div className="text-danger">{error}</div>}
        <div className="row mt-5">
          <div className="col-6">
            <Link
              to="/products"
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
