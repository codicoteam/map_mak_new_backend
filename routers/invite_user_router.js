const express = require("express");
const InviteUserService = require("../services/invite_user_service");
const router = express.Router();

const handleResponse = (res, serviceResponse) => {
  const { status, data, message, error } = serviceResponse;
  if (data) {
    res.status(status).json(data);
  } else {
    res.status(status).json({ message, error });
  }
};

// Route to create an invite
router.post("/", async (req, res) => {
  const response = await InviteUserService.createInvite(req.body);
  handleResponse(res, response);
});

// Route to get invites by inviting email
router.get("/by-email", async (req, res) => {
  const { invitingEmail } = req.query;
  const response = await InviteUserService.getByInvitingEmail(invitingEmail);
  handleResponse(res, response);
});

// Route to get all invites with pagination
router.get("/", async (req, res) => {
  const { page, size } = req.query;
  const response = await InviteUserService.getAllInvites(
    parseInt(page) || 1,
    parseInt(size) || 10
  );
  handleResponse(res, response);
});

// Route to delete multiple invites by IDs
router.delete("/", async (req, res) => {
  const { inviteIds } = req.body;
  const response = await InviteUserService.deleteManyByIds(inviteIds);
  handleResponse(res, response);
});

module.exports = router;
