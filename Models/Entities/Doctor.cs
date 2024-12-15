using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Models.Entities;

[Index(nameof(PhoneNo), Name = "Doctor_PhoneNo_Index")]
public class Doctor : BaseEntity
{
    [MaxLength(20)] public string PhoneNo { get; set; } = string.Empty;

    [MaxLength(100)] public string Specialization { get; set; } = string.Empty;

    public int UserId { get; set; }

    [ForeignKey("UserId")] public virtual User? User { get; set; }

    public virtual IList<DoctorSchedule>? Schedules { get; set; }

    public virtual List<Appointment>? Appointments { get; set; }
}