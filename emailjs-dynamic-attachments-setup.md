# EmailJS Dynamic Attachments Setup Guide

## Requirements
- EmailJS Professional Plan ($18/month) or higher
- Dynamic Attachments enabled in template

## Step 1: EmailJS Dashboard Settings

1. Login to [EmailJS Dashboard](https://dashboard.emailjs.com)
2. Go to **Email Templates**
3. Edit your template (`template_53307ep`)
4. In template settings, look for **Attachments** section
5. Enable **"Allow attachments"**

## Step 2: Template Configuration

In your EmailJS template, you need to add the attachments variable:

### Template Variables Section:
Add this special variable at the bottom of your template:
```
{{attachments}}
```

### Complete Template Example:

**Subject:**
```
Demo Request from {{from_name}} - {{company}}
```

**Content:**
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #1a73e8;">New Demo Request</h2>

  <h3>Contact Information</h3>
  <table style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 8px; background: #f5f5f5;"><strong>Name:</strong></td>
      <td style="padding: 8px;">{{from_name}}</td>
    </tr>
    <tr>
      <td style="padding: 8px; background: #f5f5f5;"><strong>Email:</strong></td>
      <td style="padding: 8px;"><a href="mailto:{{from_email}}">{{from_email}}</a></td>
    </tr>
    <tr>
      <td style="padding: 8px; background: #f5f5f5;"><strong>Phone:</strong></td>
      <td style="padding: 8px;">{{phone}}</td>
    </tr>
    <tr>
      <td style="padding: 8px; background: #f5f5f5;"><strong>Job Title:</strong></td>
      <td style="padding: 8px;">{{job_title}}</td>
    </tr>
    <tr>
      <td style="padding: 8px; background: #f5f5f5;"><strong>Company:</strong></td>
      <td style="padding: 8px;">{{company}}</td>
    </tr>
    <tr>
      <td style="padding: 8px; background: #f5f5f5;"><strong>Country:</strong></td>
      <td style="padding: 8px;">{{country}}</td>
    </tr>
  </table>

  <h3>Project Description</h3>
  <div style="background: #f0f7ff; padding: 15px; border-radius: 5px;">
    {{project_description}}
  </div>

  <h3>Attached Files</h3>
  <div style="background: #fff3cd; padding: 10px; border-radius: 5px;">
    {{files_info}}
  </div>

  <h3>Marketing Preferences</h3>
  <ul>
    <li>Product Updates: <strong>{{opt_product_updates}}</strong></li>
    <li>Sales Outreach: <strong>{{opt_sales_outreach}}</strong></li>
    <li>Event Invitations: <strong>{{opt_events}}</strong></li>
  </ul>

  <hr style="margin-top: 30px;">
  <p style="color: #666; font-size: 12px;">
    This email was sent from VMS Holdings Demo Request Form
  </p>
</div>
```

**IMPORTANT:** Don't forget to add this at the end:
```
{{attachments}}
```

## Step 3: Template Settings

- **To Email:** vmsholdings@vmsforsea.com
- **From Name:** {{from_name}}
- **Reply To:** {{from_email}}

## Step 4: Code Format

The code sends attachments in this format:
```javascript
attachments: [
  {
    filename: "document.pdf",
    content: "base64_encoded_content_here",
    encoding: "base64"
  }
]
```

## Step 5: Testing

1. Make sure you're on Professional Plan
2. Verify "Allow attachments" is enabled
3. Test with a small file (< 1MB) first
4. Check browser console for logs:
   - "Converting files to Base64 for Dynamic Attachments..."
   - "Converted X files successfully for Dynamic Attachments"
5. Submit form and check if files are attached to email

## File Size Limits

- **Professional Plan:** Max 5MB total
- **Business Plan:** Max 10MB total

## Troubleshooting

### Files not attaching?
1. Check EmailJS plan (must be Professional or higher)
2. Verify template has {{attachments}} variable
3. Confirm "Allow attachments" is enabled
4. Check browser console for errors
5. Verify file size is under limit

### Common Issues:
- **400 Error:** Template not configured properly
- **413 Error:** File too large
- **422 Error:** Attachment format incorrect

## Important Notes

1. The `{{attachments}}` variable MUST be in your template
2. Don't put {{attachments}} inside HTML tags
3. EmailJS automatically processes the attachments array
4. Files are sent as actual attachments, not inline content