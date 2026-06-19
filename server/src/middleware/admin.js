module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ success: false, error: 'Unauthorized: No user session found' });
  }
  
  if (req.user.is_admin !== true) {
    return res.status(403).json({ success: false, error: 'Forbidden: Admin access required' });
  }
  
  next();
};
