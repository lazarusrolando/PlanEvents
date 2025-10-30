import React, { useState } from 'react'
import FeedbackSurvey from './FeedbackSurvey';

function Feedback() {
     const [showFeedback, setShowFeedback] = useState(false);
     const handleCloseFeedback = () => {
          setShowFeedback(false);
     };
     return (
          <section className="hero">
               <div className="hero-container">
                    <div className="feedback-button" style={{ cursor: 'pointer', border: '2.5px solid #333' }} onClick={() => setShowFeedback(true)}>
                         Feedback
                    </div>
                    {showFeedback && (
                         <div className="modal-overlay" onClick={() => setShowFeedback(false)}>
                              <FeedbackSurvey onClose={handleCloseFeedback} />
                         </div>
                    )}
               </div>
          </section>
     )
}

export default Feedback;