import { useEffect, useState } from "react";
import {
  getMyNotificationsApi,
  markNotificationReadApi,
} from "./notification.api";

export default function NotificationList() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const res = await getMyNotificationsApi();
      setList(res.data.notifications || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const markRead = async (id) => {
    await markNotificationReadApi(id);
    load();
  };

  if (loading) return <p className="text-slate-400">Loading...</p>;

  if (list.length === 0)
    return <p className="text-slate-500">No notifications</p>;

  return (
    <div className="space-y-3">
      {list.map((n) => (
        <div
          key={n.id}
          className={`border rounded-lg p-3 ${
            n.is_read ? "bg-slate-800" : "bg-slate-700"
          }`}
        >
          <p className="text-sm">{n.message}</p>

          <div className="flex justify-between mt-1">
            <p className="text-xs text-slate-400">
              {new Date(n.created_at).toLocaleString()}
            </p>

            {!n.is_read && (
              <button
                onClick={() => markRead(n.id)}
                className="text-xs text-cyan-400"
              >
                Mark read
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
