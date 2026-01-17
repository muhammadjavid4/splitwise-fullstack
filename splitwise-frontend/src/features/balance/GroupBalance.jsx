// import { useEffect, useState } from "react";
// import { getGroupBalanceApi } from "./balance.api";
// import DetailedBalance from "./DetailedBalance";


// export default function GroupBalance({ groupId }) {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getGroupBalanceApi(Number(groupId))
//       .then((res) => {
//         console.log("BALANCE RESPONSE 👉", res.data);
//         setData(res.data);
//       })
//       .finally(() => setLoading(false));
//   }, [groupId]);

//   if (loading) {
//     return <p className="mt-6 text-slate-400">Calculating balance...</p>;
//   }

//   if (!data) return null;

//   // 🔥 SUM LOGIC (VERY IMPORTANT)
//   const totalYouOwe = data.you_owe?.reduce(
//     (sum, item) => sum + Number(item.amount || 0),
//     0
//   );

//   const totalYouGet = data.you_get?.reduce(
//     (sum, item) => sum + Number(item.amount || 0),
//     0
//   );

//   const net = totalYouGet - totalYouOwe;

//   // 👻 No expenses case
//   if (totalYouOwe === 0 && totalYouGet === 0) {
//     return (
//       <div className="mt-8 bg-slate-900 border border-slate-800 rounded-xl p-5 text-slate-400 text-center">
//         No balances yet. Add expenses to see balance 💸
//       </div>
//     );
//   }

//   return (
//     <div className="mt-8 bg-slate-900 border border-slate-800 rounded-2xl p-6">
//       <h2 className="text-xl font-semibold mb-4">Your Balance</h2>

//       <div className="grid grid-cols-3 gap-4 text-center">
//         <div>
//           <p className="text-slate-400 text-sm">You Owe</p>
//           <p className="text-lg font-bold text-red-400">
//             ₹{totalYouOwe}
//           </p>
//         </div>

//         <div>
//           <p className="text-slate-400 text-sm">You Get</p>
//           <p className="text-lg font-bold text-green-400">
//             ₹{totalYouGet}
//           </p>
//         </div>

//         <div>
//           <p className="text-slate-400 text-sm">Net</p>
//           <p
//             className={`text-lg font-bold ${
//               net > 0
//                 ? "text-green-400"
//                 : net < 0
//                 ? "text-red-400"
//                 : "text-slate-300"
//             }`}
//           >
//             {net > 0 && "+"}₹{net}
//           </p>
//         </div>
//       </div>

//       <p className="mt-4 text-center text-slate-400">
//         {net > 0
//           ? "You should receive money 💰"
//           : net < 0
//           ? "You need to pay money 💸"
//           : "You are all settled 🎉"}
//       </p>
//       <DetailedBalance
//   youOwe={data.you_owe}
//   youGet={data.you_get}
// />
//     </div>
//   );
// }

// Asal Code a hai bhai isku nai bhool na 

// import { useEffect, useState } from "react";
// import { getGroupBalanceApi } from "./balance.api";
// import { getGroupMembersApi } from "../groups/group.api";
// import DetailedBalance from "./DetailedBalance";

// export default function GroupBalance({ groupId }) {
//   const [data, setData] = useState(null);
//   const [memberMap, setMemberMap] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const load = async () => {
//       try {
//         // 1️⃣ MEMBERS
//         const membersRes = await getGroupMembersApi(Number(groupId));

//         const map = {};
//         membersRes.data.members.forEach((m) => {
//           // 🔥 FINAL TRUTH
//           map[m.user_id] = m.name;
//         });

//         console.log("MEMBER MAP 👉", map);
//         setMemberMap(map);

//         // 2️⃣ BALANCE
//         const balanceRes = await getGroupBalanceApi(Number(groupId));
//         console.log("BALANCE 👉", balanceRes.data);

//         setData(balanceRes.data);
//       } catch (err) {
//         console.error("GroupBalance error", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     load();
//   }, [groupId]);

//   if (loading) {
//     return <p className="mt-6 text-slate-400">Calculating balance...</p>;
//   }

//   if (!data) return null;

//   // 🔥 TOTALS
//   const totalYouOwe = data.you_owe.reduce(
//     (s, i) => s + Number(i.amount || 0),
//     0
//   );

