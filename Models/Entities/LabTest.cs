using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models.Entities;

public class LabTest :BaseEntity
{
    [MaxLength(255)]
    public string TestName { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string Result { get; set; } = string.Empty;
    public TestStatus Status { get; set; } = TestStatus.Ordered;
    public int PatientId { get; set; }
    [ForeignKey("PatientId")]
    public Patient? Patient { get; set; }
}

public enum TestStatus
{
    Ordered,
    Completed,
    Cancelled
}