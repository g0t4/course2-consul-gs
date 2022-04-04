
using System.Net;

public class Config
{

  public static Config Instance;

  public Uri TrackingServiceUrl;
  public IPEndPoint HTTP_ADDRESS;
  public ConfigToggles Toggles;

  public Config(IConfiguration config)
  {
    var shipments = config.GetSection("Shipments");

    TrackingServiceUrl = new Uri(shipments["TrackingServiceUrl"] ?? string.Empty);
    Console.WriteLine("CONFIG " + new { TrackingServiceUrl });

    // for consistency use HTTP_IP/PORT like other service examples (so don't use Env Var config provider)
    var HTTP_IP = Environment.GetEnvironmentVariable("HTTP_IP") ?? "0.0.0.0";
    var HTTP_PORT = Environment.GetEnvironmentVariable("HTTP_PORT") ?? "5000";
    HTTP_ADDRESS = IPEndPoint.Parse($"{HTTP_IP}:{HTTP_PORT}");

    Toggles = new ConfigToggles(shipments.GetSection("Toggles"));
  }
}

public class ConfigToggles
{
  public bool IncludeTrackingInfo;
  public bool IsFailureMode;

  public ConfigToggles(IConfigurationSection config)
  {
    IsFailureMode = config.GetValue<bool>("InitialFailureMode");
    IncludeTrackingInfo = config.GetValue<bool>("IncludeTrackingInfo");
    Console.WriteLine("CONFIG " + new { IsFailureMode, IncludeTrackingInfo });
  }
}