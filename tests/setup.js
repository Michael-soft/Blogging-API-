jest.setTimeout(60000); // Increase timeout for async operations
const timer = setTimeout(() => {
    console.log('This will not block the process');
  }, 1000);
  timer.unref(); // This allows the process to exit even if the timer is still running