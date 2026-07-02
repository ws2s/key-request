using System.Net;
using Dapper;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using MyApi.Data;
using MyApi.Models;

namespace MyApi.Functions;

public class ItemsFunctions
{
    private readonly DbConnectionFactory _dbFactory;
    private readonly ILogger<ItemsFunctions> _logger;

    public ItemsFunctions(DbConnectionFactory dbFactory, ILogger<ItemsFunctions> logger)
    {
        _dbFactory = dbFactory;
        _logger = logger;
    }

    // GET /api/items
    [Function("GetItems")]
    public async Task<HttpResponseData> GetItems(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "items")] HttpRequestData req)
    {
        using var conn = await _dbFactory.OpenConnectionAsync();
        var items = await conn.QueryAsync<Item>(
            "SELECT Id, Name, Description, Price, CreatedAt FROM Items ORDER BY Id DESC");

        return await JsonResponse(req, HttpStatusCode.OK, items);
    }

    // GET /api/items/{id}
    [Function("GetItemById")]
    public async Task<HttpResponseData> GetItemById(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "items/{id:int}")] HttpRequestData req,
        int id)
    {
        using var conn = await _dbFactory.OpenConnectionAsync();
        var item = await conn.QuerySingleOrDefaultAsync<Item>(
            "SELECT Id, Name, Description, Price, CreatedAt FROM Items WHERE Id = @Id",
            new { Id = id });

        if (item is null)
            return await JsonResponse(req, HttpStatusCode.NotFound, new { error = $"Item {id} not found." });

        return await JsonResponse(req, HttpStatusCode.OK, item);
    }

    // POST /api/items
    [Function("CreateItem")]
    public async Task<HttpResponseData> CreateItem(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "items")] HttpRequestData req)
    {
        var input = await req.ReadFromJsonAsync<ItemInput>();

        if (input is null || string.IsNullOrWhiteSpace(input.Name))
            return await JsonResponse(req, HttpStatusCode.BadRequest, new { error = "Name is required." });

        using var conn = await _dbFactory.OpenConnectionAsync();

        const string insertSql = @"
            INSERT INTO Items (Name, Description, Price, CreatedAt)
            VALUES (@Name, @Description, @Price, UTC_TIMESTAMP());
            SELECT LAST_INSERT_ID();";

        var newId = await conn.ExecuteScalarAsync<int>(insertSql, new
        {
            input.Name,
            input.Description,
            input.Price
        });

        var created = await conn.QuerySingleAsync<Item>(
            "SELECT Id, Name, Description, Price, CreatedAt FROM Items WHERE Id = @Id",
            new { Id = newId });

        return await JsonResponse(req, HttpStatusCode.Created, created);
    }

    // PUT /api/items/{id}
    [Function("UpdateItem")]
    public async Task<HttpResponseData> UpdateItem(
        [HttpTrigger(AuthorizationLevel.Anonymous, "put", Route = "items/{id:int}")] HttpRequestData req,
        int id)
    {
        var input = await req.ReadFromJsonAsync<ItemInput>();

        if (input is null || string.IsNullOrWhiteSpace(input.Name))
            return await JsonResponse(req, HttpStatusCode.BadRequest, new { error = "Name is required." });

        using var conn = await _dbFactory.OpenConnectionAsync();

        const string updateSql = @"
            UPDATE Items
            SET Name = @Name, Description = @Description, Price = @Price
            WHERE Id = @Id;";

        var rowsAffected = await conn.ExecuteAsync(updateSql, new
        {
            Id = id,
            input.Name,
            input.Description,
            input.Price
        });

        if (rowsAffected == 0)
            return await JsonResponse(req, HttpStatusCode.NotFound, new { error = $"Item {id} not found." });

        var updated = await conn.QuerySingleAsync<Item>(
            "SELECT Id, Name, Description, Price, CreatedAt FROM Items WHERE Id = @Id",
            new { Id = id });

        return await JsonResponse(req, HttpStatusCode.OK, updated);
    }

    // DELETE /api/items/{id}
    [Function("DeleteItem")]
    public async Task<HttpResponseData> DeleteItem(
        [HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = "items/{id:int}")] HttpRequestData req,
        int id)
    {
        using var conn = await _dbFactory.OpenConnectionAsync();

        var rowsAffected = await conn.ExecuteAsync(
            "DELETE FROM Items WHERE Id = @Id", new { Id = id });

        if (rowsAffected == 0)
            return await JsonResponse(req, HttpStatusCode.NotFound, new { error = $"Item {id} not found." });

        return req.CreateResponse(HttpStatusCode.NoContent);
    }

    private static async Task<HttpResponseData> JsonResponse<T>(
        HttpRequestData req, HttpStatusCode status, T body)
    {
        var response = req.CreateResponse(status);
        await response.WriteAsJsonAsync(body);
        return response;
    }
}
