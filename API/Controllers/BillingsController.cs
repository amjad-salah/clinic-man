using API.Services.Billings;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using Models.DTOs.BillingItems;
using Models.DTOs.Billings;
using Models.DTOs.Payments;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class BillingsController(IBillingsService service,
    IValidator<UpsertBillingDto> validator,
    IValidator<UpsertBillingItemDto> itemValidator,
    IValidator<UpsertPaymentDto> paymentValidator) : ControllerBase
{
    //Add new billing
    //POST /api/billings
    [HttpPost("")]
    public async Task<ActionResult<GeneralResponse>> AddBilling(UpsertBillingDto billing)
    {
        try
        {
            var validation = await validator.ValidateAsync(billing);

            if (!validation.IsValid)
            {
                var error = string.Join(',', validation.Errors.Select(error => error.ErrorMessage));
                
                return BadRequest(new GeneralResponse() {Success = false, Error = error});
            }
            
            var response = await service.AddBilling(billing);
            
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
    
    //Get all billings
    //GET /api/billings
    [HttpGet("")]
    public async Task<ActionResult<GeneralResponse>> GetBillings()
    {
        try
        {
            var response = await service.GetBillings();
            
            return Ok(response);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return Problem("Internal server error, try again later", statusCode: 500);
        }
    }
    
    //Get billing by id
    //GET /api/billings/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<GeneralResponse>> GetBilling(int id)
    {
        try
        {
            var response = await service.GetBillingById(id);
            
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
    
    //Update billing by id
    //PUT /api/billings/{id}
    [HttpPut("{id}")]
    public async Task<ActionResult<GeneralResponse>> UpdateBilling(int id, UpsertBillingDto billing)
    {
        try
        {
            var validation = await validator.ValidateAsync(billing);

            if (!validation.IsValid)
            {
                var error = string.Join(',', validation.Errors.Select(error => error.ErrorMessage));
                return BadRequest(new GeneralResponse() {Success = false, Error = error});
            }
            
            var response = await service.UpdateBilling(id, billing);

            if (!response.Success)
            {
                if (response.Error == "Billing not found")
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
    
    //Delete billing by id
    //DELETE /api/billings/{id}
    [HttpDelete("{id}")]
    public async Task<ActionResult<GeneralResponse>> DeleteBilling(int id)
    {
        try
        {
            var response = await service.DeleteBilling(id);
            
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
    
    //Add item to billing
    //POST /api/billings/{id}/items
    [HttpPost("{id}/items")]
    public async Task<ActionResult<GeneralResponse>> AddBillingItem(int id, UpsertBillingItemDto item)
    {
        try
        {
            var validation = await itemValidator.ValidateAsync(item);

            if (!validation.IsValid)
            {
                var error = string.Join(',', validation.Errors.Select(error => error.ErrorMessage));
                return BadRequest(new GeneralResponse() {Success = false, Error = error});
            }
            
            var response = await service.AddBillingItem(id, item);
            
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
    
    //Delete item from billing
    //Delete /api/billings/{id}/items/{itemId}
    [HttpDelete("{id}/items/{itemId}")]
    public async Task<ActionResult<GeneralResponse>> DeleteBillingItem(int id, int itemId)
    {
        try
        {
            var response = await service.DeleteItem(itemId);
            
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
    
    //Add payment to billing
    //POST /api/billings/{id}/payments
    [HttpPost("{id}/payments")]
    public async Task<ActionResult<GeneralResponse>> AddBillingPayment(int id, UpsertPaymentDto payment)
    {
        try
        {
            var validation = await paymentValidator.ValidateAsync(payment);

            if (!validation.IsValid)
            {
                var error = string.Join(',', validation.Errors.Select(error => error.ErrorMessage));
                return BadRequest(new GeneralResponse() {Success = false, Error = error});
            }
            
            var response = await service.AddBillingPayment(id, payment);
            
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
    
    //Delete payment from billing
    //DELETE /api/billings/{id}/payments/{paymentId}
    [HttpDelete("{id}/payments/{paymentId}")]
    public async Task<ActionResult<GeneralResponse>> DeleteBillingPayment(int id, int paymentId)
    {
        try
        {
            var response = await service.DeletePayment(paymentId);
            
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