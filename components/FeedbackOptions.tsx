"use client";
import React, { useState } from "react";
import "./Feedback.css";

const FeedbackOptions = () => {
  const [isOpen, setIsOpen] = useState(false);

  const email = "abhi.tab688@gmail.com";

  // Common function to send email
  const sendEmail = (subject: string | number) => {
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
  };

  return (
    <>
      {/* Floating Button */}
      <button
        className="feedback-floating-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        💬
      </button>

      {/* Feedback Form */}
      {isOpen && (
        <div className="feedback-container">
          <h1 className="feedback-title">PicSpace Connect</h1>

          <div
            className="feedback-option"
            onClick={() => sendEmail("Bug Report")}
            style={{ cursor: "pointer" }}
          >
            <h2>Report a bug</h2>
            <p>Something is broken?</p>
            <p>Let us know!</p>
          </div>

          <div className="divider"></div>

          <div
            className="feedback-option"
            onClick={() => sendEmail("Suggestion for Improvement")}
            style={{ cursor: "pointer" }}
          >
            <h2>Suggest improvements</h2>
            <p>What could we do better?</p>
          </div>

          <div
            className="feedback-option"
            onClick={() => sendEmail("Support Request")}
            style={{ cursor: "pointer" }}
          >
            <h2>
              <strong>Support</strong>
            </h2>
            <p>Contact our lovely support team</p>
          </div>

          <div className="feedback-footer">Feedback</div>
        </div>
      )}
    </>
  );
};

export default FeedbackOptions;
