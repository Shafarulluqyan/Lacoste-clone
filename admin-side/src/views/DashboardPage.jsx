import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, fetchProducts } from "../store/actions/actionCreator";

export default function DashboardPage() {
  const categories = useSelector((state) => state.categories.categories);
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  // console.log(categories, '<><ctegori di dahcboard');

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchCategories());
        await dispatch(fetchProducts());
      } catch (err) {
        // console.log("Error:", err);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-9">
          <section id="dashboard-section" className="mt-5">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h1">Dashboard</h1>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h6 className="card-subtitle mb-2 text-muted">
                      Total Products
                    </h6>
                    <h2 className="card-title">{products?.products?.length}</h2>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h6 className="card-subtitle mb-2 text-muted">
                      Total Categories
                    </h6>
                    <h2 className="card-title">
                      {categories?.category?.length}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
