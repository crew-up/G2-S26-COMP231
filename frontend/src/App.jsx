import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import PrivateRoute from "./components/PrivateRoute";
import CreateGroup from "./pages/CreateGroup";
import InviteMembers from "./pages/InviteMembers";
import AcceptInvite from "./pages/AcceptInvite";

export default function App() {
  return (
    <div className="app-layout">
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Routes>
          <Route
            path="/groups/new"
            element={
              <PrivateRoute>
                <CreateGroup />
              </PrivateRoute>
            }
          />

          <Route
            path="/groups/:groupId/invite"
            element={
              <PrivateRoute>
                <InviteMembers />
              </PrivateRoute>
            }
          />

          <Route
            path="/invitations/:token/accept"
            element={
              <PrivateRoute>
                <AcceptInvite />
              </PrivateRoute>
            }
          />

          <Route
            path="*"
            element={
              <div className="content-area">
                Page not found.
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
}