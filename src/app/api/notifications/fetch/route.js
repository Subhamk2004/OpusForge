import Notification from "@/models/Notification";
import UserNotifications from "@/models/UserNotifications";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/server/auth";
import connectDB from "@/lib/server/mongodb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET() {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return NextResponse.json(
      { error: "Unauthorized. Please log in." },
      { status: 401 }
    );
  }

  const userId = session.user.id;


  try {
    const notifications = await Notification.aggregate([
      // Step 1: Get all notifications (you might want to add filters here)
      {
        $sort: { createdAt: -1 } // Latest first
      },
      
      // Step 2: Lookup user's read status
      {
        $lookup: {
          from: 'usernotifications', // Collection name (MongoDB makes it lowercase + plural)
          let: { notificationId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$notificationId', '$$notificationId'] },
                    { $eq: ['$userId', new mongoose.Types.ObjectId(userId)] }
                  ]
                }
              }
            }
          ],
          as: 'userStatus'
        }
      },
      
      // Step 3: Add computed fields
      {
        $addFields: {
          isRead: {
            $cond: [
              { $gt: [{ $size: '$userStatus' }, 0] },
              { $arrayElemAt: ['$userStatus.isRead', 0] },
              false // Default to unread if no record exists
            ]
          },
          readAt: {
            $cond: [
              { $gt: [{ $size: '$userStatus' }, 0] },
              { $arrayElemAt: ['$userStatus.readAt', 0] },
              null
            ]
          }
        }
      },
      
      // Step 4: Clean up - remove the userStatus field
      {
        $project: {
          userStatus: 0
        }
      }
    ]);

    // Count unread notifications
    const unreadCount = notifications.filter(n => !n.isRead).length;

    // console.log(notifications);
    
    return NextResponse.json({
      notifications,
      unreadCount
    }, { status: 200 });

  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json({ 
      message: "Error fetching notifications" 
    }, { status: 500 });
  }
}