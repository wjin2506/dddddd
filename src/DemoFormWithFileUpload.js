import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import './DemoForm.css';

const DemoFormWithFileUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileUrls, setFileUrls] = useState([]);

  // 폼 데이터 관리 (localStorage에 저장)
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('demo-formData');
    return saved ? JSON.parse(saved) : {
      firstName: '',
      lastName: '',
      businessEmail: '',
      phoneNumber: '',
      jobTitle: '',
      enterprise: '',
      country: '',
      projectInfo: '',
      optInProductUpdates: false,
      optInSalesOutreach: false,
      optInEvents: false
    };
  });

  // formData 변경 시 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('demo-formData', JSON.stringify(formData));
  }, [formData]);

  // EmailJS 초기화
  useEffect(() => {
    emailjs.init(process.env.REACT_APP_EMAILJS_PUBLIC_KEY || "Bu5XOwkzSj9fTCs");
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Cloudinary 업로드 함수 (Cloudinary 계정 필요)
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'YOUR_UPLOAD_PRESET'); // Cloudinary에서 설정

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/auto/upload`, // YOUR_CLOUD_NAME 변경 필요
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Upload failed:', error);
      return null;
    }
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      file: file
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);

    // 파일을 Cloudinary에 업로드 (옵션)
    // const uploadPromises = files.map(file => uploadToCloudinary(file));
    // const urls = await Promise.all(uploadPromises);
    // setFileUrls(prev => [...prev, ...urls.filter(url => url !== null)]);
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Base64 변환 함수 (작은 파일용)
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 작은 파일들을 Base64로 변환 (5MB 이하만)
      let attachments = [];
      for (const fileObj of uploadedFiles) {
        if (fileObj.file.size < 5 * 1024 * 1024) { // 5MB 이하
          try {
            const base64 = await convertToBase64(fileObj.file);
            attachments.push({
              name: fileObj.name,
              content: base64.split(',')[1], // data:image/jpeg;base64, 부분 제거
              type: fileObj.file.type
            });
          } catch (error) {
            console.error('File conversion error:', error);
          }
        }
      }

      // 이메일 템플릿에 전달할 데이터
      const emailData = {
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.businessEmail,
        phone: formData.phoneNumber,
        company: formData.enterprise,
        country: formData.country,
        job_title: formData.jobTitle,
        project_description: formData.projectInfo || '프로젝트 설명이 제공되지 않았습니다.',
        files_info: uploadedFiles.length > 0
          ? uploadedFiles.map(file => `${file.name} (${formatFileSize(file.size)})`).join(', ')
          : '첨부파일이 없습니다.',
        // file_links: fileUrls.length > 0 ? fileUrls.join('\n') : '', // Cloudinary 링크
        // attachments: JSON.stringify(attachments), // Base64 첨부파일 (EmailJS Pro 필요)
        opt_product_updates: formData.optInProductUpdates ? '예' : '아니요',
        opt_sales_outreach: formData.optInSalesOutreach ? '예' : '아니요',
        opt_events: formData.optInEvents ? '예' : '아니요'
      };

      // EmailJS로 이메일 전송
      const result = await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_oh96wzb',
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'template_53307ep',
        emailData
      );

      console.log('Email sent successfully:', result);
      alert('Demo request submitted successfully! We will contact you soon.');

      // 성공적으로 제출 후 초기화
      localStorage.removeItem('demo-formData');
      setFormData({
        firstName: '',
        lastName: '',
        businessEmail: '',
        phoneNumber: '',
        jobTitle: '',
        enterprise: '',
        country: '',
        projectInfo: '',
        optInProductUpdates: false,
        optInSalesOutreach: false,
        optInEvents: false
      });
      setUploadedFiles([]);
      setFileUrls([]);
    } catch (error) {
      console.error('Email sending failed:', error);
      alert('Failed to submit demo request. Please try again or contact us directly at vmsholdings@vmsforsea.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 나머지 렌더링 코드는 동일...
  return (
    <div className="demo-page-container">
      {/* 기존 JSX 코드와 동일 */}
    </div>
  );
};

export default DemoFormWithFileUpload;