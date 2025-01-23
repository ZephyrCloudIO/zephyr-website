import React, { useState } from 'react';
import squaresImage from './squares.svg';
import hexagonImage from './hexagon.svg';
import { cn } from '@/lib/utils';

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  country: string;
  company: string;
  companyEmail: string;
  message: string;
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log('Form submitted:', formData);
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
                className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gray-600"
                required
              />
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
                className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gray-600"
                required
              />
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
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gray-600"
                required
              />
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
                className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gray-600"
                required
              >
                <option value="">Select country</option>
                <option value="Mexico">Mexico</option>
                <option value="USA">USA</option>
                <option value="Canada">Canada</option>
              </select>
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
                className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gray-600"
                required
              />
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
                className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gray-600"
                required
              />
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
              className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gray-600 resize-none"
              required
            />
          </div>


          <button
            type="submit"
            className={cn(
                  'w-full group relative z-10 p-8 items-center md:h-[44px] h-[40px] border-2 border-zinc-500/30 rounded-full hover:border-zinc-400/80 justify-center bg-zinc-900 transition-all lg:hover:!opacity-100 flex lg:hover:bg-zinc-800 overflow-hidden',
                )}
          >
            Send message
          </button>
        </form>
      </div>
    </div>
  );
};
