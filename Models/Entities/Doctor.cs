using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Models.Entities;

[Index(nameof(PhoneNo), Name = "Doctor_PhoneNo_Index")]
public class Doctor : BaseEntity
{
    public string PhoneNo { get; set; } = string.Empty;
    public string Specialization { get; set; } = string.Empty;
    public int UserId { get; set; }
    [ForeignKey("UserId")]
    public virtual User? User { get; set; }
    public virtual IList<DoctorSchedule>? Schedules { get; set; }
}