using Models.DTOs.Users;

namespace Models.DTOs.Doctors;

public record DoctorDto(int Id, int UserId, 
    string PhoneNo, string Specialization, UserDto User);