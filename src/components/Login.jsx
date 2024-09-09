// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { TimeSpentContext } from "./TimeSpentContext";

// const Login = () => {
//   const [emailOrUsername, setEmailOrUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();
//   const { setTimeSpent } = useContext(TimeSpentContext);

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setTimeSpent((prevTime) => prevTime + 1);
//     }, 60000); // Increment time spent every minute

//     return () => clearInterval(intervalId); // Clear interval on component unmount
//   }, [setTimeSpent]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:5000/login", {
//         emailOrUsername,
//         password,
//       });
//       setMessage(response.data.message);
//       localStorage.setItem("token", response.data.token);

//       // Refresh page and redirect to home on Login
//       window.location.reload(navigate("/"));
//     } catch (error) {
//       setMessage("Error: " + error.response.data.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center mx-auto">
//       <div className="max-w-[280px] w-full flex flex-col items-center justify-center text-center">
//         <h1 className="mb-5 text-4xl">Login</h1>
//         <form
//           className="w-full flex flex-col items-center"
//           onSubmit={handleSubmit}
//         >
//           <input
//             type="text"
//             className="w-full px-6 py-3 mb-2 border border-slate-600 rounded-lg font-medium"
//             placeholder="Email/Username"
//             value={emailOrUsername}
//             onChange={(e) => setEmailOrUsername(e.target.value)}
//           />
//           <input
//             type="password"
//             className="w-full px-6 py-3 mb-2 border border-slate-600 rounded-lg font-medium"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button className="bg-slate-500 hover:bg-slate-700 text-white text-base rounded-lg py-2.5 px-5 transition-colors w-full text-[19px]">
//             Login
//           </button>
//         </form>
//         {message && <p className="mt-3 text-red-600">{message}</p>}
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TimeSpentContext } from "./TimeSpentContext";

const Login = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { setTimeSpent } = useContext(TimeSpentContext);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeSpent((prevTime) => prevTime + 1);
    }, 60000); // Increment time spent every minute

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [setTimeSpent]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://ultimatewebsite2-api.onrender.com/login",
        {
          emailOrUsername,
          password,
        }
      );
      setMessage(response.data.message);
      localStorage.setItem("token", response.data.token);

      // Refresh page and redirect to home on Login
      window.location.reload(navigate("/"));
    } catch (error) {
      setMessage("Error: " + error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center mx-auto">
      <div className="max-w-[280px] w-full flex flex-col items-center justify-center text-center">
        <h1 className="mb-5 text-4xl">Login</h1>
        <form
          className="w-full flex flex-col items-center"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className="w-full px-6 py-3 mb-2 border border-slate-600 rounded-lg font-medium"
            placeholder="Email/Username"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
          />
          <input
            type="password"
            className="w-full px-6 py-3 mb-2 border border-slate-600 rounded-lg font-medium"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-slate-500 hover:bg-slate-700 text-white text-base rounded-lg py-2.5 px-5 transition-colors w-full text-[19px]">
            Login
          </button>
        </form>
        {message && <p className="mt-3 text-red-600">{message}</p>}
      </div>
    </div>
  );
};

export default Login;
