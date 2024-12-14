using API.Services.LabTests;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using Models.DTOs.LabTests;
namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class LabTestsController(ILabTestsService service,
    IValidator<UpsertLabTestDto> validator) : ControllerBase
{
    //Add new Test
    //POST /api/labtests
    [HttpPost("")]
    public async Task<ActionResult<GeneralResponse>> AddTest(UpsertLabTestDto test)
    {
        try
        {
            var validation = await validator.ValidateAsync(test);

            if (!validation.IsValid)
            {
                var error = string.Join(",", validation.Errors.Select(x => x.ErrorMessage));
                
                return BadRequest(new GeneralResponse() {Success = false, Error = error});
            }

            var response = await service.CreateTest(test);
            
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
    
    //Get All Tests
    //GET /api/labtests
    [HttpGet("")]
    public async Task<ActionResult<GeneralResponse>> GetTests()
    {
        try
        {
            var response = await service.GetTests();
            
            return Ok(response);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return Problem("Internal server error, try again later", statusCode: 500);
        }
    }
    
    //Get test by id
    //GET /api/labtests/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<GeneralResponse>> GetTest(int id)
    {
        try
        {
            var response = await service.GetTestById(id);
            
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
    
    //Update test by id
    //PUT /api/labtests/{id}
    [HttpPut("{id}")]
    public async Task<ActionResult<GeneralResponse>> UpdateTest(int id, UpsertLabTestDto test)
    {
        try
        {
            var validation = await validator.ValidateAsync(test);

            if (!validation.IsValid)
            {
                var error = string.Join(",", validation.Errors.Select(x => x.ErrorMessage));
                return BadRequest(new GeneralResponse() {Success = false, Error = error});
            }
            
            var response = await service.UpdateTest(id, test);

            if (!response.Success)
            {
                if (response.Error == "Test not found")
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
    
    //Delete test by id
    //DELETE /api/labtests/{id}
    [HttpDelete("{id}")]
    public async Task<ActionResult<GeneralResponse>> DeleteTest(int id)
    {
        try
        {
            var response = await service.DeleteTest(id);
            
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