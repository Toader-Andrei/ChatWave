import { NotificationType } from './notifcation-type.enum';

export interface Notification {
  description: string;
  userId: number;
  date: string;
  type: NotificationType;
  id: number;
}
