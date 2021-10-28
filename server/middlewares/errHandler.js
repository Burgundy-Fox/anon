function errHandler(err, req, res, next) {
  let statusCode
  // console.log(err);
  let error = []
  switch (err.name) {
    case "JsonWebTokenError":
      statusCode = 401
      error.push("acces token not found or invalid token")
      break;
    case "authentication error":
      statusCode = 401
      error.push("User not found")
      break;
    /* istanbul ignore next */
    case "authorization error":
      statusCode = 401
      error.push("User not authorized to access this")
      break;
    case "Already Liked":
      statusCode = 400
      error.push("Already Liked")
      break;
    case "Transaction Not Found":
      statusCode = 404
      error.push("Data Transaction not found, input transaction status")
      break;
    case "not found":
      statusCode = 404
      error.push("Data not found")
      break;
    case "login failed":
      statusCode = 400
      error.push("Email or Password Incorrect")
      break;
    case "SequelizeValidationError":
      statusCode = 400
      error = err.errors ? err.errors.map(el => el.message) : []
      break;
    case "SequelizeDatabaseError":
      statusCode = 400
      error.push("please check your input, make sure you have inputted them all")
      break;
    /* istanbul ignore next */
    case "Error":
      statusCode = 400
      error.push("please check your input, make sure you have inputted them all")
      break;
    /* istanbul ignore next */
    default:
      statusCode = 500
      error.push("internal server error")
      break;
  }

  res.status(statusCode).json({ error })
}

module.exports = errHandler