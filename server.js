const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Static files should be served from Angular's dist directory if needed
// app.use(express.static('dist/angular-app'));

// API route
app.post('/api/login', (req, res) => {
  console.log(req.body); 
  res.redirect('/dashboard');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
