import { useEffect, useState } from "react";
import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import axios from "../../services/axiosInterceptor";

export default function WidgetSm() {
  const [newUsers, setNewUsers] = useState([]);
  useEffect(() => {
    try {
      const getNewUsers = async () => {
        const res = await axios.get("users?new=true", {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTQyOTBiNzQxMzg2NmZjZDM1NDE3ZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MDQ4NDU5MiwiZXhwIjoxNjgwOTE2NTkyfQ.0HxgOGQy073HxwcmMF0QJO886biyBlgDiA8Sm1OcCAg",
          },
        });
        setNewUsers(res.data);
      };
      getNewUsers();
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {newUsers.map((user, index) => (
          <li className="widgetSmListItem" key={index}>
            <img
              src={
                user.profilePic ||
                "https://mir-s3-cdn-cf.behance.net/project_modules/disp/bf6e4a33850498.56ba69ac3064f.png"
              }
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
