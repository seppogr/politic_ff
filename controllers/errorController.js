const httpStatus = require("http-status-codes");

module.exports = {
pageNotFoundError: (req, res) => {
    let errorCode = httpStatus.StatusCodes.NOT_FOUND;
    res.status(errorCode);
    res.render("error");
},
internalServerError: (req, res) => {
    let errorCode = httpStatus.StatusCodes.INTERNAL_SERVER_ERROR;
    res.status(errorCode);
    res.send(`${errorCode}: Internal Server Error`);
}
};