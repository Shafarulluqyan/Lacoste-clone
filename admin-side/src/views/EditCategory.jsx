import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  editCategory,
  fetchCategoryById,
} from "../store/actions/actionCreator";

export default function EditCategory() {
  const { id } = useParams();
  const [error, setError] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const category = useSelector(
    (state) => state.categories.categoryById.category
  );

  const handleChange = (event) => {
    const { value } = event.target;
    setCategoryName(value);
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!categoryName) {
      setError("Please enter a category name");
      return;
    }

    try {
      await dispatch(editCategory(id, { name: categoryName }));
      navigate("/categories");
    } catch (err) {
      setError("An error occurred while editing the category.");
      console.log(err);
    }
  };

  useEffect(() => {
    dispatch(fetchCategoryById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (category) {
      setCategoryName(category.name);
    }
  }, [category]);

  return (
    <>
      <section
        className="col-12 col-md-6 offset-md-3 my-5"
        id="edit-category-section"
      >
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1
            className="display-3 text-center font-weight-bold"
            style={{ color: "#4F6F52" }}
          >
            Edit Category
          </h1>
        </div>
        <form onSubmit={handleSubmit} id="category-form">
          <div className="mb-3">
            <label htmlFor="category-name">
              Name <span className="text-danger fw-bold">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={categoryName}
              onChange={handleChange}
              className="form-control"
              id="category-name"
              placeholder="Enter category name"
              required
            />
          </div>
          <div className="row mt-5">
            <div className="col-6">
              <Link
                to="/categories"
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
                Save
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
