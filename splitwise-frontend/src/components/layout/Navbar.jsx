// import { Link, useNavigate } from "react-router-dom";
// import useUserStore from "../../store/user.store";
// import { logoutApi } from "../../features/auth/auth.api";
// import {
//   FiLogIn,
//   FiUserPlus,
//   FiGrid,
//   FiLogOut,
// } from "react-icons/fi";

// export default function Navbar() {
//   const navigate = useNavigate();
//   const { isAuth, logout } = useUserStore();

//   const handleLogout = async () => {
//     try {
//       await logoutApi();
//     } catch (e) {
//       // ignore backend error
//     } finally {
//       logout();
//       navigate("/login");
//     }
//   };

//   return (
//     <>
//       {/* TOP GLOW */}
//       <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[500px] h-[80px] bg-cyan-500/20 blur-3xl z-40 pointer-events-none" />

//       <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur border-b border-slate-800">
//         <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

//           {/* LOGO */}
//           <Link
//             to="/"
//             className="text-xl font-bold text-cyan-400 relative group"
//           >
//             Split<span className="text-white">Wise</span>
//             <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-cyan-400 transition-all duration-300 group-hover:w-full" />
//           </Link>

//           {/* RIGHT SIDE */}
//           {!isAuth ? (
//             <div className="flex gap-4 items-center">
//               <Link
//                 to="/login"
//                 className="relative flex items-center gap-2 text-slate-300 hover:text-white transition group"
//               >
//                 <FiLogIn />
//                 Login
//                 <span className="absolute left-1/2 -bottom-1 w-0 h-[2px] bg-cyan-400 transition-all duration-300 group-hover:w-full group-hover:left-0" />
//               </Link>

//               <Link
//                 to="/register"
//                 className="relative px-4 py-2 rounded-lg bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition overflow-hidden"
//               >
//                 <span className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition" />
//                 <span className="relative z-10 flex items-center gap-2">
//                   <FiUserPlus />
//                   Get Started
//                 </span>
//               </Link>
//             </div>
//           ) : (
//             <div className="flex gap-4 items-center">
//               <Link
//                 to="/dashboard"
//                 className="relative flex items-center gap-2 text-slate-300 hover:text-white transition group"
//               >
//                 <FiGrid />
//                 Dashboard
//                 <span className="absolute left-1/2 -bottom-1 w-0 h-[2px] bg-cyan-400 transition-all duration-300 group-hover:w-full group-hover:left-0" />
//               </Link>

//               <button
//                 onClick={handleLogout}
//                 className="relative px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition flex items-center gap-2"
//               >
//                 <FiLogOut />
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </nav>
//     </>
//   );
// }

// import { Link, useNavigate } from "react-router-dom";
// import useUserStore from "../../store/user.store";
// import { logoutApi } from "../../features/auth/auth.api";
// import {
//   FiLogIn,
//   FiUserPlus,
//   FiGrid,
//   FiLogOut,
// } from "react-icons/fi";

// export default function Navbar({ onDashboardClick }) {
//   const navigate = useNavigate();
//   const { isAuth, logout } = useUserStore();

//   const handleLogout = async () => {
//     try {
//       await logoutApi();
//     } catch (e) {
//       // ignore backend error
//     } finally {
//       logout();
//       navigate("/login");
//     }
//   };

//   return (
//     <>
//       {/* TOP GLOW */}
//       <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[500px] h-[80px] bg-cyan-500/20 blur-3xl z-40 pointer-events-none" />

//       <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur border-b border-slate-800">
//         <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

//           {/* LOGO */}
//           <Link
//             to="/"
//             className="text-xl font-bold text-cyan-400 relative group"
//           >
//             Split<span className="text-white">Wise</span>
//             <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-cyan-400 transition-all duration-300 group-hover:w-full" />
//           </Link>

//           {/* RIGHT SIDE */}
//           {!isAuth ? (
//             <div className="flex gap-4 items-center">
//               <Link
//                 to="/login"
//                 className="flex items-center gap-2 text-slate-300 hover:text-white transition"
//               >
//                 <FiLogIn />
//                 Login
//               </Link>

//               <Link
//                 to="/register"
//                 className="px-4 py-2 rounded-lg bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition flex items-center gap-2"
//               >
//                 <FiUserPlus />
//                 Get Started
//               </Link>
//             </div>
//           ) : (
//             <div className="flex gap-4 items-center">

//               {/* 🔥 DASHBOARD FIX */}
//               <button
//                 onClick={() => {
//                   onDashboardClick?.();   // 🔥 RESET SELECTED GROUP
//                   navigate("/dashboard");
//                 }}
//                 className="flex items-center gap-2 text-slate-300 hover:text-white transition"
//               >
//                 <FiGrid />
//                 Dashboard
//               </button>

//               <button
//                 onClick={handleLogout}
//                 className="px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition flex items-center gap-2"
//               >
//                 <FiLogOut />
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </nav>
//     </>
//   );
// }

// import { Link, useLocation, useNavigate } from "react-router-dom";
// import useUserStore from "../../store/user.store";
// import { logoutApi } from "../../features/auth/auth.api";
// import {
//   FiLogIn,
//   FiUserPlus,
//   FiGrid,
//   FiLogOut,
// } from "react-icons/fi";

// export default function Navbar({ onDashboardClick }) {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { isAuth, logout } = useUserStore();

//   const isDashboard = location.pathname === "/dashboard";

//   const handleLogout = async () => {
//     try {
//       await logoutApi();
//     } catch {}
//     finally {
//       logout();
//       navigate("/login");
//     }
//   };

