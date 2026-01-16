// import { useEffect, useState } from "react";
// import {
//   getGroupMembersApi,
//   removeMemberApi,
//   deleteGroupApi,
//   transferAdminApi,
//   leaveGroupApi,
// } from "./group.api";
// import AddMemberModal from "./AddMemberModal";
// import ExpenseList from "../expenses/ExpenseList";
// import AddExpense from "../expenses/AddExpense";
// import GroupBalance from "../balance/GroupBalance";
// import useUserStore from "../../store/user.store";

// export default function GroupMembers({ group, onUpdated }) {
//   const user = useUserStore((s) => s.user);
//   const isAdmin = group.role === "admin";

//   const [members, setMembers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showAdd, setShowAdd] = useState(false);
//   const [showExpense, setShowExpense] = useState(false);
//   const [showTransfer, setShowTransfer] = useState(false);
//   const [newAdminId, setNewAdminId] = useState("");

//   // 🔄 LOAD MEMBERS
//   const loadMembers = async () => {
//     try {
//       setLoading(true);
//       const res = await getGroupMembersApi(group.id);
//       setMembers(res.data.members || []);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadMembers();
//   }, [group.id]);

//   // ❌ REMOVE MEMBER (ADMIN ONLY)
//   const removeMember = async (userId) => {
//     if (!confirm("Remove this member from group?")) return;

//     try {
//       await removeMemberApi(group.id, userId);
//       await loadMembers();
//       onUpdated?.();
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to remove member");
//     }
//   };

//   // 🔁 TRANSFER ADMIN
//   const transferAdmin = async () => {
//     if (!newAdminId) {
//       alert("Select a member first");
//       return;
//     }

//     try {
//       await transferAdminApi(group.id, { userId: newAdminId });
//       alert("Admin role transferred. You can now leave the group.");
//       setShowTransfer(false);
//       onUpdated?.();
//     } catch (err) {
//       alert(err.response?.data?.message || "Admin transfer failed");
//     }
//   };

//   // 🚪 LEAVE GROUP (NON-ADMIN OR AFTER TRANSFER)
//   const leaveGroup = async () => {
//     if (isAdmin) {
//       alert("Transfer admin role before leaving the group");
//       return;
//     }

//     if (!confirm("Leave this group?")) return;

//     try {
//       await leaveGroupApi(group.id);
//       onUpdated?.();
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to leave group");
//     }
//   };

//   // 🗑 DELETE GROUP (ADMIN ONLY)
//   const deleteGroup = async () => {
//     if (!confirm("Delete this group permanently?")) return;

//     try {
//       await deleteGroupApi(group.id);
//       onUpdated?.();
//     } catch (err) {
//       alert(err.response?.data?.message || "Delete failed");
//     }
//   };

//   return (
//     <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-8">

//       {/* HEADER */}
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold text-cyan-400">{group.name}</h2>

//         <div className="flex gap-3">
//           {isAdmin ? (
//             <>
//               <button
//                 onClick={() => setShowTransfer(true)}
//                 className="text-sm text-yellow-400 hover:text-yellow-300"
//               >
//                 Transfer Admin
//               </button>

//               <button
//                 onClick={deleteGroup}
//                 className="text-sm text-red-400 hover:text-red-300"
//               >
//                 Delete Group
//               </button>
//             </>
//           ) : (
//             <button
//               onClick={leaveGroup}
//               className="text-sm text-red-400 hover:text-red-300"
//             >
//               Leave Group
//             </button>
//           )}
//         </div>
//       </div>

//       {/* MEMBERS */}
//       <div>
//         <div className="flex justify-between items-center mb-3">
//           <h3 className="font-semibold text-lg">Members</h3>

//           {isAdmin && (
//             <button
//               onClick={() => setShowAdd(true)}
//               className="text-sm text-cyan-400"
//             >
//               + Add Member
//             </button>
//           )}
//         </div>