//   const totalYouGet = data.you_get.reduce(
//     (s, i) => s + Number(i.amount || 0),
//     0
//   );

//   const net = totalYouGet - totalYouOwe;

//   // 🔥 ID → NAME MAPPING (NOW MATCHES)
//   const formattedYouOwe = data.you_owe.map((i) => ({
//     to: memberMap[i.user_id] ?? `User #${i.user_id}`,
//     amount: i.amount,
//   }));

//   const formattedYouGet = data.you_get.map((i) => ({
//     from: memberMap[i.user_id] ?? `User #${i.user_id}`,
//     amount: i.amount,
//   }));

//   return (
//     <div className="mt-8 bg-slate-900 border border-slate-800 rounded-2xl p-6">
//       <h2 className="text-xl font-semibold mb-4">Your Balance</h2>

//       <div className="grid grid-cols-3 gap-4 text-center">
//         <div>
//           <p className="text-slate-400 text-sm">You Owe</p>
//           <p className="text-lg font-bold text-red-400">
//             ₹{totalYouOwe}
//           </p>
//         </div>

//         <div>
//           <p className="text-slate-400 text-sm">You Get</p>
//           <p className="text-lg font-bold text-green-400">
//             ₹{totalYouGet}
//           </p>
//         </div>

//         <div>
//           <p className="text-slate-400 text-sm">Net</p>
//           <p
//             className={`text-lg font-bold ${
//               net > 0
//                 ? "text-green-400"
//                 : net < 0
//                 ? "text-red-400"
//                 : "text-slate-300"
//             }`}
//           >
//             {net > 0 && "+"}₹{net}
//           </p>
//         </div>
//       </div>

//       <p className="mt-4 text-center text-slate-400">
//         {net > 0
//           ? "You should receive money 💰"
//           : net < 0
//           ? "You need to pay money 💸"
//           : "You are all settled 🎉"}
//       </p>

//       <DetailedBalance
//         youOwe={formattedYouOwe}
//         youGet={formattedYouGet}
//       />
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import { getGroupBalanceApi } from "./balance.api";
// import { getGroupMembersApi } from "../groups/group.api";
// // import { createExpenseApi } from "../expenses/expense.api";
// import { settleUpApi } from "../settlements/settlement.api";
// import DetailedBalance from "./DetailedBalance";
// import SettleModal from "../settlements/SettleModal";

// export default function GroupBalance({ groupId }) {
//   const [data, setData] = useState(null);
//   const [memberMap, setMemberMap] = useState({});
//   const [loading, setLoading] = useState(true);

//   // 🔥 NEW STATE (SETTLEMENT)
//   const [settleOpen, setSettleOpen] = useState(false);
//   const [selectedSettle, setSelectedSettle] = useState(null);

//   // 🔁 LOAD EVERYTHING
//   const load = async () => {
//     try {
//       setLoading(true);

//       // MEMBERS
//       const membersRes = await getGroupMembersApi(Number(groupId));
//       const map = {};
//       membersRes.data.members.forEach((m) => {
//         map[m.user_id] = m.name;
//       });
//       setMemberMap(map);

//       // BALANCE
//       const balanceRes = await getGroupBalanceApi(Number(groupId));
//       setData(balanceRes.data);
//     } catch (err) {
//       console.error("GroupBalance error", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     load();
//   }, [groupId]);

//   if (loading) {
//     return <p className="mt-6 text-slate-400">Calculating balance...</p>;
//   }

//   if (!data) return null;

//   // TOTALS
//   const totalYouOwe = data.you_owe.reduce(
//     (s, i) => s + Number(i.amount || 0),
//     0
//   );

//   const totalYouGet = data.you_get.reduce(
//     (s, i) => s + Number(i.amount || 0),
//     0
//   );

//   const net = totalYouGet - totalYouOwe;

//   // FORMAT DATA
//   const formattedYouOwe = data.you_owe.map((i) => ({
//     to: memberMap[i.user_id] ?? `User #${i.user_id}`,
//     user_id: i.user_id,
//     amount: Number(i.amount),
//   }));

