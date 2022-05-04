Kind = "service-intentions"
Name = "shipments" # destination
Sources = [
  {
    Name = "orders" # source
    Action = "deny"
  }
]