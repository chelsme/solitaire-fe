// import React, { Component } from "react";
// import AuthService from "./AuthService";

// export default function withAuth(AuthComponent) {
//   const Auth = new AuthService("http://localhost:3000/api/v1");
//   return class AuthWrapped extends Component {
//     constructor(props, context) {
//       super(props, context);
//       this.state = {
//         user: null
//       };
//     }

//     componentDidMount() {
//       if (!Auth.loggedIn()) {
//         this.props.history.replace("/");
//       } else {
//         try {
//           const profile = Auth.getProfile();
//           this.setState({
//             user: profile
//           });
//         } catch (err) {
//           Auth.logout();
//           this.props.history.replace("/");
//         }
//       }
//     }

//     render() {
//       console.log("HOC fired", this.props, this.context);
//       if (this.state.user) {
//         return (
//           <AuthComponent history={this.props.history} user={this.state.user} />
//         );
//       } else {
//         return null;
//       }
//     }
//   };
// }