//   const formattedYouGet = data.you_get.map((i) => ({
//     from: memberMap[i.user_id] ?? `User #${i.user_id}`,
//     amount: Number(i.amount),
//   }));

//   // 🔥 SETTLE HANDLER (CORE LOGIC)
// const handleSettle = async (amount) => {
//   if (!selectedSettle) return;

//   try {
//     await settleUpApi({
//   groupId: Number(groupId),
//   paidTo: selectedSettle.user_id, // 🔥 EXACT NAME
//   amount: Number(amount),
//   method: "cash",
// });
//     alert("Settlement successful!");

//     // CLOSE MODAL + RESET

//     setSettleOpen(false);
//     setSelectedSettle(null);

//     await load(); // 🔥 instant balance refresh

//   } catch (err) {
//     console.error(err.response?.data);
//     alert(err.response?.data?.message || "Settlement failed");
//   }
// };



//   return (
//     <div className="mt-8 bg-slate-900 border border-slate-800 rounded-2xl p-6">
//       <h2 className="text-xl font-semibold mb-4">Your Balance</h2>

//       <div className="grid grid-cols-3 gap-4 text-center">
//         <div>
//           <p className="text-slate-400 text-sm">You Owe</p>
//           <p className="text-lg font-bold text-red-400">
//             ₹{totalYouOwe}
//           </p>
//         </div>

//         <div>
//           <p className="text-slate-400 text-sm">You Get</p>
//           <p className="text-lg font-bold text-green-400">
//             ₹{totalYouGet}
//           </p>
//         </div>

//         <div>
//           <p className="text-slate-400 text-sm">Net</p>
//           <p
//             className={`text-lg font-bold ${
//               net > 0
//                 ? "text-green-400"
//                 : net < 0
//                 ? "text-red-400"
//                 : "text-slate-300"
//             }`}
//           >
//             {net > 0 && "+"}₹{net}
//           </p>
//         </div>
//       </div>

//       <p className="mt-4 text-center text-slate-400">
//         {net > 0
//           ? "You should receive money 💰"
//           : net < 0
//           ? "You need to pay money 💸"
//           : "You are all settled 🎉"}
//       </p>

//       {/* 🔥 DETAILED BALANCE WITH SETTLE */}
//       <DetailedBalance
//         youOwe={formattedYouOwe}
//         youGet={formattedYouGet}
//         onSettle={(item) => {
//           setSelectedSettle(item);
//           setSettleOpen(true);
//         }}
//       />

//       {/* 🔥 SETTLE MODAL */}
//       {settleOpen && selectedSettle && (
//         <SettleModal
//           open={settleOpen}
//           data={selectedSettle}
//           onClose={() => setSettleOpen(false)}
//           onConfirm={handleSettle}
//         />
//       )}
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import { getGroupBalanceApi } from "./balance.api";
// import { getGroupMembersApi } from "../groups/group.api";
// import { settleUpApi } from "../settlements/settlement.api";
// import DetailedBalance from "./DetailedBalance";
// import SettleModal from "../settlements/SettleModal";
// import toast from "react-hot-toast";
// import SettlementHistory from "../settlements/SettlementHistory";


// export default function GroupBalance({ groupId }) {
//   const [data, setData] = useState(null);
//   const [memberMap, setMemberMap] = useState({});
//   const [loading, setLoading] = useState(true);

//   const [settleOpen, setSettleOpen] = useState(false);
//   const [selectedSettle, setSelectedSettle] = useState(null);

//   // 🔁 LOAD BALANCE + MEMBERS
//   const load = async () => {
//     try {
//       setLoading(true);

//       const membersRes = await getGroupMembersApi(Number(groupId));
//       const map = {};
//       membersRes.data.members.forEach((m) => {
//         map[m.user_id] = m.name;
//       });
//       setMemberMap(map);

//       const balanceRes = await getGroupBalanceApi(Number(groupId));
//       setData(balanceRes.data);
//     } catch (err) {
//       console.error("GroupBalance error", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     load();
//   }, [groupId]);

//   if (loading) return <p className="text-slate-400">Calculating balance...</p>;
//   if (!data) return null;

//   // TOTALS
//   const totalYouOwe = data.you_owe.reduce((s, i) => s + Number(i.amount), 0);
//   const totalYouGet = data.you_get.reduce((s, i) => s + Number(i.amount), 0);
//   const net = totalYouGet - totalYouOwe;

//   // FORMAT
//   const formattedYouOwe = data.you_owe.map((i) => ({
//     to: memberMap[i.user_id],
//     user_id: i.user_id,
//     amount: Number(i.amount),
//   }));

//   const formattedYouGet = data.you_get.map((i) => ({
//     from: memberMap[i.user_id],
//     amount: Number(i.amount),
//   }));

//   // ✅ FINAL SETTLE HANDLER
//   const handleSettle = async (amount) => {
//     if (!selectedSettle) return;

//     try {
//       await settleUpApi({
//         groupId: Number(groupId),
//         paidTo: selectedSettle.user_id,
//         amount: Number(amount),
//         method: "cash",
//       });

//       setSettleOpen(false);
//       setSelectedSettle(null);

//       await load(); // 🔥 instant refresh
//     } catch (err) {
//       console.error(err.response?.data);
//       alert(err.response?.data?.message || "Settlement failed");
//     }
//     toast.success("Settlement successful!");
//   };

//   return (
//     <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
//       <h2 className="text-xl font-semibold mb-4">Your Balance</h2>

//       <div className="grid grid-cols-3 gap-4 text-center">
//         <div>
//           <p className="text-slate-400 text-sm">You Owe</p>
//           <p className="text-lg font-bold text-red-400">₹{totalYouOwe}</p>
//         </div>

//         <div>
//           <p className="text-slate-400 text-sm">You Get</p>
//           <p className="text-lg font-bold text-green-400">₹{totalYouGet}</p>
//         </div>

//         <div>
//           <p className="text-slate-400 text-sm">Net</p>
//           <p className={`text-lg font-bold ${net >= 0 ? "text-green-400" : "text-red-400"}`}>
//             {net > 0 && "+"}₹{net}
//           </p>
//         </div>
//       </div>

//       <DetailedBalance
//         youOwe={formattedYouOwe}
//         youGet={formattedYouGet}
//         onSettle={(item) => {
//           setSelectedSettle(item);
//           setSettleOpen(true);
//         }}
//       />

//       {settleOpen && selectedSettle && (
//         <SettleModal
//           open={settleOpen}
//           data={selectedSettle}
//           onClose={() => setSettleOpen(false)}
//           onConfirm={handleSettle}
//         />
//       )}
//       {/* 🔥 SETTLEMENT HISTORY */}
// <div className="mt-10">
//   <h3 className="text-lg font-semibold mb-3 text-cyan-400">
//     Settlement History
//   </h3>

//   <SettlementHistory
//     groupId={Number(groupId)}
//     memberMap={memberMap}
//   />
// </div>

//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import { getGroupBalanceApi } from "./balance.api";
// import { getGroupMembersApi } from "../groups/group.api";
// import { settleUpApi } from "../settlements/settlement.api";
// import DetailedBalance from "./DetailedBalance";
// import SettleModal from "../settlements/SettleModal";
// import SettlementHistory from "../settlements/SettlementHistory";
// import toast from "react-hot-toast";

// export default function GroupBalance({ groupId }) {
//   const [data, setData] = useState(null);
//   const [memberMap, setMemberMap] = useState({});
//   const [loading, setLoading] = useState(true);

//   const [settleOpen, setSettleOpen] = useState(false);
//   const [selectedSettle, setSelectedSettle] = useState(null);

//   // 🔁 LOAD BALANCE + MEMBERS
//   const load = async () => {
//     try {
//       setLoading(true);

//       // MEMBERS
//       const membersRes = await getGroupMembersApi(Number(groupId));
//       const map = {};
//       membersRes.data.members.forEach((m) => {
//         map[Number(m.user_id)] = m.name || m.email;
//       });
//       setMemberMap(map);

//       // BALANCE
//       const balanceRes = await getGroupBalanceApi(Number(groupId));
//       setData(balanceRes.data);
//     } catch (err) {
//       console.error("GroupBalance error", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     load();
//   }, [groupId]);

//   if (loading) {
//     return <p className="text-slate-400">Calculating balance...</p>;
//   }

//   if (!data) return null;

