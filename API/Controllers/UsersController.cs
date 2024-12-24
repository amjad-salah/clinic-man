using API.Services.Users;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using Models.DTOs.Users;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin")]
public class UsersController(
    IUsersService service,
    IValidator<LoginRequestDto> loginValidator,
    IValidator<AddUserDto> addValidator,
    IValidator<UpdateUserDto> updateValidator) : ControllerBase
{
    //Login User
    //POST /api/users/login
    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<ActionResult<LoginResponseDto>> Login(LoginRequestDto loginRequest)
    {
        try
        {
            var validation = await loginValidator.ValidateAsync(loginRequest);

            if (!validation.IsValid)
            {
                var error = string.Join(", ", validation.Errors.Select(error =>
                    error.ErrorMessage));

                return BadRequest(new LoginResponseDto { Success = false, Error = error });
            }

            var response = await service.Login(loginRequest.Email, loginRequest.Password);

            if (!response.Success)
                return Unauthorized(response);

            return Ok(response);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return Problem("Internal server error, try again later", statusCode: 500);
        }
    }

    //Add new user
    //POST /api/users
    [HttpPost("")]
    public async Task<ActionResult<UsersResponseDto>> AddUser(AddUserDto addUserDto)
    {
        try
        {
            var validation = await addValidator.ValidateAsync(addUserDto);

            if (!validation.IsValid)
            {
                var error = string.Join(", ", validation.Errors.Select(e => e.ErrorMessage));

                return BadRequest(new UsersResponseDto { Success = false, Error = error });
            }

            var response = await service.AddUser(addUserDto);

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

    //Get all users
    //GET /api/users
    [HttpGet("")]
    public async Task<ActionResult<UsersResponseDto>> GetAllUsers()
    {
        try
        {
            var response = await service.GetUsers();

            return Ok(response);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return Problem("Internal server error, try again later", statusCode: 500);
        }
    }

    //Get user by id
    //GET /api/users/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<UsersResponseDto>> GetUserById(int id)
    {
        try
        {
            var response = await service.GetUserById(id);

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

    //Update user by id
    //PUT /api/users/{id}
    [HttpPut("{id}")]
    public async Task<ActionResult<UsersResponseDto>> UpdateUser(int id, UpdateUserDto updateUserDto)
    {
        try
        {
            var validation = await updateValidator.ValidateAsync(updateUserDto);

            if (!validation.IsValid)
            {
                var error = string.Join(", ", validation.Errors.Select(e => e.ErrorMessage));

                return BadRequest(new UsersResponseDto { Success = false, Error = error });
            }

            var response = await service.UpdateUser(id, updateUserDto);

            if (response.Success) return Ok(response);

            if (response.Error == "User not found")
                return NotFound(response);

            return Conflict(response);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return Problem("Internal server error, try again later", statusCode: 500);
        }
    }

    //Delete user by id
    //DELETE /api/users/{id}
    [HttpDelete("{id}")]
    public async Task<ActionResult<UsersResponseDto>> DeleteUser(int id)
    {
        try
        {
            var response = await service.DeleteUser(id);

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