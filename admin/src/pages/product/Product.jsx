import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import storage from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { updateMovie } from "../../context/movieContext/apiCalls";
import "./product.css";

export default function Product() {
  const navigate = useNavigate();
  const location = useLocation();
  const { movie } = location.state;
  const [movieUpdate, setMovieUpdate] = useState(movie);
  const [img, setImg] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const { dispatch } = useContext(MovieContext);
  const handleChange = (e) => {
    const value = e.target.value;
    setMovieUpdate({ ...movie, [e.target.name]: value });
  };

  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      const storageRef = ref(storage, `/updateItems/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, item.file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log("Upload is" + percent + "% done");
        },
        (err) => {
          console.log(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setMovieUpdate((prev) => {
              return { ...prev, [item.label]: url };
            });
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      { file: img, label: "img" },
      { file: imgTitle, label: "imgTitle" },
      { file: imgSm, label: "imgSm" },
      { file: trailer, label: "trailer" },
      { file: video, label: "video" },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMovie(movieUpdate, dispatch);
    navigate("/products");
  };
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Movie</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={movie.img} alt="" className="productInfoImg" />
            <span className="productName">{movie.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{movie._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">genre:</span>
              <span className="productInfoValue">{movie.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">year:</span>
              <span className="productInfoValue">{movie.year}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">limit:</span>
              <span className="productInfoValue">{movie.limit}</span>
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
                placeholder={movie.title}
                name="title"
                onChange={handleChange}
              />
            </div>
            <div className="updateProductItem">
              <label>Description</label>
              <input
                type="text"
                placeholder={movie.desc}
                name="desc"
                onChange={handleChange}
              />
            </div>

            <div className="updateProductItem">
              <label>Year</label>
              <input
                type="text"
                placeholder={movie.year}
                name="year"
                onChange={handleChange}
              />
            </div>

            <div className="updateProductItem">
              <label>Genre</label>
              <input
                type="text"
                placeholder={movie.genre}
                name="genre"
                onChange={handleChange}
              />
            </div>

            <div className="updateProductItem">
              <label>Duration</label>
              <input
                type="text"
                placeholder={movie.duration}
                name="duration"
                onChange={handleChange}
              />
            </div>

            <div className="updateProductItem">
              <label>Limit</label>
              <input
                type="text"
                placeholder={movie.limit}
                name="limit"
                onChange={handleChange}
              />
            </div>

            <div className="updateProductItem">
              <label>Image</label>
              <input
                type="file"
                name="img"
                onChange={(e) => setImg(e.target.files[0])}
              />
            </div>

            <div className="updateProductItem">
              <label>Image title</label>
              <input
                type="file"
                name="imgTitle"
                onChange={(e) => setImgTitle(e.target.files[0])}
              />
            </div>

            <div className="updateProductItem">
              <label>Thumnail Image</label>
              <input
                type="file"
                name="imgSm"
                onChange={(e) => setImgSm(e.target.files[0])}
              />
            </div>

            <div className="updateProductItem">
              <label>Trailer</label>
              <input
                type="file"
                name="trailer"
                onChange={(e) => setTrailer(e.target.files[0])}
              />
            </div>

            <div className="updateProductItem">
              <label>Video</label>
              <input
                type="file"
                name="video"
                onChange={(e) => setVideo(e.target.files[0])}
              />
            </div>
          </div>
          <div className="productFormRight">
            {uploaded === 5 ? (
              <button className="productButton" onClick={handleSubmit}>
                Update
              </button>
            ) : (
              <button className="productButton" onClick={handleUpload}>
                Upload
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
