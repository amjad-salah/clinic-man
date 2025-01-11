using Models.DTOs.Appointments;
using Models.DTOs.BillingItems;
using Models.DTOs.Patients;
using Models.DTOs.Payments;
using Models.Entities;

namespace Models.DTOs.Billings;

public class BillingDetailsDto
{
    public int Id { get; set; }
    public DateOnly Date { get; set; }
    public decimal SubTotal { get; set; }
    public decimal Tax { get; set; }
    public decimal Total { get; set; }
    public decimal PaidAmount { get; set; }
    public decimal RemainingBalance { get; set; }
    public BillStatus Status { get; set; }
    public int PatientId { get; set; }
    public int AppointmentId { get; set; }
    public AppointmentDto? Appointment { get; set; }
    public PatientDto? Patient { get; set; }
    public List<BillingItemDto>? BillItems { get; set; }
    public List<PaymentDto>? Payments { get; set; }
}