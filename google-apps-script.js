/**
 * HOTA Creative Agency – Contact Form Handler
 * Google Apps Script (contact form only)
 *
 * Setup:
 *  1. Create a Google Sheet and copy its ID into SHEET_ID below
 *  2. Go to Extensions → Apps Script → paste this code
 *  3. Deploy → New deployment → Web App
 *        Execute as: Me | Who has access: Anyone
 *  4. Copy the deployment URL into your React app (APPS_SCRIPT_URL in ContactPage)
 */

// ═══════════════════════ CONFIG ═══════════════════════
const ADMIN_EMAIL = "hotacreatives@gmail.com";
const SHEET_ID = "YOUR_SHEET_ID_HERE"; // ← paste your Google Sheet ID

// ═══════════════════════ WEB APP ENTRY ═══════════════════════
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    return handleContactForm(data);
  } catch (err) {
    Logger.log("doPost error: " + err);
    return jsonResponse(false, "Server error – please try again.");
  }
}

// Allow preflight / health-check
function doGet() {
  return jsonResponse(true, "HOTA Contact API is live.");
}

// ═══════════════════════ CONTACT HANDLER ═══════════════════════
function handleContactForm(data) {
  try {
    // 1. Record in Google Sheets
    var sheet = getOrCreateSheet("Contact_Submissions");

    if (sheet.getLastRow() === 0) {
      var headers = [
        "Timestamp",
        "Name",
        "Email",
        "Phone",
        "Company",
        "Service",
        "Budget",
        "Message",
        "Status",
      ];
      sheet.appendRow(headers);
      var hdr = sheet.getRange(1, 1, 1, headers.length);
      hdr.setFontWeight("bold");
      hdr.setBackground("#BFFF0B");
      hdr.setFontColor("#000000");
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      new Date(),
      data.name || "",
      data.email || "",
      data.phone || "",
      data.company || "",
      data.service || "",
      data.budget || "",
      data.message || "",
      "New",
    ]);

    // 2. Thank-you email → user
    sendThankYouEmail(data);

    // 3. Notification email → admin
    sendAdminNotification(data);

    return jsonResponse(true, "Form submitted successfully!");
  } catch (err) {
    Logger.log("handleContactForm error: " + err);
    return jsonResponse(false, "Could not process your submission.");
  }
}

// ═══════════════════════ EMAILS ═══════════════════════

