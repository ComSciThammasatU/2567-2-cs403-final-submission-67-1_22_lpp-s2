// middlewares/roleMiddleware.js
const pool = require("../db/db");

const roleMiddleware = (requiredRole) => {
  return async (req, res, next) => {
    try {
      const result = await pool.query(
        "SELECT name FROM user_roles WHERE id = $1",
        [req.user.role_id]
      );

      const userRoleName = result.rows[0]?.name;

      if (!requiredRole.includes(userRoleName)) {
        return res
          .status(403)
          .json({ message: "Forbidden: Insufficient privileges" });
      }

      next();
    } catch (err) {
      console.error(err);
      res.status(200).json({ message: "Role check failed" });
    }
  };
};

module.exports = roleMiddleware;
