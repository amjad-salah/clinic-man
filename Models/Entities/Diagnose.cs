using System.ComponentModel.DataAnnotations.Schema;

namespace Models.Entities;

public class Diagnose : BaseEntity
{
    public int PatientId { get; set; }
    [ForeignKey(("PatientId"))]
    public virtual Patient? Patient { get; set; }
    
    public string Diagnosis { get; set; } = string.Empty;
}