//   // TOTALS
//   const totalYouOwe = data.you_owe.reduce(
//     (s, i) => s + Number(i.amount || 0),
//     0
//   );

//   const totalYouGet = data.you_get.reduce(
//     (s, i) => s + Number(i.amount || 0),
//     0
//   );

//   const net = totalYouGet - totalYouOwe;

//   // 🔥 FORMAT + HIDE ₹0 ROWS
//   const formattedYouOwe = data.you_owe
//     .filter((i) => Number(i.amount) > 0)
//     .map((i) => ({
//       to: memberMap[Number(i.user_id)] ?? `User #${i.user_id}`,
//       user_id: i.user_id,
//       amount: Number(i.amount),
//     }));

//   const formattedYouGet = data.you_get
//     .filter((i) => Number(i.amount) > 0)
//     .map((i) => ({
//       from: memberMap[Number(i.user_id)] ?? `User #${i.user_id}`,
//       amount: Number(i.amount),
//     }));

//   // ✅ SETTLE HANDLER
//   const handleSettle = async (amount) => {
//     if (!selectedSettle) return;

//     try {
//       await settleUpApi({
//         groupId: Number(groupId),
//         paidTo: Number(selectedSettle.user_id),
//         amount: Number(amount),
//         method: "cash",
//       });

//       setSettleOpen(false);
//       setSelectedSettle(null);

//       await load();
//       toast.success("Settlement successful");
//     } catch (err) {
//       console.error(err.response?.data);
//       toast.error(err.response?.data?.message || "Settlement failed");
//     }
//   };

//   return (
//     <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
//       <h2 className="text-xl font-semibold mb-4">Your Balance</h2>

//       <div className="grid grid-cols-3 gap-4 text-center">
//         <div>
//           <p className="text-slate-400 text-sm">You Owe</p>
//           <p className="text-lg font-bold text-red-400">
//             ₹{totalYouOwe}
//           </p>
//         </div>

//         <div>
//           <p className="text-slate-400 text-sm">You Get</p>
//           <p className="text-lg font-bold text-green-400">
//             ₹{totalYouGet}
//           </p>
//         </div>

//         <div>
//           <p className="text-slate-400 text-sm">Net</p>
//           <p
//             className={`text-lg font-bold ${net >= 0 ? "text-green-400" : "text-red-400"
//               }`}
//           >
//             {net > 0 && "+"}₹{net}
//           </p>
//         </div>
//       </div>

//       <DetailedBalance
//         youOwe={formattedYouOwe}
//         youGet={formattedYouGet}
//         onSettle={(item) => {
//           setSelectedSettle(item);
//           setSettleOpen(true);
//         }}
//       />

//       {settleOpen && selectedSettle && (
//         <SettleModal
//           open={settleOpen}
//           data={selectedSettle}
//           onClose={() => setSettleOpen(false)}
//           onConfirm={handleSettle}
//         />
//       )}

//       {/* 🔥 SETTLEMENT HISTORY */}
//       <div className="mt-10">
//         <h3 className="text-lg font-semibold mb-3 text-cyan-400">
//           Settlement History
//         </h3>

//         <SettlementHistory
//           groupId={Number(groupId)}
//           isAdmin={isAdmin}      // 👈 pass role
//           onReload={load}        // 👈 reload balance
//         />
//       </div>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import { getGroupBalanceApi } from "./balance.api";
// import { getGroupMembersApi } from "../groups/group.api";
// import { settleUpApi } from "../settlements/settlement.api";
// import DetailedBalance from "./DetailedBalance";
// import SettleModal from "../settlements/SettleModal";
// import SettlementHistory from "../settlements/SettlementHistory";
// import toast from "react-hot-toast";
// import useUserStore from "../../store/user.store";

// export default function GroupBalance({ groupId }) {
//   const user = useUserStore((s) => s.user);

//   const [data, setData] = useState(null);
//   const [memberMap, setMemberMap] = useState({});
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const [settleOpen, setSettleOpen] = useState(false);
//   const [selectedSettle, setSelectedSettle] = useState(null);

//   // 🔁 LOAD BALANCE + MEMBERS + ADMIN CHECK
//   const load = async () => {
//     try {
//       setLoading(true);

//       const membersRes = await getGroupMembersApi(Number(groupId));

