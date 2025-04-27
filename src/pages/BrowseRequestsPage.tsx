import React, { useState, useEffect } from 'react';
import { useRepairContext, SkillType } from '../context/RepairContext';
import { MapPin, MessageSquare, Clock, Filter, Search, X } from 'lucide-react';

const BrowseRequestsPage: React.FC = () => {
  const { repairRequests } = useRepairContext();
  const [filteredRequests, setFilteredRequests] = useState(repairRequests);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<SkillType | ''>('');
  const [showFilters, setShowFilters] = useState(false);
  
  const skills: SkillType[] = ['Appliances', 'Clothes', 'Bikes', 'Electronics', 'Furniture', 'Other'];
  
  useEffect(() => {
    let results = repairRequests;
    
    // Apply search filter
    if (searchTerm) {
      results = results.filter(
        request => 
          request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.itemToRepair.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply skill filter
    if (selectedSkill) {
      results = results.filter(request => request.skillNeeded === selectedSkill);
    }
    
    setFilteredRequests(results);
  }, [repairRequests, searchTerm, selectedSkill]);
  
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSkill('');
  };
  
  // Format date to "X days ago"
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else {
      return `${diffDays} days ago`;
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Browse Repair Requests</h1>
        <p className="text-gray-600">Find repair requests that match your skills</p>
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
              placeholder="Search repair requests..."
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
          
          {(selectedSkill) && (
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
              <h3 className="text-sm font-medium text-gray-700 mb-2">Filter by skill needed:</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => setSelectedSkill(selectedSkill === skill ? '' : skill)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedSkill === skill
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Active filters summary */}
        {selectedSkill && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-500">Active filters:</span>
            
            <span 
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800"
            >
              {selectedSkill}
              <button 
                type="button" 
                onClick={() => setSelectedSkill('')}
                className="ml-1.5 inline-flex flex-shrink-0 h-4 w-4 items-center justify-center rounded-full text-emerald-400 hover:bg-emerald-200 hover:text-emerald-500 focus:outline-none focus:bg-emerald-500 focus:text-white"
              >
                <span className="sr-only">Remove filter for {selectedSkill}</span>
                <X className="h-3 w-3" />
              </button>
            </span>
          </div>
        )}
      </div>
      
      {/* Results Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRequests.length > 0 ? (
          filteredRequests.map((request) => (
            <div key={request.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-semibold text-gray-800">{request.itemToRepair}</h2>
                  <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">
                    {request.skillNeeded}
                  </span>
                </div>
                
                <div className="flex items-center text-gray-600 mb-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{request.location}</span>
                </div>
                
                <div className="flex items-center text-gray-500 mb-3">
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="text-sm">{formatDate(request.createdAt)}</span>
                </div>
                
                <p className="text-gray-700 text-sm mb-3">{request.description}</p>
                
                <div className="text-sm text-gray-600 mb-4">
                  Posted by: <span className="font-medium">{request.name}</span>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                  >
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Offer to Help
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-10 text-center">
            <div className="text-gray-500 mb-2">No repair requests found matching your criteria</div>
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

export default BrowseRequestsPage;