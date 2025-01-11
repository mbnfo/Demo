import React, { useState } from 'react';

const ContactForm = ({ text, question_1_data, question_2_data, city, state }) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userContact, setUserContact] = useState('');

  const handleBackEnd = async (e) => {
    e.preventDefault();
    const formData = {
      text,
      question_1: question_1_data.option,
      question_2: question_2_data.option,
      name: userName,
      email: userEmail,
      contact: userContact,
      city,
      state,
    };
    console.log('function has been called');
    // Send data to the webhook endpoint (backend)
    try {
      const response = await fetch('http://localhost:5000/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Response:', data);
    } catch (error) {
      console.error('Error sending webhook:', error);
    }
  };

  const formatPhoneNumber = (value) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)})-${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)})-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const handlePhoneInput = (e) => {
    e.target.value = formatPhoneNumber(e.target.value);
    setUserContact(e.target.value);
  };

  return (
    <form className='contact-info' onSubmit={handleBackEnd}>
      <div id='input'>
        <label htmlFor='Name'><h3>Name*</h3></label>
        <input type='text' id='text-input' placeholder='Full Name' required onChange={(e) => setUserName(e.target.value)} />
      </div>
      <div id='input'>
        <label htmlFor='Email'><h3>Email*</h3></label>
        <input type='email' id='text-input' placeholder='example@email.com' required onChange={(e) => setUserEmail(e.target.value)} />
      </div>
      <div id='input'>
        <label htmlFor='Phone Number'><h3>Phone Number*</h3></label>
        <input type='tel' id='text-input' placeholder='(123)-456-7890' maxLength='14' autoComplete='tel' onChange={handlePhoneInput} value={userContact} />
      </div>
      <div>
        <input type='submit' id='submit-contact-info' />
      </div>
    </form>
  );
};

export default ContactForm;