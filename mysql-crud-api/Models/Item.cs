namespace MyApi.Models;

public class Item
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public decimal Price { get; set; }
    public DateTime CreatedAt { get; set; }
}

// Used for POST/PUT bodies so callers can't set Id or CreatedAt directly.
public class ItemInput
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public decimal Price { get; set; }
}
