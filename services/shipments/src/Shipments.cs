record Shipment(int id, string address, string items, string tracking)
{

  public static string[] Items = new[]{
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

  public static IEnumerable<Shipment> Shipments = Enumerable.Range(0, 10)
    .Select(i => new Shipment(i,
      Faker.Address.StreetAddress(),
      Items[Faker.RandomNumber.Next(0, Items.Count())],
      Faker.Phone.Number()));
}
