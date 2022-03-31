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

app.MapGet("/shipments", async () =>
{
  if (Config.Toggles.IsFailureMode)
  {
    throw new System.Exception("simulated failure");
  }

  if (!Config.Toggles.IncludeTrackingInfo)
  {
    // return shipments with tracking numbers
    return Shipment.Shipments
      .Select(s => new { s.Id, s.Address, s.Items, s.Tracking });
  }

  // return shipments with tracking info
  var trackingNumbers = Shipment.Shipments.Select(s => s.Tracking);
  var trackingByNumber = await TrackingClient.GetTrackingAsync(trackingNumbers);
  return Shipment.Shipments
    .Select(s =>
    {
      var info = trackingByNumber.GetValueOrDefault(s.Tracking);
      return new { s.Id, s.Address, s.Items, Tracking = $"{s.Tracking} + {info}" };
    });

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
