// import React from 'react';
// import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
// import FacebookLogin from '@greatsumini/react-facebook-login';
// import { LinkedIn } from 'react-linkedin-login-oauth2';

// const SocialLogin = () => {
//   const { signIn } = useGoogleLogin();

//   const handleFacebookResponse = (response) => {
//     console.log(response);
//     // Handle Facebook login response
//   };

//   const handleLinkedInSuccess = (data) => {
//     console.log(data);
//     // Handle LinkedIn login success
//   };

//   return (
//     <div>
//       <GoogleOAuthProvider clientId="628909562721-fhjqa647nljvv1jl9uni1saqba8ri3je.apps.googleusercontent.com">
//         <button onClick={signIn}>Google Login</button>
//       </GoogleOAuthProvider>

//       <FacebookLogin
//         appId="YOUR_FACEBOOK_APP_ID"
//         autoLoad={true}
//         fields="name,email,picture"
//         callback={handleFacebookResponse}
//       />
//       <LinkedIn
//         clientId="YOUR_LINKEDIN_CLIENT_ID"
//         onFailure={handleLinkedInSuccess}
//         onSuccess={handleLinkedInSuccess}
//         redirectUri="http://localhost:3000/linkedin"
//       />
//     </div>
//   );
// };

// export default SocialLogin;
