# Email Form App

Demo request form application with EmailJS integration for VMS Holdings.

## Features

- Demo request form with file upload capability
- Email notifications via EmailJS
- Form data persistence with localStorage
- Responsive design
- Multiple office locations display

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file with your EmailJS credentials:
```
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
```

3. Run development server:
```bash
npm start
```

4. Build for production:
```bash
npm run build
```

## Deployment to Netlify

### Option 1: Deploy via Netlify CLI

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Login to Netlify:
```bash
netlify login
```

3. Deploy:
```bash
netlify deploy --prod
```

### Option 2: Deploy via Git

1. Push code to GitHub
2. Connect repository to Netlify
3. Set environment variables in Netlify dashboard:
   - `REACT_APP_EMAILJS_SERVICE_ID`
   - `REACT_APP_EMAILJS_TEMPLATE_ID`
   - `REACT_APP_EMAILJS_PUBLIC_KEY`
4. Deploy automatically on push

## Environment Variables

Make sure to set the following environment variables in Netlify:

- `REACT_APP_EMAILJS_SERVICE_ID`: Your EmailJS service ID
- `REACT_APP_EMAILJS_TEMPLATE_ID`: Your EmailJS template ID
- `REACT_APP_EMAILJS_PUBLIC_KEY`: Your EmailJS public key

## Technologies Used

- React
- EmailJS
- CSS3
- Create React App

## Contact

VMS Holdings - vmsholdings@vmsforsea.com