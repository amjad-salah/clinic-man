using Models.DTOs.Appointments;
using Models.DTOs.Patients;
using Models.Entities;

namespace Models.DTOs.Billings;

public class BillingDto
{
    public int Id { get; set; }
    public DateOnly Date { get; set; }
    public Decimal SubTotal { get; set; }
    public Decimal Tax { get; set; }
    public Decimal Total { get; set; }
    public Decimal PaidAmount { get; set; }
    public Decimal RemainingBalance { get; set; }
    public BillStatus Status { get; set; }
    public int PatientId { get; set; }
    public int AppointmentId { get; set; }
    public AppointmentDto? Appointment { get; set; }
    public PatientDto? Patient { get; set; }
}