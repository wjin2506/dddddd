# EmailJS Template Configuration

## EmailJS Dashboard 설정 방법

### 1. EmailJS Dashboard 로그인
- https://dashboard.emailjs.com 접속
- 계정 로그인

### 2. Email Templates 섹션
- 좌측 메뉴에서 "Email Templates" 클릭
- `template_53307ep` 템플릿 편집

### 3. Template Settings (상단 설정)
- **Template Name:** Demo Request Form
- **To Email:** vmsholdings@vmsforsea.com
- **From Name:** {{from_name}}
- **From Email:** (your-email@gmail.com 또는 기본값)
- **Reply To:** {{from_email}}

### 4. Attachments 설정 (Professional Plan 필수)
- ✅ **Allow attachments** 체크박스 활성화
- **Attachment type:** Variable Attachment
- **Parameter name:** attachments

---

## 템플릿 내용 (복사해서 붙여넣기)

### Subject Line:
```
Demo Request from {{from_name}} - {{company}}
```

### Email Content (HTML):
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #1a73e8; border-bottom: 2px solid #e0e0e0; padding-bottom: 10px;">
    🚢 New Demo Request
  </h2>

  <h3 style="color: #333;">Contact Information</h3>
  <table style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 8px; background: #f5f5f5; font-weight: bold; width: 150px;">Name:</td>
      <td style="padding: 8px;">{{from_name}}</td>
    </tr>
    <tr>
      <td style="padding: 8px; background: #f5f5f5; font-weight: bold;">Email:</td>
      <td style="padding: 8px;"><a href="mailto:{{from_email}}">{{from_email}}</a></td>
    </tr>
    <tr>
      <td style="padding: 8px; background: #f5f5f5; font-weight: bold;">Phone:</td>
      <td style="padding: 8px;">{{phone}}</td>
    </tr>
    <tr>
      <td style="padding: 8px; background: #f5f5f5; font-weight: bold;">Job Title:</td>
      <td style="padding: 8px;">{{job_title}}</td>
    </tr>
    <tr>
      <td style="padding: 8px; background: #f5f5f5; font-weight: bold;">Company:</td>
      <td style="padding: 8px;">{{company}}</td>
    </tr>
    <tr>
      <td style="padding: 8px; background: #f5f5f5; font-weight: bold;">Country:</td>
      <td style="padding: 8px;">{{country}}</td>
    </tr>
  </table>

  <h3 style="color: #333; margin-top: 20px;">Project Description</h3>
  <div style="background: #f0f7ff; padding: 15px; border-radius: 5px; white-space: pre-wrap;">
    {{project_description}}
  </div>

  <h3 style="color: #333; margin-top: 20px;">Attached Files</h3>
  <div style="background: #fff3cd; padding: 10px; border-radius: 5px;">
    {{files_info}}
  </div>

  <h3 style="color: #333; margin-top: 20px;">Marketing Preferences</h3>
  <ul style="list-style: none; padding: 0;">
    <li style="padding: 5px 0;">✉️ Product Updates: <strong>{{opt_product_updates}}</strong></li>
    <li style="padding: 5px 0;">📞 Sales Outreach: <strong>{{opt_sales_outreach}}</strong></li>
    <li style="padding: 5px 0;">📅 Event Invitations: <strong>{{opt_events}}</strong></li>
  </ul>

  <hr style="margin-top: 30px; border: 1px solid #e0e0e0;">

  <p style="color: #666; font-size: 12px; text-align: center;">
    This email was sent from VMS Holdings Demo Request Form<br>
    <a href="mailto:{{from_email}}" style="color: #1a73e8;">Reply to {{from_name}}</a>
  </p>
</div>

{{attachments}}
```

---

## 중요 사항

### ⚠️ 반드시 확인해야 할 것들:

1. **{{attachments}} 변수 위치**
   - 반드시 HTML 코드 **맨 아래**에 추가
   - HTML 태그 안에 넣지 말 것
   - 단독으로 한 줄에 작성

2. **Professional Plan 필수**
   - 파일 첨부 기능은 Professional Plan ($18/month) 이상에서만 작동
   - Free Plan에서는 파일 첨부 불가능

3. **템플릿 변수 목록**
   - `{{from_name}}` - 이름
   - `{{from_email}}` - 이메일
   - `{{phone}}` - 전화번호
   - `{{job_title}}` - 직책
   - `{{company}}` - 회사명
   - `{{country}}` - 국가
   - `{{project_description}}` - 프로젝트 설명
   - `{{files_info}}` - 첨부파일 정보
   - `{{opt_product_updates}}` - 제품 업데이트 수신
   - `{{opt_sales_outreach}}` - 영업 연락 수신
   - `{{opt_events}}` - 이벤트 초대 수신
   - `{{attachments}}` - 실제 파일 첨부 (Dynamic Attachments)

---

## 테스트 체크리스트

- [ ] EmailJS Dashboard 로그인
- [ ] Template ID: `template_53307ep` 확인
- [ ] "Allow attachments" 활성화
- [ ] Template에 위 HTML 코드 붙여넣기
- [ ] {{attachments}} 변수를 맨 아래 추가
- [ ] 저장
- [ ] 로컬에서 테스트 (http://localhost:3003)
- [ ] 작은 파일로 먼저 테스트 (1MB 이하)
- [ ] 이메일 수신 확인

---

## 문제 해결

### 에러 발생 시:
1. **400 Error:** Template 설정 확인
2. **413 Error:** 파일 크기 초과 (5MB 제한)
3. **422 Error:** Template 변수 불일치

### 콘솔 로그 확인:
- F12 → Console
- "Converting files to Base64..." 메시지 확인
- "Sending email with data:" 로그 확인