/** Thank-you email sent to the person who filled the form */
function sendThankYouEmail(d) {
  var serviceLabel = formatService(d.service);

  var html =
    "<!DOCTYPE html>" +
    '<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>' +
    '<body style="margin:0;padding:0;background:#0A0A0A;font-family:Inter,Helvetica,Arial,sans-serif;color:#E0E0E0;">' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0A0A0A;">' +
    '<tr><td align="center" style="padding:40px 16px;">' +
    '<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border-radius:16px;overflow:hidden;background:#111111;">' +
    // Header
    '<tr><td style="background:#0A0A0A;padding:40px 32px 24px;text-align:center;border-bottom:2px solid #BFFF0B;">' +
    '<h1 style="margin:0;font-size:36px;font-weight:900;letter-spacing:-1px;color:#BFFF0B;">HOTA</h1>' +
    '<p style="margin:6px 0 0;font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#888;">India\'s Creative Growth Agency</p>' +
    "</td></tr>" +
    // Body
    '<tr><td style="padding:36px 32px;">' +
    '<h2 style="margin:0 0 8px;font-size:24px;font-weight:800;color:#FFFFFF;">Hey ' +
    (d.name || "there") +
    "! &#128075;</h2>" +
    '<p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:#B0B0B0;">Thanks for reaching out. We\'ve received your message and our team is already on it.</p>' +
    // Timeline card
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#1A1A1A;border-radius:12px;border-left:4px solid #BFFF0B;margin:0 0 24px;">' +
    '<tr><td style="padding:20px 24px;">' +
    '<p style="margin:0 0 12px;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#BFFF0B;">What happens next</p>' +
    '<table role="presentation" cellpadding="0" cellspacing="0">' +
    '<tr><td style="padding:6px 0;font-size:14px;color:#E0E0E0;">&#9889; &nbsp;Team reviews your request <strong style="color:#BFFF0B;">within 24 hours</strong></td></tr>' +
    '<tr><td style="padding:6px 0;font-size:14px;color:#E0E0E0;">&#128222; &nbsp;We\'ll reach out via email or WhatsApp</td></tr>' +
    '<tr><td style="padding:6px 0;font-size:14px;color:#E0E0E0;">&#128640; &nbsp;We discuss your ' +
    serviceLabel +
    " goals &amp; craft a plan</td></tr>" +
    "</table>" +
    "</td></tr></table>" +
    // Summary card
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#1A1A1A;border-radius:12px;margin:0 0 28px;">' +
    '<tr><td style="padding:20px 24px;">' +
    '<p style="margin:0 0 12px;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#BFFF0B;">Your submission</p>' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0">' +
    summaryRow("Service", serviceLabel) +
    summaryRow("Budget", d.budget || "Not specified") +
    summaryRow("Company", d.company || "Not specified") +
    "</table>" +
    "</td></tr></table>" +
    // CTA
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0">' +
    '<tr><td align="center" style="padding:4px 0 0;">' +
    '<a href="https://wa.me/919542421108?text=' +
    encodeURIComponent(
      "Hi! I just submitted a contact form on hotacreatives.in",
    ) +
    '" ' +
    'style="display:inline-block;background:#BFFF0B;color:#000;font-size:15px;font-weight:800;padding:14px 36px;border-radius:50px;text-decoration:none;letter-spacing:0.3px;">WhatsApp Us Now</a>' +
    "</td></tr></table>" +
    "</td></tr>" +
    // Footer
    '<tr><td style="background:#0A0A0A;padding:28px 32px;text-align:center;border-top:1px solid #1F1F1F;">' +
    '<p style="margin:0 0 4px;font-size:14px;font-weight:700;color:#BFFF0B;">HOTA Creative Agency</p>' +
    '<p style="margin:0 0 2px;font-size:12px;color:#666;">We Don\'t Post. We Position.</p>' +
    '<p style="margin:0 0 10px;font-size:12px;color:#666;">Kakinada, Andhra Pradesh, India</p>' +
    '<p style="margin:0;font-size:12px;color:#555;">' +
    '<a href="mailto:hotacreatives@gmail.com" style="color:#888;text-decoration:none;">hotacreatives@gmail.com</a>' +
    ' &nbsp;&middot;&nbsp; <a href="tel:+919542421108" style="color:#888;text-decoration:none;">+91 95424 21108</a></p>' +
    '<p style="margin:10px 0 0;font-size:12px;">' +
    '<a href="https://www.instagram.com/hota.creatives" style="color:#888;text-decoration:none;margin:0 8px;">Instagram</a>' +
    '<a href="https://www.linkedin.com/company/hota-creatives/" style="color:#888;text-decoration:none;margin:0 8px;">LinkedIn</a>' +
    '<a href="https://hotacreatives.in" style="color:#888;text-decoration:none;margin:0 8px;">Website</a></p>' +
    "</td></tr>" +
    "</table></td></tr></table></body></html>";

  MailApp.sendEmail({
    to: d.email,
    subject: "We Got Your Message! – HOTA Creatives ✨",
    htmlBody: html,
  });
}

