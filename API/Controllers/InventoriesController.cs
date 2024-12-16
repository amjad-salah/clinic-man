using API.Services.Inventories;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using Models.DTOs.Inventories;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Support")]
public class InventoriesController(
    IInventoriesService service,
    IValidator<UpsertInventoryDto> validator) : ControllerBase
{
    //Add new inventory
    //POST /api/inventories
    [HttpPost("")]
    public async Task<ActionResult<GeneralResponse>> AddInventory(UpsertInventoryDto inventory)
    {
        try
        {
            var validation = await validator.ValidateAsync(inventory);

            if (!validation.IsValid)
            {
                var error = string.Join(",", validation.Errors.Select(x => x.ErrorMessage));

                return BadRequest(new GeneralResponse { Success = false, Error = error });
            }

            var response = await service.AddInventory(inventory);

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

    //Get all inventories
    //GET /api/inventories
    [HttpGet("")]
    public async Task<ActionResult<GeneralResponse>> GetInventories()
    {
        try
        {
            var response = await service.GetInventories();

            return Ok(response);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return Problem("Internal server error, try again later", statusCode: 500);
        }
    }

    //Get inventory by id
    //GET /api/inventories/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<GeneralResponse>> GetInventory(int id)
    {
        try
        {
            var response = await service.GetInventoriesById(id);

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

    //Update inventory by id
    //PUT /api/inventories/{id}
    [HttpPut("{id}")]
    public async Task<ActionResult<GeneralResponse>> UpdateInventory(int id, UpsertInventoryDto inventory)
    {
        try
        {
            var validation = await validator.ValidateAsync(inventory);

            if (!validation.IsValid)
            {
                var error = string.Join(",", validation.Errors.Select(x => x.ErrorMessage));

                return BadRequest(new GeneralResponse { Success = false, Error = error });
            }

            var response = await service.UpdateInventory(id, inventory);

            if (!response.Success)
            {
                if (response.Error == "Item not found")
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

    //Delete inventory by id
    //DELETE /api/inventories/{id}
    [HttpDelete("{id}")]
    public async Task<ActionResult<GeneralResponse>> DeleteInventory(int id)
    {
        try
        {
            var response = await service.DeleteInventory(id);

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