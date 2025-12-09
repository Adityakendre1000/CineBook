import React from 'react';
import { Send, Mail, Phone, MapPin } from 'lucide-react';

const ContactUs = () => (
  <div className="min-h-screen bg-[#1a1a1a] pt-24 px-4 pb-12 animate-fade-in">
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          Get in <span className="text-red-600">Touch</span>
        </h1>
        <p className="text-xl text-gray-400">Have questions? We'd love to hear from you.</p>
      </div>

      <div className="bg-[#1e1e1e] border border-white/10 p-8 rounded-3xl shadow-2xl">
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">
                Name
              </label>
              <input
                type="text"
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-all"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">
                Email
              </label>
              <input
                type="email"
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-all"
                placeholder="hello@example.com"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">
              Message
            </label>
            <textarea
              rows="4"
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-all"
              placeholder="How can we help?"
            ></textarea>
          </div>
          <button className="w-full py-4 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-red-600/20 flex items-center justify-center gap-2">
            <Send size={20} /> Send Message
          </button>
        </form>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="p-4">
          <Mail className="mx-auto text-red-500 mb-2" size={24} />
          <p className="text-white font-bold">support@cinebook.com</p>
        </div>
        <div className="p-4">
          <Phone className="mx-auto text-red-500 mb-2" size={24} />
          <p className="text-white font-bold">+91 9921573539</p>
        </div>
        <div className="p-4">
          <MapPin className="mx-auto text-red-500 mb-2" size={24} />
          <p className="text-white font-bold">Sunbeam, Pune</p>
        </div>
      </div>
    </div>
  </div>
);

export default ContactUs;