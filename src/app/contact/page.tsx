"use client";
import React, { useState, ChangeEvent } from 'react';

interface FormData {
    name: string;
    email: string;
    company: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    message?: string;
}

interface ContactMethod {
    icon: string;
    title: string;
    description: string;
    action: string;
}

export default function Contact() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        company: "",
        message: ''
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>('');

    const contactMethods: ContactMethod[] = [
        {
            icon: '📧',
            title: 'Email Us',
            description: 'Get in touch via email',
            action: 'cusgro2025@gmail.com',
        },
        {
            icon: '📞',
            title: 'Call Us',
            description: 'Speak directly with us',
            action: '+977 9804862878',
        }
    ];

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters long';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            if (!formData.company) {
                formData.company = 'Not provided';
            }
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (!response.ok) {
                setIsSubmitted(false);
                setSuccessMessage(data.message || 'An error occurred');
            }
            setIsSubmitted(true);
            setSuccessMessage(data.message || 'Message sent successfully!');

            // Reset form
            setFormData({
                name: '',
                email: '',
                company: '',
                message: ''
            });

            // Reset success message after 5 seconds
            setTimeout(() => setIsSubmitted(false), 5000);
        } catch (error) {
            setIsSubmitted(false);
            setSuccessMessage('Failed to send message. Please try again later.');
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <>
            <section className="bg-white py-20 px-6 mt-12" id="contact">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold text-gray-900 mb-6">
                            Get in Touch
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Ready to boost your sales with AI? Let's discuss how CUSGRO can transform your business.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Contact Form */}
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                    Send us a Message
                                </h3>
                                <p className="text-gray-600">
                                    Fill out the form below and we'll get back to you within 24 hours.
                                </p>
                            </div>

                            {isSubmitted && (
                                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                                    <div className="flex items-center gap-3">
                                        <span className="text-green-500 text-xl">{successMessage == "Send Message! 🎉" ? "✅": "❌"}</span>
                                        <div>
                                            <h4 className={`font-semibold ${successMessage == "Send Message! 🎉" ? "text-green-800" : "text-red-800"}`}>{successMessage}</h4>
                                            {successMessage == "Send Message! 🎉" ? <p className="text-green-700 text-sm">We'll get back to you soon.</p> : "" }
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {/* Name Field */}
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                                                }`}
                                            placeholder="Your full name"
                                        />
                                        {errors.name && (
                                            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                        )}
                                    </div>

                                    {/* Email Field */}
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                                                }`}
                                            placeholder="your@email.com"
                                        />
                                        {errors.email && (
                                            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Company Field */}
                                <div>
                                    <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Company
                                    </label>
                                    <input
                                        type="text"
                                        id="company"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent hover:border-gray-400 transition-all duration-300"
                                        placeholder="Your company name"
                                    />
                                </div>

                                {/* Message Field */}
                                <div>
                                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={5}
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all duration-300 ${errors.message ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                        placeholder="Tell us about your project or ask us anything..."
                                    />
                                    {errors.message && (
                                        <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                                    )}
                                    <p className="mt-1 text-sm text-gray-500">
                                        {formData.message.length}/500 characters
                                    </p>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="button"
                                    onClick={(e) => handleSubmit(e as any)}
                                    disabled={isSubmitting}
                                    className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${isSubmitting
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 active:scale-95'
                                        } text-white shadow-lg hover:shadow-xl`}
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Sending...
                                        </span>
                                    ) : (
                                        'Send Message'
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                    Other Ways to Reach Us
                                </h3>
                                <p className="text-gray-600">
                                    Choose the method that works best for you.
                                </p>
                            </div>

                            {/* Contact Methods */}
                            <div className="space-y-4">
                                {contactMethods.map((method, index) => (
                                    <div
                                        key={index}
                                        className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                                                {method.icon}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-gray-900 mb-1">
                                                    {method.title}
                                                </h4>
                                                <p className="text-gray-600 text-sm mb-2">
                                                    {method.description}
                                                </p>
                                                <p className="text-purple-600 font-semibold group-hover:text-purple-700 transition-colors">
                                                    {method.action}
                                                </p>
                                            </div>
                                            <div className="text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300">
                                                →
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
