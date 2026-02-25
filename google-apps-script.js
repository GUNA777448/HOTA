/**
 * HOTA Creative Agency - Form Handler
 * Google Apps Script for Contact Form & Audit Form
 *
 * Setup Instructions:
 * 1. Create a new Google Sheet
 * 2. Create two sheets: "Contact_Submissions" and "Audit_Submissions"
 * 3. Go to Extensions > Apps Script
 * 4. Paste this code
 * 5. Update ADMIN_EMAIL and SHEET_ID constants
 * 6. Deploy as Web App (Execute as: Me, Access: Anyone)
 * 7. Copy the deployment URL and use it in your React forms
 */

// ========== CONFIGURATION ==========
const ADMIN_EMAIL = "hello@hota.agency"; // Change this to your admin email
const SHEET_ID = "YOUR_SHEET_ID_HERE"; // Replace with your Google Sheet ID

// ========== UTILITY FUNCTIONS ==========
function getOrCreateSheet(sheetName) {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  let sheet = spreadsheet.getSheetByName(sheetName);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
    Logger.log(`Created new sheet: ${sheetName}`);
  }

  return sheet;
}

// ========== MAIN HANDLER ==========
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const formType = data.formType; // 'contact' or 'audit'

    if (formType === "contact") {
      return handleContactForm(data);
    } else if (formType === "audit") {
      return handleAuditForm(data);
    } else {
      return createResponse(false, "Invalid form type");
    }
  } catch (error) {
    Logger.log("Error in doPost: " + error.toString());
    return createResponse(false, "Error processing form: " + error.toString());
  }
}

// ========== CONTACT FORM HANDLER ==========
function handleContactForm(data) {
  try {
    // Get or create the sheet
    const sheet = getOrCreateSheet("Contact_Submissions");

    // Create header if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Name",
        "Email",
        "Phone",
        "Company",
        "Service",
        "Budget",
        "Message",
      ]);

      // Format header
      const headerRange = sheet.getRange(1, 1, 1, 8);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#BFFF0B");
      headerRange.setFontColor("#000000");
    }

    // Append data
    sheet.appendRow([
      new Date(),
      data.name || "",
      data.email || "",
      data.phone || "",
      data.company || "",
      data.service || "",
      data.budget || "",
      data.message || "",
    ]);

    // Send email to customer
    sendContactConfirmationEmail(data);

    // Send notification to admin
    sendContactAdminNotification(data);

    return createResponse(true, "Contact form submitted successfully");
  } catch (error) {
    Logger.log("Error in handleContactForm: " + error.toString());
    return createResponse(
      false,
      "Error submitting contact form: " + error.toString(),
    );
  }
}

// ========== AUDIT FORM HANDLER ==========
function handleAuditForm(data) {
  try {
    // Get or create the sheet
    const sheet = getOrCreateSheet("Audit_Submissions");

    // Create header if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
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
        "Files Count",
      ]);

      // Format header
      const headerRange = sheet.getRange(1, 1, 1, 13);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#BFFF0B");
      headerRange.setFontColor("#000000");
    }

    // Append data
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
      data.filesCount || 0,
    ]);

    // Send email to customer
    sendAuditConfirmationEmail(data);

    // Send notification to admin
    sendAuditAdminNotification(data);

    return createResponse(true, "Audit form submitted successfully");
  } catch (error) {
    Logger.log("Error in handleAuditForm: " + error.toString());
    return createResponse(
      false,
      "Error submitting audit form: " + error.toString(),
    );
  }
}

// ========== EMAIL TEMPLATES ==========

