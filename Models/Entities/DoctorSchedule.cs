using System.ComponentModel.DataAnnotations.Schema;

namespace Models.Entities;

public class DoctorSchedule : BaseEntity
{
    public DayOfWeek Day { get; set; }
    public TimeOnly StartTime { get; set; }
    public TimeOnly EndTime { get; set; }
    public int DoctorId { get; set; }
    [ForeignKey("DoctorId")]
    public virtual Doctor? Doctor { get; set; }
}