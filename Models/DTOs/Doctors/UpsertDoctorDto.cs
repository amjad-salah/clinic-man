namespace Models.DTOs.Doctors;

public record UpsertDoctorDto(int UserId, string PhoneNo, string Specialization);