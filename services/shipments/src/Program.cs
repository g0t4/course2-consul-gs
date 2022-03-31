var appBuilder = WebApplication.CreateBuilder(args);

appBuilder.WebHost.ConfigureKestrel((context, serverOptions) =>
{
  // https://docs.microsoft.com/en-us/aspnet/core/fundamentals/servers/kestrel/endpoints#bind-to-a-tcp-socket
  // listen on http://0.0.0.0:5000
  serverOptions.Listen(System.Net.IPAddress.Any, 5000);
});

var app = appBuilder.Build();

// TODO - decide if I want any custom headers added - or add another means of observability (i.e. tracing)
// app.Use(async (context, next) =>
// {
//   context.Response.Headers.Add("shipments-hostname", Dns.GetHostName());
//   await next();
// });

bool _simulate_failure = false;

app.MapGet("/shipments", () =>
{
  if (_simulate_failure)
  {
    throw new System.Exception("simulated failure");
  }
  // todo feature toggle for querying tracking service to add tracking to shipment data
  return Shipment.Shipments;
});

app.MapGet("/simulate/failure", () =>
{
  _simulate_failure = true;
  return "Failure Mode enabled";
});
app.MapGet("/simulate/resume", () =>
{
  _simulate_failure = false;
  return "Failure Mode disabled";
});

app.Run();


/* NOTES about this example (ie .NET docs)

minimal APIs
- https://docs.microsoft.com/en-us/aspnet/core/fundamentals/minimal-apis
- https://docs.microsoft.com/en-us/aspnet/core/tutorials/min-web-api

routing
- https://docs.microsoft.com/en-us/aspnet/core/fundamentals/routing

*/
