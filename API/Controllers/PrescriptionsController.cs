using API.Services.Prescriptions;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using Models.DTOs.Prescriptions;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PrescriptionsController(
    IPrescriptionsService service,
    IValidator<UpsertPrescriptionDto> validator) : ControllerBase
{
    //Add new prescription
    //POST /api/prescriptions
    [HttpPost("")]
    [Authorize(Roles = "Doctor")]
    public async Task<ActionResult<PrescriptionResponseDto>> AddPrescription(UpsertPrescriptionDto prescriptionDto)
    {
        try
        {
            var validationResult = await validator.ValidateAsync(prescriptionDto);

            if (!validationResult.IsValid)
            {
                var error = string.Join(',', validationResult.Errors.Select(x => x.ErrorMessage));

                return BadRequest(new PrescriptionResponseDto { Success = false, Error = error });
            }

            var response = await service.AddPrescription(prescriptionDto);

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

    //Get all prescriptions
    //GET /api/prescriptions
    [HttpGet("")]
    public async Task<ActionResult<PrescriptionResponseDto>> GetPrescriptions()
    {
        try
        {
            var response = await service.GetPrescriptions();
            return Ok(response);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return Problem("Internal server error, try again later", statusCode: 500);
        }
    }

    //Get prescription by id
    //GET /api/prescriptions/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<PrescriptionResponseDto>> GetPrescription(int id)
    {
        try
        {
            var response = await service.GetPrescription(id);

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

    //Update prescription by id
    //PUT /api/prescriptions/{id}
    [HttpPut("{id}")]
    [Authorize(Roles = "Doctor")]
    public async Task<ActionResult<PrescriptionResponseDto>> UpdatePrescription(int id,
        UpsertPrescriptionDto prescriptionDto)
    {
        try
        {
            var validationResult = await validator.ValidateAsync(prescriptionDto);

            if (!validationResult.IsValid)
            {
                var error = string.Join(", ", validationResult.Errors.Select(x => x.ErrorMessage));
                return BadRequest(new PrescriptionResponseDto { Success = false, Error = error });
            }

            var response = await service.UpdatePrescription(id, prescriptionDto);

            if (!response.Success)
            {
                if (response.Error == "Prescription not found")
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

    //Delete prescription by id
    //DELETE /api/prescriptions/{id}
    [HttpDelete("{id}")]
    [Authorize(Roles = "Doctor")]
    public async Task<ActionResult<PrescriptionResponseDto>> DeletePrescription(int id)
    {
        try
        {
            var response = await service.DeletePrescription(id);

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