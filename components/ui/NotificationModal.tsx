import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import { XCircle, CheckCircle, Info, Upload, Award, Download, Loader2 } from 'lucide-react';
import { Notification } from '../../types';
import { safeFormatDate } from '../../utils/dateUtils';
import { applicationService } from '../../services/application';
import { downloadCertificate } from '../../utils/certificateGenerator';
import { useAuth } from '../../contexts/AuthContext';
import Button from './Button';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notification: Notification | null;
  onMarkAsRead?: (notificationId: string) => void;
  onNavigate?: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  notification,
  onMarkAsRead,
  onNavigate,
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  if (!notification || !isOpen) return null;

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'document_rejected':
        return <XCircle size={24} className="text-rose-600" />;
      case 'document_approved':
        return <CheckCircle size={24} className="text-green-600" />;
      case 'application_approved':
        return <CheckCircle size={24} className="text-green-600" />;
      case 'application_rejected':
        return <XCircle size={24} className="text-rose-600" />;
      case 'application_verified':
        return <Award size={24} className="text-gold-600" />;
      default:
        return <Info size={24} className="text-blue-600" />;
    }
  };

  const handleClose = () => {
    if (!notification.read && onMarkAsRead) {
      onMarkAsRead(notification.id);
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={notification.title}
      size="md"
    >
      <div className="space-y-6">
        {/* Notification Header */}
        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
          <div className="flex-shrink-0 mt-0.5">
            {getNotificationIcon(notification.type)}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900">{notification.title}</h3>
              {!notification.read && (
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                  New
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500">
              {safeFormatDate(notification.createdAt, 'MMMM d, yyyy at h:mm a')}
            </p>
          </div>
        </div>

        {/* Notification Message */}
        <div className="p-4 bg-white border border-gray-200 rounded-xl">
          <p className="text-sm font-medium text-gray-700 mb-2">Message:</p>
          <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
            {notification.message}
          </p>
        </div>

        {/* Download Error Message */}
        {downloadError && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl">
            <p className="text-sm text-rose-700">{downloadError}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={handleClose}
            className="flex-1"
          >
            Close
          </Button>
          {notification.type === 'document_rejected' && (
            <Button
              variant="primary"
              onClick={() => {
                // Store navigation target
                const targetPath = '/documents';
                
                // Close modal and panel
                onClose();
                if (onNavigate) {
                  onNavigate();
                }
                
                // Navigate after brief delay to ensure cleanup
                requestAnimationFrame(() => {
                  navigate(targetPath);
                });
              }}
              className="flex-1"
            >
              <Upload size={16} className="mr-2" />
              Upload Document
            </Button>
          )}
          {notification.type === 'application_verified' && user && (
            <Button
              variant="primary"
              disabled={isDownloading}
              onClick={async () => {
                if (!user) return;
                
                setIsDownloading(true);
                setDownloadError(null);
                
                try {
                  // Fetch the user's application (same as dashboard does)
                  const application = await applicationService.getApplication(user.id);
                  
                  if (!application) {
                    throw new Error('Application not found');
                  }
                  
                  if (!application.verified) {
                    throw new Error('Application is not yet verified');
                  }
                  
                  // Download the certificate
                  await downloadCertificate(application);
                  
                  // Close modal after successful download
                  onClose();
                  if (onNavigate) {
                    onNavigate();
                  }
                } catch (error: any) {
                  console.error('Failed to download certificate:', error);
                  setDownloadError(error.message || 'Failed to download certificate');
                } finally {
                  setIsDownloading(false);
                }
              }}
              className="flex-1 bg-gold-500 hover:bg-gold-600"
            >
              {isDownloading ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  Downloading...
                </>
              ) : (
                <>
                  <Download size={16} className="mr-2" />
                  Download Certificate
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default NotificationModal;

