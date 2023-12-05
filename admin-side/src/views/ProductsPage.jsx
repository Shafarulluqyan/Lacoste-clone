import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct, fetchProducts } from "../store/actions/actionCreator";
import { BsFillPencilFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";

export default function ProductsPage() {
  const [loading, setLoading] = useState(true);
  const [showImageModal, setShowImageModal] = useState(false);
  const [modalImageUrls, setModalImageUrls] = useState([]);
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await dispatch(fetchProducts());
        setLoading(false);
      } catch (err) {
        console.log("Error:", err);
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);

  const handleShowImages = (products) => {
    // console.log(products, "inidi handledshow");
    setShowImageModal(true);
    setModalImageUrls(products.map((image) => image.imgUrl)); // Ganti dengan data URL gambar Anda
  };

  const closeModal = () => {
    setShowImageModal(false);
  };

  return (
    <div className="container mt-5">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className="d-flex justify-content-between mb-3">
            <h2>Products</h2>
            <Link to="/add-product" className="btn btn-primary">
              <i className="fas fa-plus"></i> New Product
            </Link>
          </div>
          <div className="row">
            <div className="col-12">
              <table className="table table-bordered table-hover">
                <thead style={{ fontWeight: "bold" }}>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Category</th>
                    <th scope="col">Price</th>
                    <th scope="col">Created By</th>
                    <th scope="col">MainImg</th>
                    <th scope="col">Images</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody id="table-category">
                  {products?.products?.map((product, idx) => (
                    <tr key={product.id}>
                      <td>{idx + 1}</td>
                      <td className="fw-bold">{product?.name}</td>
                      <td className="fw-bold">{product?.Category.name}</td>
                      <td className="fw-bold">{product?.price}</td>
                      <td className="fw-bold">{product?.User?.username}</td>
                      <td className="fw-bold">
                        <img
                          src={product.mainImg}
                          alt={product.name}
                          style={{ width: "50%" }}
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleShowImages(product.Images)}
                        >
                          SHOW IMAGES
                        </button>
                      </td>
                      <td className="d-flex">
                        <Link
                          to={`/edit-product/${product.id}`}
                          className="btn btn-primary"
                        >
                          <BsFillPencilFill />
                        </Link>
                        <button
                          onClick={() => dispatch(deleteProduct(product.id))}
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
      {/* Modal untuk menampilkan gambar */}
      <div
        className={`modal ${showImageModal ? "show" : ""}`}
        style={{ display: showImageModal ? "block" : "none" }}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Image Preview</h5>
              <button
                type="button"
                className="btn-close"
                onClick={closeModal}
              ></button>
            </div>
            <div className="modal-body">
              {modalImageUrls.map((imageUrl, index) => (
                <img
                  key={index}
                  src={imageUrl}
                  alt={`Product Image ${index}`}
                  className="img-fluid"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
