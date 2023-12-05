import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsFillPencilFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import {
  deleteCategory,
  fetchCategories,
} from "../store/actions/actionCreator";

export default function CategoriesPage() {
  const [loading, setLoading] = useState(true);
  const categories = useSelector(
    (state) => state.categories.categories.category
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log(localStorage.access_token);
        setLoading(true);
        await dispatch(fetchCategories());
        setLoading(false);
      } catch (err) {
        console.log("Error:", err);
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className="container mt-5">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className="d-flex justify-content-between mb-3">
            <h2>Categories</h2>
            <Link to={"/add-category"} className="btn btn-primary">
              <i className="fas fa-plus"></i> New Category
            </Link>
          </div>
          <div className="row">
            <div className="col-12">
              <table className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col" style={{ fontWeight: "bold" }}>
                      Name
                    </th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody id="table-category">
                  {categories?.map((category, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td className="fw-bold">{category?.name}</td>
                      <td className="d-flex">
                        <Link
                          to={`/edit-category/${category.id}`}
                          className="btn btn-primary"
                        >
                          <BsFillPencilFill />
                        </Link>
                        <button
                          onClick={() => dispatch(deleteCategory(category.id))}
                          className="btn btn-danger"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
