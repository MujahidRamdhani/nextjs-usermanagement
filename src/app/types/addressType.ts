export interface Address {
  id: number;
  user_id: number;
  street: string;
  city: string;
  province: string;
  postal_code: string;
}

export interface CreateAddressDTO {
  user_id: number;
  street: string;
  city: string;
  province: string;
  postal_code: string;
}

export interface UpdateAddressDTO {
  id?: number;
  user_id?: number;
  street?: string;
  city?: string;
  province?: string;
  postal_code?: string;
}
