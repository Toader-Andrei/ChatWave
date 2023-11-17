export interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  id: number;
  bio: string;
  blockedIds: number[];
  friendIds: number[];
  friendRequestIds: number[];
}
