# consul config write sd-tracking.hcl
# consul config read -kind service-defaults -name tracking
Kind     = "service-defaults"
Name     = "tracking"
Protocol = "http"
