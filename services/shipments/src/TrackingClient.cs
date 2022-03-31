using System.Net.Http;

public static class TrackingClient
{
  private static readonly HttpClient httpClient = new HttpClient { BaseAddress = Config.TrackingServiceBaseUri };

  public static async Task<Dictionary<string, string>> GetTrackingAsync(IEnumerable<string> numbers)
  {
    var tracking = await httpClient.GetFromJsonAsync<Dictionary<string, string>>("/tracking");
    // todo ensure if fails to connect that error surfaces meaningfully - don't need error handling - just reasonable errors for learing about service discovery and when it doesn't work it needs to make sense :) ) 
    return tracking ?? new Dictionary<string, string>();
  }

}