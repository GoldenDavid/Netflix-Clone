import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useState, useMemo } from "react";
import axios from "../../services/axiosInterceptor";
export default function Home() {
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  const [userStats, setUserStats] = useState([]);
  useEffect(() => {
    try {
      const getStats = async () => {
        const res = await axios.get("users/stats", {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTQyOTBiNzQxMzg2NmZjZDM1NDE3ZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3OTgxNTU4MywiZXhwIjoxNjgwMjQ3NTgzfQ.9KMORLXdSZMUCSvFLxK1OkElII9aH8ERdjZ11azuWqo",
          },
        });
        const statsList = res.data.sort(function (item1, item2) {
          return item1._id - item2._id;
        });
        statsList.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "New User": item.total },
          ])
        );
      };
      getStats();
    } catch (error) {
      console.log(error);
    }
  }, [MONTHS]);
  return (
    <div className="home">
      <Chart data={userStats} title="User Analytics" grid dataKey="New User" />
      <div className="homeWidgets">
        <WidgetSm />
      </div>
    </div>
  );
}
