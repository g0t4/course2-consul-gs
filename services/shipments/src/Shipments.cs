using Bogus;

class Shipment
{
  public int Id { get; set; }
  public string Address { get; set; }
  public string Items { get; set; }
  public string Tracking { get; set; }

  private static string[] _Items = new[]{
    "5 Bags of Marshmallows",
    "Used Car",
    "Cable Modem",
    "Cell Phone",
    "Floss",
    "48 pack - Energy Drink",
    "Desk",
    "Keyboard",
    "Laptop",
    "80 pack of Bottled Water",
    "Rug",
  };

  private static int _NextId = 0;
  private static Faker<Shipment> _fakeShipment = new Faker<Shipment>()
    .RuleFor(s => s.Id, f => _NextId++)
    .RuleFor(s => s.Address, f => f.Address.FullAddress())
    .RuleFor(s => s.Items, f => f.PickRandom(_Items))
    .RuleFor(s => s.Tracking, f => f.Random.Replace("1Z#########"));

  public static IEnumerable<Shipment> Shipments = Enumerable.Range(0, 10)
    .Select(i => _fakeShipment.Generate())
    .ToList(); // generate once

}
