import { useState } from "react";
import { updateExpenseApi } from "./expense.api";

export default function EditExpenseModal({ expense, onClose, onUpdated }) {
  const [form, setForm] = useState({
    description: expense.description,
    amount: expense.amount,
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateExpenseApi(expense.id, {
        description: form.description,
        amount: Number(form.amount),
      });
      onUpdated();
      onClose();
    } catch {
      alert("Failed to update expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 border border-slate-800 rounded-xl p-6 w-full max-w-sm"
      >
        <h3 className="text-lg font-semibold mb-4">Edit Expense</h3>

        <input
          className="w-full mb-3 px-4 py-2 rounded bg-slate-800 border border-slate-700"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          required
        />

        <input
          type="number"
          className="w-full mb-4 px-4 py-2 rounded bg-slate-800 border border-slate-700"
          value={form.amount}
          onChange={(e) =>
            setForm({ ...form, amount: e.target.value })
          }
          required
        />

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            className="bg-cyan-500 text-black px-4 py-2 rounded-lg font-semibold"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
