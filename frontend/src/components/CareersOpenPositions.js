import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Careers.css';

const CareersOpenPositions = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');

  const mockJobs = [
    { id: 1, title: 'Event Planner', department: 'Event Planning', location: 'San Francisco, CA' },
    { id: 2, title: 'Software Engineer', department: 'Engineering', location: 'Remote' },
    { id: 3, title: 'Marketing Manager', department: 'Marketing', location: 'New York, NY' },
    { id: 4, title: 'Administrative Assistant', department: 'Administration', location: 'Costa Rica' },
    { id: 5, title: 'Business Development Manager', department: 'Business Development', location: 'Berlin, Germany' },
    { id: 6, title: 'Executive Assistant', department: 'Administration', location: 'San Francisco, CA' },
    { id: 7, title: 'Frontend Developer', department: 'Engineering', location: 'Chennai, India' },
    { id: 8, title: 'Content Strategist', department: 'Marketing', location: 'New York, NY' },
    { id: 9, title: 'Event Coordinator', department: 'Event Planning', location: 'Costa Rica' },
    { id: 10, title: 'Sales Representative', department: 'Business Development', location: 'Berlin, Germany' },
  ];

  const departments = ['All', ...new Set(mockJobs.map(job => job.department))];
  const locations = ['All', ...new Set(mockJobs.map(job => job.location))];

  const filteredJobs = mockJobs.filter(job => 
    (selectedDepartment === 'All' || job.department === selectedDepartment) &&
    (selectedLocation === 'All' || job.location === selectedLocation)
  );

  return (
    <div className="careers-container">
      <div className="careers-filters">
        <select 
          value={selectedDepartment} 
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="careers-filter"
        >
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
        <select 
          value={selectedLocation} 
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="careers-filter"
        >
          {locations.map(loc => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>
      {filteredJobs.length > 0 ? (
        <table className="careers-table">
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Department</th>
              <th>Location</th>
              <th>Apply</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.map(job => (
              <tr key={job.id}>
                <td>{job.title}</td>
                <td>{job.department}</td>
                <td>{job.location}</td>
                <td>
                  <Link to={`/careers/apply/${job.id}`} className="careers-apply-btn">
                    Apply
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="careers-no-jobs">No jobs found matching the selected filters.</p>
      )}
    </div>
  );
};

export default CareersOpenPositions;
