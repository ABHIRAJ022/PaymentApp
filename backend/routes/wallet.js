const express = require("express");
const User = require("../models/User");
const Transaction = require("../models/Transaction");

const router = express.Router();

// Add money
router.post("/add", async (req, res) => {
  try {
    const { userId, amount } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.balance += amount;
    await user.save();

    const txn = new Transaction({ userId, type: "add", amount });
    await txn.save();

    res.json({ message: "Money added", balance: user.balance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Transfer money
router.post("/transfer", async (req, res) => {
  try {
    const { fromUserId, toUserId, amount } = req.body;

    const fromUser = await User.findById(fromUserId);
    const toUser = await User.findById(toUserId);

    if (!fromUser || !toUser)
      return res.status(404).json({ error: "User not found" });

    if (fromUser.balance < amount)
      return res.status(400).json({ error: "Insufficient balance" });

    fromUser.balance -= amount;
    toUser.balance += amount;

    await fromUser.save();
    await toUser.save();

    const txn = new Transaction({
      userId: fromUserId,
      type: "transfer",
      amount,
      toUser: toUserId,
    });
    await txn.save();

    res.json({ message: "Transfer successful", balance: fromUser.balance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Transaction history
router.get("/history/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const transactions = await Transaction.find({ userId })
      .populate("toUser", "name email")
      .sort({ createdAt: -1 });

    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
