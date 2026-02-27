/**
 * HOTA Creative Agency – Free Audit Form Handler
 * Google Apps Script (audit form only)
 *
 * Setup:
 *  1. Create a Google Sheet and copy its ID into SHEET_ID below
 *  2. Create (or use) a Google Drive folder and copy its ID into DRIVE_FOLDER_ID
 *  3. Go to Extensions → Apps Script → paste this code
 *  4. In the Apps Script editor, go to Project Settings (⚙️) and check
 *     "Show appsscript.json manifest file in editor". Then paste the manifest
 *     from appsscript-manifest.json (see below) to ensure Drive scopes are authorised.
 *  5. Deploy → New deployment → Web App
 *        Execute as: Me | Who has access: Anyone
 *  6. **IMPORTANT**: After deploying, open the web app URL once in your browser
 *     and grant the Drive + Sheets permissions when prompted.
 *  7. Copy the deployment URL into your React app (AUDIT_APPS_SCRIPT_URL in FreeAuditPage)
 *
 * Required appsscript.json manifest (paste into the editor):
 * {
 *   "timeZone": "Asia/Kolkata",
 *   "dependencies": {},
 *   "exceptionLogging": "STACKDRIVER",
 *   "runtimeVersion": "V8",
 *   "oauthScopes": [
 *     "https://www.googleapis.com/auth/spreadsheets",
 *     "https://www.googleapis.com/auth/drive",
 *     "https://www.googleapis.com/auth/script.send_mail"
 *   ],
 *   "webapp": {
 *     "executeAs": "USER_DEPLOYING",
 *     "access": "ANYONE_ANONYMOUS"
 *   }
 * }
 */

// ═══════════════════════ CONFIG ═══════════════════════
const ADMIN_EMAIL = "hotacreatives@gmail.com";
const SHEET_ID = "YOUR_SHEET_ID_HERE"; // ← paste your Google Sheet ID
const DRIVE_FOLDER_ID = "YOUR_DRIVE_FOLDER_ID_HERE"; // ← paste your Google Drive folder ID

// ═══════════════════════ WEB APP ENTRY ═══════════════════════
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    return handleAuditForm(data);
  } catch (err) {
    Logger.log("doPost error: " + err);
    return jsonResponse(false, "Server error – please try again.");
  }
}

// Allow preflight / health-check
function doGet() {
  return jsonResponse(true, "HOTA Free Audit API is live.");
}

// ═══════════════════════ DRIVE UPLOAD ═══════════════════════


/**
 * Run this function ONCE manually from the Apps Script editor to trigger
 * the OAuth consent screen and authorize Drive + Sheets + Mail permissions.
 * After authorization, you can delete this or leave it.
 */
function authorizePermissions() {
  // Touch each service so Apps Script prompts for consent
  DriveApp.getRootFolder().getName();
  SpreadsheetApp.openById(SHEET_ID).getName();
  MailApp.getRemainingDailyQuota();
  Logger.log("✅ All permissions authorized! You can now deploy the web app.");
}

/**
 * Uploads base64-encoded files to a subfolder in the configured Drive folder.
 * @param {Array<{name:string, mimeType:string, base64:string}>} files
 * @param {string} submitterName - used to name the subfolder
 * @returns {{folderUrl:string, fileLinks:Array<{name:string, url:string}>}}
 */
function uploadFilesToDrive(files, submitterName) {
  if (!DRIVE_FOLDER_ID || DRIVE_FOLDER_ID === "YOUR_DRIVE_FOLDER_ID_HERE") {
    throw new Error(
      "DRIVE_FOLDER_ID is not configured. Please set it in the CONFIG section.",
    );
  }

  var parentFolder = DriveApp.getFolderById(DRIVE_FOLDER_ID);

  // Create a unique subfolder per submission
  var timestamp = Utilities.formatDate(
    new Date(),
    "Asia/Kolkata",
    "yyyy-MM-dd_HH-mm-ss",
  );
  var subfolderName = "Audit_" + (submitterName || "Unknown") + "_" + timestamp;
  var subfolder = parentFolder.createFolder(subfolderName);

  // Make subfolder viewable by anyone with the link
  subfolder.setSharing(
    DriveApp.Access.ANYONE_WITH_LINK,
    DriveApp.Permission.VIEW,
  );

  var fileLinks = [];

  for (var i = 0; i < files.length; i++) {
    var f = files[i];
    try {
      var decoded = Utilities.base64Decode(f.base64);
      var blob = Utilities.newBlob(decoded, f.mimeType, f.name);
      var driveFile = subfolder.createFile(blob);
      driveFile.setSharing(
        DriveApp.Access.ANYONE_WITH_LINK,
        DriveApp.Permission.VIEW,
      );
      fileLinks.push({ name: f.name, url: driveFile.getUrl() });
    } catch (fileErr) {
      Logger.log("File upload error (" + f.name + "): " + fileErr);
    }
  }

  return {
    folderUrl: subfolder.getUrl(),
    fileLinks: fileLinks,
  };
}

