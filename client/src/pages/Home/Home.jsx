import Featured from "../../Components/featured/Featured";
import Navbar from "../../Components/navbar/Navbar";
import List from "../../Components/list/List";
import { useState, useEffect } from "react";
import "./home.scss";
import axios from "../../services/axiosInterceptor";
export default function Home({ type }) {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `lists${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`,
          {
            headers: {
              token:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        setLists(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getRandomLists();
  }, [type, genre]);
  return (
    <div className="home">
      <Navbar />
      <Featured type={type} setGenre={setGenre} />
      {lists.map((list, index) => {
        return <List list={list} key={index} />;
      })}
    </div>
  );
}
