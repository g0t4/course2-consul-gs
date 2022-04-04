
public static class Config
{

  public static Uri TrackingServiceBaseUri;

  public static class Toggles
  {
    public static bool IncludeTrackingInfo = false;
    public static bool IsFailureMode = false;
  }

  public static void ValidateAndLoad(IConfiguration config)
  {

    var shipments = config.GetSection("shipments");
    TrackingServiceBaseUri = new Uri(shipments["TrackingServiceBaseUri"] ?? "http://localhost:8080");
    Console.WriteLine("CONFIG " + new { TrackingServiceBaseUri });

    var toggles = shipments.GetSection("Toggles");
    Toggles.IsFailureMode = toggles.GetValue<bool>("InitialFailureMode");
    Toggles.IncludeTrackingInfo = toggles.GetValue<bool>("IncludeTrackingInfo");
    Console.WriteLine("CONFIG " + new { Toggles.IsFailureMode, Toggles.IncludeTrackingInfo });

  }
}