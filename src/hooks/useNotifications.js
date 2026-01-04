"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const router = useRouter();

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/notifications/fetch/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }

      const data = await response.json();
    //   console.log(data.notifications);

      setNotifications(data.notifications);
      setUnreadCount(
        data.unreadCount ||
          data.notifications?.filter((n) => !n.isRead).length ||
          0
      );
      setError(null);
    } catch (err) {
      console.error("Error fetching notifications:", err);
      setError(err.message);
      setNotifications([]);
      setUnreadCount(0);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      const response = await fetch("/api/notifications/markRead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          notificationId: notificationId,
        }),
      });

      if (response.ok) {
        setNotifications((prevNotifications) =>
          prevNotifications.map((notification) =>
            notification._id === notificationId
              ? {
                  ...notification,
                  isRead: true,
                  readAt: new Date().toISOString(),
                }
              : notification
          )
        );

        setUnreadCount((prevCount) => Math.max(0, prevCount - 1));
        setError(null);
      } else {
        const data = await response.json();
        throw new Error(data.message || "Failed to mark as read");
      }
    } catch (err) {
      console.error("Error marking notification as read:", err);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [router]);

  return {
    notifications,
    loading,
    error,
    unreadCount,
    markAsRead,
    refetch: fetchNotifications,
  };
}