using Models.DTOs.DoctorSchedules;

namespace Models.DTOs.Doctors;

public record DoctorDetailsDto(
    string PhoneNo,
    string Specialization,
    UserDoctorDto User,
    List<DoctorScheduleDto> Schedules);