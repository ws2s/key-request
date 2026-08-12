using KeyRequest;
using KeyRequest.Client.Data.Services;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>(    
    "#app", 
    new RootComponentOptions
    {
        Parameters = new Dictionary<string, object?>
        {
            { "InitialMessage", "Hello from Program.cs!" },
            { "CompID", builder.Configuration["CompID"] ?? "defaultCompID" }
        }
    });
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
builder.Services.AddSingleton<AppData>();

await builder.Build().RunAsync();
