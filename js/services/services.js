function postData(data) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();

    request.open('POST', 'server.php');

    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  
    request.send(data);

    request.addEventListener('load', () => {
      if (request.status == 200) {
        console.log("Done");
        resolve();
      } else {
        console.log("Request failed..");
        throw new Error(`new Error ${request.status}: ${request.statusText}`);
      }
    });

    request.addEventListener('error', () => {
     reject();
    });
  });
}

export default postData;