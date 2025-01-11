using Models.DTOs.Appointments;

namespace Models.DTOs.AppointmentTypes;

public class AppointmentTypeDetailsDto
{
    public string Name { get; set; }
    public decimal Fees { get; set; }
    public List<AppointmentDto>? Appointments { get; set; }
}