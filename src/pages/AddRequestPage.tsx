import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRepairContext, SkillType } from '../context/RepairContext';

const AddRequestPage: React.FC = () => {
  const navigate = useNavigate();
  const { addRepairRequest } = useRepairContext();
  
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [itemToRepair, setItemToRepair] = useState('');
  const [skillNeeded, setSkillNeeded] = useState<SkillType>('Electronics');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const availableSkills: SkillType[] = ['Appliances', 'Clothes', 'Bikes', 'Electronics', 'Furniture', 'Other'];
  
  const validate = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!location.trim()) newErrors.location = 'Location is required';
    if (!itemToRepair.trim()) newErrors.itemToRepair = 'Item to repair is required';
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
      addRepairRequest({
        name,
        location,
        itemToRepair,
        skillNeeded,
        description
      });
      
      setIsSubmitting(false);
      navigate('/requests');
    }, 1000);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Request a Repair</h1>
          <p className="text-gray-600">Describe what you need fixed and get connected with skilled repairers</p>
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
              
              {/* Item to Repair */}
              <div>
                <label htmlFor="itemToRepair" className="block text-sm font-medium text-gray-700 mb-1">
                  Item to Repair <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="itemToRepair"
                  className={`block w-full px-3 py-2 border ${errors.itemToRepair ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500`}
                  placeholder="e.g., Vintage Radio, Leather Jacket, Kitchen Chair"
                  value={itemToRepair}
                  onChange={(e) => setItemToRepair(e.target.value)}
                />
                {errors.itemToRepair && <p className="mt-1 text-sm text-red-600">{errors.itemToRepair}</p>}
              </div>
              
              {/* Skill Needed */}
              <div>
                <label htmlFor="skillNeeded" className="block text-sm font-medium text-gray-700 mb-1">
                  Skill Needed <span className="text-red-500">*</span>
                </label>
                <select
                  id="skillNeeded"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  value={skillNeeded}
                  onChange={(e) => setSkillNeeded(e.target.value as SkillType)}
                >
                  {availableSkills.map((skill) => (
                    <option key={skill} value={skill}>{skill}</option>
                  ))}
                </select>
              </div>
              
              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description of the Problem <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  rows={4}
                  className={`block w-full px-3 py-2 border ${errors.description ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500`}
                  placeholder="Describe the item, what's wrong with it, and any other relevant details."
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
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRequestPage;