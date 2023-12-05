import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../store/actions/actionCreator";

export default function DetailPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true); // Set initial loading state to true
  const product = useSelector((state) => state.productReducer.productById);
  console.log(product, "ini product detail");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        await dispatch(fetchProductById(id));
        setLoading(false); // Set loading to false when data is fetched
      } catch (err) {
        console.log("Error:", err);
        setLoading(false); // Set loading to false in case of an error
      }
    };
    fetchDetail();
  }, [dispatch, id]);

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <img
              src={product?.mainImg}
              alt={product?.name}
              className="img-fluid"
            />
          </div>
          <div className="col-md-6">
            {loading ? ( // Show loading indicator while data is being fetched
              <p>Loading...</p>
            ) : (
              <>
                <h3>{product?.name}</h3>
                <p>Price: {product?.price}</p>
                <h4>Post by: {product?.User.username}</h4>
                <button className="btn btn-primary">Add to Cart</button>
              </>
            )}
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-6">
            <h3>Description</h3>
            {loading ? ( // Show loading indicator while data is being fetched
              <p>Loading...</p>
            ) : (
              <p>{product?.description}</p>
            )}
          </div>
          <div className="col-md-6">
            <img
              src={product?.mainImg}
              alt={product?.name}
              className="img-fluid"
            />
          </div>
        </div>
        <div className="row mt-5">
          {loading ? (
            <p>Loading...</p>
          ) : (
            product?.Images.map((productImage, i) => (
              <div className="col-md-6 mb-3" key={i}>
                <div className="card">
                  <img
                    src={productImage?.imgUrl}
                    alt={productImage?.name}
                    className="card-img-top"
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
