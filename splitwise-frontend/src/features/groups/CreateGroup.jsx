import { useState } from "react";
import { createGroupApi } from "./group.api";

export default function CreateGroup({ onClose, onCreated }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!name) return;
    setLoading(true);
    try {
      const res = await createGroupApi({ name });
      onCreated(res.data.group);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4">Create Group</h2>

        <input
          placeholder="Group name"
          className="w-full mb-4 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700"
          onChange={(e) => setName(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-slate-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={loading}
            className="px-4 py-2 bg-cyan-500 text-black rounded-lg font-semibold"
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
