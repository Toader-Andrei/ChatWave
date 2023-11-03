import { NotificationType } from './notification-type.enum';

export interface Notification {
  description: string;
  userId: number;
  date: string;
  type: NotificationType;
  id: number;
}
