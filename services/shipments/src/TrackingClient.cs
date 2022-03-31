using System.Net.Http;

public static class TrackingClient
{
  private static readonly HttpClient httpClient = new HttpClient { BaseAddress = Config.TrackingServiceBaseUri };

  public static async Task<string> GetTrackingAsync(string[] numbers)
  {
    var tracking = await httpClient.GetStringAsync("/tracking");
    // todo ensure if fails to connect that error surfaces meaningfully - don't need error handling - just reasonable errors for learing about service discovery and when it doesn't work it needs to make sense :) ) 
    return tracking;
  }
}