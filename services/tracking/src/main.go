package main

import (
	"log"
	"net/http"
)

var failureMode = false

// wrapper to add logging (think middleware)
func logThen(wrappedHandler func(http.ResponseWriter, *http.Request)) func(http.ResponseWriter, *http.Request) {
	return func(response http.ResponseWriter, request *http.Request) {
		info(request.URL.Path + " called...")
		wrappedHandler(response, request)
	}
}

func failThen(wrappedHandler func(http.ResponseWriter, *http.Request)) func(http.ResponseWriter, *http.Request) {
	return func(response http.ResponseWriter, request *http.Request) {
		if failureMode {
			response.WriteHeader(http.StatusInternalServerError)
			response.Write([]byte("simulated failure, Failure Mode is enabled"))
			return
		}
		// allow request if Failure Mode is disabled
		wrappedHandler(response, request)
	}
}

func write(response http.ResponseWriter, data string) {
	response.Write([]byte(data))
}

// logging helpers
func _log(request *http.Request) {

}
func info(message string) {
	log.Println("[INFO] " + message)
}

// returns package tracking info (for 1+ tracking numbers)
func getTracking(response http.ResponseWriter, request *http.Request) {
	numbers := request.URL.Query()["num"]
	if len(numbers) == 0 {
		// if no numbers param then return static list of tracking info
		response.WriteHeader(http.StatusBadRequest)
		write(response, "error: tracking number(s) not provided")
		return
	}
	write(response, "{\n")
	for _, num := range numbers {
		write(response, "'"+num+"': 'arrives in X days'\n")
	}
	write(response, "}\n")
}

// handlers toggle Failure Mode
func simulateFailure(response http.ResponseWriter, request *http.Request) {
	failureMode = true

	message := "Failure Mode enabled"
	info(message)
	write(response, message)
}
func simulateResume(response http.ResponseWriter, request *http.Request) {
	failureMode = false

	message := "Failure Mode disabled"
	info(message)
	write(response, message)
}

// catch all handler - shows a list of registered routes
func defaultHandler(response http.ResponseWriter, request *http.Request) {
	var routeList = `routes:

/tracking?num=X&num=Y - get tracking info, expects + tracking numbers ('num')
/simulate/failure - enable Failure Mode
/simulate/resume - disable Failure Mode
`

	write(response, routeList)
}

func main() {

	mux := http.NewServeMux() // https://pkg.go.dev/net/http#NewServeMux & https://pkg.go.dev/net/http#ServeMux
	server := &http.Server{Addr: "0.0.0.0:8080", Handler: mux}
	mux.HandleFunc("/tracking/", logThen(failThen(getTracking)))
	mux.HandleFunc("/simulate/failure/", logThen(simulateFailure))
	mux.HandleFunc("/simulate/resume/", logThen(simulateResume))
	mux.HandleFunc("/", logThen(failThen(defaultHandler)))
	info("tracking service @ " + server.Addr)
	server.ListenAndServe()

}

// docs https://pkg.go.dev/net/http
// impl https://github.com/golang/go/blob/master/src/net/http/server.go
