import process from "process";

function handleSignals(server) {
  process.on("SIGTERM", async () => {
    // `kill PID` or `pkill node`
    await server.stop();
  });
  process.on("SIGINT", async () => {
    // ctrl+c
    await server.stop();
  });
}

export { handleSignals };

// FYI https://nodejs.org/dist/latest-v17.x/docs/api/process.html#signal-events