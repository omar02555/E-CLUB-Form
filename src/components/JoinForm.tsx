
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { CheckCircle, ArrowRight, User, Mail, Phone, School, BookOpen, PanelTopOpen, BadgeCheck } from "lucide-react";

// Define form schema with validation
const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  university: z.string().min(2, 'University is required'),
  department: z.string().min(1, 'Department is required'),
  segment: z.string().min(1, 'Segment is required'),
  hasExperience: z.boolean().default(false),
  email: z.string().email('Invalid email address').refine(
    (email) => email.toLowerCase().endsWith('@gmail.com'),
    { message: 'Only Google email addresses are allowed' }
  ),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
});

type FormValues = z.infer<typeof formSchema>;

const JoinForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      university: 'New Cairo Technological University',
      department: '',
      segment: '',
      hasExperience: false,
      email: '',
      phone: '',
    }
  });

  const departments = [
    'Petroleum',
    'Mechatronics',
    'Autotronics',
    'Renewable Energy',
    'Orthotics'
  ];

  const segments = [
    'Operations',
    'Design',
    'Video Editing',
    'Technical',
    'HR',
    'PR',
    'Marketing'
  ];

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://formspree.io/f/mblgrjvw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        setIsSubmitted(true);
        reset();
        toast.success('Your application has been submitted successfully!');
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      toast.error('There was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto overflow-hidden rounded-3xl backdrop-blur-lg shadow-2xl border border-white/5">
      <div className="flex flex-col md:flex-row">
        {/* Form Column */}
        <div className="w-full md:w-1/2 p-6 md:p-10 bg-gray-900/60 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-club-blue/80 to-indigo-950/40 pointer-events-none" />
          
          <div className="relative z-10 max-w-md mx-auto">
            {isSubmitted ? (
              <div className="text-center py-10 space-y-6 animate-fade-in">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-500/20 border border-green-500/30 mb-4"> 
                  <CheckCircle className="w-12 h-12 text-green-400" />
                </div>
                <h3 className="text-3xl font-bold text-white">Application Submitted!</h3>
                <p className="text-gray-300 mb-8 text-lg">
                  Thank you for your interest in joining our club. We'll review your application and get back to you soon.
                </p>
                <button 
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="group relative overflow-hidden px-6 py-4 rounded-xl bg-club-gold hover:bg-amber-500 transition-all duration-300 text-gray-900 font-semibold text-lg flex items-center justify-center gap-2"
                >
                  <span>Submit Another Application</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 staggered-fade-in"> 
                <h2 className="text-2xl font-bold text-white mb-6">Join Our Team</h2>
                
                <div>
                  <label htmlFor="name" className="form-label text-white flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>Full Name</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      className="form-input w-full text-white bg-white/5 border border-white/10 rounded-xl focus:border-club-gold/50 focus:ring-club-gold/20"
                      placeholder="Your full name"
                      {...register('name')}
                    />
                  </div>
                  {errors.name && <p className="form-error">{errors.name.message}</p>}
                </div>

                <div>
                  <label htmlFor="university" className="form-label text-white flex items-center gap-2">
                    <School className="w-4 h-4" />
                    <span>University</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="university"
                      className="form-input w-full text-white bg-white/5 border border-white/10 rounded-xl focus:border-club-gold/50 focus:ring-club-gold/20"
                      placeholder="Your university"
                      {...register('university')}
                    />
                  </div>
                  {errors.university && <p className="form-error">{errors.university.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="department" className="form-label text-white flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      <span>Department</span>
                    </label>
                    <div className="relative">
                      <select
                        id="department"
                        className="form-select w-full text-white bg-white/5 border border-white/10 rounded-xl focus:border-club-gold/50 focus:ring-club-gold/20 appearance-none"
                        {...register('department')}
                      >
                        <option value="" className="bg-gray-900">Select a department</option>
                        {departments.map((department) => (
                          <option key={department} value={department} className="bg-gray-900">
                            {department}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-white">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                    {errors.department && <p className="form-error">{errors.department.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="segment" className="form-label text-white flex items-center gap-2">
                      <PanelTopOpen className="w-4 h-4" />
                      <span>Segment</span>
                    </label>
                    <div className="relative">
                      <select
                        id="segment"
                        className="form-select w-full text-white bg-white/5 border border-white/10 rounded-xl focus:border-club-gold/50 focus:ring-club-gold/20 appearance-none"
                        {...register('segment')}
                      >
                        <option value="" className="bg-gray-900">Select a segment</option>
                        {segments.map((segment) => (
                          <option key={segment} value={segment} className="bg-gray-900">
                            {segment}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-white">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                    {errors.segment && <p className="form-error">{errors.segment.message}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="form-label text-white flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>Google Email</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      className="form-input w-full text-white bg-white/5 border border-white/10 rounded-xl focus:border-club-gold/50 focus:ring-club-gold/20"
                      placeholder="your.name@gmail.com"
                      {...register('email')}
                    />
                  </div>
                  {errors.email && <p className="form-error">{errors.email.message}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="form-label text-white flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>Phone Number</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="phone"
                      className="form-input w-full text-white bg-white/5 border border-white/10 rounded-xl focus:border-club-gold/50 focus:ring-club-gold/20"
                      placeholder="+123 456 7890"
                      {...register('phone')}
                    />
                  </div>
                  {errors.phone && <p className="form-error">{errors.phone.message}</p>}
                </div>

                <div className="flex items-center gap-3 border border-white/10 p-4 rounded-xl bg-white/5">
                  <div className="shrink-0">
                    <input
                      type="checkbox"
                      id="hasExperience"
                      className="rounded bg-white/10 border-white/20 text-club-gold focus:ring-club-gold/30"
                      {...register('hasExperience')}
                    />
                  </div>
                  <label htmlFor="hasExperience" className="text-sm text-white flex items-center gap-2">
                    <BadgeCheck className="w-4 h-4 text-club-gold" />
                    <span>I have experience in my selected segment</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="group relative overflow-hidden w-full py-4 mt-4 bg-gradient-to-r from-club-gold to-amber-500 text-gray-900 font-bold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-club-gold/20"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Join Our Team
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
        
        {/* Image Column */}
        <div className="w-full md:w-1/2 bg-indigo-950 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/60 to-transparent z-10"></div>
          <img 
            src="/lovable-uploads/cd20cdc4-829e-460b-8909-c6e1c987bc86.png" 
            alt="Entrepreneurs Club" 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 text-white z-20">
            <div className="backdrop-blur-md bg-black/30 p-6 md:p-8 rounded-2xl border border-white/10 transform transition-transform hover:scale-[1.02] duration-300">
              <h3 className="text-3xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-club-gold to-amber-300">Join Our Journey</h3>
              <p className="opacity-90 text-lg mb-6">Become part of a community that turns ideas into reality at NCT University.</p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-club-gold/20 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-club-gold" />
                  </div>
                  <span className="text-gray-200">Develop entrepreneurial skills</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-club-gold/20 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-club-gold" />
                  </div>
                  <span className="text-gray-200">Connect with like-minded innovators</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-club-gold/20 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-club-gold" />
                  </div>
                  <span className="text-gray-200">Turn your ideas into reality</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinForm;
