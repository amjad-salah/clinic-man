using API.Data;
using Mapster;
using Microsoft.EntityFrameworkCore;
using Models;
using Models.DTOs.LabTests;
using Models.Entities;

namespace API.Services.LabTests;

public class LabTestsService(AppDbContext context) : ILabTestsService
{
    public async Task<LabTestResponseDto> GetTests()
    {
        var tests = await context.LabTests.AsNoTracking()
            .Include(t => t.Appointment)
            .Include(t => t.Patient)
            .ProjectToType<LabTestDetailsDto>()
            .ToListAsync();

        return new LabTestResponseDto { Success = true, Tests = tests };
    }

    public async Task<LabTestResponseDto> GetTestById(int id)
    {
        var test = await context.LabTests.AsNoTracking()
            .Include(t => t.Appointment)
            .Include(t => t.Patient)
            .FirstOrDefaultAsync(x => x.Id == id);

        return test == null
            ? new LabTestResponseDto { Success = false, Error = "Test not found" }
            : new LabTestResponseDto { Success = true, Test = test.Adapt<LabTestDetailsDto>() };
    }

    public async Task<LabTestResponseDto> CreateTest(UpsertLabTestDto test)
    {
        var appointment = await context.Appointments.AsNoTracking()
            .FirstOrDefaultAsync(a => a.Id == test.AppointmentId);

        if (appointment == null)
            return new LabTestResponseDto { Success = false, Error = "Appointment not found" };

        var newTest = test.Adapt<LabTest>();
        newTest.PatientId = appointment.PatientId;

        context.LabTests.Add(newTest);
        await context.SaveChangesAsync();

        return new LabTestResponseDto { Success = true };
    }

    public async Task<LabTestResponseDto> UpdateTest(int id, UpsertLabTestDto test)
    {
        var existingTest = await context.LabTests.FindAsync(id);

        if (existingTest == null)
            return new LabTestResponseDto { Success = false, Error = "Test not found" };

        if (existingTest.AppointmentId != test.AppointmentId)
        {
            var appointment = await context.Appointments.AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == existingTest.AppointmentId);

            if (appointment == null)
                return new LabTestResponseDto { Success = false, Error = "Appointment not found" };

            existingTest.PatientId = appointment.PatientId;
            existingTest.AppointmentId = appointment.Id;
        }

        if (test.Status == TestStatus.Completed && string.IsNullOrEmpty(test.Result))
            return new LabTestResponseDto { Success = false, Error = "Result is empty" };

        existingTest.TestName = test.TestName;
        existingTest.Description = test.Description;
        existingTest.Result = test.Result;
        existingTest.Status = test.Status;

        await context.SaveChangesAsync();

        return new LabTestResponseDto { Success = true };
    }

    public async Task<LabTestResponseDto> DeleteTest(int id)
    {
        var existingTest = await context.LabTests.FindAsync(id);

        if (existingTest == null)
            return new LabTestResponseDto { Success = false, Error = "Test not found" };

        context.LabTests.Remove(existingTest);
        await context.SaveChangesAsync();

        return new LabTestResponseDto { Success = true };
    }
}