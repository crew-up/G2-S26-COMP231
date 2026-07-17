// pages/CreateEvent.jsx


import { useNavigate, useParams } from "react-router-dom";          

export default function CreateEvent() {
  const { groupId } = useParams();                                    
  const navigate = useNavigate();                                     

  return (
    <div className="content-area" style={{ maxWidth: 480 }}>
      <h1>Create Event</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>

        <label htmlFor="location">Location</label>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <div style={{ flex: 1 }}>
            <label htmlFor="date">Date</label>
          </div>
          <div style={{ flex: 1 }}>
            <label htmlFor="time">Time</label>
          </div>
        </div>

        <label htmlFor="description">Description (Optional)</label>
        <input id="description" value={description} onChange={(e) => setDescription(e.target.value)} maxLength={1000} />


        <div className="form-actions">
          <button type="submit" disabled={busy}>{busy ? "Creating..." : "Create Event"}</button>
          <button type="button" className="secondary" onClick={() => navigate(`/groups/${groupId}/events`)}>Cancel</button>
        </div>
      </form>
    </div>
  );
}