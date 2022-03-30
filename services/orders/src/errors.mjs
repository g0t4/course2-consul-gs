function abortOnUnhandledRejection() {
  process.on("unhandledRejection", (error) => {
    console.error(
      "[FATAL] A promise had an unhandled rejection, aborting orders service..."
    );
    console.error(error);
    process.exit(1);
  });
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/unhandledrejection_event
}

export { abortOnUnhandledRejection };
