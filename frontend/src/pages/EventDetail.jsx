import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import client from "../api/client";
import GroupTabs from "../components/GroupTabs";

const RESPONSE_LABELS = { no_response: "No response", going: "Going", maybe: "Maybe", cant_make_it: "Can't make it" };

export default function EventDetail() {
  const { groupId, eventId } = useParams();
  const [group, setGroup] = useState(null);
  const [event, setEvent] = useState(null);
  const [myRole, setMyRole] = useState(null);
  const [rsvpData, setRsvpData] = useState(null);
  const [statusFilter, setStatusFilter] = useState("going");

  useEffect(() => {
    client.get(`/groups/${groupId}`).then((res) => {
      setGroup(res.data.group);
      const role = res.data.myRole;
      setMyRole(role);
      if (role === "organizer") {
        client
          .get(`/groups/${groupId}/events/${eventId}/rsvps`)
          .then((r) => { setRsvpData(r.data); setEvent(r.data.event); })
          .catch(() => {});
      }
    });
  }, [groupId, eventId]);

  const countFor = (status) => rsvpData?.rsvps.filter((r) => r.response === status).length || 0;

  return (
    <div className="content-area">
      <GroupTabs groupId={groupId} groupName={group?.name || "..."} myRole={myRole} />

      {event && (
        <>
          <h3 style={{ marginBottom: 4 }}>{event.title}</h3>
          <p className="muted">
            {new Date(event.startTime).toLocaleDateString()} & {new Date(event.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - {event.location}
          </p>
        </>
      )}

      {myRole === "organizer" && rsvpData && (
        <div className="rsvp-status-tabs">
          {["going", "maybe", "cant_make_it"].map((s) => (
            <span
              key={s}
              onClick={() => setStatusFilter(s)}
              style={{ cursor: "pointer", opacity: statusFilter === s ? 1 : 0.45 }}
              className={s}
            >
              {RESPONSE_LABELS[s]} ({countFor(s)})
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
