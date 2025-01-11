using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models.Entities;

public class Appointment : BaseEntity
{
    public int PatientId { get; set; }

    [ForeignKey("PatientId")] public virtual Patient? Patient { get; set; }

    public int DoctorId { get; set; }

    [ForeignKey("DoctorId")] public virtual Doctor? Doctor { get; set; }

    public DateOnly Date { get; set; }
    public TimeOnly Time { get; set; }

    public AppointmentStatus Status { get; set; }
    public int? AppointmentTypeId { get; set; }
    [ForeignKey("AppointmentTypeId")]
    public virtual AppointmentType? AppointmentType { get; set; }

    public virtual List<Diagnose>? Diagnoses { get; set; }
    public virtual List<Prescription>? Prescriptions { get; set; }
    public virtual List<LabTest>? Tests { get; set; }
}

public enum AppointmentStatus
{
    Scheduled,
    Completed,
    Cancelled
}