/** Admin notification email */
function sendAdminNotification(d) {
  var serviceLabel = formatService(d.service);
  var now = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  var html =
    "<!DOCTYPE html>" +
    '<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>' +
    '<body style="margin:0;padding:0;background:#0A0A0A;font-family:Inter,Helvetica,Arial,sans-serif;color:#E0E0E0;">' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0A0A0A;">' +
    '<tr><td align="center" style="padding:40px 16px;">' +
    '<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border-radius:16px;overflow:hidden;background:#111111;">' +
    // Header
    '<tr><td style="background:#BFFF0B;padding:24px 32px;text-align:center;">' +
    '<h2 style="margin:0;font-size:20px;font-weight:900;color:#000;">&#128276; New Contact Form Submission</h2>' +
    "</td></tr>" +
    // Urgency bar
    '<tr><td style="background:#1A1A1A;padding:14px 32px;text-align:center;border-bottom:1px solid #222;">' +
    '<span style="font-size:13px;font-weight:700;color:#BFFF0B;">&#9889; RESPOND WITHIN 24 HOURS</span>' +
    "</td></tr>" +
    // Body
    '<tr><td style="padding:28px 32px;">' +
    adminField("Name", d.name) +
    adminField(
      "Email",
      '<a href="mailto:' +
        d.email +
        '" style="color:#BFFF0B;text-decoration:none;">' +
        d.email +
        "</a>",
    ) +
    adminField(
      "Phone",
      '<a href="tel:' +
        d.phone +
        '" style="color:#BFFF0B;text-decoration:none;">' +
        d.phone +
        "</a>",
    ) +
    adminField("Company", d.company || "—") +
    adminField("Service", serviceLabel) +
    adminField("Budget", d.budget || "—") +
    // Message box
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0 0;">' +
    '<tr><td style="padding:16px 20px;background:#1A1A1A;border-radius:10px;border-left:4px solid #BFFF0B;">' +
    '<p style="margin:0 0 6px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#BFFF0B;">Message</p>' +
    '<p style="margin:0;font-size:14px;line-height:1.7;color:#CCC;">' +
    (d.message || "No message provided") +
    "</p>" +
    "</td></tr></table>" +
    '<p style="margin:20px 0 0;font-size:12px;color:#555;">Submitted: ' +
    now +
    "</p>" +
    // Quick actions
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0 0;">' +
    "<tr>" +
    '<td align="center" style="padding:4px;">' +
    '<a href="https://wa.me/' +
    (d.phone || "").replace(/\D/g, "") +
    '" style="display:inline-block;background:#25D366;color:#fff;font-size:13px;font-weight:700;padding:12px 24px;border-radius:8px;text-decoration:none;">WhatsApp Client</a>' +
    "</td>" +
    '<td align="center" style="padding:4px;">' +
    '<a href="mailto:' +
    d.email +
    '" style="display:inline-block;background:#BFFF0B;color:#000;font-size:13px;font-weight:700;padding:12px 24px;border-radius:8px;text-decoration:none;">Email Client</a>' +
    "</td>" +
    "</tr></table>" +
    "</td></tr>" +
    "</table></td></tr></table></body></html>";

  MailApp.sendEmail({
    to: ADMIN_EMAIL,
    subject:
      "🔔 New Lead – " + d.name + (d.company ? " (" + d.company + ")" : ""),
    htmlBody: html,
  });
}

// ═══════════════════════ HELPERS ═══════════════════════

function getOrCreateSheet(name) {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
  }
  return sheet;
}

function jsonResponse(success, message) {
  return ContentService.createTextOutput(
    JSON.stringify({ success: success, message: message }),
  ).setMimeType(ContentService.MimeType.JSON);
}

/** Produces one row for the user-facing summary table */
function summaryRow(label, value) {
  return (
    "<tr>" +
    '<td style="padding:5px 0;font-size:13px;color:#888;width:100px;">' +
    label +
    "</td>" +
    '<td style="padding:5px 0;font-size:13px;color:#E0E0E0;font-weight:600;">' +
    value +
    "</td>" +
    "</tr>"
  );
}

/** Produces one field block for the admin email */
function adminField(label, value) {
  return (
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 10px;">' +
    '<tr><td style="padding:12px 16px;background:#1A1A1A;border-radius:8px;">' +
    '<span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#888;">' +
    label +
    "</span><br>" +
    '<span style="font-size:15px;color:#FFF;">' +
    value +
    "</span>" +
    "</td></tr></table>"
  );
}

/** Maps the select value to a human-readable label */
function formatService(val) {
  var map = {
    "social-media": "Social Media Management",
    content: "Content Creation",
    performance: "Performance Marketing",
    branding: "Brand Identity",
    video: "Video Production",
    website: "Website Design",
    "full-package": "Full Package",
  };
  return map[val] || val || "Not specified";
}

// ═══════════════════════ TEST (run manually in Apps Script editor) ═══════════════════════
function testContactForm() {
  handleContactForm({
    name: "Test User",
    email: "test@example.com",
    phone: "+91 98765 43210",
    company: "Test Brand",
    service: "social-media",
    budget: "₹50,000 – ₹1,00,000",
    message: "This is a test submission from the Apps Script editor.",
  });
  Logger.log("✅ testContactForm completed");
}
