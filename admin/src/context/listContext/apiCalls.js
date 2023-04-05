import {
  getListsFailure,
  getListsStart,
  getListsSuccess,
  deleteListFailure,
  deleteListSuccess,
  deleteListStart,
  createListFailure,
  createListSuccess,
  createListStart,
  updateListStart,
  updateListSuccess,
  updateListFailure,
} from "./ListAction";
import axios from "../../services/axiosInterceptor";
export const getLists = async (dispatch) => {
  dispatch(getListsStart());
  try {
    const res = await axios.get("/lists", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getListsSuccess(res.data));
  } catch (error) {
    getListsFailure();
  }
};

export const createList = async (list, dispatch) => {
  dispatch(createListStart());
  try {
    const res = await axios.post("/lists", list, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(createListSuccess(res.data));
  } catch (error) {
    dispatch(createListFailure());
  }
};

export const updateList = async (list, dispatch) => {
  dispatch(updateListStart());
  try {
    const res = await axios.put("/lists/" + list._id, list, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(updateListSuccess(res.data));
  } catch (error) {
    dispatch(updateListFailure());
  }
};

export const deleteList = async (id, dispatch) => {
  dispatch(deleteListStart());
  try {
    await axios.delete("/lists/" + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deleteListSuccess(id));
  } catch (error) {
    dispatch(deleteListFailure());
  }
};
