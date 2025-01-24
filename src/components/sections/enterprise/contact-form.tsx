import React, { useState } from 'react';
import squaresImage from './squares.svg';
import hexagonImage from './hexagon.svg';
import ButtonGlow from '@/components/ui/buttons/button.glow';
import { get as hello } from '@api/hello';

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  country: string;
  company: string;
  companyEmail: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phone: '',
    country: '',
    company: '',
    companyEmail: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.country) {
      newErrors.country = 'Please select a country';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }

    if (!formData.companyEmail.trim()) {
      newErrors.companyEmail = 'Company email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.companyEmail)) {
      newErrors.companyEmail = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await hello();

    console.log(result);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setSubmitStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        country: '',
        company: '',
        companyEmail: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative">
      <img
        src={squaresImage}
        alt=""
        className="absolute -left-24 top-1/4 w-20 h-20 opacity-20"
        aria-hidden="true"
      />
      <img
        src={hexagonImage}
        alt=""
        className="absolute -right-16 bottom-1/4 w-24 h-24 opacity-20"
        aria-hidden="true"
      />

      <div className="backdrop-blur-md bg-[#111111]/50 rounded-xl relative z-10 opacity-70">
        {submitStatus === 'success' && (
          <div className="p-4 mb-4 text-green-400 text-center">
            Thank you for your message. We'll get back to you soon!
          </div>
        )}
        {submitStatus === 'error' && (
          <div className="p-4 mb-4 text-red-400 text-center">
            Something went wrong. Please try again later.
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="firstName" className="block text-sm text-gray-400">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full bg-black border ${errors.firstName ? 'border-red-500' : 'border-gray-800'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gray-600`}
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="lastName" className="block text-sm text-gray-400">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full bg-black border ${errors.lastName ? 'border-red-500' : 'border-gray-800'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gray-600`}
              />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm text-gray-400">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder='+1 (555) 555-5555'
                value={formData.phone}
                onChange={handleChange}
                className={`w-full bg-black border ${errors.phone ? 'border-red-500' : 'border-gray-800'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gray-600`}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="country" className="block text-sm text-gray-400">
                Country
              </label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className={`w-full bg-black border ${errors.country ? 'border-red-500' : 'border-gray-800'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gray-600`}
              >
                <option value="">Select country</option>
                <option value="Mexico">Mexico</option>
                <option value="USA">USA</option>
                <option value="Canada">Canada</option>
              </select>
              {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="company" className="block text-sm text-gray-400">
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className={`w-full bg-black border ${errors.company ? 'border-red-500' : 'border-gray-800'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gray-600`}
              />
              {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="companyEmail" className="block text-sm text-gray-400">
                Company Email
              </label>
              <input
                type="email"
                id="companyEmail"
                name="companyEmail"
                value={formData.companyEmail}
                onChange={handleChange}
                className={`w-full bg-black border ${errors.companyEmail ? 'border-red-500' : 'border-gray-800'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gray-600`}
              />
              {errors.companyEmail && <p className="text-red-500 text-xs mt-1">{errors.companyEmail}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm text-gray-400">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder='Hello Z, I&apos;m interested in the enterprise special package for my team of 100...'
              rows={4}
              className={`w-full bg-black border ${errors.message ? 'border-red-500' : 'border-gray-800'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gray-600 resize-none`}
            />
            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
          </div>

          <ButtonGlow
            type="submit"
            className='w-full p-8 text-lg'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send message'}
          </ButtonGlow>
        </form>
      </div>
    </div>
  );
};
