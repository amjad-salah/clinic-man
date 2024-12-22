using System.ComponentModel;
using System.Text.Json.Serialization;
using Models.DTOs.Doctors;

namespace Models.DTOs.DoctorSchedules;

public record DoctorScheduleDetailsDto
{
    public int DoctorId { get; set; }
    public DayOfWeek Day { get; set; }

    [JsonConverter(typeof(TimeOnlyConverter))]
    public TimeOnly StartTime { get; set; }

    [JsonConverter(typeof(TimeOnlyConverter))]
    public TimeOnly EndTime { get; set; }

    public DoctorDto? Doctor { get; set; }
}