// import { useEffect, useState } from "react";
// import { getGroupSettlementHistoryApi } from "./settlement.api";

// export default function SettlementHistory({ groupId, memberMap }) {
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const load = async () => {
//       try {
//         const res = await getGroupSettlementHistoryApi(groupId);
//         setHistory(res.data.settlements || []);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     load();
//   }, [groupId]);

//   if (loading) {
//     return <p className="text-slate-400">Loading settlement history...</p>;
//   }

//   if (history.length === 0) {
//     return (
//       <p className="text-slate-500 text-sm">
//         No settlements yet 💸
//       </p>
//     );
//   }

//   return (
//     <div className="space-y-3">
//       {history.map((s) => (
//         <div
//           key={s.id}
//           className="bg-slate-800/60 border border-slate-700
//                      rounded-lg px-4 py-3 flex justify-between items-center"
//         >
//           <div>
//             <p className="text-slate-200 text-sm">
//               <span className="font-medium">
//                 {memberMap[s.paid_by] || `User #${s.paid_by}`}
//               </span>{" "}
//               paid{" "}
//               <span className="font-medium">
//                 {memberMap[s.paid_to] || `User #${s.paid_to}`}
//               </span>
//             </p>

//             <p className="text-xs text-slate-400">
//               {s.method || "cash"} •{" "}
//               {new Date(s.created_at).toLocaleString()}
//             </p>
//           </div>

//           <div className="font-semibold text-green-400">
//             ₹{s.amount}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import { getGroupSettlementHistoryApi } from "./settlement.api";

// export default function SettlementHistory({ groupId }) {
//   const [settlements, setSettlements] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getGroupSettlementHistoryApi(groupId)
//       .then((res) => {
//         setSettlements(res.data.settlements || []);
//       })
//       .finally(() => setLoading(false));
//   }, [groupId]);

//   if (loading) {
//     return <p className="text-slate-400">Loading settlement history...</p>;
//   }

//   if (settlements.length === 0) {
//     return <p className="text-slate-500 text-sm">No settlements yet 💸</p>;
//   }
//   const undoSettlement = async (id) => {
//   if (!confirm("Undo this settlement?")) return;

//   await undoSettlementApi(id);
//   toast.success("Settlement undone");
//   reload(); // refresh history + balance
// };

//   return (
//     <div className="space-y-3">
//       {settlements.map((s) => (
//         <div
//           key={s.id}
//           className="bg-slate-800/60 border border-slate-700 rounded-xl p-4"
//         >
//           <p className="text-sm text-slate-200">
//             <span className="font-medium">
//               {s.paid_by_name}
//             </span>{" "}
//             paid{" "}
//             <span className="font-medium">
//               {s.paid_to_name}
//             </span>
//           </p>

//           <p className="text-xs text-slate-500 mt-1">
//             {s.method || "cash"} •{" "}
//             {new Date(s.created_at).toLocaleString()}
//           </p>

//           <p className="text-right font-semibold text-green-400 mt-2">
//             ₹{s.amount}
//           </p>
//         </div>
//       ))}
//       {isAdmin && s.status === "completed" && (
//   <button
//     onClick={() => undoSettlement(s.id)}
//     className="text-xs text-red-400 hover:text-red-300"
//   >
//     Undo
//   </button>
// )}

//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import { getGroupSettlementHistoryApi, undoSettlementApi } from "./settlement.api";
// import toast from "react-hot-toast";

// export default function SettlementHistory({ groupId, isAdmin = false, onReload }) {
//   const [settlements, setSettlements] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const loadHistory = async () => {
//     try {
//       const res = await getGroupSettlementHistoryApi(groupId);
//       setSettlements(res.data.settlements || []);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadHistory();
//   }, [groupId]);

//   const undoSettlement = async (id) => {
//     if (!confirm("Undo this settlement?")) return;

//     try {
//       await undoSettlementApi(id);
//       toast.success("Settlement undone");
//       loadHistory();
//       onReload?.();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Undo failed");
//     }
//   };

//   if (loading) return <p className="text-slate-400">Loading settlement history...</p>;
//   if (settlements.length === 0)
//     return <p className="text-slate-500 text-sm">No settlements yet 💸</p>;

//   return (
//     <div className="space-y-3">
//       {settlements.map((s) => (
//         <div
//           key={s.id}
//           className="bg-slate-800/60 border border-slate-700 rounded-xl p-4"
//         >
//           <p className="text-sm text-slate-200">
//             <span className="font-medium">{s.paid_by_name}</span>{" "}
//             paid{" "}
//             <span className="font-medium">{s.paid_to_name}</span>
//           </p>

//           <p className="text-xs text-slate-500 mt-1">
//             {s.method || "cash"} •{" "}
//             {new Date(s.created_at).toLocaleString()}
//           </p>

//           <div className="flex justify-between items-center mt-2">
//             <p className="font-semibold text-green-400">
//               ₹{s.amount}
//             </p>

//             {isAdmin && s.status === "completed" && (
//               <button
//                 onClick={() => undoSettlement(s.id)}
//                 className="text-xs text-red-400 hover:text-red-300"
//               >
//                 Undo
//               </button>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import {
//   getGroupSettlementHistoryApi,
//   undoSettlementApi,
// } from "./settlement.api";
// import toast from "react-hot-toast";

// export default function SettlementHistory({
//   groupId,
//   isAdmin = false,
//   onReload,
// }) {
//   const [settlements, setSettlements] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const loadHistory = async () => {
//     try {
//       const res = await getGroupSettlementHistoryApi(groupId);
//       setSettlements(res.data.settlements || []);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadHistory();
//   }, [groupId]);

//   const undoSettlement = async (id) => {
//     if (!confirm("Undo this settlement?")) return;

//     try {
//       await undoSettlementApi(id);
//       toast.success("Settlement undone");

//       // 🔥 refresh history + balance
//       await loadHistory();
//       onReload?.();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Undo failed");
//     }
//   };

//   if (loading)
//     return (
//       <p className="text-slate-400">
//         Loading settlement history...
//       </p>
//     );

//   const visibleSettlements = settlements.filter(
//     (s) => s.status === "completed"
//   );

//   if (visibleSettlements.length === 0)
//     return (
//       <p className="text-slate-500 text-sm">
//         No settlements yet 💸
//       </p>
//     );

//   return (
//     <div className="space-y-3">
//       {visibleSettlements.map((s) => (
//         <div
//           key={s.id}
//           className="bg-slate-800/60 border border-slate-700 rounded-xl p-4"
//         >
//           <p className="text-sm text-slate-200">
//             <span className="font-medium">
//               {s.paid_by_name}
//             </span>{" "}
//             paid{" "}
//             <span className="font-medium">
//               {s.paid_to_name}
//             </span>
//           </p>

//           <p className="text-xs text-slate-500 mt-1">
//             {s.method || "cash"} •{" "}
//             {new Date(s.created_at).toLocaleString()}
//           </p>

//           <div className="flex justify-between items-center mt-2">
//             <p className="font-semibold text-green-400">
//               ₹{s.amount}
//             </p>

//             {isAdmin && (
//               <button
//                 onClick={() => undoSettlement(s.id)}
//                 className="text-xs text-red-400 hover:text-red-300"
//               >
//                 Undo
//               </button>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import {
  getGroupSettlementHistoryApi,
  undoSettlementApi,
  updateSettlementMethodApi,
} from "./settlement.api";
import EditMethodModal from "./EditMethodModal";
import toast from "react-hot-toast";
import useUserStore from "../../store/user.store";

