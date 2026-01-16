// import { useParams, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import Navbar from "../../components/layout/Navbar";
// import ExpenseList from "../expenses/ExpenseList";
// import AddExpense from "../expenses/AddExpense";
// import GroupBalance from "../balance/GroupBalance";


// export default function GroupDetails() {
//   const { groupId } = useParams();
//   const navigate = useNavigate();

//   const [showAdd, setShowAdd] = useState(false);
//   const [refresh, setRefresh] = useState(false);

//   return (
//     <>
//       <Navbar />

//       <div className="max-w-4xl mx-auto px-6 py-10">
//         {/* HEADER */}
//         <div className="flex justify-between items-center">
//           <h1 className="text-3xl font-bold">Group Expenses</h1>

//           <button
//             onClick={() => setShowAdd(true)}
//             className="px-5 py-2 bg-cyan-500 text-black rounded-xl font-semibold"
//           >
//             + Add Expense
//           </button>
//         </div>

//         {/* BACK */}
//         <button
//           onClick={() => navigate(-1)}
//           className="mt-3 text-slate-400 hover:text-white text-sm"
//         >
//           ← Back to groups
//         </button>
//         {/* BALANCE */}
//         <GroupBalance groupId={groupId} />

//         {/* LIST */}
//         <ExpenseList key={refresh} groupId={groupId} />

//         {showAdd && (
//           <AddExpense
//             groupId={groupId}
//             onClose={() => setShowAdd(false)}
//             onAdded={() => setRefresh(!refresh)}
//           />
//         )}
//       </div>
//     </>
//   );
// }

// main code nai chodna

// import { useParams, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import Navbar from "../../components/layout/Navbar";
// import ExpenseList from "../expenses/ExpenseList";
// import AddExpense from "../expenses/AddExpense";
// import GroupBalance from "../balance/GroupBalance";

// export default function GroupDetails() {
//   const { groupId } = useParams();
//   const navigate = useNavigate();

//   const [showAdd, setShowAdd] = useState(false);
//   const [refresh, setRefresh] = useState(false);

//   return (
//     <>
//       <Navbar />

//       <div className="max-w-7xl mx-auto px-4 py-6">

//         {/* HEADER */}
//         <div className="flex justify-between items-center mb-4">
//           <div>
//             <h1 className="text-2xl md:text-3xl font-bold">Group Expenses</h1>
//             <button
//               onClick={() => navigate(-1)}
//               className="text-slate-400 hover:text-white text-sm mt-1"
//             >
//               ← Back to groups
//             </button>
//           </div>

//           <button
//             onClick={() => setShowAdd(true)}
//             className="px-4 py-2 bg-cyan-500 text-black rounded-xl font-semibold hover:bg-cyan-400 transition"
//           >
//             + Add Expense
//           </button>
//         </div>

//         {/* 🧠 MOBILE BALANCE (TOP FIXED CARD) */}
//         <div className="lg:hidden mb-4">
//           <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
//             <GroupBalance groupId={groupId} />
//           </div>
//         </div>

//         {/* 🔥 DESKTOP LAYOUT */}
//         <div className="hidden lg:grid grid-cols-3 gap-6">

//           {/* LEFT – STICKY BALANCE */}
//           <div className="col-span-1">
//             <div className="sticky top-24">
//               <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
//                 <GroupBalance groupId={groupId} />
//               </div>
//             </div>
//           </div>

//           {/* RIGHT – SCROLLABLE EXPENSES */}
//           <div className="col-span-2">
//             <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 h-[70vh] overflow-y-auto">
//               <ExpenseList key={refresh} groupId={groupId} />
//             </div>
//           </div>
//         </div>

//         {/* 📜 MOBILE EXPENSE LIST */}
//         <div className="lg:hidden">
//           <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 max-h-[65vh] overflow-y-auto">
//             <ExpenseList key={refresh} groupId={groupId} />
//           </div>
//         </div>

