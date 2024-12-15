using API.Services.Appointments;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using Models.DTOs.Appointments;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class AppointmentsController(
    IAppointmentsService service,
    IValidator<UpsertAppointmentDto> validator) : ControllerBase
{
    //Add new appointment
    //POST /api/appointments
    [HttpPost("")]
    public async Task<ActionResult<GeneralResponse>> AddAppointment(UpsertAppointmentDto appointmentDto)
    {
        try
        {
            var validationResult = await validator.ValidateAsync(appointmentDto);

            if (!validationResult.IsValid)
            {
                var error = string.Join(',', validationResult.Errors.Select(x => x.ErrorMessage));

                return BadRequest(new GeneralResponse { Success = false, Error = error });
            }

            var response = await service.AddAppointment(appointmentDto);

            if (!response.Success)
                return BadRequest(response);

            return Ok(response);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return Problem("Internal server error, try again later", statusCode: 500);
        }
    }

    //Get all appointments
    //GET /api/appointments
    [HttpGet("")]
    public async Task<ActionResult<GeneralResponse>> GetAppointments()
    {
        try
        {
            var response = await service.GetAllAppointments();

            return Ok(response);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return Problem("Internal server error, try again later", statusCode: 500);
        }
    }

    //Get appointment by id
    //GET /api/appointments/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<GeneralResponse>> GetAppointment(int id)
    {
        try
        {
            var response = await service.GetAppointmentById(id);

            if (!response.Success)
                return NotFound(response);

            return Ok(response);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return Problem("Internal server error, try again later", statusCode: 500);
        }
    }

    //Update appointment by id
    //PUT /api/appointments/{id}
    [HttpPut("{id}")]
    public async Task<ActionResult<GeneralResponse>> UpdateAppointment(int id,
        UpsertAppointmentDto appointmentDto)
    {
        try
        {
            var validationResult = await validator.ValidateAsync(appointmentDto);

            if (!validationResult.IsValid)
            {
                var error = string.Join(',', validationResult.Errors.Select(x => x.ErrorMessage));
                return BadRequest(new GeneralResponse { Success = false, Error = error });
            }

            var response = await service.UpdateAppointment(id, appointmentDto);

            if (!response.Success)
            {
                if (response.Error == "Appointment not found")
                    return NotFound(response);
                return BadRequest(response);
            }

            return Ok(response);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return Problem("Internal server error, try again later", statusCode: 500);
        }
    }

    //Delete appointment by id
    //DELETE /api/appointments/{id}
    [HttpDelete("{id}")]
    public async Task<ActionResult<GeneralResponse>> DeleteAppointment(int id)
    {
        try
        {
            var response = await service.DeleteAppointment(id);

            if (!response.Success)
                return NotFound(response);

            return Ok(response);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return Problem("Internal server error, try again later", statusCode: 500);
        }
    }
}