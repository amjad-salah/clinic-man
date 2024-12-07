using System.ComponentModel;
using System.Text.Json.Serialization;

namespace Models.DTOs.DoctorSchedules;

public record DoctorScheduleDto
{
    public int Id { get; set; }
    public int DoctorId { get; set; }
    public DayOfWeek Day { get; set; }
    [JsonConverter(typeof(TimeOnlyConverter))]
    public TimeOnly StartTime { get; set; }
    [JsonConverter(typeof(TimeOnlyConverter))]
    public TimeOnly EndTime { get; set; }
}