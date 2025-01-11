using System.Text;
using API.Data;
using API.Services.Appointments;
using API.Services.AppointmentTypes;
using API.Services.Billings;
using API.Services.Diagnoses;
using API.Services.Doctors;
using API.Services.DoctorSchedules;
using API.Services.Inventories;
using API.Services.InventoryLogs;
using API.Services.LabTests;
using API.Services.Patients;
using API.Services.Prescriptions;
using API.Services.Suppliers;
using API.Services.Users;
using API.Validations.Appointments;
using API.Validations.AppointmentTypes;
using API.Validations.BillingItems;
using API.Validations.Billings;
using API.Validations.Diagnoses;
using API.Validations.Doctors;
using API.Validations.Inventories;
using API.Validations.InventoryLogs;
using API.Validations.LabTests;
using API.Validations.Patients;
using API.Validations.Payments;
using API.Validations.Prescriptions;
using API.Validations.Suppliers;
using API.Validations.Users;
using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Models.DTOs.Appointments;
using Models.DTOs.AppointmentTypes;
using Models.DTOs.BillingItems;
using Models.DTOs.Billings;
using Models.DTOs.Diagnoses;
using Models.DTOs.Doctors;
using Models.DTOs.DoctorSchedules;
using Models.DTOs.Inventories;
using Models.DTOs.InventoryLogs;
using Models.DTOs.LabTests;
using Models.DTOs.Patients;
using Models.DTOs.Payments;
using Models.DTOs.Prescriptions;
using Models.DTOs.Suppliers;
using Models.DTOs.Users;
using Models.Entities;
using Newtonsoft.Json;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().AddNewtonsoftJson(
    options => options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore);
builder.Services.AddOpenApi();

//DbContext
builder.Services.AddDbContext<AppDbContext>(o =>
{
    o.UseNpgsql(builder.Configuration.GetConnectionString("Default"));
});
//Authentication
builder.Services.AddAuthentication(o =>
{
    o.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    o.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(cfg =>
{
    cfg.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Issuer"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
    };
});

//Services
builder.Services.AddScoped<IUsersService, UsersService>();
builder.Services.AddScoped<IDoctorService, DoctorService>();
builder.Services.AddScoped<IDoctorSchedulesService, DoctorSchedulesService>();
builder.Services.AddScoped<IPatientsService, PatientsService>();
builder.Services.AddScoped<IAppointmentsService, AppointmentsService>();
builder.Services.AddScoped<IAppointmentTypesService, AppointmentTypesService>();
builder.Services.AddScoped<IDiagnosesService, DiagnosesService>();
builder.Services.AddScoped<IPrescriptionsService, PrescriptionsService>();
builder.Services.AddScoped<ILabTestsService, LabTestsService>();
builder.Services.AddScoped<IBillingsService, BillingsService>();
builder.Services.AddScoped<IInventoriesService, InventoriesService>();
builder.Services.AddScoped<ISuppliersService, SuppliersService>();
builder.Services.AddScoped<IInventoryLogsService, InventoryLogsService>();

//Validations
builder.Services.AddScoped<IValidator<LoginRequestDto>, UserLoginValidation>();
builder.Services.AddScoped<IValidator<AddUserDto>, AddUserValidation>();
builder.Services.AddScoped<IValidator<UpdateUserDto>, UpdateUserValidation>();
builder.Services.AddScoped<IValidator<UpsertDoctorDto>, UpsertDoctorValidation>();
builder.Services.AddScoped<IValidator<UpsertDoctorScheduleDto>, UpsertDoctorScheduleValidation>();
builder.Services.AddScoped<IValidator<UpsertPatientDto>, UpsertPatientValidation>();
builder.Services.AddScoped<IValidator<UpsertAppointmentDto>, UpsertAppointmentValidation>();
builder.Services.AddScoped<IValidator<UpsertDiagnoseDto>, UpsertDiagnoseValidation>();
builder.Services.AddScoped<IValidator<UpsertPrescriptionDto>, UpsertPrescriptionValidation>();
builder.Services.AddScoped<IValidator<UpsertLabTestDto>, UpsertLabTestValidation>();
builder.Services.AddScoped<IValidator<UpsertBillingDto>, UpsertBillingValidation>();
builder.Services.AddScoped<IValidator<UpsertBillingItemDto>, UpsertBillingItemValidation>();
builder.Services.AddScoped<IValidator<UpsertPaymentDto>, UpsertPaymentValidation>();
builder.Services.AddScoped<IValidator<UpsertInventoryDto>, UpsertInventoryValidation>();
builder.Services.AddScoped<IValidator<AddInventoryDto>, AddInventoryValidation>();
builder.Services.AddScoped<IValidator<UseInventoryDto>, UseInventoryValidation>();
builder.Services.AddScoped<IValidator<UpsertSupplierDto>, UpsertSupplierValidation>();
builder.Services.AddScoped<IValidator<UpsertAppointmentTypeDto>, UpsertAppointmentTypeValidation>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()) app.MapOpenApi();

app.UseCors(p => p.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

using (var serviceScope = app.Services.CreateScope())
{
    var context = serviceScope.ServiceProvider.GetRequiredService<AppDbContext>();

    var adminExists = context.Users.Any(u => u.Role == UserRole.Admin);

    if (!adminExists)
    {
        await context.Users.AddAsync(new User
        {
            Email = "admin@admin.com",
            FullName = "Admin User",
            Role = UserRole.Admin,
            Password = BCrypt.Net.BCrypt.HashPassword("admin123")
        });

        await context.SaveChangesAsync();
    }
}

app.Run();