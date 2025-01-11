namespace Models.Entities;

public class AppointmentType : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public decimal Fees { get; set; }
    public List<Appointment>? Appointments { get; set; }
}