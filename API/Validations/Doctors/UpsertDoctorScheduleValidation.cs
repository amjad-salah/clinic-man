using FluentValidation;
using Models.DTOs.DoctorSchedules;

namespace API.Validations.Doctors;

public class UpsertDoctorScheduleValidation : AbstractValidator<UpsertDoctorScheduleDto>
{
    public UpsertDoctorScheduleValidation()
    {
        RuleFor(s => s.DoctorId).NotEmpty().GreaterThan(0).WithMessage("Doctor is required");
        RuleFor(s => s.StartTime).NotEmpty().WithMessage("Start time is required");
        RuleFor(s => s.EndTime).NotEmpty().WithMessage("End time is required");
        RuleFor(s => s.Day).IsInEnum().WithMessage("Day is required");
    }
}