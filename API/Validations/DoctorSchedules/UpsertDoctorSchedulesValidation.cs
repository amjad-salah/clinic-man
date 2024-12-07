using FluentValidation;
using Models.DTOs.DoctorSchedules;

namespace API.Validations.DoctorSchedules;

public class UpsertDoctorSchedulesValidation : AbstractValidator<UpsertDoctorScheduleDto>
{
    public UpsertDoctorSchedulesValidation()
    {
        RuleFor(s => s.DoctorId).NotEmpty().GreaterThan(0).WithMessage("Doctor is required.");
        RuleFor(s => s.Day).IsInEnum().WithMessage("Day is invalid.");
        RuleFor(s => s.StartTime).NotEmpty().WithMessage("Start time is required.");
        RuleFor(s => s.EndTime).NotEmpty().WithMessage("End time is required.");
    }
}