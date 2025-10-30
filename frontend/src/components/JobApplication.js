import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './JobApplication.css';

const JobApplication = () => {
  const { id } = useParams();
  const jobId = parseInt(id, 10);

  // Mock job details based on Databricks Executive Assistant role
  const getJobDetails = (id) => {
    const mockJobs = [
      { id: 1, title: 'Event Planner', department: 'Event Planning', location: 'San Francisco, CA', description: 'Plan and execute events for clients.' },
      { id: 2, title: 'Software Engineer', department: 'Engineering', location: 'Remote', description: 'Develop software solutions.' },
      { id: 3, title: 'Marketing Manager', department: 'Marketing', location: 'New York, NY', description: 'Lead marketing campaigns.' },
      { id: 4, title: 'Administrative Assistant', department: 'Administration', location: 'Costa Rica', description: 'Provide administrative support.' },
      { id: 5, title: 'Business Development Manager', department: 'Business Development', location: 'Berlin, Germany', description: 'Drive business growth.' },
      {
        id: 6, title: 'Executive Assistant m/f/d', department: 'Engineering', location: 'Berlin, Germany',
        description: 'Work closely with the EMEA Engineering leadership team and other key stakeholders across regions, managing complex calendars, orchestrating high-impact meetings, and serving as a trusted liaison to support critical company initiatives and events. Occasional travel will be required to support company initiatives and events.',
        responsibilities: [
          'Manage your R&D leadership calendars (4 people) efficiently so their time is optimised.',
          'Ensure smart preparation for meetings and agendas are in place and that meetings are executed effectively.',
          'Keep key stakeholders fully briefed on upcoming meetings agendas and ensure all participants are aligned with the schedule and follow-on actions.',
          'Organise domestic and international travel arrangements with internal and external stakeholders efficiently.',
          'Work closely with EMEA Engineering leadership team and other key stakeholders across regions, managing complex calendars, orchestrating high-impact meetings, and serving as a trusted liaison to support critical company initiatives and events.'
        ],
        requirements: [
          '4+ years of executive administrative experience, preferably in a global technology or software company.',
          'Exceptional communication skills and strong follow-through, with the ability to influence and collaborate at all levels.',
          'Demonstrated ability to exercise sound judgment and make independent decisions in ambiguous or high-stakes situations.',
          'Advanced project management skills (Slack, Gmail and Google Calendar expertise required), managing proven track record of supporting multiple executives across time zones. Expert skills in complex project simulation-time management and prioritisation from high-level goals to manage multiple projects.',
          'Experience managing domestic and international travel logistics, including booking and reporting with meticulous attention to confidential matters.',
          'Comfortable working with a diverse range of stakeholders, from executives to individual contributors.'
        ],
        questions: [
          'Years of executive assistant experience in a global technology or software company?',
          'Describe your experience with calendar management and coordinating high-impact meetings.',
          'How do you handle confidential information and manage complex travel arrangements?'
        ]
      },
      { id: 7, title: 'Frontend Developer', department: 'Engineering', location: 'Chennai, India', description: 'Build user interfaces.' },
      { id: 8, title: 'Content Strategist', department: 'Marketing', location: 'New York, NY', description: 'Develop content strategies.' },
      { id: 9, title: 'Event Coordinator', department: 'Event Planning', location: 'Costa Rica', description: 'Coordinate event logistics.' },
      { id: 10, title: 'Sales Representative', department: 'Business Development', location: 'Berlin, Germany', description: 'Manage sales pipeline.' },
    ];
    return mockJobs.find(job => job.id === id) || { title: 'Unknown Position', department: 'Unknown', location: 'Unknown', description: 'No description available.', responsibilities: [], requirements: [], questions: [] };
  };

  const getDepartmentBenefits = (department) => {
    const benefitsMap = {
      'Event Planning': [
        'Hands-on experience in event coordination and execution',
        'Opportunities to work on high-profile events',
        'Creative freedom in designing event experiences',
        'Travel opportunities to event locations',
        'Collaboration with diverse clients and vendors'
      ],
      'Engineering': [
        'Work with cutting-edge event planning technologies',
        'Flexible remote work options',
        'Professional development in software engineering',
        'Innovation in platform features for event management',
        'Team collaboration across global time zones'
      ],
      'Marketing': [
        'Lead creative marketing campaigns for events',
        'Build brand awareness in the event industry',
        'Access to digital marketing tools and analytics',
        'Networking with industry influencers',
        'Content creation for social media and promotions'
      ],
      'Administration': [
        'Supportive role in a dynamic event planning company',
        'Flexible scheduling and work-life balance',
        'Opportunities for career growth in operations',
        'Interaction with all departments',
        'Training in administrative best practices'
      ],
      'Business Development': [
        'Drive growth in the event planning sector',
        'Commission-based incentives for sales success',
        'Build partnerships with event clients',
        'Travel to meet potential partners',
        'Strategic planning for business expansion'
      ],
      'Unknown': [
        'Competitive salary and benefits',
        'Flexible work arrangements',
        'Professional development opportunities',
        'Innovative and collaborative environment',
        'Work-life balance',
        'Diverse and inclusive culture'
      ]
    };
    return benefitsMap[department] || benefitsMap['Unknown'];
  };

  const job = getJobDetails(jobId);

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    currentRole: '',
    yearsExperience: '',
    execAssistantExperience: '',
    resume: null,
    coverLetter: '',
    whyThisRole: '',
    calendarExperience: '',
    confidentialHandling: '',
    additionalInfo: ''
  });
  const [errors, setErrors] = useState({});

  const steps = [
    { title: 'Personal Information', step: 1 },
    { title: 'Professional Background', step: 2 },
    { title: 'Application Materials', step: 3 },
    { title: 'Additional Questions', step: 4 }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setFormData(prev => ({ ...prev, resume: file }));
      if (errors.resume) {
        setErrors(prev => ({ ...prev, resume: '' }));
      }
    } else {
      setErrors(prev => ({ ...prev, resume: 'Please upload a PDF file.' }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    switch (step) {
      case 1:
        if (!formData.fullName) newErrors.fullName = 'Full name is required.';
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email is required.';
        if (!formData.phone) newErrors.phone = 'Phone number is required.';
        if (!formData.location) newErrors.location = 'Location is required.';
        break;
      case 2:
        if (!formData.currentRole) newErrors.currentRole = 'Current role is required.';
        if (!formData.yearsExperience) newErrors.yearsExperience = 'Years of experience is required.';
        if (job.questions && job.questions[0] && !formData.execAssistantExperience) newErrors.execAssistantExperience = 'This field is required.';
        break;
      case 3:
        if (!formData.resume) newErrors.resume = 'Resume is required.';
        if (!formData.coverLetter.trim()) newErrors.coverLetter = 'Cover letter is required.';
        break;
      case 4:
        if (!formData.whyThisRole.trim()) newErrors.whyThisRole = 'Response is required.';
        if (job.questions && job.questions[1] && !formData.calendarExperience.trim()) newErrors.calendarExperience = 'Response is required.';
        if (job.questions && job.questions[2] && !formData.confidentialHandling.trim()) newErrors.confidentialHandling = 'Response is required.';
        break;
      default:
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(4)) {
      console.log('Application submitted:', { ...formData, job });
      alert('Application submitted successfully! We will review your submission and get back to you.');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        location: '',
        linkedin: '',
        currentRole: '',
        yearsExperience: '',
        execAssistantExperience: '',
        resume: null,
        coverLetter: '',
        whyThisRole: '',
        calendarExperience: '',
        confidentialHandling: '',
        additionalInfo: ''
      });
      setCurrentStep(1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-content">
            <div className="input-group">
              <label>Full Name *</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} />
              {errors.fullName && <span className="error">{errors.fullName}</span>}
            </div>
            <div className="input-group">
              <label>Email *</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="input-group">
              <label>Phone Number *</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>
            <div className="input-group">
              <label>Location *</label>
              <input type="text" name="location" value={formData.location} onChange={handleInputChange} placeholder="City, Country" />
              {errors.location && <span className="error">{errors.location}</span>}
            </div>
            <div className="input-group">
              <label>LinkedIn Profile (Optional)</label>
              <input type="url" name="linkedin" value={formData.linkedin} onChange={handleInputChange} placeholder="https://linkedin.com/in/yourprofile" />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="step-content">
            <div className="input-group">
              <label>Current Role *</label>
              <input type="text" name="currentRole" value={formData.currentRole} onChange={handleInputChange} />
              {errors.currentRole && <span className="error">{errors.currentRole}</span>}
            </div>
            <div className="input-group">
              <label>Years of Experience *</label>
              <select name="yearsExperience" value={formData.yearsExperience} onChange={handleInputChange}>
                <option value="">Select...</option>
                <option value="0-1">0-1 years</option>
                <option value="1-3">1-3 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5-10">5-10 years</option>
                <option value="10+">10+ years</option>
              </select>
              {errors.yearsExperience && <span className="error">{errors.yearsExperience}</span>}
            </div>
            {job.questions && job.questions[0] && (
              <div className="input-group">
                <label>{job.questions[0]} *</label>
                <select name="execAssistantExperience" value={formData.execAssistantExperience} onChange={handleInputChange}>
                  <option value="">Select...</option>
                  <option value="0-1">0-1 years</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5+">5+ years</option>
                </select>
                {errors.execAssistantExperience && <span className="error">{errors.execAssistantExperience}</span>}
              </div>
            )}
          </div>
        );
      case 3:
        return (
          <div className="step-content">
            <div className="input-group">
              <label>Resume (PDF) *</label>
              <input type="file" accept=".pdf" onChange={handleFileChange} />
              {errors.resume && <span className="error">{errors.resume}</span>}
              {formData.resume && <p>Selected: {formData.resume.name}</p>}
            </div>
            <div className="input-group">
              <label>Cover Letter *</label>
              <textarea name="coverLetter" value={formData.coverLetter} onChange={handleInputChange} rows="5" placeholder="Tell us why you're a great fit for this role..."></textarea>
              {errors.coverLetter && <span className="error">{errors.coverLetter}</span>}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="step-content">
            <div className="input-group">
              <label>Why are you interested in this {job.title} role at Plan Events? *</label>
              <textarea name="whyThisRole" value={formData.whyThisRole} onChange={handleInputChange} rows="5" placeholder="Share your motivation and relevant experience..."></textarea>
              {errors.whyThisRole && <span className="error">{errors.whyThisRole}</span>}
            </div>
            {job.questions && job.questions[1] && (
              <div className="input-group">
                <label>{job.questions[1]} *</label>
                <textarea name="calendarExperience" value={formData.calendarExperience} onChange={handleInputChange} rows="4" placeholder="Describe your experience..."></textarea>
                {errors.calendarExperience && <span className="error">{errors.calendarExperience}</span>}
              </div>
            )}
            {job.questions && job.questions[2] && (
              <div className="input-group">
                <label>{job.questions[2]} *</label>
                <textarea name="confidentialHandling" value={formData.confidentialHandling} onChange={handleInputChange} rows="4" placeholder="Explain how you handle..."></textarea>
                {errors.confidentialHandling && <span className="error">{errors.confidentialHandling}</span>}
              </div>
            )}
            <div className="input-group">
              <label>Any additional information?</label>
              <textarea name="additionalInfo" value={formData.additionalInfo} onChange={handleInputChange} rows="3" placeholder="Optional: Anything else you'd like to share?"></textarea>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="job-application">
      <div className="job-header">
        <Link to="/careers" className="back-link">Back to search</Link>
        <h1>{job.title}</h1>
        <p className="job-location">{job.location}</p>
      </div>
      <div className="application-content">
        <div className="benefits-sidebar">
          <h2>Why Join Our {job.department} Team?</h2>
          <ul>
            {getDepartmentBenefits(job.department).map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </div>
        <form onSubmit={handleSubmit} className="job-form">
          <div className="apply-header">
            <h2>Apply now</h2>
          </div>
          <div className="steps-indicator">
            {steps.map((stepItem) => (
              <div key={stepItem.step} className={`step ${currentStep === stepItem.step ? 'active' : ''}`}>
                {stepItem.step}
              </div>
            ))}
          </div>
          <div className="step-title">
            Step {currentStep} of {steps.length}: {steps.find(s => s.step === currentStep)?.title}
          </div>
          {renderStepContent()}
          <div className="form-navigation">
            {currentStep > 1 && (
              <button type="button" onClick={prevStep} className="nav-btn prev">Previous</button>
            )}
            {currentStep < steps.length ? (
              <button type="button" onClick={nextStep} className="nav-btn next">Next</button>
            ) : (
              <button type="submit" className="submit-btn">Apply now</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobApplication;
