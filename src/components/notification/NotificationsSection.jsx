import React, { useState } from 'react';
import { Bell, Check, ExternalLink, Calendar } from 'lucide-react';
import Image from 'next/image';

const NotificationsSection = ({ notifications, markAsRead, loading }) => {
  const [activeTab, setActiveTab] = useState('new');
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedItems, setExpandedItems] = useState(new Set());

  const toggleExpanded = (notificationId) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(notificationId)) {
        newSet.delete(notificationId);
      } else {
        newSet.add(notificationId);
      }
      return newSet;
    });
  };



  const unreadNotifications = notifications?.filter(n => !n.isRead) || [];
  const readNotifications = notifications?.filter(n => n.isRead) || [];

  const handleMarkAsRead = async (notificationId) => {
    await markAsRead(notificationId);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };
  // console.log(unreadNotifications);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-textPurple"></div>
      </div>
    );
  }


  const NotificationCard = ({ notification, showMarkAsRead = false }) => (
    <div className={`p-5 rounded-2xl transition-all duration-300 hover:shadow-medium ${!notification.isRead
      ? 'bg-cardbg shadow-soft border border-border-light'
      : 'bg-p shadow-soft border border-s'
      }`}>
      <div className="flex items-start gap-4">

        {/* Icon Section */}
        <div className={`flex-shrink-0 rounded-xl ${!notification.isRead
          ? 'bg-purple/20'
          : 'bg-s'
          }
           ${notification.image ? 'p-0 bg-opacity-0' : 'p-3'}
          `}
        >
          {
            notification.image ? (
              <div>
                <img
                  src={notification.image} alt=""
                  className='w-[100px] h-[100px] rounded-xl'
                />
              </div>
            ) : (
              <Bell className={`w-5 h-5 ${!notification.isRead
                ? 'text-textPurple'
                : 'text-texts'
                }`} />
            )
          }
        </div>

        {/* Content Section */}
        <div className="flex-1 min-w-0">

          {/* Header */}
          <div className="flex items-center justify-between gap-3 mb-2">
            <div className='flex flex-row items-center gap-2'>
              <h3 className="font-semibold text-textp text-base leading-snug line-clamp-2">
                {notification.title}
              </h3>

              <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${notification.type === 'New feature'
                ? 'bg-yellow bg-opacity-30 text-textp' :
                notification.type === 'New Template'
                  ? 'bg-purple bg-opacity-30 text-textPurple' :
                  notification.type === 'Bug fix'
                    ? 'bg-errorbg/80 text-error' :
                    'bg-s text-texts'
                }`}>
                {notification.type}
              </span>
            </div>
            <div className="flex items-center text-xs text-texts gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span className="font-medium">{formatDate(notification.createdAt)}</span>
            </div>
          </div>

          {/* Message */}
          <p className={`text-texts text-sm leading-relaxed mb-2 cursor-pointer  ${expandedItems.has(notification._id) ? '' : 'line-clamp-1'}
            `}
            onClick={() => toggleExpanded(notification._id)}
          >
            {notification.message}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between flex-wrap gap-3">

            {/* Right side - Actions */}
            <div className="flex items-center gap-3">
              {notification.externalLink && (
                <a
                  href={notification.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex bg-black p-2 rounded-xl px-4 items-center text-xs text-white hover:bg-gray-700 font-medium gap-1.5 transition-colors duration-200"
                >
                  {notification.externalLinkMessage || 'Learn More'}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {showMarkAsRead && !notification.isRead && (
                <button
                  onClick={() => handleMarkAsRead(notification._id)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs bg-textPurple text-light rounded-xl hover:bg-hoverbg transition-all duration-200 font-medium shadow-sm"
                >
                  <Check className="w-3.5 h-3.5" />
                  Mark as Read
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div >
  );


  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex items-center border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('new')}
          className={`px-4 py-2 text-sm font-medium  transition-colors rounded-3xl ${activeTab === 'new'
            ? 'border-primary text-primary bg-white'
            : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
        >
          Unread ({unreadNotifications.length})
        </button>
        <button
          onClick={() => setActiveTab('read')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors rounded-3xl ${activeTab === 'read'
            ? 'border-primary text-primary bg-white'
            : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
        >
          Read ({readNotifications.length})
        </button>
      </div>

      {/* Content */}
      <div className="space-y-4 h-[400px] overflow-y-scroll no-scrollbar">
        {activeTab === 'new' && (
          <>
            {unreadNotifications.length === 0 ? (
              <div className="text-center py-12">
                <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">All caught up!</h3>
                <p className="text-gray-500">No new notifications at the moment.</p>
              </div>
            ) : (
              unreadNotifications.map((notification) => (
                <NotificationCard
                  key={notification._id}
                  notification={notification}
                  showMarkAsRead={true}
                />
              ))
            )}
          </>
        )}

        {activeTab === 'read' && (
          <>
            {readNotifications.length === 0 ? (
              <div className="text-center py-12">
                <Check className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No read notifications</h3>
                <p className="text-gray-500">Notifications you've read will appear here.</p>
              </div>
            ) : (
              readNotifications.map((notification) => (
                <NotificationCard
                  key={notification._id}
                  notification={notification}
                  showMarkAsRead={false}
                />
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NotificationsSection;