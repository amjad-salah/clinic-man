using Microsoft.EntityFrameworkCore;
using Models.Entities;

namespace API.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public override int SaveChanges(bool acceptAllChangesOnSuccess)
    {
        var entries = ChangeTracker.Entries<BaseEntity>()
            .Where(e => 
            e.State == EntityState.Added || e.State == EntityState.Modified);

        foreach (var entry in entries)
        {
            if (entry.State == EntityState.Added)
            {
                ((BaseEntity)entry.Entity).CreatedAt = DateTime.Now;
                ((BaseEntity)entry.Entity).UpdatedAt = DateTime.Now;
            }
            else if (entry.State == EntityState.Modified)
            {
                ((BaseEntity)entry.Entity).UpdatedAt = DateTime.Now;
            }
        }
        
        return base.SaveChanges(acceptAllChangesOnSuccess);
    }

    public override async Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = new CancellationToken())
    {
        var entries = ChangeTracker.Entries<BaseEntity>()
            .Where(e => 
                e.State == EntityState.Added || e.State == EntityState.Modified);

        foreach (var entry in entries)
        {
            if (entry.State == EntityState.Added)
            {
                ((BaseEntity)entry.Entity).CreatedAt = DateTime.Now;
                ((BaseEntity)entry.Entity).UpdatedAt = DateTime.Now;
            }
            else if (entry.State == EntityState.Modified)
            {
                ((BaseEntity)entry.Entity).UpdatedAt = DateTime.Now;
            }
        }
        
        return await base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Doctor> Doctors { get; set; }
    public DbSet<DoctorSchedule> DoctorSchedules { get; set; }
}