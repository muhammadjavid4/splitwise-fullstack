// import { useState } from "react";
// import { useNavigate } from "react-router-dom"; // 🔥 MISSING IMPORT
// import Navbar from "../components/layout/Navbar";
// import GroupList from "../features/groups/GroupList";
// import CreateGroup from "../features/groups/CreateGroup";

// export default function Dashboard() {
//   const navigate = useNavigate(); // 🔥 MISSING HOOK
//   const [showModal, setShowModal] = useState(false);
//   const [refresh, setRefresh] = useState(false);

//   return (
//     <>
//       <Navbar />
//       <div className="max-w-7xl mx-auto px-6 py-12">
//         <div className="flex justify-between items-center">
//           <h1 className="text-3xl font-bold">Your Groups</h1>
//           <button
//             onClick={() => setShowModal(true)}
//             className="px-5 py-2 bg-cyan-500 text-black rounded-xl font-semibold"
//           >
//             + New Group
//           </button>
//         </div>

//         <GroupList
//           key={refresh}
//           onSelect={(group) => navigate(`/groups/${group.id}`)}
//         />

//         {showModal && (
//           <CreateGroup
//             onClose={() => setShowModal(false)}
//             onCreated={() => setRefresh(!refresh)}
//           />
//         )}
//       </div>
//     </>
//   );
// }

// import { useState } from "react";
// import Navbar from "../components/layout/Navbar";
// import GroupList from "../features/groups/GroupList";
// import CreateGroup from "../features/groups/CreateGroup";
// import GroupMembers from "../features/groups/GroupMembers";

// export default function Dashboard() {
//   const [showModal, setShowModal] = useState(false);
//   const [refresh, setRefresh] = useState(false);
//   const [selectedGroup, setSelectedGroup] = useState(null);

//   return (
//     <>
//       <Navbar />

//       <div className="max-w-7xl mx-auto px-6 py-12">
//         {/* HEADER */}
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold">Your Groups</h1>

//           <button
//             onClick={() => setShowModal(true)}
//             className="px-5 py-2 bg-cyan-500 text-black rounded-xl font-semibold"
//           >
//             + New Group
//           </button>
//         </div>

//         {/* MAIN CONTENT */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* LEFT: GROUP LIST */}
//           <GroupList
//             key={refresh}
//             onSelect={(group) => setSelectedGroup(group)}
//           />

//           {/* RIGHT: GROUP DETAILS */}
//           <div className="lg:col-span-2">
//             {selectedGroup ? (
//               <GroupMembers
//                 group={selectedGroup}
//                 onUpdated={() => {
//                   setRefresh(!refresh);
//                   setSelectedGroup(null);
//                 }}
//               />
//             ) : (
//               <div className="h-full flex items-center justify-center
//                               border border-dashed border-slate-700
//                               rounded-2xl text-slate-500">
//                 Select a group to see details 👈
//               </div>
//             )}
//           </div>
//         </div>

//         {/* CREATE GROUP MODAL */}
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
//     </>
//   );
// }

// Main Code hai a mat 

// import { useState } from "react";
// import Navbar from "../components/layout/Navbar";
// import GroupList from "../features/groups/GroupList";
// import CreateGroup from "../features/groups/CreateGroup";
// import GroupMembers from "../features/groups/GroupMembers";

// export default function Dashboard() {
//   const [showModal, setShowModal] = useState(false);
//   const [refresh, setRefresh] = useState(false);
//   const [selectedGroup, setSelectedGroup] = useState(null);

//   // 🔥 THIS IS THE FIX
//   const resetDashboard = () => {
//     setSelectedGroup(null);
//   };

//   return (
//     <>
//       {/* 🔥 PASS RESET FUNCTION */}
//       <Navbar onDashboardClick={resetDashboard} />

//       <div className="max-w-7xl mx-auto px-6 py-12">
//         {/* HEADER */}
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold">Your Groups</h1>

//           <button
//             onClick={() => setShowModal(true)}
//             className="px-5 py-2 bg-cyan-500 text-black rounded-xl font-semibold"
//           >
//             + New Group
//           </button>
//         </div>

//         {/* MAIN CONTENT */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* LEFT: GROUP LIST */}
//           <GroupList
//             key={refresh}
//             onSelect={(group) => setSelectedGroup(group)}
//           />

//           {/* RIGHT: GROUP DETAILS */}
//           <div className="lg:col-span-2">
//             {selectedGroup ? (
//               <GroupMembers
//                 group={selectedGroup}
//                 onUpdated={() => {
//                   setRefresh(!refresh);
//                   setSelectedGroup(null);
//                 }}
//               />
//             ) : (
//               <div className="h-full flex items-center justify-center
//                               border border-dashed border-slate-700
//                               rounded-2xl text-slate-500">
//                 Select a group to see details 👈
//               </div>
//             )}
//           </div>
//         </div>

//         {/* CREATE GROUP MODAL */}
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
//     </>
//   );
// }

import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import GroupList from "../features/groups/GroupList";
import CreateGroup from "../features/groups/CreateGroup";
import GroupMembers from "../features/groups/GroupMembers";
import useUserStore from "../store/user.store";
import { toast } from "react-hot-toast";

export default function Dashboard() {
  const user = useUserStore((s) => s.user);
  const [showModal, setShowModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const resetDashboard = () => {
    setSelectedGroup(null);
  };

  return (
    <>
      <Navbar onDashboardClick={resetDashboard} />
      {/* <button onClick={() => toast.success("Hello")}>
  Click
</button> */}

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* WELCOME MESSAGE */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Hello, {user?.name || "User"}! 👋
          </h1>
          <p className="text-slate-400">
            Welcome back! Manage your groups and expenses here.
          </p>
        </div>

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Your Groups</h2>

          <button
            onClick={() => setShowModal(true)}
            className="px-5 py-2 bg-cyan-500 text-black rounded-xl font-semibold hover:bg-cyan-400 transition"
          >
            + New Group
          </button>
        </div>

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT: GROUP LIST */}
          <GroupList
            key={refresh}
            onSelect={(group) => setSelectedGroup(group)}
          />

          {/* RIGHT: GROUP DETAILS */}
          <div className="lg:col-span-2">
            {selectedGroup ? (
              <GroupMembers
                group={selectedGroup}
                onUpdated={() => {
                  setRefresh(!refresh);
                  setSelectedGroup(null);
                }}
              />
            ) : (
              <div className="h-full flex items-center justify-center
                              border border-dashed border-slate-700
                              rounded-2xl text-slate-500">
                Select a group to see details 👈
              </div>
            )}
          </div>
        </div>

        {/* CREATE GROUP MODAL */}
        {showModal && (
          <CreateGroup
            onClose={() => setShowModal(false)}
            onCreated={() => {
              setRefresh(!refresh);
              setShowModal(false);
            }}
          />
        )}
      </div>
    </>
  );
}