// ═══════════════════════ AUDIT HANDLER ═══════════════════════
function handleAuditForm(data) {
  try {
    // 1. Upload files to Drive (if any)
    var driveLink = "";
    var fileLinks = [];

    if (data.files && data.files.length > 0) {
      var uploadResult = uploadFilesToDrive(
        data.files,
        data.businessName || data.name,
      );
      driveLink = uploadResult.folderUrl;
      fileLinks = uploadResult.fileLinks;
    }

    // Attach results to data so emails can reference them
    data.driveLink = driveLink;
    data.fileLinks = fileLinks;

    // 2. Record in Google Sheets
    var sheet = getOrCreateSheet("Audit_Submissions");

    if (sheet.getLastRow() === 0) {
      var headers = [
        "Timestamp",
        "Name",
        "Business Name",
        "Industry",
        "Revenue Range",
        "Website",
        "Instagram",
        "Facebook",
        "LinkedIn",
        "Email",
        "Phone",
        "Biggest Challenge",
        "Drive Folder Link",
        "File Count",
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
      data.businessName || "",
      data.industry || "",
      data.revenueRange || "",
      data.website || "",
      data.instagram || "",
      data.facebook || "",
      data.linkedin || "",
      data.email || "",
      data.phone || "",
      data.biggestChallenge || "",
      driveLink,
      fileLinks.length,
      "New",
    ]);

    // 3. Thank-you email → user
    sendAuditThankYouEmail(data);

    // 4. Notification email → admin
    sendAuditAdminNotification(data);

    return jsonResponse(true, "Audit request submitted successfully!");
  } catch (err) {
    Logger.log("handleAuditForm error: " + err);
    return jsonResponse(false, "Could not process your submission.");
  }
}

// ═══════════════════════ EMAILS ═══════════════════════

/** Thank-you email sent to the person who requested the audit */
function sendAuditThankYouEmail(d) {
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
    "! &#128640;</h2>" +
    '<p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:#B0B0B0;">Your <strong style="color:#BFFF0B;">Free Brand Growth Audit</strong> request has been received! Our strategy team is already gearing up to deep-dive into <strong style="color:#FFFFFF;">' +
    (d.businessName || "your brand") +
    "</strong>.</p>" +
    // Timeline card
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#1A1A1A;border-radius:12px;border-left:4px solid #BFFF0B;margin:0 0 24px;">' +
    '<tr><td style="padding:20px 24px;">' +
    '<p style="margin:0 0 12px;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#BFFF0B;">What happens next</p>' +
    '<table role="presentation" cellpadding="0" cellspacing="0">' +
    '<tr><td style="padding:6px 0;font-size:14px;color:#E0E0E0;">&#128269; &nbsp;We analyse your brand presence across all platforms</td></tr>' +
    '<tr><td style="padding:6px 0;font-size:14px;color:#E0E0E0;">&#128202; &nbsp;Deep-dive into your competitors &amp; market positioning</td></tr>' +
    '<tr><td style="padding:6px 0;font-size:14px;color:#E0E0E0;">&#128232; &nbsp;Deliver your personalised audit report within <strong style="color:#BFFF0B;">48 hours</strong></td></tr>' +
    '<tr><td style="padding:6px 0;font-size:14px;color:#E0E0E0;">&#128222; &nbsp;We\'ll reach out via email + WhatsApp</td></tr>' +
    "</table>" +
    "</td></tr></table>" +
    // Summary card
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#1A1A1A;border-radius:12px;margin:0 0 28px;">' +
    '<tr><td style="padding:20px 24px;">' +
    '<p style="margin:0 0 12px;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#BFFF0B;">Your submission</p>' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0">' +
    summaryRow("Business", d.businessName || "—") +
    summaryRow("Industry", d.industry || "—") +
    summaryRow("Revenue", d.revenueRange || "Not specified") +
    summaryRow("Website", d.website || "—") +
    summaryRow("Instagram", d.instagram || "—") +
    (d.driveLink
      ? summaryRow(
          "Uploaded Files",
          '<a href="' +
            d.driveLink +
            '" style="color:#BFFF0B;text-decoration:underline;">' +
            (d.fileLinks && d.fileLinks.length
              ? d.fileLinks.length + " file(s) uploaded"
              : "View Files") +
            "</a>",
        )
      : "") +
    "</table>" +
    "</td></tr></table>" +
    // CTA
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0">' +
    '<tr><td align="center" style="padding:4px 0 0;">' +
    '<a href="https://wa.me/919542421108?text=' +
    encodeURIComponent(
      "Hi! I just submitted a Free Brand Audit request on hotacreatives.in for " +
        (d.businessName || "my brand"),
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
    subject: "Your Free Brand Audit is On Its Way! 🚀 – HOTA Creatives",
    htmlBody: html,
  });
}

