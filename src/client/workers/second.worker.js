onmessage = function (event) {
  const workerResult = event.data;
  workerResult.onmessage = true;
  console.log('worker2');
  postMessage(workerResult);
};
