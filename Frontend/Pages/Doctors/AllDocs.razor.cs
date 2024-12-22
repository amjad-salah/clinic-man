using Frontend.Services.Doctors;
using Microsoft.AspNetCore.Components;
using Models.DTOs.Doctors;

namespace Frontend.Pages.Doctors;

public partial class AllDocs : ComponentBase
{
    private string _errorMessage = string.Empty;
    private List<DoctorDto> Doctors { get; set; } = [];
    
    [Inject]
    private IDoctorsService _doctorsService { get; set; }

    protected override async Task OnInitializedAsync()
    {
        var result = await _doctorsService.GetDoctors();

        if (!result!.Success)
        {
            _errorMessage = result.Error!;
        }
        else
        {
            Doctors = result.Doctors!;
        }
    }

    private Task EditDoctor(int doctorId)
    {
        throw new NotImplementedException();
    }

    private async Task DeleteDoctor(int doctorId)
    {
        var result = await _doctorsService.DeleteDoctor(doctorId);

        if (!result.Success)
        {
            _errorMessage = result.Error!;
        }
        else
        {
            Doctors = Doctors.Where(d => d.Id != doctorId).ToList();
        }
    }
}