//         {loading ? (
//           <p className="text-slate-400">Loading members...</p>
//         ) : (
//           <div className="space-y-2">
//             {members.map((m) => (
//               <div
//                 key={m._id}
//                 className="flex justify-between items-center bg-slate-800 px-4 py-2 rounded-lg"
//               >
//                 <span>
//                   {m.name || m.email}
//                   {m._id === user.id && (
//                     <span className="ml-2 text-xs text-cyan-400">(You)</span>
//                   )}
//                 </span>

//                 {isAdmin && m._id !== user.id && (
//                   <button
//                     // onClick={() => removeMember(m._id)}
//                     onClick={() => removeMember(m.user_id)}
//                     className="text-xs text-red-400 hover:text-red-300"
//                   >
//                     Remove
//                   </button>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* EXPENSES */}
//       <div>
//         <div className="flex justify-between items-center mb-3">
//           <h3 className="font-semibold text-lg">Expenses</h3>
//           <button
//             onClick={() => setShowExpense(true)}
//             className="text-sm text-cyan-400"
//           >
//             + Add Expense
//           </button>
//         </div>

//         <ExpenseList groupId={group.id} />
//       </div>

//       {/* BALANCE */}
//       <GroupBalance groupId={group.id} />

//       {/* ADD MEMBER MODAL */}
//       {showAdd && (
//         <AddMemberModal
//           groupId={group.id}
//           onClose={() => setShowAdd(false)}
//           onAdded={loadMembers}
//         />
//       )}

//       {/* ADD EXPENSE MODAL */}
//       {showExpense && (
//         <AddExpense
//           groupId={group.id}
//           onClose={() => setShowExpense(false)}
//           onAdded={() => setShowExpense(false)}
//         />
//       )}

//       {/* TRANSFER ADMIN MODAL */}
//       {showTransfer && (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
//           <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 w-full max-w-sm">
//             <h3 className="font-semibold mb-4">Transfer Admin</h3>

//             <select
//               className="w-full mb-4 px-3 py-2 rounded bg-slate-800 border border-slate-700"
//               value={newAdminId || ""}
//               onChange={(e) => setNewAdminId(Number(e.target.value))}
//             >
//               <option value="">Select member</option>

//               {members
//                 .filter((m) => m.user_id !== user.id)
//                 .map((m) => (
//                   <option key={m.user_id} value={m.user_id}>
//                     {m.name || m.email}
//                   </option>
//                 ))}
//             </select>

//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={() => setShowTransfer(false)}
//                 className="text-slate-400"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={transferAdmin}
//                 className="bg-cyan-500 text-black px-4 py-2 rounded-lg font-semibold"
//               >
//                 Transfer
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import {
  getGroupMembersApi,
  removeMemberApi,
  deleteGroupApi,
  transferAdminApi,
  leaveGroupApi,
} from "./group.api";
import AddMemberModal from "./AddMemberModal";
import ExpenseList from "../expenses/ExpenseList";
import AddExpense from "../expenses/AddExpense";
import GroupBalance from "../balance/GroupBalance";
import useUserStore from "../../store/user.store";

