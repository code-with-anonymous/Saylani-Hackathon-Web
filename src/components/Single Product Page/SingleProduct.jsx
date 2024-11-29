import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Spin, message } from "antd";
import { doc, getDoc, collection, addDoc, query, where, getDocs, Timestamp } from "firebase/firestore"; 
import { db } from "../../firebase/config"; 
import { toast } from "react-toastify"; 
import { useAuth } from "../../contexts/AuthContext";

const SingleProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth(); 
  const [isSpin, setIsSpin] = useState(false);
  const [singleProduct, setSingleProduct] = useState(null);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      setIsSpin(true);
      try {
        const productRef = doc(db, "products", productId);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          setSingleProduct(productSnap.data());
          await fetchComments(productId);
        } else {
          message.error("Product not found");
          navigate("/all-products");
        }
      } catch (error) {
        console.error("Error fetching the product:", error);
        message.error("Failed to fetch product data");
      } finally {
        setIsSpin(false);
      }
    };

    const fetchComments = async (productId) => {
      const commentsRef = collection(db, "comments");
      const q = query(commentsRef, where("productId", "==", productId));
      const querySnapshot = await getDocs(q);
      const commentsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setComments(commentsData);
    };

    fetchProduct();
  }, [productId, navigate]);

  const handleAddToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    toast.success(`${product.name} has been added to your cart.`);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const commentsRef = collection(db, "comments");
      const newCommentData = {
        productId,
        text: newComment,
        userName: currentUser?.displayName || currentUser?.email || "Anonymous",
        createdAt: Timestamp.fromDate(new Date())
      };
      
      const docRef = await addDoc(commentsRef, newCommentData);
      setComments([...comments, { id: docRef.id, ...newCommentData, createdAt: new Date() }]);
      setNewComment("");  
      toast.success("Comment added successfully!");
    } catch (error) {
      console.error("Error adding comment:", error);
      message.error("Failed to add comment. Please try again.");
    }
  };

  if (isSpin || !singleProduct) {
    return (
      <div className="spinner-overlay">
        <Spin tip="Loading..." size="large" />
      </div>
    );
  }

  return (
    <main>
      <div className="super_container">
        <div className="single_product container my-5 p-4 rounded shadow">
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-6 col-md-6 mb-4">
              <div className="image_selected">
                <img
                  src={singleProduct.image}
                  alt={singleProduct.title || "Product Image"}
                  className=" product-image  img-fluid rounded"
                  style={{ width: "90%", maxHeight: "400px",objectFit: "cover"  }}
                />
              </div>
            </div>
            <div className="col-lg-5 col-md-6" style={{ paddingLeft: "30px" }}>
              <div className="product_description">
                <nav>
                  <ol className="breadcrumb breadcrumb-black">   
                    <li className="breadcrumb-item">
                      <Link to="/" className="text-dark">Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link to="/shop" className="text-dark">Shop</Link>
                    </li>
                    <li className="breadcrumb-item">
                      {singleProduct.name} 
                    </li> 
                    {singleProduct.brand} 
                  </ol>
                </nav>
                <h1 className="product_name fw-bold">{singleProduct.name}</h1> 
                <h4 className="product_price">${singleProduct.price}</h4>
                <hr />
                <p className="product_info">
                  {singleProduct.description || "No description available."}
                </p>
                <div className="addToCart d-flex justify-content-between align-items-center">
                  <button className="btn btn-danger add-to-cart-btn" onClick={() => handleAddToCart(singleProduct)}>
                    Add To Cart
                  </button> 
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="comments_section mt-4 w-100 ms-3">
            <h3 className="mb-2">Comments</h3>
            {currentUser ? (  
              <form onSubmit={handleCommentSubmit} className="mb-3">
              <div className="row">
                <div className="col-12 mb-2">
                <textarea 

                  rows="3" 
                  className="form-control w-100"
                  style={{width:"100% !important"  }}
                  value={newComment} 
                  onChange={(e) => setNewComment(e.target.value)} 
                  placeholder="Leave a comment..." 
                  required 
                />
                </div>
              </div>
                <button type="submit" className="btn btn-primary mt-2 my-0 btn-submit">Submit</button>
              </form>
            ) : (
              <p>
                Please <Link to="/login" className="text-primary">log in</Link> to leave a comment.
              </p>
            )}
            {comments.length > 0 && (
              <div className="comments_list" style={{ width: "100%", padding: "0 15px", backgroundColor: "#f9f9f9", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", borderRadius: "8px" }}>
                {comments.map((comment) => {
                  const createdAtDate = comment.createdAt instanceof Timestamp 
                    ? comment.createdAt.toDate()
                    : new Date(comment.createdAt.seconds * 1000);

                  const isValidDate = createdAtDate instanceof Date && !isNaN(createdAtDate);
                  const displayDate = isValidDate 
                    ? `${createdAtDate.toLocaleDateString()} ${createdAtDate.toLocaleTimeString()}`
                    : "Invalid date";

                  return (
                    <div key={comment.id} className="comment mb-3 mt-1 p-3" style={{ border: "1px solid #ddd", borderRadius: "5px", backgroundColor: "#ffffff" }}>
                      <p style={{ margin: "0" }}>
                        <strong style={{ color: "#333" }}>{comment.userName}</strong> 
                        <small style={{ marginLeft: "10px", fontStyle: "italic", color: "#888" }}>
                          {displayDate}
                        </small>
                      </p>
                      <p style={{ margin: "0", paddingTop: "5px", color: "#555" }}>{comment.text}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default SingleProduct;
