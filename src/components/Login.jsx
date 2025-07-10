import React from "react";
import logo1 from "../assets/images/logo1.png";
import agricbg from "../assets/soikl.jpeg";
import { useNavigate } from "react-router";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-cover bg-center bg-[url(./assets/sun.jpeg)]">
      {/* <img
        src={agricbg}
        alt="EBE FARMS"
        class="w-full rounded-lg shadow-md"
      ></img> */}
      <div className="bg-black/40 backdrop:blur-2xl absolute w-screen h-[100vh]"></div>
      <div className="bg-white bg-opacity-90 rounded-lg shadow-lg flex w-full h-[70vh] max-w-4xl overflow-hidden absolute">
        <div className="w-1/2 bg-green-800 text-white p-10 flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold mb-6">
            Welcome Back! Let's grow togther.
          </h1>
          <p className="text-center">Login to nurture your land.</p>
        </div>
        <div className="w-1/2 bg-white p-10 flex flex-col justify-center items-center">
          <h2 className="text-2xl font-semibold mb-4">Login</h2>
          <input
            type="text"
            placeholder="Username"
            className="w-full mb-4 px-4 py-2 border rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 px-4 py-2 border rounded-md"
          />
          <button className="w-full py-2 bg-green-800 text-white rounded-md hover:bg-green-700 transition">
            LOGIN
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="mt-4 text-sm text-green-800 hover:underline"
          >
            Don't have an account? Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
export default Login;

// function SignUp() {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-cover bg-center">
//       <img
//         src="./assets/agric-bg.png"
//         alt="EBE FARMS"
//         class="w-full rounded-lg shadow-md"
//       ></img>
//       <div className="bg-white bg-opacity-90 rounded-lg shadow-lg flex w-full max-w-4xl overflow-hidden">
//         <div className="w-1/2 bg-green-800 text-white p-10 flex flex-col justify-center items-center">
//           <h1 className="text-3xl font-bold mb-6">Join EBE FARMS</h1>
//           <p className="text-center">Create your account to access EBE FARMS</p>
//         </div>
//         <div className="w-1/2 bg-white p-10 flex flex-col justify-center items-center">
//           <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
//           <input
//             type="text"
//             placeholder="Full Name"
//             className="w-full mb-4 px-4 py-2 border rounded-md"
//           />
//           <input
//             type="text"
//             placeholder="Username"
//             className="w-full mb-4 px-4 py-2 border rounded-md"
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full mb-4 px-4 py-2 border rounded-md"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full mb-4 px-4 py-2 border rounded-md"
//           />
//           <button className="w-full py-2 bg-green-800 text-white rounded-md hover:bg-green-700 transition">
//             SIGN UP
//           </button>
//           <button
//             onClick={() => navigate("/login")}
//             className="mt-4 text-sm text-green-800 hover:underline"
//           >
//             Already have an account? Login
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default SignUp;
