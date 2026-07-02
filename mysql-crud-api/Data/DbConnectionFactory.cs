using System.Data;
using MySqlConnector;

namespace MyApi.Data;

/// <summary>
/// Opens a new MySQL connection per call using the connection string from
/// app settings (Function App Configuration in Azure, local.settings.json locally).
/// Keep this cheap and stateless -- Functions can scale out to many instances.
/// </summary>
public class DbConnectionFactory
{
    private readonly string _connectionString;

    public DbConnectionFactory()
    {
        _connectionString = Environment.GetEnvironmentVariable("MYSQL_CONNECTION_STRING")
            ?? throw new InvalidOperationException(
                "MYSQL_CONNECTION_STRING app setting is not configured.");
    }

    public async Task<IDbConnection> OpenConnectionAsync(CancellationToken ct = default)
    {
        var connection = new MySqlConnection(_connectionString);
        await connection.OpenAsync(ct);
        return connection;
    }
}
