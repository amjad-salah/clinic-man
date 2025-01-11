using API.Services.Appointments;
using API.Services.AppointmentTypes;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using Models.DTOs.Appointments;
using Models.DTOs.AppointmentTypes;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class AppointmentsController(
    IAppointmentsService service,
    IAppointmentTypesService appointmentTypesService,
    IValidator<UpsertAppointmentDto> validator,
    IValidator<UpsertAppointmentTypeDto> typeValidator) : ControllerBase
{
    //Add new appointment
    //POST /api/appointments
    [HttpPost("")]
    public async Task<ActionResult<AppointmentResponseDto>> AddAppointment(UpsertAppointmentDto appointmentDto)
    {
        try
        {
            var validationResult = await validator.ValidateAsync(appointmentDto);

            if (!validationResult.IsValid)
            {
                var error = string.Join(',', validationResult.Errors.Select(x => x.ErrorMessage));

                return BadRequest(new AppointmentResponseDto { Success = false, Error = error });
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
    public async Task<ActionResult<AppointmentResponseDto>> GetAppointments()
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
    public async Task<ActionResult<AppointmentResponseDto>> GetAppointment(int id)
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
    public async Task<ActionResult<AppointmentResponseDto>> UpdateAppointment(int id,
        UpsertAppointmentDto appointmentDto)
    {
        try
        {
            var validationResult = await validator.ValidateAsync(appointmentDto);

            if (!validationResult.IsValid)
            {
                var error = string.Join(',', validationResult.Errors.Select(x => x.ErrorMessage));
                return BadRequest(new AppointmentResponseDto { Success = false, Error = error });
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
    public async Task<ActionResult<AppointmentResponseDto>> DeleteAppointment(int id)
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

    #region Types

    //Get All Types
    //GET /api/appointments/types
    [HttpGet("types")]
    public async Task<ActionResult<AppointmentTypeResponseDto>> GetAppointmentTypes()
    {
        try
        {
            var res = await appointmentTypesService.GetAllAppointmentTypes();
        
            return Ok(res);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return Problem("Internal server error, try again later", statusCode: 500);
        }
    }
    
    //Get type by id
    //GET /appointments/types/:id
    [HttpGet("types/{id}")]
    public async Task<ActionResult<AppointmentTypeResponseDto>> GetAppointmentTypeById(int id)
    {
        try
        {
            var res = await appointmentTypesService.GetAppointmentTypeById(id);
            
            if (!res.Success)
                return NotFound(res);
            
            return Ok(res);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return Problem("Internal server error, try again later", statusCode: 500);
        }
    }
    
    //Add type
    //POST /api/appointments/types
    [HttpPost("types")]
    public async Task<ActionResult<AppointmentTypeResponseDto>> AddType(UpsertAppointmentTypeDto appointmentTypeDto)
    {
        try
        {
            var validationResult = await typeValidator.ValidateAsync(appointmentTypeDto);

            if (!validationResult.IsValid)
            {
                var error = string.Join(',', validationResult.Errors.Select(x => x.ErrorMessage));
                return BadRequest(new AppointmentTypeResponseDto { Success = false, Error = error });
            }
            
            var res = await appointmentTypesService.AddAppointmentType(appointmentTypeDto);

            return Ok(res);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return Problem("Internal server error, try again later", statusCode: 500);
        }
    }
    
    //Delete type
    //DELETE /api/appointments/types/:id
    [HttpDelete("types/{id}")]
    public async Task<ActionResult<AppointmentTypeResponseDto>> DeleteType(int id)
    {
        try
        {
            var res = await appointmentTypesService.DeleteAppointmentType(id);
            
            if (!res.Success)
                return NotFound(res);
            
            return Ok(res);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return Problem("Internal server error, try again later", statusCode: 500);
        }
    }
    
    #endregion
}