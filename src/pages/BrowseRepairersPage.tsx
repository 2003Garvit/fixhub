import React, { useState, useEffect } from 'react';
import { useRepairContext, SkillType } from '../context/RepairContext';
import { MapPin, MessageSquare, Filter, Search, X } from 'lucide-react';

const BrowseRepairersPage: React.FC = () => {
  const { repairers } = useRepairContext();
  const [filteredRepairers, setFilteredRepairers] = useState(repairers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<SkillType[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  
  const skills: SkillType[] = ['Appliances', 'Clothes', 'Bikes', 'Electronics', 'Furniture', 'Other'];
  
  useEffect(() => {
    let results = repairers;
    
    // Apply search filter
    if (searchTerm) {
      results = results.filter(
        repairer => 
          repairer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          repairer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          repairer.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply skills filter
    if (selectedSkills.length > 0) {
      results = results.filter(
        repairer => selectedSkills.some(skill => repairer.skills.includes(skill))
      );
    }
    
    // Apply type filter
    if (selectedType) {
      results = results.filter(repairer => repairer.repairerType === selectedType);
    }
    
    setFilteredRepairers(results);
  }, [repairers, searchTerm, selectedSkills, selectedType]);
  
  const toggleSkill = (skill: SkillType) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };
  
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSkills([]);
    setSelectedType('');
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Find Skilled Repairers</h1>
        <p className="text-gray-600">Connect with people who can help fix your items</p>
      </div>
      
      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Search by name, location or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <button
            className="md:w-auto flex items-center justify-center space-x-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </button>
          
          {(selectedSkills.length > 0 || selectedType) && (
            <button
              className="md:w-auto flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              onClick={clearFilters}
            >
              <X className="h-5 w-5" />
              <span>Clear Filters</span>
            </button>
          )}
        </div>
        
        {/* Filter options */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Filter by skills:</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedSkills.includes(skill)
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Filter by type:</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedType(selectedType === 'Volunteer' ? '' : 'Volunteer')}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedType === 'Volunteer'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  Volunteer
                </button>
                <button
                  onClick={() => setSelectedType(selectedType === 'Trade' ? '' : 'Trade')}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedType === 'Trade'
                      ? 'bg-amber-500 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  Professional
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Active filters summary */}
        {(selectedSkills.length > 0 || selectedType) && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-500">Active filters:</span>
            
            {selectedSkills.map(skill => (
              <span 
                key={skill} 
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800"
              >
                {skill}
                <button 
                  type="button" 
                  onClick={() => toggleSkill(skill)}
                  className="ml-1.5 inline-flex flex-shrink-0 h-4 w-4 items-center justify-center rounded-full text-emerald-400 hover:bg-emerald-200 hover:text-emerald-500 focus:outline-none focus:bg-emerald-500 focus:text-white"
                >
                  <span className="sr-only">Remove filter for {skill}</span>
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
            
            {selectedType && (
              <span 
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {selectedType}
                <button 
                  type="button" 
                  onClick={() => setSelectedType('')}
                  className="ml-1.5 inline-flex flex-shrink-0 h-4 w-4 items-center justify-center rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:outline-none focus:bg-blue-500 focus:text-white"
                >
                  <span className="sr-only">Remove filter for {selectedType}</span>
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
          </div>
        )}
      </div>
      
      {/* Results Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRepairers.length > 0 ? (
          filteredRepairers.map((repairer) => (
            <div key={repairer.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-semibold text-gray-800">{repairer.name}</h2>
                  <span className={`text-xs px-2 py-1 rounded-full ${repairer.repairerType === 'Volunteer' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'}`}>
                    {repairer.repairerType}
                  </span>
                </div>
                
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{repairer.location}</span>
                </div>
                
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {repairer.skills.map((skill) => (
                      <span key={skill} className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <p className="text-gray-700 text-sm mb-4">{repairer.description}</p>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                    onClick={() => window.open(`mailto:${repairer.contactMethod}`, '_blank')}
                  >
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Contact Repairer
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-10 text-center">
            <div className="text-gray-500 mb-2">No repairers found matching your criteria</div>
            <button 
              onClick={clearFilters}
              className="text-emerald-600 hover:text-emerald-700"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseRepairersPage;