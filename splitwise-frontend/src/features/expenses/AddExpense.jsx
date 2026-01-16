import { useState } from "react";
import { createExpenseApi } from "./expense.api";
import useUserStore from "../../store/user.store";

export default function AddExpense({ groupId, onClose, onAdded }) {
  const user = useUserStore((s) => s.user); // 🔥 logged-in user

  const [form, setForm] = useState({
    description: "",
    amount: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await createExpenseApi({
        groupId,
        description: form.description,
        amount: Number(form.amount),
        paidBy: user.id, // 🔥 IMPORTANT FIX
      });

      onAdded();   // refresh list
      onClose();   // close modal
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-sm"
      >
        <h2 className="text-xl font-semibold mb-4">Add Expense</h2>

        {error && (
          <p className="mb-3 text-sm text-red-400">{error}</p>
        )}

        <input
          placeholder="Description (e.g. Dinner)"
          className="w-full mb-4 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700"
          required
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Amount"
          className="w-full mb-6 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700"
          required
          onChange={(e) =>
            setForm({ ...form, amount: e.target.value })
          }
        />

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-slate-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            disabled={loading}
            className="px-4 py-2 bg-cyan-500 text-black rounded-lg font-semibold"
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
}
