let ImageKit = require("imagekit");

let imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL,
});
   /* istanbul ignore next */
function uploadImage(req, res, next) {
  if (!req.file) {
    next();
  } else {
    const fileName = "ANON" + new Date().toISOString() + req.file.originalname;

    imagekit
      .upload({
        file: req.file.buffer.toString("base64"), //required
        fileName, //required
      })
      .then((response) => {
        // console.log(response);
        req.image_url = response.url;
        next();
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ err: error });
      });
  }
}

module.exports = { uploadImage };
