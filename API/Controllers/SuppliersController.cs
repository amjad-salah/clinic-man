using API.Services.Suppliers;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using Models.DTOs.Suppliers;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Support")]
public class SuppliersController(
    ISuppliersService service,
    IValidator<UpsertSupplierDto> validator) : ControllerBase
{
    //Add new supplier
    //POST /api/suppliers
    [HttpPost("")]
    public async Task<ActionResult<GeneralResponse>> AddSupplier(UpsertSupplierDto supplier)
    {
        try
        {
            var validation = await validator.ValidateAsync(supplier);

            if (!validation.IsValid)
            {
                var error = string.Join(",", validation.Errors.Select(x => x.ErrorMessage));

                return BadRequest(new GeneralResponse { Success = false, Error = error });
            }

            var response = await service.AddSupplier(supplier);

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

    //Get all suppliers
    //GET /api/suppliers
    [HttpGet("")]
    public async Task<ActionResult<GeneralResponse>> GetSuppliers()
    {
        try
        {
            var response = await service.GetSuppliers();

            return Ok(response);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return Problem("Internal server error, try again later", statusCode: 500);
        }
    }

    //Get supplier by id
    //GET /api/suppliers/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<GeneralResponse>> GetSupplier(int id)
    {
        try
        {
            var response = await service.GetSupplierById(id);

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

    //Update supplier by id
    //PUT /api/suppliers/{id}
    [HttpPut("{id}")]
    public async Task<ActionResult<GeneralResponse>> UpdateSupplier(int id, UpsertSupplierDto supplier)
    {
        try
        {
            var validation = await validator.ValidateAsync(supplier);

            if (!validation.IsValid)
            {
                var error = string.Join(",", validation.Errors.Select(x => x.ErrorMessage));
                return BadRequest(new GeneralResponse { Success = false, Error = error });
            }

            var response = await service.UpdateSupplier(id, supplier);

            if (!response.Success)
            {
                if (response.Error == "Supplier not found")
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

    //Delete supplier by id
    //DELETE /api/suppliers/{id}
    [HttpDelete("{id}")]
    public async Task<ActionResult<GeneralResponse>> DeleteSupplier(int id)
    {
        try
        {
            var response = await service.DeleteSupplier(id);

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