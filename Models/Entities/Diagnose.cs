using System.ComponentModel.DataAnnotations.Schema;

namespace Models.Entities;

public class Diagnose : BaseEntity
{
    public int AppointmentId { get; set; }
    [ForeignKey(("AppointmentId"))]
    public virtual Appointment? Appointment { get; set; }
    
    public string Diagnosis { get; set; } = string.Empty;
}