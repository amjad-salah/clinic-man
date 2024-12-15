using System.ComponentModel.DataAnnotations.Schema;

namespace Models.Entities;

public class Billing : BaseEntity
{
    public DateOnly Date { get; set; }
    public Decimal SubTotal { get; set; }
    public Decimal Tax { get; set; }
    public Decimal Total { get; set; }
    public Decimal PaidAmount { get; set; }
    public Decimal RemainingBalance { get; set; }
    public BillStatus Status { get; set; }
    public int PatientId { get; set; }
    [ForeignKey("PatientId")]
    public virtual Patient? Patient { get; set; }
    public int AppointmentId { get; set; }
    [ForeignKey("AppointmentId")]
    public virtual Appointment? Appointment { get; set; }
    public virtual List<BillItem>? BillItems { get; set; }
    public virtual List<Payment>? Payments { get; set; }
}

public enum BillStatus
{
    Pending,
    Paid,
    Overdue
}