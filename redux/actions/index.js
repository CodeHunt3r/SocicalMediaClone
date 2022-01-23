import { getAuth } from "firebase/auth";

const auth = getAuth();
const user = auth.currentUser;

export function fetchUser() {
  return (dispatch) => {};
}
