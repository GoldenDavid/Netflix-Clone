import { useContext, useEffect, useState } from "react";
import "./newList.css";
import { ListContext } from "../../context/listContext/ListContext";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { getMovies } from "../../context/movieContext/apiCalls";
import { createList } from "../../context/listContext/apiCalls";
import { useNavigate } from "react-router-dom";

export default function NewList() {
  const [list, setList] = useState(null);
  const { dispatch: dispatchList } = useContext(ListContext);
  const { movies, dispatch: dispatchMovie } = useContext(MovieContext);
  const navigate = useNavigate();
  useEffect(() => {
    getMovies(dispatchMovie);
  }, [dispatchMovie]);
  const handleChange = (e) => {
    const value = e.target.value;
    setList({ ...list, [e.target.name]: value });
  };

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setList({ ...list, [e.target.name]: value });
  };

  console.log(list);

  const handleSubmit = (e) => {
    e.preventDefault();
    createList(list, dispatchList);
    navigate("/lists");
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New List</h1>
      <form className="addProductForm">
        <div className="formLeft">
          <div className="addProductItem">
            <label>Title</label>
            <input
              type="text"
              placeholder="Popular Movies"
              name="title"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Type</label>
            <select defaultValue={"movie"} name="type" onClick={handleChange}>
              <option value="movie">Movie</option>
              <option value="series">Series</option>
            </select>
          </div>
          <div className="addProductItem">
            <label>Genre</label>
            <input
              type="text"
              placeholder="genre"
              name="genre"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="formRight">
          <div className="addProductItem">
            <label>Content</label>
            <select
              multiple
              name="content"
              onChange={handleSelect}
              style={{ height: "200px" }}
            >
              {movies.map((movie) => (
                <option value={movie._id}>{movie.title}</option>
              ))}
            </select>
          </div>
        </div>
        <button className="addProductButton" onClick={handleSubmit}>
          Create
        </button>
      </form>
    </div>
  );
}
