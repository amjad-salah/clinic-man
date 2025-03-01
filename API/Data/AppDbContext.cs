using Microsoft.EntityFrameworkCore;
using Models.Entities;

namespace API.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<User> Users { get; set; }
    public DbSet<Doctor> Doctors { get; set; }
    public DbSet<DoctorSchedule> DoctorSchedules { get; set; }
    public DbSet<Patient> Patients { get; set; }
    public DbSet<Appointment> Appointments { get; set; }
    public DbSet<AppointmentType> AppointmentTypes { get; set; }
    public DbSet<Diagnose> Diagnoses { get; set; }
    public DbSet<Prescription> Prescriptions { get; set; }
    public DbSet<LabTest> LabTests { get; set; }
    public DbSet<Billing> Billings { get; set; }
    public DbSet<BillItem> BillItems { get; set; }
    public DbSet<Payment> Payments { get; set; }
    public DbSet<Supplier> Suppliers { get; set; }
    public DbSet<Inventory> Inventories { get; set; }
    public DbSet<InventoryLog> InventoryLogs { get; set; }

    public override int SaveChanges(bool acceptAllChangesOnSuccess)
    {
        var entries = ChangeTracker.Entries<BaseEntity>()
            .Where(e =>
                e.State == EntityState.Added || e.State == EntityState.Modified);

        foreach (var entry in entries)
            if (entry.State == EntityState.Added)
            {
                ((BaseEntity)entry.Entity).CreatedAt = DateTime.Now;
                ((BaseEntity)entry.Entity).UpdatedAt = DateTime.Now;
            }
            else if (entry.State == EntityState.Modified)
            {
                ((BaseEntity)entry.Entity).UpdatedAt = DateTime.Now;
            }

        return base.SaveChanges(acceptAllChangesOnSuccess);
    }

    public override async Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess,
        CancellationToken cancellationToken = new())
    {
        var entries = ChangeTracker.Entries<BaseEntity>()
            .Where(e =>
                e.State == EntityState.Added || e.State == EntityState.Modified);

        foreach (var entry in entries)
            if (entry.State == EntityState.Added)
            {
                ((BaseEntity)entry.Entity).CreatedAt = DateTime.UtcNow;
                ((BaseEntity)entry.Entity).UpdatedAt = DateTime.UtcNow;
            }
            else if (entry.State == EntityState.Modified)
            {
                ((BaseEntity)entry.Entity).UpdatedAt = DateTime.UtcNow;
            }

        return await base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
    }
}