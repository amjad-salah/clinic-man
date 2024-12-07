using Models.DTOs.DoctorSchedules;
using Models.DTOs.Users;

namespace Models.DTOs.Doctors;

public record DoctorDetailsDto( 
    string PhoneNo, string Specialization, 
    UserDto User, List<DoctorScheduleDto> Schedules);