using Models.DTOs.DoctorSchedules;
using Models.DTOs.Users;

namespace Models.DTOs.Doctors;

public record DoctorDetailsDto( 
    string PhoneNo, string Specialization, 
    UserDoctorDto User, List<DoctorScheduleDto> Schedules);