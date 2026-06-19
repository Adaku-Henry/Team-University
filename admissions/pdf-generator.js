/* =========================================================
   PDF GENERATOR - Multi-page application slip with university branding
   Uses jsPDF and jspdf-autotable
   ========================================================= */

const PDFGen = (() => {
  // University brand colors (RGB)
  const COLORS = {
    navy:    [10, 37, 64],
    navyDk:  [6, 26, 46],
    navyLt:  [26, 74, 122],
    gold:    [201, 169, 97],
    goldDk:  [184, 134, 11],
    goldLt:  [232, 196, 104],
    cream:   [245, 241, 232],
    gray:    [100, 100, 100],
    grayLt:  [200, 200, 200],
    success: [22, 121, 76],
    danger:  [179, 45, 45],
    white:   [255, 255, 255]
  };

  // University info (the header on every page)
  const UNIV = {
    name: 'BENCHMARK BUSINESS COLLEGE',
    tagline: 'Business, Technical & Professional Education',
    motto: '"Excellence Through Innovation"',
    address: 'Plot 24, Kampala Road, Kampala, Uganda',
    phone: '+256 782 900 765 | +256 700 123 456',
    email: 'admissions@benchmark.ac.ug',
    website: 'www.benchmark.ac.ug',
    poBox: 'P.O. Box 12345, Kampala',
    founded: 'Est. 2010'
  };

  function createDoc() {
    const { jsPDF } = window.jspdf;
    return new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
  }

  // ----- HEADER on every page -----
  function drawHeader(doc, pageNum, totalPages, appId) {
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const margin = 12;

    // Top navy bar
    doc.setFillColor(...COLORS.navy);
    doc.rect(0, 0, pageW, 38, 'F');

    // Gold accent strip
    doc.setFillColor(...COLORS.gold);
    doc.rect(0, 38, pageW, 1.5, 'F');

    // Logo (shield with book & torch) - drawn as vector
    drawLogo(doc, margin + 8, 19, 14);

    // University name (right of logo)
    doc.setTextColor(...COLORS.gold);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(15);
    doc.text(UNIV.name, margin + 26, 13);

    doc.setTextColor(...COLORS.cream);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.text(UNIV.tagline, margin + 26, 18);

    doc.setFontSize(7.5);
    doc.setTextColor(...COLORS.gold);
    doc.text(UNIV.motto, margin + 26, 22);

    // Right-side contact info
    doc.setFontSize(7);
    doc.setTextColor(...COLORS.cream);
    const rightX = pageW - margin;
    doc.text(UNIV.address, rightX, 11, { align: 'right' });
    doc.text(`☎ ${UNIV.phone}`, rightX, 15, { align: 'right' });
    doc.text(`✉ ${UNIV.email}`, rightX, 19, { align: 'right' });
    doc.text(`🌐 ${UNIV.website}`, rightX, 23, { align: 'right' });
    doc.text(UNIV.poBox, rightX, 27, { align: 'right' });

    // Application ID badge (top right corner)
    if (appId) {
      doc.setFillColor(...COLORS.gold);
      doc.roundedRect(pageW - margin - 50, 30, 48, 6, 1, 1, 'F');
      doc.setTextColor(...COLORS.navy);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.text(`APP ID: ${appId}`, pageW - margin - 26, 34, { align: 'center' });
    }

    // Page number / total
    doc.setTextColor(...COLORS.cream);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.text(`Page ${pageNum} of ${totalPages}`, pageW - margin, 35.5, { align: 'right' });
  }

  // ----- FOOTER on every page -----
  function drawFooter(doc, pageNum) {
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const margin = 12;

    // Gold line
    doc.setDrawColor(...COLORS.gold);
    doc.setLineWidth(0.4);
    doc.line(margin, pageH - 16, pageW - margin, pageH - 16);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...COLORS.gray);
    doc.text(
      'This is a system-generated document. Verify authenticity via admissions@benchmark.ac.ug',
      margin, pageH - 11
    );
    doc.text(
      `Generated: ${new Date().toLocaleString()}`,
      margin, pageH - 7
    );
    doc.setTextColor(...COLORS.navy);
    doc.setFont('helvetica', 'bold');
    doc.text(
      `BBC-ADM-${Date.now().toString().slice(-8)}`,
      pageW - margin, pageH - 7, { align: 'right' }
    );
  }

  // ----- LOGO as vector drawing -----
  function drawLogo(doc, x, y, size) {
    // Shield outline
    doc.setFillColor(...COLORS.navy);
    doc.setDrawColor(...COLORS.gold);
    doc.setLineWidth(0.4);
    // Simple shield path
    const cx = x, cy = y, s = size / 2;
    doc.lines(
      [[s, 0], [0, s * 0.7], [-s, s * 0.3], [-s, -s * 0.3], [0, -s * 0.7]],
      cx - s, cy - s * 0.5,
      [1, 1],
      'FD'
    );

    // Open book symbol
    doc.setFillColor(...COLORS.cream);
    doc.roundedRect(cx - 3, cy - 1, 2.5, 3, 0.3, 0.3, 'F');
    doc.roundedRect(cx + 0.5, cy - 1, 2.5, 3, 0.3, 0.3, 'F');

    // BBC text
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6);
    doc.setTextColor(...COLORS.gold);
    doc.text('BBC', cx, cy + 4, { align: 'center' });
  }

  // ----- Section title bar -----
  function drawSectionTitle(doc, title, y, pageW, margin = 12) {
    doc.setFillColor(...COLORS.navy);
    doc.rect(margin, y, pageW - margin * 2, 8, 'F');
    // Gold left accent
    doc.setFillColor(...COLORS.gold);
    doc.rect(margin, y, 3, 8, 'F');
    doc.setTextColor(...COLORS.gold);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.text(title, margin + 6, y + 5.5);
    return y + 12;
  }

  // ----- Field row -----
  function drawField(doc, label, value, x, y, w, h = 8) {
    // Label
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(...COLORS.gray);
    doc.text(label.toUpperCase(), x, y);

    // Value box
    doc.setDrawColor(...COLORS.grayLt);
    doc.setFillColor(...COLORS.cream);
    doc.setLineWidth(0.2);
    doc.roundedRect(x, y + 1.2, w, h - 1.5, 0.5, 0.5, 'FD');

    // Value text
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...COLORS.navy);
    const display = (value && value.toString().trim()) ? value.toString() : '—';
    doc.text(display, x + 2, y + 5.8);
  }

  // ----- Status pill -----
  function drawStatusPill(doc, status, x, y, w = 30) {
    const colors = {
      'Submitted':       [13, 106, 158],
      'Under Review':    [183, 110, 0],
      'Document Verification': [183, 110, 0],
      'Department Review': [13, 106, 158],
      'Approved':        [22, 121, 76],
      'Rejected':        [179, 45, 45]
    };
    const c = colors[status] || COLORS.gray;
    doc.setFillColor(...c);
    doc.roundedRect(x, y, w, 6, 1, 1, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.text(status, x + w / 2, y + 4, { align: 'center' });
  }

  // ----- MAIN: generateApplicationPDF -----
  function generateApplicationPDF(app) {
    if (!app) throw new Error('No application data provided.');
    const doc = createDoc();
    const pageW = doc.internal.pageSize.getWidth();   // 210
    const pageH = doc.internal.pageSize.getHeight();  // 297
    const margin = 12;
    const contentW = pageW - margin * 2;

    const totalPages = 5;
    const appId = app.appId || app.id || 'BBC-' + Date.now();
    const status = app.status || 'Submitted';

    // ============== PAGE 1: COVER ==============
    drawHeader(doc, 1, totalPages, appId);
    drawFooter(doc, 1);

    let y = 50;

    // Title block
    doc.setFillColor(...COLORS.gold);
    doc.rect(margin, y, contentW, 12, 'F');
    doc.setTextColor(...COLORS.navy);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('OFFICIAL APPLICATION FORM', pageW / 2, y + 8, { align: 'center' });
    y += 18;

    // Subtitle
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(10);
    doc.setTextColor(...COLORS.gray);
    doc.text(`${app.intake || 'Intake TBD'}  |  ${app.campus || 'Main Campus'}  |  ${app.studyMode || 'Day'}`,
      pageW / 2, y, { align: 'center' });
    y += 8;

    // Status pill
    drawStatusPill(doc, status, (pageW - 50) / 2, y, 50);
    y += 14;

    // Photo placeholder box (right side) and basic info (left)
    const photoX = pageW - margin - 38;
    const photoY = y;
    const photoW = 38, photoH = 45;
    doc.setFillColor(...COLORS.cream);
    doc.setDrawColor(...COLORS.gold);
    doc.setLineWidth(0.6);
    doc.roundedRect(photoX, photoY, photoW, photoH, 1, 1, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...COLORS.gold);
    doc.text('PASSPORT', photoX + photoW / 2, photoY + 8, { align: 'center' });
    doc.text('PHOTO', photoX + photoW / 2, photoY + 12, { align: 'center' });
    doc.setFontSize(7);
    doc.setTextColor(...COLORS.gray);
    doc.text('Attach here', photoX + photoW / 2, photoY + photoH / 2 + 2, { align: 'center' });

    const leftW = contentW - photoW - 6;
    // Personal summary fields on left
    const fields = [
      ['Application ID', appId],
      ['Surname', app.surname],
      ['First Name', app.firstName],
      ['Other Names', app.otherNames || '—'],
      ['Gender', app.gender],
      ['Date of Birth', app.dob ? new Date(app.dob).toLocaleDateString() : '—'],
      ['Nationality', app.nationality],
      ['National ID / Passport', app.nin]
    ];
    let fy = y;
    fields.forEach(([label, value], i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const fx = margin + col * (leftW / 2);
      const fyy = fy + row * 10;
      drawField(doc, label, value, fx, fyy, leftW / 2 - 2);
    });

    y = photoY + photoH + 8;

    // Application details section
    y = drawSectionTitle(doc, 'APPLICATION DETAILS', y, pageW, margin);
    const appDetails = [
      ['Application Type', app.applicationType],
      ['Programme (1st Choice)', app.firstChoice],
      ['Programme (2nd Choice)', app.secondChoice],
      ['Sponsorship', app.sponsorship],
      ['Referred By', app.referralSource || '—'],
      ['How did you hear about us?', app.referralSource || '—']
    ];
    appDetails.forEach(([label, value], i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const fx = margin + col * (contentW / 2);
      const fyy = y + row * 10;
      drawField(doc, label, value, fx, fyy, contentW / 2 - 2);
    });
    y += Math.ceil(appDetails.length / 2) * 10 + 4;

    // Documents submitted
    y = drawSectionTitle(doc, 'DOCUMENTS SUBMITTED', y, pageW, margin);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...COLORS.navy);

    const docs = [
      ['Passport Photo', app.docs?.passport ? '✓ Uploaded' : '✗ Missing'],
      ['National ID / Passport', app.docs?.nin ? '✓ Uploaded' : '✗ Missing'],
      ['O-Level Result Slip', app.docs?.olevel ? '✓ Uploaded' : '✗ Missing'],
      ['A-Level / Diploma', app.docs?.higher ? '✓ Uploaded' : 'Not Applicable'],
      ['Recommendation Letter', app.docs?.recommendation ? '✓ Uploaded' : 'Not Applicable'],
      ['Birth Certificate', app.docs?.birth ? '✓ Uploaded' : 'Not Applicable']
    ];
    docs.forEach(([label, status], i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const fx = margin + col * (contentW / 2);
      const fyy = y + row * 7;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(...COLORS.navy);
      doc.text(`• ${label}:`, fx, fyy);
      doc.setFont('helvetica', 'normal');
      const isOk = status.startsWith('✓');
      doc.setTextColor(...(isOk ? COLORS.success : COLORS.gray));
      doc.text(status, fx + 50, fyy);
    });
    y += Math.ceil(docs.length / 2) * 7 + 4;

    // Office use box
    doc.setDrawColor(...COLORS.navy);
    doc.setLineWidth(0.4);
    doc.setFillColor(...COLORS.cream);
    doc.roundedRect(margin, y, contentW, 18, 1, 1, 'FD');
    doc.setTextColor(...COLORS.navy);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('FOR OFFICE USE ONLY', margin + 4, y + 5);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text(`Received By: _______________________   Date: ___________   Receipt No: ___________`,
      margin + 4, y + 11);
    doc.text(`Officer Remarks: _________________________________________________________`,
      margin + 4, y + 15);

    // ============== PAGE 2: PERSONAL & CONTACT ==============
    doc.addPage();
    drawHeader(doc, 2, totalPages, appId);
    drawFooter(doc, 2);
    y = 50;

    y = drawSectionTitle(doc, 'PERSONAL INFORMATION', y, pageW, margin);
    const personal = [
      ['Surname', app.surname],
      ['First Name', app.firstName],
      ['Other Names', app.otherNames],
      ['Maiden Name', app.maidenName],
      ['Gender', app.gender],
      ['Date of Birth', app.dob ? new Date(app.dob).toLocaleDateString() : '—'],
      ['Place of Birth', app.placeOfBirth],
      ['Age', app.dob ? calculateAge(app.dob) + ' years' : '—'],
      ['Marital Status', app.maritalStatus],
      ['Religion', app.religion],
      ['Nationality', app.nationality],
      ['Disability Status', app.disability]
    ];
    personal.forEach(([label, value], i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const fx = margin + col * (contentW / 2);
      const fyy = y + row * 9;
      drawField(doc, label, value, fx, fyy, contentW / 2 - 2);
    });
    y += Math.ceil(personal.length / 2) * 9 + 4;

    y = drawSectionTitle(doc, 'CONTACT INFORMATION', y, pageW, margin);
    const contact = [
      ['Email Address', app.email],
      ['Phone Number', app.phone],
      ['Alternative Phone', app.altPhone],
      ['Country of Residence', app.country],
      ['District / City', app.district],
      ['Sub-County / Division', app.subcounty]
    ];
    contact.forEach(([label, value], i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const fx = margin + col * (contentW / 2);
      const fyy = y + row * 9;
      drawField(doc, label, value, fx, fyy, contentW / 2 - 2);
    });
    // Full-width address
    drawField(doc, 'Physical Address', app.address, margin, y + Math.ceil(contact.length / 2) * 9, contentW, 9);
    y += Math.ceil(contact.length / 2) * 9 + 12;

    y = drawSectionTitle(doc, 'NEXT OF KIN / EMERGENCY CONTACT', y, pageW, margin);
    const kin = [
      ['Full Name', app.kinName],
      ['Relationship', app.relationship],
      ['Phone Number', app.kinPhone],
      ['Email', app.kinEmail],
      ['Occupation', app.kinOccupation],
      ['Address', app.kinAddress]
    ];
    kin.forEach(([label, value], i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const fx = margin + col * (contentW / 2);
      const fyy = y + row * 9;
      drawField(doc, label, value, fx, fyy, contentW / 2 - 2);
    });

    // ============== PAGE 3: ACADEMIC ==============
    doc.addPage();
    drawHeader(doc, 3, totalPages, appId);
    drawFooter(doc, 3);
    y = 50;

    y = drawSectionTitle(doc, 'O-LEVEL / UCE ACADEMIC RECORD', y, pageW, margin);
    const uce = [
      ['School Name', app.uceSchool],
      ['Index Number', app.uceIndex],
      ['Year Completed', app.uceYear],
      ['Examination Body', app.uceBody]
    ];
    uce.forEach(([label, value], i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const fx = margin + col * (contentW / 2);
      const fyy = y + row * 9;
      drawField(doc, label, value, fx, fyy, contentW / 2 - 2);
    });
    y += Math.ceil(uce.length / 2) * 9 + 6;

    // O-Level results table
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...COLORS.navy);
    doc.text('O-Level Subject Results', margin, y);
    y += 4;

    doc.autoTable({
      startY: y,
      head: [['Subject', 'Grade', 'Subject', 'Grade']],
      body: [
        ['English Language', app.englishGrade || '—', 'Mathematics', app.mathGrade || '—'],
        ['Biology', app.biologyGrade || '—', 'Chemistry', app.chemistryGrade || '—'],
        ['Physics', app.physicsGrade || '—', 'Geography', app.geographyGrade || '—'],
        ['History', app.historyGrade || '—', 'Economics', app.economicsGrade || '—'],
        ['Entrepreneurship', app.entrepreneurshipGrade || '—', 'Computer Studies', app.computerGrade || '—']
      ],
      theme: 'grid',
      styles: {
        fontSize: 9, cellPadding: 2.5,
        textColor: COLORS.navy,
        lineColor: COLORS.grayLt
      },
      headStyles: {
        fillColor: COLORS.navy,
        textColor: COLORS.gold,
        fontStyle: 'bold'
      },
      alternateRowStyles: { fillColor: [245, 241, 232] },
      columnStyles: {
        0: { fontStyle: 'bold' },
        2: { fontStyle: 'bold' }
      },
      margin: { left: margin, right: margin }
    });
    y = doc.lastAutoTable.finalY + 8;

    y = drawSectionTitle(doc, 'A-LEVEL / HIGHER EDUCATION', y, pageW, margin);
    const higher = [
      ['Institution', app.higherInstitution],
      ['Qualification', app.higherQualification],
      ['Programme / Combination', app.higherProgramme],
      ['Year Completed', app.higherYear],
      ['Grade / GPA', app.higherGrade],
      ['Registration No', app.higherRegNo]
    ];
    higher.forEach(([label, value], i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const fx = margin + col * (contentW / 2);
      const fyy = y + row * 9;
      drawField(doc, label, value, fx, fyy, contentW / 2 - 2);
    });
    y += Math.ceil(higher.length / 2) * 9 + 6;

    y = drawSectionTitle(doc, 'WORK EXPERIENCE', y, pageW, margin);
    const work = [
      ['Currently Employed', app.employed],
      ['Years of Experience', app.workYears],
      ['Current / Last Employer & Role', app.employer]
    ];
    work.forEach(([label, value], i) => {
      const fx = i === 2 ? margin : margin + (i % 2) * (contentW / 2);
      const fyy = y + (i === 2 ? 18 : Math.floor(i / 2) * 9);
      const fw = i === 2 ? contentW : contentW / 2 - 2;
      drawField(doc, label, value, fx, fyy, fw);
    });

    // ============== PAGE 4: REFEREES & STATEMENT ==============
    doc.addPage();
    drawHeader(doc, 4, totalPages, appId);
    drawFooter(doc, 4);
    y = 50;

    y = drawSectionTitle(doc, 'REFEREE 1', y, pageW, margin);
    const ref1 = [
      ['Full Name', app.ref1Name],
      ['Position / Title', app.ref1Title],
      ['Organization', app.ref1Org],
      ['Phone', app.ref1Phone],
      ['Email', app.ref1Email],
      ['Relationship', app.ref1Relation]
    ];
    ref1.forEach(([label, value], i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const fx = margin + col * (contentW / 2);
      const fyy = y + row * 9;
      drawField(doc, label, value, fx, fyy, contentW / 2 - 2);
    });
    y += Math.ceil(ref1.length / 2) * 9 + 6;

    y = drawSectionTitle(doc, 'REFEREE 2', y, pageW, margin);
    const ref2 = [
      ['Full Name', app.ref2Name],
      ['Position / Title', app.ref2Title],
      ['Organization', app.ref2Org],
      ['Phone', app.ref2Phone],
      ['Email', app.ref2Email],
      ['Relationship', app.ref2Relation]
    ];
    ref2.forEach(([label, value], i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const fx = margin + col * (contentW / 2);
      const fyy = y + row * 9;
      drawField(doc, label, value, fx, fyy, contentW / 2 - 2);
    });
    y += Math.ceil(ref2.length / 2) * 9 + 6;

    y = drawSectionTitle(doc, 'STATEMENT OF PURPOSE', y, pageW, margin);
    doc.setFillColor(...COLORS.cream);
    doc.setDrawColor(...COLORS.grayLt);
    doc.roundedRect(margin, y, contentW, 65, 1, 1, 'FD');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(...COLORS.navy);
    const statementText = app.statement || 'No statement provided.';
    const lines = doc.splitTextToSize(statementText, contentW - 6);
    doc.text(lines, margin + 3, y + 6);
    y += 70;

    y = drawSectionTitle(doc, 'PAYMENT INFORMATION', y, pageW, margin);
    const pay = [
      ['Application Fee', 'UGX 50,000'],
      ['Payment Method', app.paymentMethod],
      ['Transaction Reference', app.paymentReference],
      ['Payment Date', app.paymentDate ? new Date(app.paymentDate).toLocaleDateString() : '—'],
      ['Amount Paid', app.paymentAmount ? `UGX ${Number(app.paymentAmount).toLocaleString()}` : '—']
    ];
    pay.forEach(([label, value], i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const fx = margin + col * (contentW / 2);
      const fyy = y + row * 9;
      drawField(doc, label, value, fx, fyy, contentW / 2 - 2);
    });

    // ============== PAGE 5: DECLARATION & APPROVAL ==============
    doc.addPage();
    drawHeader(doc, 5, totalPages, appId);
    drawFooter(doc, 5);
    y = 50;

    y = drawSectionTitle(doc, 'APPLICANT DECLARATION', y, pageW, margin);
    doc.setFillColor(...COLORS.cream);
    doc.setDrawColor(...COLORS.gold);
    doc.setLineWidth(0.4);
    doc.roundedRect(margin, y, contentW, 50, 1, 1, 'FD');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(...COLORS.navy);
    const declaration = `I, ${app.firstName || '____'} ${app.surname || '____'}, hereby declare that all the information provided in this application form is true, complete, and accurate to the best of my knowledge. I understand that any false or misleading information may result in the rejection of my application or revocation of admission if granted.`;
    const decLines = doc.splitTextToSize(declaration, contentW - 8);
    doc.text(decLines, margin + 4, y + 6);
    doc.setFont('helvetica', 'bold');
    doc.text(`Applicant Name: ${app.firstName || ''} ${app.surname || ''}`, margin + 4, y + 30);
    doc.text(`Application ID: ${appId}`, margin + 4, y + 35);
    doc.text(`Date Submitted: ${new Date().toLocaleDateString()}`, margin + 4, y + 40);
    doc.text('Signature: ____________________________', margin + 4, y + 47);
    y += 58;

    y = drawSectionTitle(doc, 'ADMINISTRATIVE REVIEW', y, pageW, margin);
    doc.autoTable({
      startY: y,
      head: [['Stage', 'Reviewer', 'Date', 'Status', 'Comments']],
      body: [
        ['Application Received', '____________', '____________', app.status || 'Submitted', ''],
        ['Document Verification', '____________', '____________', '________', ''],
        ['Department Review', '____________', '____________', '________', ''],
        ['Final Decision', '____________', '____________', '________', '']
      ],
      theme: 'grid',
      styles: {
        fontSize: 8.5, cellPadding: 3,
        textColor: COLORS.navy,
        lineColor: COLORS.grayLt
      },
      headStyles: {
        fillColor: COLORS.navy,
        textColor: COLORS.gold,
        fontStyle: 'bold'
      },
      alternateRowStyles: { fillColor: [245, 241, 232] },
      columnStyles: {
        0: { fontStyle: 'bold', cellWidth: 38 },
        3: { cellWidth: 30, halign: 'center', fontStyle: 'bold' }
      },
      margin: { left: margin, right: margin }
    });
    y = doc.lastAutoTable.finalY + 10;

    // Final approval box
    doc.setFillColor(...COLORS.navy);
    doc.roundedRect(margin, y, contentW, 30, 1, 1, 'F');
    doc.setTextColor(...COLORS.gold);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('OFFICIAL ADMISSION DECISION', pageW / 2, y + 7, { align: 'center' });
    doc.setFontSize(9);
    doc.setTextColor(...COLORS.cream);
    doc.text(`Application ID: ${appId}`, pageW / 2, y + 14, { align: 'center' });
    doc.text('☐ APPROVED    ☐ CONDITIONALLY APPROVED    ☐ REJECTED    ☐ PENDING', pageW / 2, y + 22, { align: 'center' });

    // Add QR-like reference square (decorative)
    doc.setFillColor(...COLORS.gold);
    doc.rect(margin + 4, y + 4, 6, 6, 'F');
    doc.setTextColor(...COLORS.navy);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.text('✓', margin + 7, y + 8.5, { align: 'center' });

    return doc;
  }

  function calculateAge(dob) {
    const birth = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  }

  // Download as file
  function downloadPdf(doc, filename) {
    doc.save(filename);
  }

  // Open in new tab
  function openPdf(doc) {
    const blob = doc.output('blob');
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  }

  return { generateApplicationPDF, downloadPdf, openPdf, UNIV };
})();

window.PDFGen = PDFGen;