//         {/* ADD EXPENSE MODAL */}
//         {showAdd && (
//           <AddExpense
//             groupId={groupId}
//             onClose={() => setShowAdd(false)}
//             onAdded={() => {
//               setRefresh(!refresh);
//               setShowAdd(false);
//             }}
//           />
//         )}
//       </div>
//     </>
//   );
// }


// Main Code yahi hai bhai mat bhool ja 

// import { useParams, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import Navbar from "../../components/layout/Navbar";
// import ExpenseList from "../expenses/ExpenseList";
// import AddExpense from "../expenses/AddExpense";
// import GroupBalance from "../balance/GroupBalance";

// export default function GroupDetails() {
//   const { groupId } = useParams();
//   const navigate = useNavigate();

//   const [showAdd, setShowAdd] = useState(false);
//   const [refresh, setRefresh] = useState(false);

//   return (
//     <>
//       <Navbar />

//       <div className="max-w-6xl mx-auto px-4 py-6">

//         {/* HEADER */}
//         <div className="flex justify-between items-center mb-4">
//           <div>
//             <h1 className="text-2xl md:text-3xl font-bold">Group Expenses</h1>
//             <button
//               onClick={() => navigate(-1)}
//               className="text-slate-400 hover:text-white text-sm mt-1"
//             >
//               ← Back to groups
//             </button>
//           </div>

//           <button
//             onClick={() => setShowAdd(true)}
//             className="px-4 py-2 bg-cyan-500 text-black rounded-xl font-semibold"
//           >
//             + Add Expense
//           </button>
//         </div>

//         {/* 🔥 BALANCE — ALWAYS TOP */}
//         <div className="mb-5">
//           <GroupBalance groupId={groupId} />
//         </div>

//         {/* 🔥 EXPENSE LIST — ONLY THIS SCROLLS */}
//         <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 h-[65vh] overflow-y-auto">
//           <ExpenseList key={refresh} groupId={groupId} />
//         </div>

//         {/* ADD EXPENSE MODAL */}
//         {showAdd && (
//           <AddExpense
//             groupId={groupId}
//             onClose={() => setShowAdd(false)}
//             onAdded={() => {
//               setRefresh(!refresh);
//               setShowAdd(false);
//             }}
//           />
//         )}
//       </div>
//     </>
//   );
// }

// import { useParams, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import Navbar from "../../components/layout/Navbar";
// import ExpenseList from "../expenses/ExpenseList";
// import AddExpense from "../expenses/AddExpense";
// import GroupBalance from "../balance/GroupBalance";

// export default function GroupDetails() {
//   const { groupId } = useParams();
//   const navigate = useNavigate();

//   const [showAdd, setShowAdd] = useState(false);
//   const [refresh, setRefresh] = useState(false);

//   return (
//     <div className="h-screen flex flex-col">
//       <Navbar />

//       <div className="flex-1 overflow-hidden">
//         <div className="max-w-6xl mx-auto px-4 py-6 h-full flex flex-col">

//           {/* HEADER - FIXED */}
//           <div className="flex justify-between items-center mb-4 flex-shrink-0">
//             <div>
//               <h1 className="text-2xl md:text-3xl font-bold">Group Expenses</h1>
//               <button
//                 onClick={() => navigate(-1)}
//                 className="text-slate-400 hover:text-white text-sm mt-1"
//               >
//                 ← Back to groups
//               </button>
//             </div>

//             <button
//               onClick={() => setShowAdd(true)}
//               className="px-4 py-2 bg-cyan-500 text-black rounded-xl font-semibold"
//             >
//               + Add Expense
//             </button>
//           </div>

//           {/* BALANCE - FIXED AT TOP */}
//           <div className="mb-5 flex-shrink-0">
//             <GroupBalance groupId={groupId} />
//           </div>

//           {/* EXPENSE LIST - SCROLLABLE AREA */}
//           <div className="flex-1 overflow-y-auto bg-slate-900 border border-slate-800 rounded-2xl p-4">
//             <ExpenseList key={refresh} groupId={groupId} />
//           </div>

//         </div>
//       </div>

