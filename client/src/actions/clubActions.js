import axios from "axios";

const URL = process.env.REACT_APP_NODE_ENV === "development" ? "http://13.209.214.244:8080/read" : "";

export function clubInfo(clubName) {
    return (dispatch) => {
        dispatch({ type: "LOADING" });
        axios
          // .get(URL + "/auth/kakao")
          .get(URL, {
              params: {
                  clubName: clubName
              }
          })
          .then(({ data }) => {
            dispatch({
              type: "CLUB",
              payload: data.name,
            }),
            dispatch({
              type: "REPRESENTATION",
              payload: data.representation,
            }),
            dispatch({
              type: "CONTACT",
              payload: data.contact_number,
            }),
            dispatch({
              type: "PLAN",
              payload: data.plan,
            }),
            dispatch({
              type: "RECRUIT",
              payload: data.recruit,
            }),
            dispatch({
              type: "MEETING",
              payload: data.meeting,
            }),
            dispatch({
              type: "RECRUITMENT",
              payload: data.recruitment,
            }),
            dispatch({
              type: "SNS",
              payload: data.sns,
            }),
            dispatch({
              type: "JOIN",
              payload: data.joins,
            });
          })
          .then(() => { })
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


// {
//     "id":1,
//     "name":"blue",
//     "representation":"회장이름",
//     "contact_number":"0102312111",
//     "introduction":"소개 daasddsad",
//     "plan":"플랜 ",
//     "recruit":"모집기간",
//     "meeting":"정기모집",
//     "recruitment":"모집",
//     "createdAt":"2021-08-10T14:07:05.000Z",
//     "updatedAt":"2021-08-10T14:07:05.000Z",
//     "Sns":[
//         {   
//             "id":1,
//             "sns_type":"youtube",
//             "sns_link":"https://www.youtube.com/",
//             "createdAt":"2021-08-10T14:07:05.000Z",
//             "updatedAt":"2021-08-10T14:07:05.000Z",
//             "club_id":1
//         },
//         {   
//             "id":2,
//             "sns_type":"inst",
//             "sns_link":"https://www.instagram.com/",
//             "createdAt":"2021-08-10T14:07:05.000Z",
//             "updatedAt":"2021-08-10T14:07:05.000Z",
//             "club_id":1
//         }],
//     "Joins":[
//         {   
//             "id":1,
//             "join_type":"call",
//             "join_path":"010-1234-5678",
//             "createdAt":"2021-08-10T14:07:05.000Z",
//             "updatedAt":"2021-08-10T14:07:05.000Z",
//             "club_id":1
//         },
//         {   
//             "id":2,
//             "join_type":"form",
//             "join_path":"https://www.google.com/forms/about/",
//             "createdAt":"2021-08-10T14:07:05.000Z",
//             "updatedAt":"2021-08-10T14:07:05.000Z",
//             "club_id":1
//         }]
//     }