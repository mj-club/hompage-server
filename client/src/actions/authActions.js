import axios from "axios";

const URL =
  process.env.NODE_ENV !== "production"
    ? "http://13.209.214.244:8080/auth"
    : "/auth";

export function kakaoLogin() {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    axios
      // .get(URL + "/auth/kakao")
      .get("/auth/kakao")
      .then(({ data }) => {
        dispatch({
          type: "SET_USER",
          payload: data,
        });
      })
      .then(() => {})
      .catch((error) => {
        dispatch({
          type: "ERROR",
          payload: error,
        });
      });
  };
}

export function join(body) {
  console.log("redux join(body) body", body);
  return (dispatch) => {
    axios
      .post(URL + "/join", body)
      .then((data) => {
        dispatch({
          type: "SET_USER_EMAIL", //그 뒤에 입력
          payload: data.email,
        });
      })
      .catch((error) => {
        dispatch({
          type: "ERROR",
          payload: error,
        });
      });
  };
}

export function emailLogin(body) {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    axios
      .post(URL + "/login", body)
      .then(({ data }) => {
        dispatch({
          type: "SET_USER",
          payload: data,
        });
      })
      .catch((error) => {
        dispatch({
          type: "ERROR",
          payload: error,
        });
      });
  };
}

export function emailCheck(email) {
  return (dispatch) => {
    axios
      .post(URL + "/checkEmail", { email })
      .then((data) => {
        console.log("checkEmail data : ", data);
        dispatch({
          type: "SET_EMAIL_MESSAGE",
          payload: data.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: "ERROR",
          payload: error,
        });
      });
  };
}

export function phCheck(ph_number) {
  return (dispatch) => {
    axios
      .post(URL + "/checkPh", { ph_number })
      .then((data) => {
        console.log("redux__/checkPh data : ", data);
        dispatch({
          type: "SET_PH_MESSAGE",
          payload: data.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: "ERROR",
          payload: error,
        });
      });
  };
}

export function studentIdCheck(student_id) {
  return (dispatch) => {
    axios
      .post(URL + "/checkId", { student_id })
      .then((data) => {
        dispatch({
          type: "SET_STUDENTID_MESSAGE",
          payload: data.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: "ERROR",
          payload: error,
        });
      });
  };
}

export function nameCnpheck(name) {
  return (dispatch) => {
    axios
      .get(URL + "/findEmail" + name)
      .then((data) => {
        dispatch({
          type: "match_Name",
          payload: data,
        });
      })
      .catch((error) => {
        dispatch({
          type: "ERROR",
          payload: error,
        });
      });
  };
}

//post -> body
export function findEmail(body) {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    axios
      .post(URL + "/findEmail", body)
      .then((data) => {
        dispatch({
          type: "FIND_EMAIL",
          payload: data,
        });
      })
      .catch((error) => {
        dispatch({
          type: "ERROR",
          payload: error,
        });
      });
  };
}

export function findPassword(body) {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    axios
      .post(URL + "/findPW", body)
      .then((data) => {
        dispatch({
          type: "FIND_PASSWORD",
          payload: data,
        });
      })
      .catch((error) => {
        dispatch({
          type: "ERROR",
          payload: error,
        });
      });
  };
}

export function resetPW(token, body) {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    axios
      .post(URL + "/resetPW/" + token, body)
      .then((data) => {
        dispatch({
          type: "RESET_PASSWORD",
          payload: data,
        });
      })
      .catch((error) => {
        dispatch({
          type: "ERROR",
          payload: error,
        });
      });
  };
}

export function clearError() {
  return (dispatch) => {
    dispatch({ type: "CLEAR_ERROR" });
  };
}
