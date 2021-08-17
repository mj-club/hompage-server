import produce from "immer";

const initialState = {
    name: null,
    loading: false,
    error: null,
    representation: null,
    contact_number :null,
    introduction : null,
    plan : null,
    recruit : null,
    meeting : null,
    recruitment : null,
    sns : [],
    joins : []
}

const clubReducer = produce((state, action) => {
    console.log(action);
    switch (action.type) {
      case "CLUB":
        state.loading = false;
        state.name = action.payload;
        state.error = null;
        break;
      case "LOADING":
        state.loading = true;
        break;
      case "ERROR":
        state.loading = false;
        state.error = action.payload;
        break;
      case "CLEAR_ERROR":
        state.error = null;
        break;
  
      case "REPRESENTATION":
        state.representation = action.payload;
        break;
      case "CONTACT":
        state.contact_number = action.payload;
        break;
      case "PLAN":
        state.plan = action.payload;
        break;
      case "RECRUIT":
        state.recruit = action.payload;
        break;
      case "MEETING":
        state.meeting = action.payload;
        break;
      case "RECRUITMENT":
        state.recruitment = action.payload;
        break;
      case "SNS":
        state.sns = action.payload;
        break;
      case "JOIN":
        state.joins = action.payload;
        break;
  
      default:
        return state;
    }
  }, initialState);
  
  export default clubReducer;