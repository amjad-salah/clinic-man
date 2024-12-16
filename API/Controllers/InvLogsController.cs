using API.Services.InventoryLogs;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using Models.DTOs.InventoryLogs;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Support")]
public class InvLogsController(
    IInventoryLogsService service,
    IValidator<UpsertInventoryLogDto> validator) : ControllerBase
{
    //Add new log
    //POST /api/invlogs
    [HttpPost("")]
    public async Task<ActionResult<GeneralResponse>> AddLog(UpsertInventoryLogDto log)
    {
        try
        {
            var validation = await validator.ValidateAsync(log);

            if (!validation.IsValid)
            {
                var error = string.Join(",", validation.Errors.Select(x => x.ErrorMessage));

                return BadRequest(error);
            }

            var response = await service.AddInventoryLog(log);

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

    //Get all logs
    //GET /api/invlogs
    [HttpGet("")]
    public async Task<ActionResult<GeneralResponse>> GetLogs()
    {
        try
        {
            var response = await service.GetInventoryLogs();

            return Ok(response);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return Problem("Internal server error, try again later", statusCode: 500);
        }
    }

    //Get log by id
    //GET /api/invlogs/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<GeneralResponse>> GetLog(int id)
    {
        try
        {
            var response = await service.GetInventoryLogsById(id);

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

    //Update log by id
    //PUT /api/invlogs/{id}
    [HttpPut("{id}")]
    public async Task<ActionResult<GeneralResponse>> UpdateLog(int id, UpsertInventoryLogDto log)
    {
        try
        {
            var validation = await validator.ValidateAsync(log);

            if (!validation.IsValid)
            {
                var error = string.Join(",", validation.Errors.Select(x => x.ErrorMessage));

                return BadRequest(error);
            }

            var response = await service.UpdateInventoryLog(id, log);

            if (!response.Success)
            {
                if (response.Error == "Log not found")
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

    //Delete log by id
    //DELETE /api/invlogs/{id}
    [HttpDelete("{id}")]
    public async Task<ActionResult<GeneralResponse>> DeleteLog(int id)
    {
        try
        {
            var response = await service.DeleteInventoryLog(id);

            if (!response.Success)
            {
                if (response.Error == "Log not found")
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
}