// settlements/EditMethodModal.jsx
import { useState } from "react";

export default function EditMethodModal({ open, onClose, settlement, onSave }) {
  const [method, setMethod] = useState(settlement.method);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-slate-900 p-6 rounded-xl w-80 border border-slate-800">
        <h3 className="font-semibold mb-4">
          Edit Payment Method
        </h3>

        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="w-full p-2 mb-4 bg-slate-800 rounded border border-slate-700"
        >
          <option value="cash">Cash</option>
          <option value="UPI">UPI / Online</option>
        </select>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="text-slate-400">
            Cancel
          </button>

          <button
            onClick={() => onSave(method)}
            className="bg-cyan-500 px-4 py-2 rounded text-black font-semibold"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
