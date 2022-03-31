
public static class Config
{

  public static Uri TrackingServiceBaseUri = new Uri("http://tracking:8080");

  public static class Toggles
  {
    public static bool IncludeTrackingInfo = false;
    public static bool IsFailureMode = false;
  }

  public static void ValidateAndLoad(IConfiguration config)
  {
    
    var shipments = config.GetSection("shipments");
    var baseUri = shipments["TrackingServiceBaseUri"];
    TrackingServiceBaseUri = new Uri(baseUri ?? "");
    Console.WriteLine(new { TrackingServiceBaseUri });

    var toggles = shipments.GetSection("Toggles");
    bool.TryParse(toggles["InitialFailureMode"], out Toggles.IsFailureMode);
    bool.TryParse(toggles["IncludeTrackingInfo"], out Toggles.IncludeTrackingInfo);
    Console.WriteLine(new { Toggles.IsFailureMode, Toggles.IncludeTrackingInfo });

  }
}