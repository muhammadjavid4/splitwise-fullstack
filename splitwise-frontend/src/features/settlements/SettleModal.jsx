// import { useState } from "react";

// export default function SettleModal({ open, onClose, data, onConfirm }) {
//   const [amount, setAmount] = useState(data.amount);

//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
//       <div className="bg-slate-900 p-6 rounded-xl w-96 border border-slate-800">
//         <h3 className="font-semibold mb-4">
//           Settle with <span className="text-cyan-400">{data.to}</span>
//         </h3>

//         <input
//           type="number"
//           max={data.amount}
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="w-full mb-4 p-2 bg-slate-800 rounded border border-slate-700"
//         />

//         <div className="flex justify-end gap-3">
//           <button
//             onClick={onClose}
//             className="text-slate-400"
//           >
//             Cancel
//           </button>

//           <button
//             onClick={() => onConfirm(Number(amount))}
//             className="bg-green-500 px-4 py-2 rounded font-semibold text-black"
//           >
//             Pay ₹{amount}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState } from "react";

// export default function SettleModal({ open, onClose, data, onConfirm }) {
//   const [amount, setAmount] = useState(data.amount);

//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
//       <div className="bg-slate-900 p-6 rounded-xl w-96 border border-slate-800">
//         <h3 className="font-semibold mb-4">
//           Settle with <span className="text-cyan-400">{data.to}</span>
//         </h3>

//         <input
//           type="number"
//           max={data.amount}
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="w-full mb-4 p-2 bg-slate-800 rounded border border-slate-700"
//         />

//         <div className="flex justify-end gap-3">
//           <button onClick={onClose} className="text-slate-400">
//             Cancel
//           </button>

//           <button
//             onClick={() => onConfirm(Number(amount))}
//             className="bg-green-500 px-4 py-2 rounded font-semibold text-black"
//           >
//             Pay ₹{amount}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState } from "react";

// export default function SettleModal({ open, onClose, data, onConfirm }) {
//   const [amount, setAmount] = useState(data.amount);
//   const [method, setMethod] = useState("cash"); // 🔥 NEW

//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
//       <div className="bg-slate-900 p-6 rounded-xl w-96 border border-slate-800">
//         <h3 className="font-semibold mb-4">
//           Settle with{" "}
//           <span className="text-cyan-400">{data.to}</span>
//         </h3>

//         {/* AMOUNT */}
//         <input
//           type="number"
//           max={data.amount}
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="w-full mb-3 p-2 bg-slate-800 rounded border border-slate-700"
//         />

//         {/* 🔥 METHOD SELECT */}
//         <select
//           value={method}
//           onChange={(e) => setMethod(e.target.value)}
//           className="w-full mb-4 p-2 bg-slate-800 rounded border border-slate-700"
//         >
//           <option value="cash">Cash</option>
//           <option value="UPI">UPI / Online</option>
//         </select>

//         <div className="flex justify-end gap-3">
//           <button onClick={onClose} className="text-slate-400">
//             Cancel
//           </button>

//           <button
//             onClick={() =>
//               onConfirm({
//                 amount: Number(amount),
//                 method,
//               })
//             }
//             className="bg-green-500 px-4 py-2 rounded font-semibold text-black"
//           >
//             Pay ₹{amount}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState } from "react";

// export default function SettleModal({ open, onClose, data, onConfirm }) {
//   const [amount, setAmount] = useState(data.amount);
//   const [method, setMethod] = useState("cash");
//   const [upiOpened, setUpiOpened] = useState(false);

//   if (!open) return null;

//   const openUpiIntent = () => {
//     const upiUrl = `upi://pay?pa=demo@upi&pn=${encodeURIComponent(
//       data.to
//     )}&am=${amount}&cu=INR`;

//     window.location.href = upiUrl;
//     setUpiOpened(true);
//   };

//   return (
//     <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
//       <div className="bg-slate-900 p-6 rounded-xl w-96 border border-slate-800">
//         <h3 className="font-semibold mb-4">
//           Settle with{" "}
//           <span className="text-cyan-400">{data.to}</span>
//         </h3>

