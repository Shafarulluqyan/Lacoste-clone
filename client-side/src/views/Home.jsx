import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../store/actions/actionCreator";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const [loading, setLoading] = useState(true); // Set initial loading state to true
  const products = useSelector((state) => state.productReducer.products);
  const dispatch = useDispatch();
  // console.log(products, "<<ini dia");

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchProducts());
        setLoading(false); // Set loading to false when data is fetched
      } catch (err) {
        console.log("Error:", err);
        setLoading(false); // Set loading to false in case of an error
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <>
      <div className="row mt-5">
        {/* Bagian Kotak Besar */}
        <div className="col-12">
          <div className="d-flex">
            {/* Bagian Kiri (Gambar) */}
            <div className="md-full">
              <div style={{ position: "relative" }}>
                <img
                  src="https://imagedeleg1.lacoste.com/dw/image/v2/BGSW_PRD/on/demandware.static/-/Library-Sites-LacosteContent/default/dw9e98c23f/images/homepage/2023-08-28/Starter-deskfl.jpg"
                  className="img-fluid"
                  alt="..."
                  style={{ width: "100%", height: "100%" }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    left: "50px",
                    color: "white",
                    fontSize: "60px",
                    padding: "10px",
                  }}
                >
                  <h1 style={{ fontFamily: "Archivo, sans-serif" }}>
                    LACOSTE X LE FLEUR
                  </h1>
                  <p style={{ fontSize: "20px" }}>the new collaboration</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        {loading ? ( // Show loading indicator while data is being fetched
          <p>Loading...</p>
        ) : (
          /* Bagian Card */
          <div className="row mt-5">
            {products?.map((product, i) => (
              <div className="col-md-4 mb-3" key={i}>
                <div className="card" style={{ height: "100%" }}>
                  <img
                    src={product.mainImg}
                    className="card-img-top"
                    alt="Produk"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text">{product.price}</p>

                    <Link
                      to={`${product.id}/detail`}
                      href="#"
                      className="btn btn-primary"
                    >
                      See Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