//       const map = {};
//       let admin = false;

//       membersRes.data.members.forEach((m) => {
//         map[m.user_id] = m.name;

//         if (m.user_id === user.id && m.role === "admin") {
//           admin = true;
//         }
//       });

//       setMemberMap(map);
//       setIsAdmin(admin);

//       const balanceRes = await getGroupBalanceApi(Number(groupId));
//       setData(balanceRes.data);
//     } catch (err) {
//       console.error("GroupBalance error", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     load();
//   }, [groupId]);

//   if (loading) return <p className="text-slate-400">Calculating balance...</p>;
//   if (!data) return null;

//   // TOTALS
//   const totalYouOwe = data.you_owe.reduce(
//     (s, i) => s + Number(i.amount),
//     0
//   );

//   const totalYouGet = data.you_get.reduce(
//     (s, i) => s + Number(i.amount),
//     0
//   );

//   const net = totalYouGet - totalYouOwe;

//   // FORMAT
//   const formattedYouOwe = data.you_owe.map((i) => ({
//     to: memberMap[i.user_id],
//     user_id: i.user_id,
//     amount: Number(i.amount),
//   }));

//   const formattedYouGet = data.you_get.map((i) => ({
//     from: memberMap[i.user_id],
//     amount: Number(i.amount),
//   }));

//   // ✅ SETTLE HANDLER
//   const handleSettle = async (amount) => {
//     if (!selectedSettle) return;

//     try {
//       await settleUpApi({
//         groupId: Number(groupId),
//         paidTo: selectedSettle.user_id,
//         amount: Number(amount),
//         method: "cash",
//       });

//       toast.success("Settlement successful");
//       setSettleOpen(false);
//       setSelectedSettle(null);
//       load();
//     } catch (err) {
//       alert(err.response?.data?.message || "Settlement failed");
//     }
//   };

//   return (
//     <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

//       {/* BALANCE SUMMARY */}
//       <div className="grid grid-cols-3 gap-4 text-center mb-6">
//         <div>
//           <p className="text-slate-400 text-sm">You Owe</p>
//           <p className="text-lg font-bold text-red-400">
//             ₹{totalYouOwe}
//           </p>
//         </div>

//         <div>
//           <p className="text-slate-400 text-sm">You Get</p>
//           <p className="text-lg font-bold text-green-400">
//             ₹{totalYouGet}
//           </p>
//         </div>

//         <div>
//           <p className="text-slate-400 text-sm">Net</p>
//           <p
//             className={`text-lg font-bold ${
//               net >= 0 ? "text-green-400" : "text-red-400"
//             }`}
//           >
//             {net > 0 && "+"}₹{net}
//           </p>
//         </div>
//       </div>

//       {/* DETAILS */}
//       <DetailedBalance
//         youOwe={formattedYouOwe}
//         youGet={formattedYouGet}
//         onSettle={(item) => {
//           setSelectedSettle(item);
//           setSettleOpen(true);
//         }}
//       />

//       {settleOpen && selectedSettle && (
//         <SettleModal
//           open={settleOpen}
//           data={selectedSettle}
//           onClose={() => setSettleOpen(false)}
//           onConfirm={handleSettle}
//         />
//       )}

//       {/* ✅ SETTLEMENT HISTORY */}
//       <div className="mt-10">
//         <h3 className="text-lg font-semibold mb-3 text-cyan-400">
//           Settlement History
//         </h3>

//         <SettlementHistory
//           groupId={Number(groupId)}
//           isAdmin={isAdmin}
//           onReload={load}
//         />
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { getGroupBalanceApi } from "./balance.api";
import { getGroupMembersApi } from "../groups/group.api";
import { settleUpApi } from "../settlements/settlement.api";
import DetailedBalance from "./DetailedBalance";
import SettleModal from "../settlements/SettleModal";
import SettlementHistory from "../settlements/SettlementHistory";
import toast from "react-hot-toast";
import useUserStore from "../../store/user.store";
import ActivityLog from "../activity/ActivityLog";

