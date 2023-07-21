export interface User {
  nickname: string;
  firstname?: string;
  lastname?: string;
  password: string;
  salt: string;
  created_at: Date;
  updated_at: Date | null;
  deleted_at: Date | null;
  role: 'user' | 'moderator' | 'admin';
}

export interface UsersResponse {
  users: User[];
  totalUsers: number;
  page: number;
  limit: number;
}
