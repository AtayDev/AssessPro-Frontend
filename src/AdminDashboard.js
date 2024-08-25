import React, { useState, useEffect } from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  Link,
} from "react-router-dom";
import Button from "./components/Button";
import Card from "./components/Card";
import Icon from "./components/Icon";
import AddManager from "./components/AddManager";
import PerformanceReports from "./components/PerformanceReports";
import { iconPaths } from "./utils/iconPaths";
import "./styles/AdminDashboard.css";
//Components
import Header from "./components/Header";
import DynamicTable from "./components/DynamicTable";
import AgentEvaluation from "./components/AgentEvaluation";
import ImportManagers from "./components/ImportManagers.js";
import ImportTeams from "./components/ImportTeams.js";
import ImportAgents from "./components/ImportAgents.js";

//Services
import ManagerService from "./services/ManagerService";
import TeamService from "./services/TeamService";
import AgentService from "./services/AgentService";

const DashboardContent = () => {
  const navigate = useNavigate();

  const [managersCount, setManagers] = useState(0);
  const [teamsCount, setTeams] = useState(0);
  const [agentsCount, setAgents] = useState(0);

  const [error, setError] = useState(null);

  useEffect(() => {
    ManagerService.getNumberOfManagers()
      .then((count) => {
        setManagers(count);
      })
      .catch((err) => setError(err.message));

    TeamService.getNumberOfTeams()
      .then((count) => {
        setTeams(count);
      })
      .catch((err) => setError(err.message));
    AgentService.getNumberOfAgents()
      .then((count) => {
        setAgents(count);
      })
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="admin-dashboard">
      <Header />

      <main className="dashboard-main">
   
        <div className="overview-cards">
          <Card key={0} className="overview-card">
            <h3 className="card-title">Total Managers</h3>
            <Link to="/table/managers">
              <div className="card-value">{managersCount}</div>
            </Link>
            <p className="card-change">+{2} this month</p>
          </Card>
          <Card key={1} className="overview-card">
            <h3 className="card-title">Total Teams</h3>
            <Link to="/table/teams">
              <div className="card-value">{teamsCount}</div>
            </Link>
            <p className="card-change">+{2} this month</p>
          </Card>
          <Card key={2} className="overview-card">
            <h3 className="card-title">Total Agents</h3>
            <Link to="/table/agents">
              <div className="card-value">{agentsCount}</div>
            </Link>
            <p className="card-change">+{2} this month</p>
          </Card>
        </div>

        <div className="dashboard-content">
          <Card
            className="quick-actions"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h3 className="section-title">Import des données</h3>

            <ImportManagers />
            <ImportTeams />
            <ImportAgents />
          </Card>
          <Card className="quick-actions">
            <h3 className="section-title">Quick Actions</h3>
            <div className="action-buttons">
              <Button
                className="action-button"
                onClick={() => navigate("/add-manager")}
              >
                <Icon d={iconPaths.plus} /> <span>Create Manager Data</span>
              </Button>{" "}
              
              <Button
                className="action-button"
                onClick={() => navigate("/performance-reports")}
              >
                <Icon d={iconPaths.chart} />{" "}
                <span>View Performance Reports</span>
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

/* const AdminDashboard = () => (
  <Router>
    <Routes>
      <Route path="/" element={<DashboardContent />} />
      <Route path="/add-manager" element={<AddManager />} />
      <Route path="/performance-reports/*" element={<PerformanceReports />} />
      <Route path="/table/:type" element={<DynamicTable />} />
      <Route path="/agents/:id" component={AgentEvaluation} />

    </Routes>
  </Router>
);
 */
export default DashboardContent;
