import AuthService from "./AuthService";

const Auth = new AuthService();

export default function Logout(props) {
  console.log(props);
  Auth.logout();
  return props.history.replace("/");
}
