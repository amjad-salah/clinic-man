using System.ComponentModel.DataAnnotations;

namespace Models.Entities;

public class Supplier : BaseEntity
{
    [MaxLength(255)] public string Name { get; set; } = string.Empty;

    [MaxLength(255)] public string ContactInfo { get; set; } = string.Empty;

    public string Address { get; set; } = string.Empty;
}