using API.Services.Diagnoses;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using Models.DTOs.Diagnoses;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class DiagnosesController(
    IDiagnosesService service,
    IValidator<UpsertDiagnoseDto> validator) : ControllerBase
{
    //Add new diagnose
    //POST /api/diagnoses
    [HttpPost("")]
    [Authorize(Roles = "Doctor")]
    public async Task<ActionResult<GeneralResponse>> AddDiagnose(UpsertDiagnoseDto diagnoseDto)
    {
        try
        {
            var validation = await validator.ValidateAsync(diagnoseDto);

            if (!validation.IsValid)
            {
                var error = string.Join(",", validation.Errors.Select(x => x.ErrorMessage));

                return BadRequest(new GeneralResponse { Success = false, Error = error });
            }

            var response = await service.AddDiagnose(diagnoseDto);

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

    //Get All Diagnoses
    //GET /api/diagnoses
    [HttpGet("")]
    public async Task<ActionResult<GeneralResponse>> GetDiagnoses()
    {
        try
        {
            var response = await service.GetDiagnoses();

            return Ok(response);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return Problem("Internal server error, try again later", statusCode: 500);
        }
    }

    //Get diagnose by id
    //GET /api/diagnoses/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<GeneralResponse>> GetDiagnose(int id)
    {
        try
        {
            var response = await service.GetDiagnoseById(id);

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

    //Update diagnose by id
    //PUT /api/diagnoses/{id}
    [HttpPut("{id}")]
    [Authorize(Roles = "Doctor")]
    public async Task<ActionResult<GeneralResponse>> UpdateDiagnose(int id, UpsertDiagnoseDto diagnoseDto)
    {
        try
        {
            var validation = await validator.ValidateAsync(diagnoseDto);

            if (!validation.IsValid)
            {
                var error = string.Join(",", validation.Errors.Select(x => x.ErrorMessage));
                return BadRequest(new GeneralResponse { Success = false, Error = error });
            }

            var response = await service.UpdateDiagnose(id, diagnoseDto);

            if (!response.Success)
            {
                if (response.Error == "Diagnose not found")
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

    //Delete diagnose by id
    //DELETE /api/diagnoses/{id}
    [HttpDelete("{id}")]
    [Authorize(Roles = "Doctor")]
    public async Task<ActionResult<GeneralResponse>> DeleteDiagnose(int id)
    {
        try
        {
            var response = await service.DeleteDiagnose(id);

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