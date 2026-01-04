import mongoose from "mongoose";

const userNotificationsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    notificationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Notification",
        required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userNotificationsSchema.index({ userId: 1, notificationId: 1 }, { unique: true });

const UserNotifications =
  mongoose.models.UserNotifications ||
  mongoose.model("UserNotifications", userNotificationsSchema);
export default UserNotifications;
