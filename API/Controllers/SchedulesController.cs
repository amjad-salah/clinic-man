using System.ComponentModel.DataAnnotations;
using API.Services.DoctorSchedules;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using Models.DTOs.DoctorSchedules;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin, Manager")]
public class SchedulesController(IDoctorSchedulesService service,
    IValidator<UpsertDoctorScheduleDto> validator) : ControllerBase
{
    //Add new schedule
    //POST /api/schedules
    [HttpPost]
    public async Task<ActionResult<DoctorScheduleDto>> AddSchedule(UpsertDoctorScheduleDto scheduleDto)
    {
        try
        {
            var validate = await validator.ValidateAsync(scheduleDto);

            if (!validate.IsValid)
            {
                var error = string.Join(',', validate.Errors.Select(x => x.ErrorMessage));
                
                return BadRequest(new GeneralResponse() { Success = false, Error = error });
            }
            
            var response = await service.AddSchedule(scheduleDto);
            
            return Ok(response);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return Problem("Internal server error, try again later", statusCode: 500);
        }
    }
    
    //Get all schedules
    //GET /api/schedules
    [HttpGet("")]
    public async Task<ActionResult<DoctorScheduleDto>> GetSchedules()
    {
        try
        {
            var response = await service.GetSchedules();
            
            return Ok(response);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return Problem("Internal server error, try again later", statusCode: 500);
        }
    }
    
    //Get schedule by id
    //GET /api/schedules/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<DoctorScheduleDto>> GetSchedule(int id)
    {
        try
        {
            var response = await service.GetScheduleById(id);
            
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
    
    //Update schedule by id
    //PUT /api/schedules/{id}
    [HttpPut("{id}")]
    public async Task<ActionResult<GeneralResponse>> UpdateSchedule(int id, UpsertDoctorScheduleDto scheduleDto)
    {
        try
        {
            var validate = await validator.ValidateAsync(scheduleDto);

            if (!validate.IsValid)
            {
                var error = string.Join(',', validate.Errors.Select(x => x.ErrorMessage));
                return BadRequest(new GeneralResponse() { Success = false, Error = error });
            }
            
            var response = await service.UpdateSchedule(id, scheduleDto);
            
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
    
    //Delete schedule by id
    //DELETE /api/schedules/{id}
    [HttpDelete("{id}")]
    public async Task<ActionResult<GeneralResponse>> DeleteSchedule(int id)
    {
        try
        {
            var response = await service.DeleteSchedule(id);
            
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