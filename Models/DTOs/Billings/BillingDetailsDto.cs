using Models.DTOs.Appointments;
using Models.DTOs.BillingItems;
using Models.DTOs.Patients;
using Models.DTOs.Payments;
using Models.Entities;

namespace Models.DTOs.Billings;

public class BillingDetailsDto
{
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
    public List<BillingItemDto>? BillingItems { get; set; }
    public List<PaymentDto>? Payments { get; set; }
}