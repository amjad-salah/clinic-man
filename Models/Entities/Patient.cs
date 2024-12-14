using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace Models.Entities;

[Index(nameof(PhoneNo), IsUnique = true, Name = "Patient_PhoneNo_Index")]
public class Patient : BaseEntity
{
    [MaxLength(255)]
    public string FullName { get; set; } = string.Empty;
    public DateOnly DoB { get; set; }
    public Gender Gender { get; set; }
    [MaxLength(20)]
    public string PhoneNo { get; set; } = string.Empty;
    [MaxLength(255)]
    public string Address { get; set; } = string.Empty;
    [MaxLength(100)]
    public string? Email { get; set; }
    [MaxLength(512)]
    public string Allergies { get; set; } = String.Empty;

    public virtual List<Appointment>? Appointments { get; set; }
    public virtual List<Diagnose>? Diagnoses { get; set; }
    public virtual List<Prescription>? Prescriptions { get; set; }
    public virtual List<LabTest>? Tests { get; set; }
}

public enum Gender { Male, Female }