import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRepairContext, SkillType, RepairerType } from '../context/RepairContext';
import { Check } from 'lucide-react';

const AddRepairerPage: React.FC = () => {
  const navigate = useNavigate();
  const { addRepairer } = useRepairContext();
  
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [skills, setSkills] = useState<SkillType[]>([]);
  const [repairerType, setRepairerType] = useState<RepairerType>('Volunteer');
  const [contactMethod, setContactMethod] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const availableSkills: SkillType[] = ['Appliances', 'Clothes', 'Bikes', 'Electronics', 'Furniture', 'Other'];
  
  const toggleSkill = (skill: SkillType) => {
    if (skills.includes(skill)) {
      setSkills(skills.filter(s => s !== skill));
    } else {
      setSkills([...skills, skill]);
    }
  };
  
  const validate = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!location.trim()) newErrors.location = 'Location is required';
    if (skills.length === 0) newErrors.skills = 'At least one skill is required';
    if (!contactMethod.trim()) newErrors.contactMethod = 'Contact method is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      addRepairer({
        name,
        location,
        skills,
        repairerType,
        contactMethod,
        description
      });
      
      setIsSubmitting(false);
      navigate('/repairers');
    }, 1000);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Offer Your Repair Skills</h1>
          <p className="text-gray-600">Share your expertise and help others in the community</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  className={`block w-full px-3 py-2 border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>
              
              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="location"
                  className={`block w-full px-3 py-2 border ${errors.location ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500`}
                  placeholder="City, State"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
              </div>
              
              {/* Skills */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Skills <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableSkills.map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        skills.includes(skill)
                          ? 'bg-emerald-500 text-white'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {skills.includes(skill) && <Check className="inline-block h-3 w-3 mr-1" />}
                      {skill}
                    </button>
                  ))}
                </div>
                {errors.skills && <p className="mt-1 text-sm text-red-600">{errors.skills}</p>}
              </div>
              
              {/* Repairer Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Are you offering your skills as:
                </label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-emerald-600 focus:ring-emerald-500"
                      checked={repairerType === 'Volunteer'}
                      onChange={() => setRepairerType('Volunteer')}
                    />
                    <span className="ml-2 text-gray-700">Volunteer (free/donation)</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-emerald-600 focus:ring-emerald-500"
                      checked={repairerType === 'Trade'}
                      onChange={() => setRepairerType('Trade')}
                    />
                    <span className="ml-2 text-gray-700">Professional (paid)</span>
                  </label>
                </div>
              </div>
              
              {/* Contact Method */}
              <div>
                <label htmlFor="contactMethod" className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Contact Method <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="contactMethod"
                  className={`block w-full px-3 py-2 border ${errors.contactMethod ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500`}
                  placeholder="Email address or phone number"
                  value={contactMethod}
                  onChange={(e) => setContactMethod(e.target.value)}
                />
                <p className="mt-1 text-xs text-gray-500">This will be visible to users who want to contact you.</p>
                {errors.contactMethod && <p className="mt-1 text-sm text-red-600">{errors.contactMethod}</p>}
              </div>
              
              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description of Your Skills <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  rows={4}
                  className={`block w-full px-3 py-2 border ${errors.description ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500`}
                  placeholder="Describe your experience, the types of items you can repair, and any other relevant information."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
              </div>
              
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Listing'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRepairerPage;