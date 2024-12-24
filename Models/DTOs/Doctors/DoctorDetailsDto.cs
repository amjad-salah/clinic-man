using Models.DTOs.Appointments;
using Models.DTOs.DoctorSchedules;

namespace Models.DTOs.Doctors;

public class DoctorDetailsDto
{
    public UserDoctorDto User { get; set; }
    public string Specialization { get; set; }
    public string PhoneNo { get; set; }
    public List<DoctorScheduleDto> Schedules { get; set; }
    public List<AppointmentDto> Appointments { get; set; }
}