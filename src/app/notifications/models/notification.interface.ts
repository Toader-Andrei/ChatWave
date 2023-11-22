import { NotificationType } from './notification-type.enum';

export interface Notification {
  description: string;
  receiverId: number;
  date: string;
  type: NotificationType;
  id: number;
  firstName?: string;
  lastName?: string;
  senderId?: number;
}
