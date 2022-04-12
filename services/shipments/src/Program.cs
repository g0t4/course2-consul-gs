using System.Net;

var appBuilder = WebApplication.CreateBuilder(args);

// include env vars w/ MY_ prefix 
// (default web app builder includes ASPNETCORE_)
appBuilder.Configuration.AddEnvironmentVariables("MY_");
// net result, can pass ENV VARs such as:
// MY_SHIPMENTS__TOGGLES__INITIALFAILUREMODE=true
// MY_ prefix, then sections are delimited by __
// by default, b/c of ASPNETCORE_ you could also use: ASPNETCORE_SHIPMENTS__TOGGLES__INITIALFAILUREMODE=true

appBuilder.WebHost.ConfigureKestrel((context, serverOptions) =>
{
  // https://docs.microsoft.com/en-us/aspnet/core/fundamentals/servers/kestrel/endpoints#bind-to-a-tcp-socket
  serverOptions.Listen(Config.Instance.HTTP_ADDRESS);
});

var app = appBuilder.Build();

Config.Instance = new Config(app.Configuration);

app.MapGet("/simulate/failure", () =>
{
  Config.Instance.Toggles.IsFailureMode = true;
  return "Failure Mode enabled";
});
app.MapGet("/simulate/resume", () =>
{
  Config.Instance.Toggles.IsFailureMode = false;
  return "Failure Mode disabled";
});

// Failure Mode middleware - if failure mode then returns 500 internal server error - else calls next middleware
app.Use(async (context, next) =>
{
  if (Config.Instance.Toggles.IsFailureMode
   && !context.Request.Path.StartsWithSegments("/simulate"))
  {
    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
    await context.Response.WriteAsync("Failure Mode is enabled, failing request.");
    return;
  }

  await next(context);
});

app.MapGet("/shipments", async () =>
{
  if (!Config.Instance.Toggles.IncludeTrackingInfo)
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

app.MapGet("/", async context =>
{
  context.Response.ContentType = "text/html";
  await context.Response.WriteAsync(@"
routes:
<br/>
<a href='/shipments'>/shipments</a> - get shipment data 
<br/>
<a href='/simulate/failure'>/simulate/failure</a> - enable Failure Mode 
<br/>
<a href='/simulate/resume'>/simulate/resume</a> - disable Failure Mode
<br/>
");

});

app.Run();


/* NOTES about this example (ie .NET docs)

minimal APIs
- https://docs.microsoft.com/en-us/aspnet/core/fundamentals/minimal-apis
- https://docs.microsoft.com/en-us/aspnet/core/tutorials/min-web-api

routing
- https://docs.microsoft.com/en-us/aspnet/core/fundamentals/routing

handlers
- https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.http.httpcontext
- https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.http.httpresponse
- https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.http.httprequest

*/
