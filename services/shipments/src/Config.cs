
using System.Net;

public static class Config
{

  public static Uri TrackingServiceUrl;

  public static IPEndPoint HTTP_ADDRESS;

  public static class Toggles
  {
    public static bool IncludeTrackingInfo = false;
    public static bool IsFailureMode = false;
  }

  public static void ValidateAndLoad(IConfiguration config)
  {

    var shipments = config.GetSection("shipments");
    TrackingServiceUrl = new Uri(shipments["TrackingServiceUrl"] ?? "http://localhost:8080");
    Console.WriteLine("CONFIG " + new { TrackingServiceUrl });

    var HTTP_IP = Environment.GetEnvironmentVariable("HTTP_IP") ?? "0.0.0.0";
    var HTTP_PORT = Environment.GetEnvironmentVariable("HTTP_PORT") ?? "5000";
    HTTP_ADDRESS = IPEndPoint.Parse($"{HTTP_IP}:{HTTP_PORT}");

    var toggles = shipments.GetSection("Toggles");
    Toggles.IsFailureMode = toggles.GetValue<bool>("InitialFailureMode");
    Toggles.IncludeTrackingInfo = toggles.GetValue<bool>("IncludeTrackingInfo");
    Console.WriteLine("CONFIG " + new { Toggles.IsFailureMode, Toggles.IncludeTrackingInfo });

  }
}