// Contact Form - Customer Confirmation
function sendContactConfirmationEmail(data) {
  const subject = "We Got Your Message! – HOTA Creative Agency";

  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #000; color: #BFFF0B; padding: 30px 20px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; font-weight: 900; }
        .content { background: #fff; padding: 30px 20px; }
        .highlight { color: #BFFF0B; font-weight: bold; }
        .footer { background: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666; }
        .button { display: inline-block; background: #BFFF0B; color: #000; padding: 12px 30px; text-decoration: none; border-radius: 30px; font-weight: bold; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>HOTA</h1>
          <p style="margin: 5px 0 0 0; font-size: 14px;">India's Creative Growth Agency</p>
        </div>
        
        <div class="content">
          <h2>Hey ${data.name}! 👋</h2>
          <p>We've received your message and we're pumped to connect with you!</p>
          
          <p><strong>Here's what happens next:</strong></p>
          <ul>
            <li>Our team will review your request within <span class="highlight">24 hours</span></li>
            <li>We'll reach out via email or WhatsApp to schedule a call</li>
            <li>We'll discuss your ${data.service || "project"} and how we can help</li>
          </ul>
          
          <p style="margin-top: 30px;"><strong>Your Message Details:</strong></p>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 10px; border-left: 4px solid #BFFF0B;">
            <p style="margin: 5px 0;"><strong>Service:</strong> ${data.service || "Not specified"}</p>
            <p style="margin: 5px 0;"><strong>Budget:</strong> ${data.budget || "Not specified"}</p>
            <p style="margin: 5px 0;"><strong>Company:</strong> ${data.company || "Not specified"}</p>
          </div>
          
          <p style="margin-top: 30px;">In the meantime, feel free to check out our work or WhatsApp us directly if you need anything urgent.</p>
          
          <div style="text-align: center;">
            <a href="https://wa.me/919542421108?text=Hi!%20I%20just%20submitted%20a%20contact%20form" class="button">WhatsApp Us Now</a>
          </div>
        </div>
        
        <div class="footer">
          <p><strong>HOTA Creative Agency</strong></p>
          <p>Mumbai, Maharashtra, India</p>
          <p>📧 hello@hota.agency | 📱 +91 95424 21108</p>
          <p>
            <a href="https://www.instagram.com/hota.creatives" style="color: #666; margin: 0 5px;">Instagram</a> | 
            <a href="https://www.linkedin.com/company/hota-creatives/" style="color: #666; margin: 0 5px;">LinkedIn</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  MailApp.sendEmail({
    to: data.email,
    subject: subject,
    htmlBody: htmlBody,
  });
}

// Contact Form - Admin Notification
function sendContactAdminNotification(data) {
  const subject = `🔔 New Contact Form Submission - ${data.name}`;

  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; }
        .header { background: #000; color: #BFFF0B; padding: 20px; text-align: center; }
        .content { background: #fff; padding: 20px; margin: 20px 0; border-radius: 10px; }
        .field { margin: 15px 0; padding: 10px; background: #f5f5f5; border-radius: 5px; }
        .field strong { color: #000; }
        .urgent { background: #BFFF0B; color: #000; padding: 10px; border-radius: 5px; font-weight: bold; text-align: center; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>New Contact Form Submission</h2>
        </div>
        
        <div class="content">
          <div class="urgent">⚡ Respond within 24 hours</div>
          
          <div class="field">
            <strong>Name:</strong> ${data.name}
          </div>
          
          <div class="field">
            <strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a>
          </div>
          
          <div class="field">
            <strong>Phone:</strong> <a href="tel:${data.phone}">${data.phone}</a>
          </div>
          
          <div class="field">
            <strong>Company:</strong> ${data.company || "Not provided"}
          </div>
          
          <div class="field">
            <strong>Service Interested In:</strong> ${data.service || "Not specified"}
          </div>
          
          <div class="field">
            <strong>Budget Range:</strong> ${data.budget || "Not specified"}
          </div>
          
          <div class="field">
            <strong>Message:</strong><br>
            ${data.message || "No message provided"}
          </div>
          
          <div class="field">
            <strong>Submission Time:</strong> ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
          </div>
          
          <p style="margin-top: 20px; text-align: center;">
            <a href="https://wa.me/${data.phone.replace(/\D/g, "")}" style="background: #25D366; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">WhatsApp Client</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  MailApp.sendEmail({
    to: ADMIN_EMAIL,
    subject: subject,
    htmlBody: htmlBody,
  });
}

// Audit Form - Customer Confirmation
function sendAuditConfirmationEmail(data) {
  const subject = "Your Free Brand Audit is On Its Way! 🚀 – HOTA";

  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #000; color: #BFFF0B; padding: 40px 20px; text-align: center; }
        .header h1 { margin: 0; font-size: 32px; font-weight: 900; }
        .content { background: #fff; padding: 30px 20px; }
        .highlight { color: #BFFF0B; background: #000; padding: 2px 6px; border-radius: 3px; font-weight: bold; }
        .timeline { background: #f9f9f9; padding: 20px; border-radius: 10px; border-left: 4px solid #BFFF0B; margin: 20px 0; }
        .footer { background: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666; }
        .button { display: inline-block; background: #BFFF0B; color: #000; padding: 12px 30px; text-decoration: none; border-radius: 30px; font-weight: bold; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 You're In!</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px;">Free Brand Growth Audit Requested</p>
        </div>
        
        <div class="content">
          <h2>Hey ${data.name}! 👋</h2>
          <p style="font-size: 18px;">We're excited to dive deep into <strong>${data.businessName}</strong> and uncover growth opportunities!</p>
          
          <div class="timeline">
            <h3 style="margin-top: 0;">What Happens Next:</h3>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li><strong>Within 24 hours:</strong> Our strategy team starts analyzing your brand</li>
              <li><strong>Within 48 hours:</strong> You receive your personalized Brand Growth Audit via email</li>
              <li><strong>Day 3:</strong> We'll schedule a quick call to walk you through the findings (if you want!)</li>
            </ul>
          </div>
          
          <p><strong>We'll be analyzing:</strong></p>
          <ul>
            <li>✅ Your current digital presence across all platforms</li>
            <li>✅ Competitor positioning in ${data.industry}</li>
            <li>✅ Content strategy gaps and opportunities</li>
            <li>✅ Performance marketing potential</li>
            <li>✅ Brand identity and consistency</li>
          </ul>
          
          <p style="margin-top: 30px;"><strong>Your Submission Summary:</strong></p>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 10px; border-left: 4px solid #BFFF0B;">
            <p style="margin: 5px 0;"><strong>Business:</strong> ${data.businessName}</p>
            <p style="margin: 5px 0;"><strong>Industry:</strong> ${data.industry}</p>
            <p style="margin: 5px 0;"><strong>Website:</strong> ${data.website || "Not provided"}</p>
            <p style="margin: 5px 0;"><strong>Instagram:</strong> ${data.instagram || "Not provided"}</p>
            <p style="margin: 5px 0;"><strong>Challenge:</strong> ${data.biggestChallenge || "General audit"}</p>
          </div>
          
          <p style="margin-top: 30px;">Got questions in the meantime? WhatsApp us directly – we respond fast!</p>
          
          <div style="text-align: center;">
            <a href="https://wa.me/919542421108?text=Hi!%20I%20just%20requested%20a%20free%20audit%20for%20${encodeURIComponent(data.businessName)}" class="button">WhatsApp Us</a>
          </div>
          
          <p style="margin-top: 30px; padding: 15px; background: #fff9e6; border-radius: 10px; font-size: 14px;">
            <strong>💡 Pro Tip:</strong> While you wait, check out our Instagram (<a href="https://www.instagram.com/hota.creatives">@hota.creatives</a>) to see how we position other brands.
          </p>
        </div>
        
        <div class="footer">
          <p><strong>HOTA Creative Agency</strong></p>
          <p>We don't post. We position.</p>
          <p>📧 hello@hota.agency | 📱 +91 95424 21108</p>
          <p>
            <a href="https://www.instagram.com/hota.creatives" style="color: #666; margin: 0 5px;">Instagram</a> | 
            <a href="https://www.linkedin.com/company/hota-creatives/" style="color: #666; margin: 0 5px;">LinkedIn</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  MailApp.sendEmail({
    to: data.email,
    subject: subject,
    htmlBody: htmlBody,
  });
}

// Audit Form - Admin Notification
function sendAuditAdminNotification(data) {
  const subject = `🎯 New FREE AUDIT Request - ${data.businessName} (${data.industry})`;

  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; }
        .header { background: #000; color: #BFFF0B; padding: 20px; text-align: center; }
        .content { background: #fff; padding: 20px; margin: 20px 0; border-radius: 10px; }
        .field { margin: 15px 0; padding: 10px; background: #f5f5f5; border-radius: 5px; }
        .field strong { color: #000; }
        .urgent { background: #BFFF0B; color: #000; padding: 15px; border-radius: 5px; font-weight: bold; text-align: center; margin: 20px 0; }
        .section { margin: 20px 0; padding: 15px; border-left: 3px solid #BFFF0B; background: #f9f9f9; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>🎯 New Free Audit Request</h2>
          <p style="margin: 5px 0;">High Priority - Respond within 48 hours</p>
        </div>
        
        <div class="content">
          <div class="urgent">⚡ START BRAND AUDIT IMMEDIATELY</div>
          
          <div class="section">
            <h3 style="margin-top: 0;">👤 Contact Information</h3>
            <div class="field">
              <strong>Name:</strong> ${data.name}
            </div>
            <div class="field">
              <strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a>
            </div>
            <div class="field">
              <strong>Phone/WhatsApp:</strong> <a href="tel:${data.phone}">${data.phone}</a>
            </div>
          </div>
          
          <div class="section">
            <h3 style="margin-top: 0;">🏢 Business Information</h3>
            <div class="field">
              <strong>Business Name:</strong> ${data.businessName}
            </div>
            <div class="field">
              <strong>Industry:</strong> ${data.industry}
            </div>
            <div class="field">
              <strong>Revenue Range:</strong> ${data.revenueRange || "Not disclosed"}
            </div>
          </div>
          
          <div class="section">
            <h3 style="margin-top: 0;">🌐 Digital Presence</h3>
            <div class="field">
              <strong>Website:</strong> ${data.website ? `<a href="${data.website}" target="_blank">${data.website}</a>` : "Not provided"}
            </div>
            <div class="field">
              <strong>Instagram:</strong> ${data.instagram ? `<a href="https://instagram.com/${data.instagram.replace("@", "")}" target="_blank">${data.instagram}</a>` : "Not provided"}
            </div>
            <div class="field">
              <strong>Facebook:</strong> ${data.facebook || "Not provided"}
            </div>
            <div class="field">
              <strong>LinkedIn:</strong> ${data.linkedin || "Not provided"}
            </div>
          </div>
          
          <div class="section">
            <h3 style="margin-top: 0;">💬 Biggest Challenge</h3>
            <div class="field">
              ${data.biggestChallenge || "Not specified"}
            </div>
          </div>
          
          <div class="field">
            <strong>📎 Files Uploaded:</strong> ${data.filesCount || 0} file(s)
          </div>
          
          <div class="field">
            <strong>⏰ Submission Time:</strong> ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
          </div>
          
          <div style="margin-top: 30px; text-align: center;">
            <a href="https://wa.me/${data.phone.replace(/\D/g, "")}" style="background: #25D366; color: #fff; padding: 12px 25px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 5px;">💬 WhatsApp Client</a>
            <a href="mailto:${data.email}" style="background: #000; color: #BFFF0B; padding: 12px 25px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 5px;">📧 Email Client</a>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background: #fff3cd; border-radius: 5px; text-align: center;">
            <strong>⏱️ DEADLINE:</strong> Deliver audit report by ${new Date(Date.now() + 48 * 60 * 60 * 1000).toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  MailApp.sendEmail({
    to: ADMIN_EMAIL,
    subject: subject,
    htmlBody: htmlBody,
  });
}

// ========== UTILITY FUNCTIONS ==========
function createResponse(success, message, data = {}) {
  return ContentService.createTextOutput(
    JSON.stringify({
      success: success,
      message: message,
      data: data,
    }),
  ).setMimeType(ContentService.MimeType.JSON);
}

// Test function for debugging
function testContactForm() {
  const testData = {
    formType: "contact",
    name: "Test User",
    email: "test@example.com",
    phone: "+91 98765 43210",
    company: "Test Company",
    service: "Social Media Management",
    budget: "₹50,000 – ₹1,00,000",
    message: "This is a test message",
  };

  handleContactForm(testData);
  Logger.log("Contact form test completed");
}

function testAuditForm() {
  const testData = {
    formType: "audit",
    name: "Test User",
    businessName: "Test Business",
    industry: "Fashion & Apparel",
    revenueRange: "₹5 – ₹25 Lakh / month",
    website: "https://testbusiness.com",
    instagram: "@testbusiness",
    facebook: "facebook.com/testbusiness",
    linkedin: "linkedin.com/company/testbusiness",
    email: "test@testbusiness.com",
    phone: "+91 98765 43210",
    biggestChallenge: "Low engagement on social media",
    filesCount: 2,
  };

  handleAuditForm(testData);
  Logger.log("Audit form test completed");
}
