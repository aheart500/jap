export default function ServicesReducer(state, action) {
  switch (action.type) {
    case "services":
      return { ...state, services: action.payload };
    case "balance":
      return { ...state, balance: action.payload };
    default:
      return state;
  }
}
