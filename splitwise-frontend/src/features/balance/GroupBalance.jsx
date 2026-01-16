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
import { useEffect, useState } from "react";
import { getGroupBalanceApi } from "./balance.api";
import { getGroupMembersApi } from "../groups/group.api";
import DetailedBalance from "./DetailedBalance";

export default function GroupBalance({ groupId }) {
  const [data, setData] = useState(null);
  const [memberMap, setMemberMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        // 1️⃣ MEMBERS
        const membersRes = await getGroupMembersApi(Number(groupId));

        const map = {};
        membersRes.data.members.forEach((m) => {
          // 🔥 FINAL TRUTH
          map[m.user_id] = m.name;
        });

        console.log("MEMBER MAP 👉", map);
        setMemberMap(map);

        // 2️⃣ BALANCE
        const balanceRes = await getGroupBalanceApi(Number(groupId));
        console.log("BALANCE 👉", balanceRes.data);

        setData(balanceRes.data);
      } catch (err) {
        console.error("GroupBalance error", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [groupId]);

  if (loading) {
    return <p className="mt-6 text-slate-400">Calculating balance...</p>;
  }

  if (!data) return null;

  // 🔥 TOTALS
  const totalYouOwe = data.you_owe.reduce(
    (s, i) => s + Number(i.amount || 0),
    0
  );

  const totalYouGet = data.you_get.reduce(
    (s, i) => s + Number(i.amount || 0),
    0
  );

  const net = totalYouGet - totalYouOwe;

  // 🔥 ID → NAME MAPPING (NOW MATCHES)
  const formattedYouOwe = data.you_owe.map((i) => ({
    to: memberMap[i.user_id] ?? `User #${i.user_id}`,
    amount: i.amount,
  }));

  const formattedYouGet = data.you_get.map((i) => ({
    from: memberMap[i.user_id] ?? `User #${i.user_id}`,
    amount: i.amount,
  }));

  return (
    <div className="mt-8 bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4">Your Balance</h2>

      <div className="grid grid-cols-3 gap-4 text-center">
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
            className={`text-lg font-bold ${
              net > 0
                ? "text-green-400"
                : net < 0
                ? "text-red-400"
                : "text-slate-300"
            }`}
          >
            {net > 0 && "+"}₹{net}
          </p>
        </div>
      </div>

      <p className="mt-4 text-center text-slate-400">
        {net > 0
          ? "You should receive money 💰"
          : net < 0
          ? "You need to pay money 💸"
          : "You are all settled 🎉"}
      </p>

      <DetailedBalance
        youOwe={formattedYouOwe}
        youGet={formattedYouGet}
      />
    </div>
  );
}
