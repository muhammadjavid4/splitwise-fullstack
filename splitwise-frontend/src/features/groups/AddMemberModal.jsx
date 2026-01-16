import { useState } from "react";
import { addMemberApi } from "./group.api";

export default function AddMemberModal({ groupId, onClose, onAdded }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await addMemberApi(groupId, { email });
      onAdded();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add member");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <form
        onSubmit={handleAdd}
        className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-sm"
      >
        <h3 className="text-lg font-semibold mb-4">Add Member</h3>

        {error && (
          <p className="mb-3 text-sm text-red-400">{error}</p>
        )}

        <input
          type="email"
          placeholder="User email"
          required
          className="w-full mb-4 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700"
          onChange={(e) => setEmail(e.target.value)}
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
            {loading ? "Adding..." : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
}
