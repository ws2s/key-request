using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MyApi.Data;

var host = new HostBuilder()
    .ConfigureFunctionsWorkerDefaults()
    .ConfigureServices(services =>
    {
        // DbConnectionFactory reads the connection string from environment/app settings
        // on every call, so it's safe to register as a singleton.
        services.AddSingleton<DbConnectionFactory>();
    })
    .Build();

host.Run();