//       {/* ADD EXPENSE MODAL */}
//       {showAdd && (
//         <AddExpense
//           groupId={groupId}
//           onClose={() => setShowAdd(false)}
//           onAdded={() => {
//             setRefresh(!refresh);
//             setShowAdd(false);
//           }}
//         />
//       )}
//     </div>
//   );
// }

// import { useParams, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import Navbar from "../../components/layout/Navbar";
// import ExpenseList from "../expenses/ExpenseList";
// import AddExpense from "../expenses/AddExpense";
// import GroupBalance from "../balance/GroupBalance";

// export default function GroupDetails() {
//   const { groupId } = useParams();
//   const navigate = useNavigate();

//   const [showAdd, setShowAdd] = useState(false);
//   const [refresh, setRefresh] = useState(false);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900">
//       <Navbar />

//       <div className="max-w-6xl mx-auto px-4 py-6">

//         {/* 🔙 BACK */}
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 mb-5"
//         >
//           ← Back
//         </button>

//         {/* 🧾 HEADER */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
//           <div>
//             <h1 className="text-3xl font-bold text-white">
//               Group Overview
//             </h1>
//             <p className="text-slate-400 text-sm">
//               Balance first, expenses later – clean & clear
//             </p>
//           </div>

//           <button
//             onClick={() => setShowAdd(true)}
//             className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-black font-semibold shadow-lg"
//           >
//             + Add Expense
//           </button>
//         </div>

//         {/* 💰 BALANCE SECTION (TOP PRIORITY) */}
//         <div className="mb-8">
//           <div className="rounded-3xl border border-cyan-500/30 bg-slate-900 p-5 shadow-xl">
//             <h2 className="text-sm uppercase tracking-wide text-cyan-400 mb-3">
//               Group Balance
//             </h2>
//             <GroupBalance groupId={groupId} />
//           </div>
//         </div>

//         {/* 📜 EXPENSES SECTION */}
//         <div className="rounded-3xl bg-slate-900 border border-slate-800 shadow-xl p-5">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-xl font-bold text-white">
//               Expenses History
//             </h2>
//             <span className="text-xs text-slate-400">
//               Scroll to view all
//             </span>
//           </div>

//           <div className="max-h-[60vh] overflow-y-auto pr-2 custom-scroll">
//             <ExpenseList key={refresh} groupId={groupId} />
//           </div>
//         </div>
//       </div>

//       {/* ➕ ADD EXPENSE MODAL */}
//       {showAdd && (
//         <AddExpense
//           groupId={groupId}
//           onClose={() => setShowAdd(false)}
//           onAdded={() => {
//             setRefresh(!refresh);
//             setShowAdd(false);
//           }}
//         />
//       )}

//       {/* 🎨 SCROLLBAR */}
//       <style jsx>{`
//         .custom-scroll::-webkit-scrollbar {
//           width: 6px;
//         }
//         .custom-scroll::-webkit-scrollbar-thumb {
//           background: rgba(34, 211, 238, 0.4);
//           border-radius: 10px;
//         }
//         .custom-scroll::-webkit-scrollbar-thumb:hover {
//           background: rgba(34, 211, 238, 0.7);
//         }
//       `}</style>
//     </div>
//   );
// }

// import { useState } from "react";
// import Navbar from "../components/layout/Navbar";
// import GroupList from "../features/groups/GroupList";
// import CreateGroup from "../features/groups/CreateGroup";
// import GroupMembers from "../features/groups/GroupMembers";
// import useUserStore from "../store/user.store";

// export default function Dashboard() {
//   const user = useUserStore((s) => s.user);
//   const [showModal, setShowModal] = useState(false);
//   const [refresh, setRefresh] = useState(false);
//   const [selectedGroup, setSelectedGroup] = useState(null);

//   const resetDashboard = () => setSelectedGroup(null);

//   return (
//     <div className="min-h-screen bg-slate-950">
//       <Navbar onDashboardClick={resetDashboard} />

//       <div className="max-w-7xl mx-auto px-4 py-8">

//         {/* HERO */}
//         <div className="rounded-3xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 p-6 mb-8">
//           <h1 className="text-3xl md:text-4xl font-bold text-white">
//             Welcome back, {user?.name || "User"}
//           </h1>
//           <p className="text-slate-400 mt-1">
//             Manage groups, members & expenses from one place
//           </p>
//         </div>

