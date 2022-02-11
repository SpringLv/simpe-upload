onmessage = function (event) {
  const workerResult = event.data;
  workerResult.onmessage = true;
  console.log('worker1');
  postMessage(workerResult);
};