//   return (
//     <>
//       {/* TOP GLOW */}
//       <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[520px] h-[90px] bg-cyan-500/20 blur-3xl z-40 pointer-events-none" />

//       <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur border-b border-slate-800">
//         <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

//           {/* LOGO */}
//           <Link
//             to="/"
//             className="text-xl font-bold text-cyan-400 relative transition hover:opacity-90"
//           >
//             Split<span className="text-white">Wise</span>
//           </Link>

//           {/* RIGHT SIDE */}
//           {!isAuth ? (
//             <div className="flex gap-5 items-center">
//               <Link
//                 to="/login"
//                 className="flex items-center gap-2 text-slate-300 hover:text-white transition"
//               >
//                 <FiLogIn />
//                 Login
//               </Link>

//               <Link
//                 to="/register"
//                 className="px-4 py-2 rounded-lg bg-cyan-500 text-black font-semibold
//                            hover:bg-cyan-400 transition active:scale-95"
//               >
//                 <span className="flex items-center gap-2">
//                   <FiUserPlus />
//                   Get Started
//                 </span>
//               </Link>
//             </div>
//           ) : (
//             <div className="flex gap-5 items-center">

//               {/* DASHBOARD */}
//               <button
//                 onClick={() => {
//                   onDashboardClick?.();
//                   navigate("/dashboard");
//                 }}
//                 className={`
//                   relative flex items-center gap-2 px-4 py-2 rounded-lg
//                   transition-all duration-200
//                   ${isDashboard
//                     ? "text-cyan-400 bg-cyan-500/10 shadow-[0_0_12px_rgba(34,211,238,0.3)]"
//                     : "text-slate-300 hover:text-white hover:bg-slate-800"}
//                   active:scale-95
//                 `}
//               >
//                 <FiGrid />
//                 Dashboard
//               </button>

//               {/* LOGOUT */}
//               <button
//                 onClick={handleLogout}
//                 className="px-4 py-2 rounded-lg bg-red-500/10 text-red-400
//                            hover:bg-red-500/20 transition active:scale-95
//                            flex items-center gap-2"
//               >
//                 <FiLogOut />
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </nav>
//     </>
//   );
// }

import { Link, useLocation, useNavigate } from "react-router-dom";
import useUserStore from "../../store/user.store";
import { logoutApi } from "../../features/auth/auth.api";
import {
  FiLogIn,
  FiUserPlus,
  FiGrid,
  FiLogOut,
} from "react-icons/fi";
import NotificationBell from "./NotificationBell";


export default function Navbar({ onDashboardClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuth, logout } = useUserStore();

  const isDashboard = location.pathname === "/dashboard";

  const handleLogout = async () => {
    try {
      await logoutApi();
    } catch (e) {
      // ignore backend error
    } finally {
      logout();
      navigate("/login");
    }
  };

  return (
    <>
      {/* 🔥 TOP GLOW (softened) */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[420px] h-[70px] bg-cyan-500/15 blur-3xl z-40 pointer-events-none" />

      <nav className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-[72px] flex justify-between items-center">

          {/* LOGO */}
          <Link
            to="/"
            className="text-xl font-bold text-cyan-400 relative group tracking-wide"
          >
            Split<span className="text-white">Wise</span>
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-cyan-400 transition-all duration-300 group-hover:w-full" />
          </Link>

          {/* RIGHT SIDE */}
          {!isAuth ? (
            <div className="flex gap-4 items-center">

              {/* LOGIN */}
              <Link
                to="/login"
                className="relative group flex items-center gap-2 text-slate-300 hover:text-white transition"
              >
                <FiLogIn />
                Login
                <span className="absolute left-1/2 -bottom-1 w-0 h-[2px] bg-cyan-400 transition-all duration-300 group-hover:w-full group-hover:left-0" />
              </Link>

              {/* REGISTER */}
              <Link
                to="/register"
                className="relative px-4 py-2 rounded-lg bg-cyan-500 text-black font-semibold
                           hover:bg-cyan-400 transition-all duration-200
                           active:scale-95 shadow-lg shadow-cyan-500/20"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <FiUserPlus />
                  Get Started
                </span>
              </Link>
            </div>
          ) : (
            <div className="flex gap-4 items-center">

              {/* DASHBOARD */}
              <button
                onClick={() => {
                  onDashboardClick?.();
                  navigate("/dashboard");
                }}
                className={`
                  group relative flex items-center gap-2 px-4 py-2 rounded-lg
                  transition-all duration-200
                  ${isDashboard
                    ? "text-cyan-400 bg-cyan-500/10"
                    : "text-slate-300 hover:text-white hover:bg-white/5"}
                  active:scale-95
                `}
              >
                <FiGrid />
                Dashboard

                {/* SMOOTH UNDERLINE */}
                <span
                  className={`
                    absolute left-0 bottom-0 h-[2px] bg-cyan-400 rounded-full
                    transition-all duration-300
                    ${isDashboard
                      ? "w-full shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                      : "w-0 group-hover:w-full"}
                  `}
                />
              </button>
              {/* 🔔 NOTIFICATION BELL */}
              <NotificationBell
                onClick={() => navigate("/notifications")}
              />

              {/* LOGOUT */}
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg
                           bg-red-500/10 text-red-400
                           hover:bg-red-500/20 hover:text-red-300
                           transition-all duration-200
                           active:scale-95
                           flex items-center gap-2"
              >
                <FiLogOut />
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
