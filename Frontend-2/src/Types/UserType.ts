type LoginRequestDto = {
    username: string;
    password: string;
}

type LoginResponseDto = {
    token?: string;
    success: boolean;
    error?: string;
}

type AddUserDto = {
    email: string;
    password: string;
    fullName: string;
    role: UserRole;
}

type UpdateUserDto = {
    email: string;
    fullName: string;
    role: UserRole;
}

type UserDto = {
    id: number;
    email: string;
    fullName: string;
    role: UserRole;
}

type UsersResponseDto = {
    success: boolean;
    error?: string;
    users?: UserDto[];
    user?: UserDto;
}

enum UserRole {
    Admin,
    Manager,
    Doctor,
    Nurse,
    Receptionist,
    Support
}