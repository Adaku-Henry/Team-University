# Benchmark Business College — Enterprise Admissions System

A comprehensive, enterprise-grade online admission portal with multi-stage application, multi-page PDF generation, SMS-based verification, document upload tracking, and an admin review panel.

## Features

### For Applicants
- **7-Stage Application Form** — Guided, validated, auto-saved
  1. Applicant Category (type, intake, mode, sponsorship, campus, referral)
  2. Personal, Contact & Next of Kin (full demographic capture)
  3. Programme Selection (22+ programmes, school filter, search)
  4. Academic Qualifications (UCE + UACE + work experience)
  5. Document Upload (passport, ID, certificates, transcripts)
  6. Referees, Statement & Payment (2 referees + 50-word statement + fee)
  7. Review & Submit
- **Multi-Page PDF Slip** — 5 pages with university logo, branding, all details
- **SMS Verification** — Code sent on registration & password reset
- **Real-Time Dashboard** — Progress tracker, document status, notifications
- **Profile & Security** — Update info, change password via SMS code

### For Administrators
- **Live Stats** — Total, pending, approved, rejected
- **Filtering** — By name, ID, email, programme, intake, status
- **CSV Export** — Download all applications
- **Approval Workflow** — View, approve, reject with audit trail
- **Analytics** — Top programme, intake, gender split, sponsorship
- **Demo Data Seeder** — 3 sample applications for instant demo

## University Branding
- **Colors**: Deep Navy (`#0a2540`) + Gold (`#c9a961`)
- **Logo**: Custom SVG shield with book & torch
- **PDF**: Branded header on every page with logo, address, contact, app ID
- **Print**: Print-optimized application slip

## File Structure
```
bbc-admissions/
├── index.html              # Main HTML (5 views + modals)
├── css/
│   └── styles.css          # University brand styling
├── js/
│   ├── auth.js             # Registration, login, SMS verification
│   ├── pdf-generator.js    # Multi-page PDF with jsPDF
│   └── app.js              # Main app logic
└── assets/
    └── logo.svg            # University logo
```

## How to Run
Open `index.html` in a modern browser. No build step, no backend required.

```bash
# Option 1: open directly
open index.html

# Option 2: serve with Python
python3 -m http.server 8000
# → http://localhost:8000
```

## Test Flow

1. **Register** — Use any email + phone (e.g. `+256782900765`). SMS code is shown in modal (since this is a demo, no real SMS gateway is connected). Enter the displayed code to verify.
2. **Apply** — Walk through all 7 stages. Progress is auto-saved to localStorage.
3. **Submit** — Get a unique Application ID (e.g. `BBC-2026-70001`).
4. **Download PDF** — 5-page branded PDF with logo and all your details.
5. **Dashboard** — Track your progress, view documents, update profile, change password.
6. **Admin** — Click "Admin" in nav → "Seed Demo Data" to see the analytics panel populate with 3 sample apps. Filter, view, approve/reject, export CSV.

## Tech Stack
- **Frontend**: Pure HTML/CSS/JS (no framework)
- **PDF**: jsPDF + jspdf-autotable (CDN)
- **Storage**: localStorage (for demo)
- **SMS**: Simulated in-modal display (in production, integrate with Africa's Talking, Twilio, or similar)
- **Auth**: Plain localStorage (in production, use bcrypt + JWT + HTTPS)

## Production Notes
For a real deployment:
- Replace localStorage with a database (PostgreSQL, MongoDB)
- Hash passwords with bcrypt server-side
- Use JWT for sessions with HTTP-only cookies
- Integrate real SMS gateway (Africa's Talking, Twilio)
- Add file storage (S3, Google Cloud Storage)
- Add audit logging for admin actions
- Enable HTTPS, CORS, rate limiting
- Use a backend (Node.js/Express, Django, Laravel, etc.)

## PDF Slip Contents
- **Page 1**: Cover with photo placeholder, personal summary, application details, document checklist, office use
- **Page 2**: Full personal information, contact, next of kin
- **Page 3**: O-Level results table, A-Level/higher education, work experience
- **Page 4**: Referee 1 & 2, statement of purpose, payment information
- **Page 5**: Declaration, administrative review table, official decision box

## License
© 2026 Benchmark Business College. All Rights Reserved.

