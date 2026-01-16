// import { useEffect, useState } from "react";
// import { getGroupExpensesApi } from "./expense.api";

// export default function ExpenseList({ groupId }) {
//   const [expenses, setExpenses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getGroupExpensesApi(groupId)
//       .then((res) => setExpenses(res.data.expenses || []))
//       .finally(() => setLoading(false));
//   }, [groupId]);

//   if (loading) {
//     return <p className="text-slate-400 mt-6">Loading expenses...</p>;
//   }

//   if (expenses.length === 0) {
//     return (
//       <p className="text-slate-500 mt-6">
//         No expenses yet. Add the first one 💸
//       </p>
//     );
//   }

//   return (
//     <div className="mt-6 space-y-4">
//       {expenses.map((exp) => (
//         <div
//           key={exp.id}
//           className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex justify-between items-center"
//         >
//           <div>
//             <h3 className="font-semibold text-white">
//               {exp.description}
//             </h3>
//             <p className="text-sm text-slate-400">
//               Paid by {exp.paid_by_name || "Member"}
//             </p>
//           </div>

//           <div className="text-cyan-400 font-bold">
//             ₹{exp.amount}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// main code bhai nakko bhool jaa

// import { useEffect, useState } from "react";
// import {
//   getGroupExpensesApi,
//   deleteExpenseApi,
// } from "./expense.api";
// import EditExpenseModal from "./EditExpenseModal";
// import useUserStore from "../../store/user.store";

// export default function ExpenseList({ groupId }) {
//   const user = useUserStore((s) => s.user);

//   const [expenses, setExpenses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editExpense, setEditExpense] = useState(null);

//   const loadExpenses = async () => {
//     setLoading(true);
//     const res = await getGroupExpensesApi(groupId);
//     setExpenses(res.data.expenses || []);
//     setLoading(false);
//   };

//   useEffect(() => {
//     loadExpenses();
//   }, [groupId]);

//   const handleDelete = async (expenseId) => {
//     if (!confirm("Delete this expense?")) return;

//     try {
//       await deleteExpenseApi(expenseId);
//       loadExpenses();
//     } catch {
//       alert("Failed to delete expense");
//     }
//   };

//   if (loading) {
//     return <p className="text-slate-400 mt-6">Loading expenses...</p>;
//   }

//   if (expenses.length === 0) {
//     return (
//       <p className="text-slate-500 mt-6">
//         No expenses yet. Add the first one 💸
//       </p>
//     );
//   }

//   return (
//     <div className="mt-6 space-y-4">
//       {expenses.map((exp) => {
//         const canEdit =
//           exp.paid_by === user.id || user.role === "admin";

//         return (
//           <div
//             key={exp.id}
//             className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex justify-between items-center"
//           >
//             {/* LEFT */}
//             <div>
//               <h3 className="font-semibold text-white">
//                 {exp.description}
//               </h3>
//               <p className="text-sm text-slate-400">
//                 Paid by {exp.paid_by_name || "Member"}
//               </p>
//             </div>

//             {/* RIGHT */}
//             <div className="flex items-center gap-4">
//               <span className="text-cyan-400 font-bold">
//                 ₹{exp.amount}
//               </span>

//               {canEdit && (
//                 <div className="flex gap-2 text-sm">
//                   <button
//                     onClick={() => setEditExpense(exp)}
//                     className="text-cyan-400 hover:text-cyan-300"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(exp.id)}
//                     className="text-red-400 hover:text-red-300"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         );
//       })}

//       {editExpense && (
//         <EditExpenseModal
//           expense={editExpense}
//           onClose={() => setEditExpense(null)}
//           onUpdated={loadExpenses}
//         />
//       )}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { getGroupExpensesApi, deleteExpenseApi, updateExpenseApi } from "./expense.api";
import useUserStore from "../../store/user.store";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

export default function ExpenseList({ groupId }) {
  const user = useUserStore((s) => s.user);

  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ description: "", amount: "" });

  const loadExpenses = async () => {
    setLoading(true);
    const res = await getGroupExpensesApi(groupId);
    setExpenses(res.data.expenses || []);
    setLoading(false);
  };

  useEffect(() => {
    loadExpenses();
  }, [groupId]);

  if (!user) return null;

  const startEdit = (exp) => {
    setEditingId(exp.id);
    setEditForm({
      description: exp.description,
      amount: exp.amount,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ description: "", amount: "" });
  };

  const saveEdit = async (expenseId) => {
    if (!editForm.description || !editForm.amount) {
      alert("Description aur amount dono fill karo!");
      return;
    }

    try {
      await updateExpenseApi(expenseId, editForm);
      alert("✅ Expense successfully updated!");
      setEditingId(null);
      loadExpenses();
    } catch (err) {
      alert("❌ Update failed: " + (err.response?.data?.message || "Error"));
    }
  };

  const deleteExpense = async (expenseId) => {
    if (!confirm("Delete this expense?")) return;

    try {
      await deleteExpenseApi(expenseId);
      alert("✅ Expense successfully deleted!");
      loadExpenses();
    } catch (err) {
      alert("❌ Delete failed: " + (err.response?.data?.message || "Error"));
    }
  };

  if (loading) {
    return <p className="text-slate-400 mt-4">Loading expenses...</p>;
  }

  return (
    <div className="space-y-3">
      {expenses.map((exp) => {
        const isOwner = Number(exp.paid_by_id) === Number(user.id);
        const isEditing = editingId === exp.id;

        return (
          <div
            key={exp.id}
            className="bg-slate-900 border border-slate-800 rounded-xl p-4"
          >
            {isEditing ? (
              // EDIT MODE
              <div className="space-y-3">
                <input
                  type="text"
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm({ ...editForm, description: e.target.value })
                  }
                  placeholder="Description"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white"
                />
                <input
                  type="number"
                  value={editForm.amount}
                  onChange={(e) =>
                    setEditForm({ ...editForm, amount: e.target.value })
                  }
                  placeholder="Amount"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => saveEdit(exp.id)}
                    className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // VIEW MODE
              <div className="flex justify-between items-center">
                {/* LEFT */}
                <div>
                  <h3 className="font-semibold">{exp.description}</h3>
                  <p className="text-sm text-slate-400">
                    Amount: ₹{exp.amount}
                  </p>
                  <p className="text-xs text-slate-400">
  Paid by{" "}
  <span className="text-cyan-400 font-medium">
    {exp.paid_by_name || exp.paid_by?.name || `User #${exp.paid_by_id}`}
  </span>
</p>

                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-3">
                  {isOwner && (
                    <>
                      <button
                        title="Edit"
                        onClick={() => startEdit(exp)}
                        className="text-slate-400 hover:text-cyan-400"
                      >
                        <FiEdit2 />
                      </button>

                      <button
                        title="Delete"
                        onClick={() => deleteExpense(exp.id)}
                        className="text-slate-400 hover:text-red-400"
                      >
                        <FiTrash2 />
                      </button>
                    </>
                  )}

                  <span className="text-cyan-400 font-bold">
                    ₹{exp.amount}
                  </span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}