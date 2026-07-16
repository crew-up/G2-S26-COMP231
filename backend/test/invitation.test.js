const test = require("node:test");
const assert = require("node:assert");
const { inviteMember, acceptInvitation } = require("../controllers/invitationController");

function mockRes() {
  const res = {};
  res.statusCode = 200;
  res.body = null;
  res.status = function (code) { res.statusCode = code; return res; };
  res.json = function (data) { res.body = data; return res; };
  return res;
}

test("inviteMember rejects an invalid email", async () => {
  const req = { body: { email: "not-an-email" }, groupId: "fake-group-id", userId: "organizer-id", user: { name: "Organizer" } };
  const res = mockRes();
  await inviteMember(req, res, () => {});
  assert.equal(res.statusCode, 400);
  assert.match(res.body.error, /valid email/i);
});

test("inviteMember rejects a missing email", async () => {
  const req = { body: {}, groupId: "fake-group-id", userId: "organizer-id", user: { name: "Organizer" } };
  const res = mockRes();
  await inviteMember(req, res, () => {});
  assert.equal(res.statusCode, 400);
});

test("acceptInvitation rejects an unknown token", async () => {
  const req = { params: { token: "not-a-real-token" }, userId: "user-id", user: { email: "someone@example.com" } };
  const res = mockRes();
  await acceptInvitation(req, res, () => {});
  assert.equal(res.statusCode, 404);
  assert.match(res.body.error, /invalid/i);
});