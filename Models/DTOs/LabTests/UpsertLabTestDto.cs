using Models.DTOs.Patients;
using Models.Entities;

namespace Models.DTOs.LabTests;

public class UpsertLabTestDto
{
    public string TestName { get; set; }
    public string? Description { get; set; }
    public string Result { get; set; }
    public TestStatus Status { get; set; }
    public int PatientId { get; set; }
    public PatientDto? Patient { get; set; }
}