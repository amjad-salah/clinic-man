using API.Services.Patients;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using Models.DTOs.Patients;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class PatientsController(
    IPatientsService service,
    IValidator<UpsertPatientDto> validator) : ControllerBase
{
    //Add new patient
    //POST /api/patients
    [HttpPost("")]
    public async Task<ActionResult<GeneralResponse>> AddPatient(UpsertPatientDto request)
    {
        try
        {
            var validation = await validator.ValidateAsync(request);

            if (!validation.IsValid)
            {
                var error = string.Join(",", validation.Errors.Select(x => x.ErrorMessage));

                return BadRequest(new GeneralResponse { Success = false, Error = error });
            }

            var response = await service.CreatePatient(request);

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

    //Get all patients
    //GET /api/patients
    [HttpGet("")]
    public async Task<ActionResult<GeneralResponse>> GetAllPatients()
    {
        try
        {
            var response = await service.GetPatients();

            return Ok(response);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return Problem("Internal server error, try again later", statusCode: 500);
        }
    }

    //Get patient by id
    //GET /api/patients/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<GeneralResponse>> GetPatientById(int id)
    {
        try
        {
            var response = await service.GetPatientById(id);

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

    //Update patient by id
    //PUT /api/patients
    [HttpPut("{id}")]
    [Authorize(Roles = "Admin, Manager, Doctor, Nurse")]
    public async Task<ActionResult<GeneralResponse>> UpdatePatient(int id, UpsertPatientDto request)
    {
        try
        {
            var validation = await validator.ValidateAsync(request);

            if (!validation.IsValid)
            {
                var error = string.Join(",", validation.Errors.Select(x => x.ErrorMessage));
                return BadRequest(new GeneralResponse { Success = false, Error = error });
            }

            var response = await service.UpdatePatient(id, request);

            if (!response.Success)
            {
                if (response.Error == "Patient not found")
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

    //Delete patient by id
    //DELETE /api/patients/{id}
    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin, Manager, Doctor, Nurse")]
    public async Task<ActionResult<GeneralResponse>> DeletePatient(int id)
    {
        try
        {
            var response = await service.DeletePatient(id);

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