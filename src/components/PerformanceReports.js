import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Routes, Route } from 'react-router-dom';
import Button from './Button';
import Card from './Card';
import './PerformanceReports.css';

// Mock data
const managers = [
  { id: 1, name: 'John Doe', teamId: 101, teamName: 'Alpha Team' },
  { id: 2, name: 'Jane Smith', teamId: 102, teamName: 'Beta Team' },
];

const agents = [
  { 
    id: 1, 
    name: 'Alice Johnson', 
    position: 'Senior Field Operator',
    teamId: 101, 
    skills: { 
      processControl: 8, 
      safetyProcedures: 9, 
      equipmentMaintenance: 7, 
      troubleshooting: 8, 
      chemicalHandling: 9 
    } 
  },
  { 
    id: 2, 
    name: 'Bob Williams', 
    position: 'Junior Field Operator',
    teamId: 101, 
    skills: { 
      processControl: 6, 
      safetyProcedures: 8, 
      equipmentMaintenance: 7, 
      troubleshooting: 6, 
      chemicalHandling: 7 
    } 
  },
  { 
    id: 3, 
    name: 'Charlie Brown', 
    position: 'Field Technician',
    teamId: 102, 
    skills: { 
      processControl: 7, 
      safetyProcedures: 9, 
      equipmentMaintenance: 8, 
      troubleshooting: 7, 
      chemicalHandling: 8 
    } 
  },
];

const ManagersList = () => {
  const navigate = useNavigate();

  return (
    <Card className="performance-card">
      <h2 className="card-title">Managers Performance Overview</h2>
      <div className="table-container">
        <table className="performance-table">
          <thead>
            <tr>
              <th>Manager Name</th>
              <th>Team Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {managers.map((manager) => (
              <tr key={manager.id}>
                <td>{manager.name}</td>
                <td>{manager.teamName}</td>
                <td>
                  <Button onClick={() => navigate(`/performance-reports/${manager.id}`)} className="view-button">View Team</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

const TeamPerformance = () => {
  const { managerId } = useParams();
  const navigate = useNavigate();
  const manager = managers.find(m => m.id === parseInt(managerId));
  const teamAgents = agents.filter(a => a.teamId === manager.teamId);

  return (
    <Card className="performance-card">
      <h2 className="card-title">{manager.name}'s Team Performance</h2>
      <div className="table-container">
        <table className="performance-table">
          <thead>
            <tr>
              <th>Agent Name</th>
              <th>Position</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {teamAgents.map((agent) => (
              <tr key={agent.id}>
                <td>{agent.name}</td>
                <td>{agent.position}</td>
                <td>
                  <Button onClick={() => navigate(`/performance-reports/${managerId}/agent/${agent.id}`)} className="view-button">View Skills</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

const AnimatedCircularProgressBar = ({ value, max = 10, min = 0 }) => {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setCurrentValue(value), 100);
    return () => clearTimeout(timer);
  }, [value]);

  const percentage = ((currentValue - min) / (max - min)) * 100;
  const color = `hsl(${percentage * 1.2}, 100%, 50%)`;
  const strokeDasharray = 2 * Math.PI * 40;
  const strokeDashoffset = strokeDasharray * (1 - percentage / 100);

  return (
    <div className="circular-progress-container">
      <svg className="circular-progress" viewBox="0 0 100 100">
        <circle className="circular-progress-bg" cx="50" cy="50" r="40" />
        <circle 
          className="circular-progress-fill" 
          cx="50" 
          cy="50" 
          r="40" 
          style={{
            strokeDasharray: strokeDasharray,
            strokeDashoffset: strokeDashoffset,
            stroke: color
          }}
        />
        <text x="50" y="50" className="circular-progress-text" textAnchor="middle" dy=".3em">
          {currentValue}
        </text>
      </svg>
    </div>
  );
};

const AgentSkills = () => {
  const { agentId } = useParams();
  const agent = agents.find(a => a.id === parseInt(agentId));

  return (
    <Card className="performance-card">
      <h2 className="card-title">{agent.name}</h2>
      <h3 className="agent-position">{agent.position}</h3>
      <ul className="skills-list">
        {Object.entries(agent.skills).map(([skill, value]) => (
          <li key={skill} className="skill-item">
            <span className="skill-name">{skill.replace(/([A-Z])/g, ' $1').trim()}</span>
            <AnimatedCircularProgressBar value={value} />
          </li>
        ))}
      </ul>
    </Card>
  );
};

const PerformanceReports = () => {
  return (
    <div className="performance-reports">
      <h1 className="page-title">Performance Reports</h1>
      <Routes>
        <Route path="/" element={<ManagersList />} />
        <Route path="/:managerId" element={<TeamPerformance />} />
        <Route path="/:managerId/agent/:agentId" element={<AgentSkills />} />
      </Routes>
    </div>
  );
};

export default PerformanceReports;