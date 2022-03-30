package main

import (
	"log"
	"net/http"
)

var failureMode = false

// response helpers
func writeFail(response http.ResponseWriter) {
	response.WriteHeader(http.StatusInternalServerError)
	response.Write([]byte("simulated failure, Failure Mode is enabled"))
}
func write(response http.ResponseWriter, data string) {
	response.Write([]byte(data))
}

// logging helpers
func _log(request *http.Request) {
	info(request.URL.Path + " called...")
}
func info(message string) {
	log.Println("[INFO] " + message)
}

// returns package tracking info (for a list of tracking numbers)
func getTracking(response http.ResponseWriter, request *http.Request) {
	_log(request)

	if failureMode {
		writeFail(response)
		return
	}

	tracking := `1Z9350175039 arrives in 4 days
1Y9395050923 arrives tomorrow
1P3092093452 out for delivery by 11PM
`
	write(response, tracking)
}

// handlers toggle Failure Mode
func simulateFailure(response http.ResponseWriter, request *http.Request) {
	_log(request)

	failureMode = true

	message := "Failure Mode enabled"
	info(message)
	write(response, message)
}
func simulateResume(response http.ResponseWriter, request *http.Request) {
	_log(request)

	failureMode = false

	message := "Failure Mode disabled"
	info(message)
	write(response, message)
}

// catch all handler - shows a list of registered routes
func defaultHandler(response http.ResponseWriter, request *http.Request) {
	_log(request)

	if failureMode {
		writeFail(response)
		return
	}

	var routeList = `routes:

/tracking/ - get tracking info (i.e. for tracking numbers)
/simulate/failure - enable Failure Mode
/simulate/resume - disable Failure Mode
`

	write(response, routeList)
}

func main() {

	mux := http.NewServeMux() // https://pkg.go.dev/net/http#NewServeMux & https://pkg.go.dev/net/http#ServeMux
	server := &http.Server{Addr: "0.0.0.0:8080", Handler: mux}
	mux.HandleFunc("/tracking/", getTracking)
	mux.HandleFunc("/simulate/failure/", simulateFailure)
	mux.HandleFunc("/simulate/resume/", simulateResume)
	mux.HandleFunc("/", defaultHandler)
	info("tracking service @ " + server.Addr)
	server.ListenAndServe()

}

// docs https://pkg.go.dev/net/http
// impl https://github.com/golang/go/blob/master/src/net/http/server.go
