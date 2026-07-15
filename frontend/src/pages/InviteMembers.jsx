// pages/InviteMembers.jsx
// M2 - As a Group Organizer, I can invite members by email.
// Send side only; accepting is a separate story (M10). Sends one request
// per email chip since the backend endpoint takes one at a time.

import { useNavigate, useParams } from "react-router-dom"; 

export default function InviteMembers() {
  const { groupId } = useParams();          
  const navigate = useNavigate();           

  return (
    <div className="content-area" style={{ maxWidth: 520 }}>
      <h1>Invite Members</h1>
      <form onSubmit={handleSubmit}>
        <button type="button" className="add-email-link" onClick={addEmailField}>+ Add another email</button>

        <label htmlFor="message">Message (Optional)</label>
        <input id="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Join the group..." />
        {/* message isn't sent to the backend yet - visual only */}

        <div className="form-actions">
          <button type="submit" disabled={busy}>{busy ? "Sending..." : "Send Invites"}</button>
          <button type="button" className="secondary" onClick={() => navigate(`/groups/${groupId}`)}>Close</button>
        </div>
      </form>

      <div className="card" style={{ marginTop: 24 }}>
        <h2>Pending invitations</h2>
        {pending.length === 0 && <div className="empty-state">No pending invitations.</div>}
      </div>
    </div>
  );
}