//         {/* AMOUNT */}
//         <input
//           type="number"
//           max={data.amount}
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="w-full mb-3 p-2 bg-slate-800 rounded border border-slate-700"
//         />

//         {/* METHOD */}
//         <select
//           value={method}
//           onChange={(e) => {
//             setMethod(e.target.value);
//             setUpiOpened(false);
//           }}
//           className="w-full mb-4 p-2 bg-slate-800 rounded border border-slate-700"
//         >
//           <option value="cash">Cash</option>
//           <option value="UPI">UPI / Online</option>
//         </select>

//         {/* ACTIONS */}
//         <div className="flex justify-end gap-3">
//           <button onClick={onClose} className="text-slate-400">
//             Cancel
//           </button>

//           {method === "cash" && (
//             <button
//               onClick={() =>
//                 onConfirm({
//                   amount: Number(amount),
//                   method: "cash",
//                 })
//               }
//               className="bg-green-500 px-4 py-2 rounded font-semibold text-black"
//             >
//               Pay ₹{amount}
//             </button>
//           )}

//           {method === "UPI" && !upiOpened && (
//             <button
//               onClick={openUpiIntent}
//               className="bg-cyan-500 px-4 py-2 rounded font-semibold text-black"
//             >
//               Pay via UPI
//             </button>
//           )}
//         </div>

//         {/* MARK AS PAID */}
//         {method === "UPI" && upiOpened && (
//           <button
//             onClick={() =>
//               onConfirm({
//                 amount: Number(amount),
//                 method: "UPI",
//               })
//             }
//             className="mt-4 w-full bg-green-500 py-2 rounded font-semibold text-black"
//           >
//             Mark as Paid
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }


import { useState } from "react";

export default function SettleModal({ open, onClose, data, onConfirm }) {
  const [amount, setAmount] = useState(data.amount);
  const [method, setMethod] = useState("cash");
  const [upiOpened, setUpiOpened] = useState(false);

  // ✅ YAHI PE HONA CHAHIYE
  const openUpiIntent = ({ name, amount }) => {
    const upiUrl = `upi://pay?pa=demo@upi&pn=${encodeURIComponent(
      name
    )}&am=${amount}&cu=INR`;

    window.location.href = upiUrl;
    setUpiOpened(true);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-slate-900 p-6 rounded-xl w-96 border border-slate-800">
        <h3 className="font-semibold mb-4">
          Settle with{" "}
          <span className="text-cyan-400">{data.to}</span>
        </h3>

        {/* AMOUNT */}
        <input
          type="number"
          max={data.amount}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full mb-3 p-2 bg-slate-800 rounded border border-slate-700"
        />

        {/* METHOD */}
        <select
          value={method}
          onChange={(e) => {
            setMethod(e.target.value);
            setUpiOpened(false);
          }}
          className="w-full mb-4 p-2 bg-slate-800 rounded border border-slate-700"
        >
          <option value="cash">Cash</option>
          <option value="UPI">UPI / Online</option>
        </select>

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="text-slate-400">
            Cancel
          </button>

          {method === "cash" && (
            <button
              onClick={() =>
                onConfirm({
                  amount: Number(amount),
                  method: "cash",
                })
              }
              className="bg-green-500 px-4 py-2 rounded font-semibold text-black"
            >
              Pay ₹{amount}
            </button>
          )}

          {method === "UPI" && !upiOpened && (
            <button
              onClick={() =>
                openUpiIntent({
                  name: data.to,
                  amount,
                })
              }
              className="bg-cyan-500 px-4 py-2 rounded font-semibold text-black"
            >
              Pay via UPI
            </button>
          )}
        </div>

        {/* MARK AS PAID */}
        {method === "UPI" && upiOpened && (
          <button
            onClick={() =>
              onConfirm({
                amount: Number(amount),
                method: "UPI",
              })
            }
            className="mt-4 w-full bg-green-500 py-2 rounded font-semibold text-black"
          >
            Mark as Paid
          </button>
        )}
      </div>
    </div>
  );
}
