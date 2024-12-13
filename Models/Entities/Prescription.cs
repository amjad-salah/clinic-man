using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models.Entities;

public class Prescription : BaseEntity
{
    public int PatientId { get; set; }
    [ForeignKey(("PatientId"))]
    public virtual Patient? Patient { get; set; }
    [MaxLength(255)]
    public string MedicationName { get; set; } = string.Empty;
    [MaxLength(50)]
    public string Dosage { get; set; } = string.Empty;
    [MaxLength(50)]
    public string Frequency { get; set; } = string.Empty;
    [MaxLength(50)]
    public string Duration { get; set; } = string.Empty;
}