export default function GroupBalance({ groupId }) {
  const user = useUserStore((s) => s.user);

  const [data, setData] = useState(null);
  const [memberMap, setMemberMap] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const [settleOpen, setSettleOpen] = useState(false);
  const [selectedSettle, setSelectedSettle] = useState(null);

  // 🔁 LOAD BALANCE + MEMBERS + ADMIN CHECK
  const load = async () => {
    try {
      setLoading(true);

      const membersRes = await getGroupMembersApi(Number(groupId));

      const map = {};
      let admin = false;

      membersRes.data.members.forEach((m) => {
        map[m.user_id] = m.name;

        if (m.user_id === user.id && m.role === "admin") {
          admin = true;
        }
      });

      setMemberMap(map);
      setIsAdmin(admin);

      const balanceRes = await getGroupBalanceApi(Number(groupId));
      setData(balanceRes.data);
    } catch (err) {
      console.error("GroupBalance error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [groupId]);

  if (loading) return <p className="text-slate-400">Calculating balance...</p>;
  if (!data) return null;

  // TOTALS
  const totalYouOwe = data.you_owe.reduce(
    (s, i) => s + Number(i.amount),
    0
  );

  const totalYouGet = data.you_get.reduce(
    (s, i) => s + Number(i.amount),
    0
  );

  const net = totalYouGet - totalYouOwe;

  // FORMAT
  const formattedYouOwe = data.you_owe.map((i) => ({
    to: memberMap[i.user_id],
    user_id: i.user_id,
    amount: Number(i.amount),
  }));

  const formattedYouGet = data.you_get.map((i) => ({
    from: memberMap[i.user_id],
    amount: Number(i.amount),
  }));

  // ✅ UPDATED SETTLE HANDLER (AMOUNT + METHOD)
  // const handleSettle = async ({ amount, method }) => {
  //   if (!selectedSettle) return;

  //   try {
  //     await settleUpApi({
  //       groupId: Number(groupId),
  //       paidTo: selectedSettle.user_id,
  //       amount: Number(amount),
  //       method, // 🔥 FROM MODAL
  //     });

  //     toast.success("Settlement successful");
  //     setSettleOpen(false);
  //     setSelectedSettle(null);
  //     load();
  //   } catch (err) {
  //     alert(err.response?.data?.message || "Settlement failed");
  //   }
  // };
  const handleSettle = async ({ amount, method }) => {
    if (!selectedSettle) return;

    try {
      await settleUpApi({
        groupId: Number(groupId),
        paidTo: selectedSettle.user_id,
        amount: Number(amount),
        method,
      });

      toast.success("Settlement successful");
      setSettleOpen(false);
      setSelectedSettle(null);
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Settlement failed");
    }
  };


  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      {/* BALANCE SUMMARY */}
      <div className="grid grid-cols-3 gap-4 text-center mb-6">
        <div>
          <p className="text-slate-400 text-sm">You Owe</p>
          <p className="text-lg font-bold text-red-400">
            ₹{totalYouOwe}
          </p>
        </div>

        <div>
          <p className="text-slate-400 text-sm">You Get</p>
          <p className="text-lg font-bold text-green-400">
            ₹{totalYouGet}
          </p>
        </div>

        <div>
          <p className="text-slate-400 text-sm">Net</p>
          <p
            className={`text-lg font-bold ${net >= 0 ? "text-green-400" : "text-red-400"
              }`}
          >
            {net > 0 && "+"}₹{net}
          </p>
        </div>
      </div>

      {/* DETAILS */}
      <DetailedBalance
        youOwe={formattedYouOwe}
        youGet={formattedYouGet}
        onSettle={(item) => {
          setSelectedSettle(item);
          setSettleOpen(true);
        }}
      />

      {settleOpen && selectedSettle && (
        <SettleModal
          open={settleOpen}
          data={selectedSettle}
          onClose={() => setSettleOpen(false)}
          onConfirm={handleSettle}
        />
      )}

      {/* SETTLEMENT HISTORY */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-3 text-cyan-400">
          Settlement History
        </h3>

        <SettlementHistory
          groupId={Number(groupId)}
          isAdmin={isAdmin}
          onReload={load}
        />
      </div>
      {/* ACTIVITY LOG */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-3 text-purple-400">
          Activity
        </h3>

        <ActivityLog groupId={Number(groupId)} />
      </div>

    </div>
  );
}
