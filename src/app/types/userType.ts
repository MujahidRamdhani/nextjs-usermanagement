export interface User {
  id: number;
  firstname: string;
  lastname: string;
  birthdate: Date;
}

export interface CreateUserDTO {
  firstname: string;
  lastname: string;
  birthdate: string;
}

export interface UpdateUserDTO {
  id?: number;
  firstname?: string;
  lastname?: string;
  birthdate?: string;
}

export interface CreateDTO {
  firstname: string;
  lastname: string;
  birthdate: string;
  street: string;
  city: string;
  province: string;
  postal_code: string;
}

export interface UpdateDTO {
  firstname?: string;
  lastname?: string;
  birthdate?: string;
  street?: string;
  city?: string;
  province?: string;
  postal_code?: string;
}

export interface getAllUsersResponse {
  page: number;
  limit: number;
  totalUsers: number;
  totalPages: number;
  users: User[];
}

export interface UserAddress {
  id: number;
  firstname: string;
  lastname: string;
  birthdate: string;
  street: string;
  city: string;
  province: string;
  postal_code: string;
}
