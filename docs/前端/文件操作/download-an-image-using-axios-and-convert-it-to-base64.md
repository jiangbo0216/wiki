# [Download an image using Axios and convert it to base64](https://stackoverflow.com/questions/41846669/download-an-image-using-axios-and-convert-it-to-base64)

This worked great for me:

```js
function getBase64(url) {
  return axios
    .get(url, {
      responseType: 'arraybuffer'
    })
    .then(response => Buffer.from(response.data, 'binary').toString('base64'))
}
```

There might be a better way to do this, but I have done it like this (minus the extra bits like `catch()`, etc.):

```js
axios.get(imageUrl, { responseType:"blob" })
    .then(function (response) {

        var reader = new window.FileReader();
        reader.readAsDataURL(response.data); 
        reader.onload = function() {

            var imageDataUrl = reader.result;
            imageElement.setAttribute("src", imageDataUrl);

        }
    });
```

I have a suspicion that at least part of your problem might be server-side. Even without setting `{ responseType: "blob" }` you should have had something in your `response.data` output.
