export type LoginRequestDto = {
  email: string;
  password: string;
};

export type LoginResponseDto = {
  success: boolean;
  error?: string;
  fullName?: string;
  role?: UserRole;
  token?: string;
};

export type AddUserDto = {
  email: string;
  password: string;
  fullName: string;
  role: UserRole;
};

export type UpdateUserDto = {
  id: number;
  email: string;
  fullName: string;
  role: UserRole;
};

export type UserDto = {
  id: number;
  email: string;
  fullName: string;
  role: UserRole;
};

export type UsersResponseDto = {
  success: boolean;
  error?: string;
  users?: UserDto[];
  user?: UserDto;
};

export type UserAuth = {
  fullName?: string;
  role?: UserRole;
  token?: string;
};
export type AuthState = {
  user?: UserAuth | null;
};

export enum UserRole {
  Admin,
  Manager,
  Doctor,
  Nurse,
  Receptionist,
  Support,
}