export default function SettlementHistory({
  groupId,
  isAdmin = false,
  onReload,
}) {
  const user = useUserStore((s) => s.user);

  const [settlements, setSettlements] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 edit modal state
  const [editOpen, setEditOpen] = useState(false);
  const [selectedSettlement, setSelectedSettlement] = useState(null);

  const loadHistory = async () => {
    try {
      const res = await getGroupSettlementHistoryApi(groupId);
      setSettlements(res.data.settlements || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, [groupId]);

  // 🔁 UNDO
  const undoSettlement = async (id) => {
    if (!confirm("Undo this settlement?")) return;

    try {
      await undoSettlementApi(id);
      toast.success("Settlement undone");
      await loadHistory();
      onReload?.();
    } catch (err) {
      toast.error(err.response?.data?.message || "Undo failed");
    }
  };

  // ✏️ UPDATE METHOD
  const updateMethod = async (method) => {
    try {
      await updateSettlementMethodApi(selectedSettlement.id, method);
      toast.success("Payment method updated");
      setEditOpen(false);
      setSelectedSettlement(null);
      await loadHistory();
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  if (loading) {
    return (
      <p className="text-slate-400">
        Loading settlement history...
      </p>
    );
  }

  const visibleSettlements = settlements.filter(
    (s) => s.status === "completed"
  );

  if (visibleSettlements.length === 0) {
    return (
      <p className="text-slate-500 text-sm">
        No settlements yet 💸
      </p>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {visibleSettlements.map((s) => {
          const canEdit =
            isAdmin || s.created_by === user.id;

          return (
            <div
              key={s.id}
              className="bg-slate-800/60 border border-slate-700 rounded-xl p-4"
            >
              <p className="text-sm text-slate-200">
                <span className="font-medium">
                  {s.paid_by_name}
                </span>{" "}
                paid{" "}
                <span className="font-medium">
                  {s.paid_to_name}
                </span>
              </p>

              <p className="text-xs text-slate-500 mt-1">
                {s.method || "cash"} •{" "}
                {new Date(s.created_at).toLocaleString()}
              </p>

              <div className="flex justify-between items-center mt-2">
                <p className="font-semibold text-green-400">
                  ₹{s.amount}
                </p>

                <div className="flex gap-3">
                  {canEdit && (
                    <button
                      onClick={() => {
                        setSelectedSettlement(s);
                        setEditOpen(true);
                      }}
                      className="text-xs text-cyan-400 hover:text-cyan-300"
                    >
                      Edit Method
                    </button>
                  )}

                  {isAdmin && (
                    <button
                      onClick={() => undoSettlement(s.id)}
                      className="text-xs text-red-400 hover:text-red-300"
                    >
                      Undo
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ✏️ EDIT METHOD MODAL */}
      {editOpen && selectedSettlement && (
        <EditMethodModal
          open={editOpen}
          settlement={selectedSettlement}
          onClose={() => setEditOpen(false)}
          onSave={updateMethod}
        />
      )}
    </>
  );
}
