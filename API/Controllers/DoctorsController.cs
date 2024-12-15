using API.Services.Doctors;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using Models.DTOs.Doctors;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class DoctorsController(
    IDoctorService service,
    IValidator<UpsertDoctorDto> validator) : ControllerBase
{
    [HttpPost("")]
    [Authorize(Roles = "Admin, Manager")]
    public async Task<ActionResult<GeneralResponse>> AddDoctor(UpsertDoctorDto doctor)
    {
        try
        {
            var validation = await validator.ValidateAsync(doctor);

            if (!validation.IsValid)
            {
                var error = string.Join(",", validation.Errors.Select(x => x.ErrorMessage));

                return BadRequest(new GeneralResponse { Success = false, Error = error });
            }

            var response = await service.AddDoctor(doctor);

            if (!response.Success) return BadRequest(response);

            return Ok(response);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return Problem("Internal server error, try again later", statusCode: 500);
        }
    }

    [HttpGet("")]
    public async Task<ActionResult<GeneralResponse>> GetDoctors()
    {
        try
        {
            var response = await service.GetDoctors();

            return Ok(response);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return Problem("Internal server error, try again later", statusCode: 500);
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<GeneralResponse>> GetDoctor(int id)
    {
        try
        {
            var response = await service.GetDoctorById(id);

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

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin, Manager")]
    public async Task<ActionResult<GeneralResponse>> UpdateDoctor(int id, UpsertDoctorDto doctor)
    {
        try
        {
            var validation = await validator.ValidateAsync(doctor);

            if (!validation.IsValid)
            {
                var error = string.Join(",", validation.Errors.Select(x => x.ErrorMessage));
                return BadRequest(new GeneralResponse { Success = false, Error = error });
            }

            var response = await service.UpdateDoctor(id, doctor);

            if (response.Success) return Ok(response);

            if (response.Error == "Doctor not found")
                return NotFound(response);

            return BadRequest(response);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return Problem("Internal server error, try again later", statusCode: 500);
        }
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin, Manager")]
    public async Task<ActionResult<GeneralResponse>> DeleteDoctor(int id)
    {
        try
        {
            var response = await service.DeleteDoctor(id);

            if (response.Success) return Ok(response);

            return NotFound(response);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return Problem("Internal server error, try again later", statusCode: 500);
        }
    }
}