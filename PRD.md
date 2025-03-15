# Product Requirements Document (PRD) - Conference Web App

## 1. Overview

### 1.1 Purpose

The **Conference Web App** aims to provide an interactive digital platform for the NASPAG ACRM 2025 conference, facilitating smooth event management, session engagement, and networking opportunities for all stakeholders, including administrators, attendees, speakers, and staff.

### 1.2 Goals & Objectives

- Provide an intuitive interface for attendees to browse schedules, register for sessions, and network with peers.
- Enable conference administrators to manage schedules, speakers, and attendees.
- Offer speakers tools to engage with attendees before, during, and after their sessions.
- Assist conference staff with logistical and operational support through the app.
- Support **Continuing Medical Education (CME) tracking** in collaboration with MedStar Health and NASPAG.
- Provide **on-demand access** to plenary sessions and select workshops post-event.
- Facilitate **abstract submissions** for research and innovations in Pediatric and Adolescent Gynecology (PAG).
- Manage exhibitor and sponsor participation with enhanced engagement tools.

## 2. User Roles & Features

### 2.1 Multi-Role User Management
Users may hold multiple roles simultaneously. For example, an admin might also be a speaker and an attendee. The system should support:
- **Role-Based Access Control (RBAC):** Allow users to seamlessly switch between roles based on their assigned permissions.
- **Unified Dashboard:** Provide a single interface where users can access functionalities relevant to all their roles.
- **Role-Specific Notifications:** Users receive alerts and updates relevant to each of their roles.
- **Consolidated Schedule Management:** Display all relevant sessions, responsibilities, and networking opportunities in one place.

### 2.2 Conference Admins

#### Session Types

The conference will feature multiple types of sessions to accommodate different learning and networking formats:

- **Plenary Sessions:** Large-scale sessions featuring keynote speakers or panel discussions.
- **Workshops:** Interactive, hands-on sessions designed for skill development.
- **Luncheon Sessions:** Informal sessions that take place during meal times, often featuring guest speakers or networking opportunities.
- **Mentorship Sessions:** Targeted sessions designed for mentorship and guidance in PAG.

**Responsibilities:** Manage conference setup, schedules, speakers, and attendee registrations.
**Key Features:**

- **Dashboard:** Overview of conference events, attendee stats, and engagement metrics.
- **Session Management:** Add/edit/delete conference sessions, assign speakers.
- **Speaker Management:** Add bios, presentation materials, and schedules.
- **Attendee Management:** View attendee registrations, send announcements.
- **Exhibitor & Sponsor Management:** Manage sponsor listings and exhibitor booths.
- **Communication Tools:** Send notifications, email updates, and emergency alerts.
- **Abstract Submission Management:** Accept and review research abstracts for presentation.
- **CME Tracking:** Provide tools for attendees to track Continuing Medical Education (CME) credits.

### 2.3 Attendees

**Responsibilities:** Engage with conference content, network, and attend sessions.
**Key Features:**

- **Personalized Schedule:** Bookmark and register for sessions.
- **Venue Maps & Navigation:** Interactive maps to find session locations and exhibitor booths.
- **Onsite Check-in & Badge Scanning:** QR-based check-in for sessions and networking events.
- **Networking:** AI-powered matchmaking for in-person meetups, direct messaging.
- **Exhibitor & Sponsor Directory:** Browse onsite exhibitors and sponsors.
- **Interactive Features:** Polls, surveys, and session Q&A submission.
- **Session Feedback:** Rate sessions and submit questions.
- **CME Credit Tracking:** Log and track credits for eligible sessions.
- **On-Demand Content Access:** View recorded sessions and materials post-event.

### 2.4 Speakers & Facilitators

**Responsibilities:** Conduct sessions, engage with attendees, and provide resources.
**Key Features:**

- **Speaker Dashboard:** View assigned sessions, upload presentation materials.
- **Session Tools:** In-app Q&A moderation, audience engagement analytics.
- **Networking:** Connect with attendees and co-presenters.
- **Post-Session Engagement:** Share slides, respond to follow-up questions.
- **Abstract Submission & Review:** Submit research abstracts and receive feedback.

### 2.5 Conference Staff

**Responsibilities:** Ensure operational efficiency, handle technical support.
**Key Features:**

- **Real-time Updates:** View session changes, speaker updates.
- **Technical Support Tools:** Troubleshooting assistance for attendees and speakers.
- **Venue Logistics Management:** Monitor room availability, handle session transitions.

## 3. User Journeys & Functional Requirements

### 3.1 Example User Flows

#### 3.1.1 Admin: Setting Up a Session

1. Log in to the admin dashboard.
2. Navigate to 'Session Management.'
3. Click 'Create New Session' and enter details (title, description, speakers, time slot, and session type: Plenary, Workshop, Luncheon, Mentorship, or Hands-on Workshop).
4. Assign speakers and enable interactive features (polls, Q&A).
5. Save and publish the session.

#### 3.1.2 Attendee: Navigating the Conference

1. Log in and browse the event schedule.
2. Use the venue map to locate session rooms and exhibitor booths.
3. Scan QR code for session check-in.
4. Submit questions via the app for live Q&A.
5. Receive push notifications for session reminders and updates.

#### 3.1.3 Speaker: Uploading Presentation Materials

1. Log in and access 'Speaker Dashboard.'
2. Navigate to assigned sessions.
3. Upload slides and supplemental resources.
4. Enable in-app question submission and attendee engagement features.

#### 3.1.4 Staff: Resolving a Technical Issue

1. Receive a support ticket in the admin dashboard.
2. Access user logs and troubleshoot the issue.
3. Respond with a resolution or escalate as needed.

## 4. Third-Party Integrations

- **Onsite Badge Scanning:** Integration with QR-based check-in solutions.
- **Push Notifications:** Firebase for real-time updates and announcements.
- **AI Matchmaking:** NLP-based attendee networking recommendations.
- **CME Tracking System:** Integration with MedStar Health for credit validation.
- **Abstract Review Platform:** A submission and review system for research abstracts.

## 5. Success Metrics & Acceptance Criteria

- **CME Credit Logins:** Number of attendees using CME tracking.
- **Abstract Submissions:** Number of abstracts submitted and reviewed.
- **On-Demand Content Engagement:** Post-event viewership metrics.
- **Session Attendance:** % of attendees checking into sessions via QR scan.

## 6. Conclusion

This conference web app will enhance the in-person event experience by streamlining **session management, attendee engagement, CME tracking, exhibitor interactions, and research presentation management**, ensuring seamless event execution for all stakeholders. 