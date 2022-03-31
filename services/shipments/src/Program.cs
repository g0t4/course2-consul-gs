var appBuilder = WebApplication.CreateBuilder(args);

appBuilder.WebHost.ConfigureKestrel((context, serverOptions) =>
{
  // https://docs.microsoft.com/en-us/aspnet/core/fundamentals/servers/kestrel/endpoints#bind-to-a-tcp-socket
  // listen on http://0.0.0.0:5000
  serverOptions.Listen(System.Net.IPAddress.Any, 5000);
});


var app = appBuilder.Build();

Config.ValidateAndLoad(app.Configuration);

// TODO - decide if I want any custom headers added - or add another means of observability (i.e. tracing)
// app.Use(async (context, next) =>
// {
//   context.Response.Headers.Add("shipments-hostname", Dns.GetHostName());
//   await next();
// });

app.MapGet("/shipments", () =>
{
  if (Config.Toggles.IsFailureMode)
  {
    throw new System.Exception("simulated failure");
  }
  // todo feature toggle for querying tracking service to add tracking to shipment data
  var results = Shipment.Shipments
    // note: projection are 'copies' that can be modified (ie replace Tracking number with status) without modifying static list of Shipments
    .Select(s => new { s.Id, s.Address, s.Items, s.Tracking })
    .ToList();

  var trackingNumbers = Shipment.Shipments.Select(s => s.Tracking).ToList();
  // TODO if(config.EnableTrackingLookup) {
  // TODO trackingClient.GetTracking(results.Select(r => r.Tracking))
  foreach (var r in results)
  {

  }

  // TODO }


  return results;
});

app.MapGet("/simulate/failure", () =>
{
  Config.Toggles.IsFailureMode = true;
  return "Failure Mode enabled";
});
app.MapGet("/simulate/resume", () =>
{
  Config.Toggles.IsFailureMode = false;
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
