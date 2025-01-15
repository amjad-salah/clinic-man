using System.ComponentModel;
using System.Text.Json.Serialization;
using Models.DTOs.AppointmentTypes;
using Models.DTOs.Billings;
using Models.DTOs.Diagnoses;
using Models.DTOs.Doctors;
using Models.DTOs.LabTests;
using Models.DTOs.Patients;
using Models.DTOs.Prescriptions;
using Models.Entities;

namespace Models.DTOs.Appointments;

public class AppointmentDetailsDto
{
    public int Id { get; set; }
    public int PatientId { get; set; }
    public int DoctorId { get; set; }

    [JsonConverter(typeof(DateOnlyConverter))]
    public DateOnly Date { get; set; }

    [JsonConverter(typeof(TimeOnlyConverter))]
    public TimeOnly Time { get; set; }

    public int AppointmentTypeId { get; set; }
    public AppointmentStatus Status { get; set; }
    public AppointmentTypeDto? AppointmentType { get; set; }
    public PatientDto Patient { get; set; }
    public DoctorDto Doctor { get; set; }
    public List<DiagnoseDto>? Diagnoses { get; set; }
    public List<PrescriptionDto>? Prescriptions { get; set; }
    public List<UpsertLabTestDto>? Tests { get; set; }
    public List<BillingDto>? Billings { get; set; }
}