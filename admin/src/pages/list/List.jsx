import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { ListContext } from "../../context/listContext/ListContext";
import { updateList } from "../../context/listContext/apiCalls";
import "./list.css";

export default function Product() {
  const location = useLocation();
  const navigate = useNavigate();
  const { list } = location.state;
  const { dispatch } = useContext(ListContext);
  const [listUpdate, setList] = useState(list);
  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setList({ ...listUpdate, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateList(listUpdate, dispatch);
    navigate("/lists");
  };

  console.log(listUpdate);
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">List</h1>
        <Link to="/newlist">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <span className="productName">{list.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{list._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">genre:</span>
              <span className="productInfoValue">{list.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">type:</span>
              <span className="productInfoValue">{list.type}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <div className="updateProductItem">
              <label>Title</label>
              <input
                type="text"
                placeholder={list.title}
                name="title"
                onChange={handleChange}
              />
            </div>
            <div className="updateProductItem">
              <label>Type</label>
              <input
                type="text"
                placeholder={list.type}
                name="type"
                onChange={handleChange}
              />
            </div>
            <div className="updateProductItem">
              <label>Genre</label>
              <input
                type="text"
                placeholder={list.genre}
                name="genre"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="productFormRight">
            <button className="productButton" onClick={handleSubmit}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
