namespace Models;

public class GeneralResponse
{
    public bool Success { get; set; }
    public string? Error { get; set; }
    public object? Data { get; set; }
}