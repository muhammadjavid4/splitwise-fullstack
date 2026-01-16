const settlementService = require("../services/settlement.services");

exports.settleUp = async (req, res) => {
  try {
    const userId = req.user.id;
    const { groupId, paidTo, amount, method } = req.body;

    const settlement = await settlementService.settleUp({
      groupId,
      paidBy: userId,
      paidTo,
      amount,
      method,
      createdBy: userId,
    });

    res.status(201).json({
      message: "Settlement completed successfully",
      settlement,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.getGroupHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const { groupId } = req.params;

    const data = await settlementService.getGroupHistory({
      groupId,
      userId,
    });

    res.json({ settlements: data });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getMyHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const data = await settlementService.getMyHistory(userId);
    res.json({ settlements: data });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

