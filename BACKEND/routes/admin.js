// // routes/admin.js
// const express = require('express');
// const router = express.Router();
// const Coach = require('../models/Coach');

// // Fetch all pending coach requests
// router.get('/coaches/pending', async (req, res) => {
//   try {
//     const pendingCoaches = await Coach.find({ status: 'pending' });
//     res.json(pendingCoaches);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Approve or reject a coach
// router.put('/coaches/:id/approve', async (req, res) => {
//   try {
//     const coach = await Coach.findById(req.params.id);
//     if (!coach) return res.status(404).json({ message: 'Coach not found' });

//     coach.status = req.body.status; 
//     await coach.save();
//     res.json({ message: `Coach has been ${coach.status}` });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;



const express = require('express');
const router = express.Router();
const Coach = require('../models/Coach');

// Fetch all pending coach requests
router.get('/coaches/pending', async (req, res) => {
  try {
    const pendingCoaches = await Coach.find({ status: 'pending' });
    res.json(pendingCoaches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Approve or reject a coach
router.put('/coaches/:id/approve', async (req, res) => {
  try {
    const coach = await Coach.findById(req.params.id);
    if (!coach) return res.status(404).json({ message: 'Coach not found' });

    coach.status = req.body.status; 
    await coach.save();
    res.json({ message: `Coach has been ${coach.status}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
