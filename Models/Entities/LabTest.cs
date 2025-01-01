using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models.Entities;

public class LabTest : BaseEntity
{
    [MaxLength(255)] public string TestName { get; set; } = string.Empty;

    public string? Description { get; set; }
    public string Result { get; set; } = string.Empty;
    public TestStatus Status { get; set; } = TestStatus.Pending;
    public int PatientId { get; set; }

    [ForeignKey("PatientId")] public virtual Patient? Patient { get; set; }

    public int AppointmentId { get; set; }

    [ForeignKey("AppointmentId")] public virtual Appointment? Appointment { get; set; }
}

public enum TestStatus
{
    Pending,
    Completed,
    Cancelled
}