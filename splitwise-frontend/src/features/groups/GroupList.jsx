// import { useEffect, useState } from "react";
// import { getMyGroupsApi } from "./group.api";

// export default function GroupList({ onSelect }) {
//   const [groups, setGroups] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getMyGroupsApi()
//       .then((res) => setGroups(res.data.groups))
//       .finally(() => setLoading(false));
//   }, []);

//   if (loading) {
//     return <p className="text-slate-400">Loading groups...</p>;
//   }

//   return (
//     <div className="grid md:grid-cols-3 gap-6 mt-8">
//       {groups.map((group) => (
//         <div
//           key={group.id}
//           onClick={() => onSelect(group)}
//           className="cursor-pointer bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-cyan-500 transition"
//         >
//           <h3 className="text-xl font-semibold text-cyan-400">
//             {group.name}
//           </h3>
//           <p className="mt-2 text-sm text-slate-400">
//             Members: {group.members_count || "—"}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import { getMyGroupsApi, getGroupMembersApi } from "./group.api";

// export default function GroupList({ onSelect }) {
//   const [groups, setGroups] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const load = async () => {
//       try {
//         const res = await getMyGroupsApi();
//         const groupsData = res.data.groups;

//         // 🔥 fetch members count for each group
//         const enrichedGroups = await Promise.all(
//           groupsData.map(async (g) => {
//             try {
//               const membersRes = await getGroupMembersApi(g.id);
//               return {
//                 ...g,
//                 members_count: membersRes.data.members.length,
//               };
//             } catch {
//               return { ...g, members_count: 0 };
//             }
//           })
//         );

//         setGroups(enrichedGroups);
//       } finally {
//         setLoading(false);
//       }
//     };

//     load();
//   }, []);

//   if (loading) {
//     return <p className="text-slate-400">Loading groups...</p>;
//   }

//   return (
//     <div className="grid md:grid-cols-3 gap-6 mt-8">
//       {groups.map((group) => (
//         <div
//           key={group.id}
//           onClick={() => onSelect(group)}
//           className="cursor-pointer bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-cyan-500 transition relative"
//         >
//           {/* 🔥 ADMIN BADGE */}
//           {group.role === "admin" && (
//             <span className="absolute top-4 right-4 text-xs px-2 py-1 rounded-full bg-cyan-500 text-black font-semibold">
//               Admin
//             </span>
//           )}

//           <h3 className="text-xl font-semibold text-cyan-400">
//             {group.name}
//           </h3>

//           <p className="mt-2 text-sm text-slate-400">
//             Members: {group.members_count}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import { getMyGroupsApi, getGroupMembersApi } from "./group.api";

// export default function GroupList({ onSelect }) {
//   const [groups, setGroups] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const load = async () => {
//       try {
//         const res = await getMyGroupsApi();
//         const groupsData = res.data.groups || [];

//         const enrichedGroups = await Promise.all(
//           groupsData.map(async (g) => {
//             try {
//               const membersRes = await getGroupMembersApi(g.id);
//               return {
//                 ...g,
//                 members_count: membersRes.data.members.length,
//               };
//             } catch {
//               return { ...g, members_count: 0 };
//             }
//           })
//         );

//         setGroups(enrichedGroups);
//       } finally {
//         setLoading(false);
//       }
//     };

//     load();
//   }, []);

//   if (loading) {
//     return (
//       <div className="space-y-3">
//         {[1, 2, 3].map((i) => (
//           <div
//             key={i}
//             className="h-20 rounded-xl bg-slate-800 animate-pulse"
//           />
//         ))}
//       </div>
//     );
//   }

//   if (groups.length === 0) {
//     return (
//       <div className="text-slate-400 text-sm text-center mt-8">
//         No groups yet. Create one to get started 👆
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-4">
//       {groups.map((group) => (
//         <div
//           key={group.id}
//           onClick={() => onSelect(group)}
//           className="group cursor-pointer rounded-2xl border border-slate-800 bg-slate-900 p-5
//                      hover:border-cyan-500 hover:bg-slate-900/80 transition"
//         >
//           <div className="flex justify-between items-center">
//             <h3 className="text-lg font-semibold text-cyan-400 group-hover:underline">
//               {group.name}
//             </h3>

//             {group.role === "admin" && (
//               <span className="text-xs px-3 py-1 rounded-full bg-cyan-500 text-black font-semibold">
//                 Admin
//               </span>
//             )}
//           </div>

//           <div className="flex justify-between items-center mt-2 text-sm text-slate-400">
//             <span>Members</span>
//             <span className="font-medium">{group.members_count}</span>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { getMyGroupsApi, getGroupMembersApi } from "./group.api";

export default function GroupList({ onSelect }) {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getMyGroupsApi();
        const groupsData = res.data.groups || [];

        const enriched = await Promise.all(
          groupsData.map(async (g) => {
            try {
              const m = await getGroupMembersApi(g.id);
              return { ...g, members_count: m.data.members.length };
            } catch {
              return { ...g, members_count: 0 };
            }
          })
        );

        setGroups(enriched);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1,2,3].map(i => (
          <div key={i} className="h-24 rounded-2xl bg-slate-800 animate-pulse" />
        ))}
      </div>
    );
  }

  if (!groups.length) {
    return (
      <div className="text-center text-slate-500 py-12">
        No groups yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {groups.map((g) => (
        <div
          key={g.id}
          onClick={() => onSelect(g)}
          className="rounded-2xl p-5 bg-slate-950 border border-slate-800 hover:border-cyan-500 cursor-pointer transition"
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-white">{g.name}</h3>
            {g.role === "admin" && (
              <span className="text-xs px-2 py-1 bg-cyan-500 text-black rounded-full">
                Admin
              </span>
            )}
          </div>

          <div className="flex justify-between text-sm text-slate-400">
            <span>Members</span>
            <span className="font-medium">{g.members_count}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