/** Admin notification email */
function sendAuditAdminNotification(d) {
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
    '<h2 style="margin:0;font-size:20px;font-weight:900;color:#000;">&#128202; New Free Audit Request</h2>' +
    "</td></tr>" +
    // Urgency bar
    '<tr><td style="background:#1A1A1A;padding:14px 32px;text-align:center;border-bottom:1px solid #222;">' +
    '<span style="font-size:13px;font-weight:700;color:#BFFF0B;">&#9889; DELIVER AUDIT WITHIN 48 HOURS</span>' +
    "</td></tr>" +
    // Body
    '<tr><td style="padding:28px 32px;">' +
    // Personal info
    '<p style="margin:0 0 16px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#BFFF0B;border-bottom:1px solid #222;padding-bottom:8px;">Contact Info</p>' +
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
    // Business info
    '<p style="margin:24px 0 16px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#BFFF0B;border-bottom:1px solid #222;padding-bottom:8px;">Business Details</p>' +
    adminField("Business Name", d.businessName || "—") +
    adminField("Industry", d.industry || "—") +
    adminField("Revenue Range", d.revenueRange || "—") +
    // Online presence
    '<p style="margin:24px 0 16px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#BFFF0B;border-bottom:1px solid #222;padding-bottom:8px;">Online Presence</p>' +
    adminField(
      "Website",
      d.website
        ? '<a href="' +
            d.website +
            '" style="color:#BFFF0B;text-decoration:underline;">' +
            d.website +
            "</a>"
        : "—",
    ) +
    adminField(
      "Instagram",
      d.instagram
        ? '<a href="https://instagram.com/' +
            d.instagram.replace("@", "") +
            '" style="color:#BFFF0B;text-decoration:underline;">' +
            d.instagram +
            "</a>"
        : "—",
    ) +
    adminField("Facebook", d.facebook || "—") +
    adminField("LinkedIn", d.linkedin || "—") +
    // Drive files section
    (d.driveLink
      ? '<p style="margin:24px 0 16px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#BFFF0B;border-bottom:1px solid #222;padding-bottom:8px;">Uploaded Files (' +
        (d.fileLinks ? d.fileLinks.length : 0) +
        ")</p>" +
        adminField(
          "Drive Folder",
          '<a href="' +
            d.driveLink +
            '" style="color:#BFFF0B;text-decoration:underline;font-weight:700;">Open Folder</a>',
        ) +
        (d.fileLinks && d.fileLinks.length > 0
          ? d.fileLinks
              .map(function (fl) {
                return adminField(
                  fl.name,
                  '<a href="' +
                    fl.url +
                    '" style="color:#BFFF0B;text-decoration:underline;">' +
                    fl.url +
                    "</a>",
                );
              })
              .join("")
          : "")
      : "") +
    // Challenge box
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0 0;">' +
    '<tr><td style="padding:16px 20px;background:#1A1A1A;border-radius:10px;border-left:4px solid #BFFF0B;">' +
    '<p style="margin:0 0 6px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#BFFF0B;">Biggest Challenge</p>' +
    '<p style="margin:0;font-size:14px;line-height:1.7;color:#CCC;">' +
    (d.biggestChallenge || "Not specified") +
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
    (d.driveLink
      ? '<td align="center" style="padding:4px;">' +
        '<a href="' +
        d.driveLink +
        '" style="display:inline-block;background:#4285F4;color:#fff;font-size:13px;font-weight:700;padding:12px 24px;border-radius:8px;text-decoration:none;">View Drive Files</a>' +
        "</td>"
      : "") +
    "</tr></table>" +
    "</td></tr>" +
    "</table></td></tr></table></body></html>";

  MailApp.sendEmail({
    to: ADMIN_EMAIL,
    subject:
      "📊 New Audit Request – " +
      (d.businessName || d.name) +
      " (" +
      (d.industry || "Unknown") +
      ")",
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
    '<td style="padding:5px 0;font-size:13px;color:#888;width:120px;">' +
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

// ═══════════════════════ TEST (run manually in Apps Script editor) ═══════════════════════
function testAuditForm() {
  // Note: To test file upload, create a small base64 test payload.
  // A 1x1 red pixel PNG in base64:
  var testBase64 =
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==";

  handleAuditForm({
    name: "Test User",
    businessName: "Test Brand Pvt Ltd",
    industry: "E-commerce / D2C",
    revenueRange: "₹25 – ₹75 Lakh / month",
    website: "https://testbrand.in",
    instagram: "@testbrand",
    facebook: "facebook.com/testbrand",
    linkedin: "linkedin.com/company/testbrand",
    email: "test@example.com",
    phone: "+91 98765 43210",
    biggestChallenge:
      "Low engagement on Instagram despite posting daily. Need help with content strategy and paid ads.",
    files: [
      {
        name: "test-image.png",
        mimeType: "image/png",
        base64: testBase64,
      },
    ],
  });
  Logger.log("✅ testAuditForm completed");
}
