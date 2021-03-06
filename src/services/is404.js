export default (url) => {
  return new Promise((resolve, reject) => {
    const http = new XMLHttpRequest();
    http.open('GET', url);
    http.onreadystatechange = () => {
      if (http.readyState === XMLHttpRequest.DONE && http.status === 404) {
        reject();
      }
    };
    http.send();
  });
};
