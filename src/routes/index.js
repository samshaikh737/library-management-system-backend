const express = require('express');
const router = express.Router();

// Import route files
const bookRoutes = require('./bookRoutes');
const branchRoutes = require('./branchRoutes');
const userRoutes = require('./userRoutes');
const checkoutRoutes = require('./checkoutRoutes');
const analyticsRoutes = require('./analyticsRoutes');
const transferRoutes = require('./transferRoutes');

// Define route configuration array
const routes = [
  { path: '/books', route: bookRoutes },
  { path: '/branches', route: branchRoutes },
  { path: '/users', route: userRoutes },
  { path: '/checkouts', route: checkoutRoutes },
  { path: '/analytics', route: analyticsRoutes },
  { path: '/transfer', route: transferRoutes },

  // { path: '/reservations', route: reservationRoutes },
  // { path: '/auditlogs', route: auditLogRoutes },
];

// Apply routes
routes.forEach(({ path, route }) => {
  router.use(path, route);
});

module.exports = router;