//         {/* ACTION BAR */}
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-xl font-semibold text-white">Your Groups</h2>
//           <button
//             onClick={() => setShowModal(true)}
//             className="px-5 py-2.5 rounded-xl bg-cyan-500 text-black font-semibold hover:bg-cyan-600 transition"
//           >
//             + Create Group
//           </button>
//         </div>

//         {/* MAIN LAYOUT */}
//         <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

//           {/* GROUP LIST */}
//           <div className="xl:col-span-4">
//             <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 h-full">
//               <GroupList
//                 key={refresh}
//                 onSelect={(group) => setSelectedGroup(group)}
//               />
//             </div>
//           </div>

//           {/* GROUP MEMBERS */}
//           <div className="xl:col-span-8">
//             {selectedGroup ? (
//               <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 h-full">
//                 <GroupMembers
//                   group={selectedGroup}
//                   onUpdated={() => {
//                     setRefresh(!refresh);
//                     setSelectedGroup(null);
//                   }}
//                 />
//               </div>
//             ) : (
//               <div className="h-full flex flex-col items-center justify-center border border-dashed border-slate-700 rounded-3xl text-slate-500">
//                 <p className="text-lg">No group selected</p>
//                 <p className="text-sm mt-1">Choose a group to manage members</p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* CREATE GROUP */}
//         {showModal && (
//           <CreateGroup
//             onClose={() => setShowModal(false)}
//             onCreated={() => {
//               setRefresh(!refresh);
//               setShowModal(false);
//             }}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import ExpenseList from "../expenses/ExpenseList";
import AddExpense from "../expenses/AddExpense";
import GroupBalance from "../balance/GroupBalance";
import GroupList from "../groups/GroupList";
import toast from "react-hot-toast";

export default function GroupDetails() {
  const { groupId } = useParams();
  const navigate = useNavigate();

  const [showAdd, setShowAdd] = useState(false);
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="text-slate-400 hover:text-cyan-400 mb-4"
        >
          ← Back
        </button>

        {/* 🔥 BALANCE – FULL WIDTH (IMPORTANT FIX HERE) */}
        <div className="mb-8">
          <div
            className="rounded-3xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10
                       border border-cyan-500/30 p-6"
          >
            <h2 className="text-sm uppercase text-cyan-400 mb-3">
              Group Balance
            </h2>

            {/* ✅ key={refresh} so balance reloads instantly */}
            <GroupBalance key={refresh} groupId={groupId} />
          </div>
        </div>

        {/* 🔥 MAIN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* 👥 LEFT – GROUPS */}
          <div className="lg:col-span-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 h-full">
              <h3 className="text-lg font-semibold text-white mb-4">
                Your Groups
              </h3>

              <GroupList
                key={refresh}
                onSelect={() => {}}
              />
            </div>
          </div>

          {/* 💸 RIGHT – EXPENSES */}
          <div className="lg:col-span-8">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 h-full">

              {/* HEADER */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    Expenses
                  </h3>
                  <p className="text-xs text-slate-400">
                    Each expense shows who paid
                  </p>
                </div>

                <button
                  onClick={() => setShowAdd(true)}
                  className="px-4 py-2 bg-cyan-500 text-black rounded-xl font-semibold"
                >
                  + Add Expense
                </button>
              </div>

              {/* EXPENSE LIST */}
              <div className="max-h-[65vh] overflow-y-auto pr-2 custom-scroll">
                <ExpenseList key={refresh} groupId={groupId} />
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ➕ ADD EXPENSE MODAL */}
      {showAdd && (
        <AddExpense
          groupId={groupId}
          onClose={() => setShowAdd(false)}
          onAdded={() => {
            setRefresh(!refresh);   // 🔥 trigger reload
            setShowAdd(false);
            toast.success("Expense added successfully");
          }}
        />
      )}

      {/* SCROLLBAR */}
      <style jsx>{`
        .custom-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: rgba(34, 211, 238, 0.4);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