export default function GroupMembers({ group, onUpdated }) {
  const user = useUserStore((s) => s.user);
  const isAdmin = group.role === "admin";

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAdd, setShowAdd] = useState(false);
  const [showExpense, setShowExpense] = useState(false);
  const [showTransfer, setShowTransfer] = useState(false);
  const [newAdminId, setNewAdminId] = useState("");

  // 🔄 LOAD MEMBERS (NORMALIZED)
  const loadMembers = async () => {
    try {
      setLoading(true);
      const res = await getGroupMembersApi(group.id);

      const normalized = (res.data.members || []).map((m) => ({
        ...m,
        uid: Number(m.user_id), // 🔥 SINGLE SOURCE OF TRUTH
      }));

      setMembers(normalized);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMembers();
  }, [group.id]);

  // ❌ REMOVE MEMBER
  const removeMember = async (uid) => {
    if (!confirm("Remove this member from group?")) return;

    try {
      await removeMemberApi(group.id, uid);
      await loadMembers();
      onUpdated?.();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to remove member");
    }
  };

  // 🔁 TRANSFER ADMIN
  const transferAdmin = async () => {
    if (!newAdminId) {
      alert("Select a member first");
      return;
    }

    try {
      await transferAdminApi(group.id, {
        newAdminId: Number(newAdminId), // 🔥 FORCE NUMBER
      });

      alert("Admin transferred successfully");
      setShowTransfer(false);
      setNewAdminId("");
      onUpdated?.();
    } catch (err) {
      alert(err.response?.data?.message || "Admin transfer failed");
    }
  };

  // 🚪 LEAVE GROUP
  const leaveGroup = async () => {
    if (isAdmin) {
      alert("Transfer admin role before leaving");
      return;
    }

    if (!confirm("Leave this group?")) return;

    try {
      await leaveGroupApi(group.id);
      onUpdated?.();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to leave group");
    }
  };

  // 🗑 DELETE GROUP
  const deleteGroup = async () => {
    if (!confirm("Delete this group permanently?")) return;

    try {
      await deleteGroupApi(group.id);
      onUpdated?.();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-8">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-cyan-400">
          {group.name}
        </h2>

        <div className="flex gap-3">
          {isAdmin ? (
            <>
              <button
                onClick={() => setShowTransfer(true)}
                className="text-sm text-yellow-400 hover:text-yellow-300"
              >
                Transfer Admin
              </button>

              <button
                onClick={deleteGroup}
                className="text-sm text-red-400 hover:text-red-300"
              >
                Delete Group
              </button>
            </>
          ) : (
            <button
              onClick={leaveGroup}
              className="text-sm text-red-400 hover:text-red-300"
            >
              Leave Group
            </button>
          )}
        </div>
      </div>

      {/* MEMBERS */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-lg">Members</h3>

          {isAdmin && (
            <button
              onClick={() => setShowAdd(true)}
              className="text-sm text-cyan-400"
            >
              + Add Member
            </button>
          )}
        </div>

        {loading ? (
          <p className="text-slate-400">Loading members...</p>
        ) : (
          <div className="space-y-2">
            {members.map((m) => (
              <div
                key={m.uid}
                className="flex justify-between items-center bg-slate-800 px-4 py-2 rounded-lg"
              >
                <span>
                  {m.name || m.email}
                  {m.uid === user.id && (
                    <span className="ml-2 text-xs text-cyan-400">
                      (You)
                    </span>
                  )}
                </span>

                {isAdmin && m.uid !== user.id && (
                  <button
                    onClick={() => removeMember(m.uid)}
                    className="text-xs text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* EXPENSES */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-lg">Expenses</h3>
          <button
            onClick={() => setShowExpense(true)}
            className="text-sm text-cyan-400"
          >
            + Add Expense
          </button>
        </div>

        <ExpenseList groupId={group.id} />
      </div>

      {/* BALANCE */}
      <GroupBalance groupId={group.id} />

      {/* ADD MEMBER MODAL */}
      {showAdd && (
        <AddMemberModal
          groupId={group.id}
          onClose={() => setShowAdd(false)}
          onAdded={loadMembers}
        />
      )}

      {/* ADD EXPENSE MODAL */}
      {showExpense && (
        <AddExpense
          groupId={group.id}
          onClose={() => setShowExpense(false)}
          onAdded={() => setShowExpense(false)}
        />
      )}

      {/* TRANSFER ADMIN MODAL */}
      {showTransfer && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 w-full max-w-sm">
            <h3 className="font-semibold mb-4">Transfer Admin</h3>

            <select
              className="w-full mb-4 px-3 py-2 rounded bg-slate-800 border border-slate-700"
              value={newAdminId}
              onChange={(e) =>
                setNewAdminId(Number(e.target.value))
              }
            >
              <option value="">Select member</option>

              {members
                .filter((m) => m.uid !== user.id)
                .map((m) => (
                  <option key={m.uid} value={m.uid}>
                    {m.name || m.email}
                  </option>
                ))}
            </select>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowTransfer(false)}
                className="text-slate-400"
              >
                Cancel
              </button>

              <button
                onClick={transferAdmin}
                className="bg-cyan-500 text-black px-4 py-2 rounded-lg font-semibold"
              >
                Transfer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
