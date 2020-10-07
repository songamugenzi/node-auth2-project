module.exports = function (department) {
  return function (req, res, next) {
    if (
      req.decodedToken &&
      req.decodedToken.departmentname &&
      req.decodedToken.departmentname === department
    ) {
      next();
    } else {
      res.status(403).json({ message: "Not authorized for that request" });
    }
  };
};
