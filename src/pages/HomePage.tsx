import React from 'react';
import { Link } from 'react-router-dom';
import { PenTool as Tool, Search, MessageSquare, ArrowRight } from 'lucide-react';
import { useRepairContext } from '../context/RepairContext';

const HomePage: React.FC = () => {
  const { repairers, repairRequests } = useRepairContext();
  
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-800 to-emerald-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Repair, Reuse, Reconnect</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Connect with skilled repairers in your community to give your broken items a second life
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/repairers" className="btn bg-amber-500 hover:bg-amber-600 transition-colors text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center">
              <Search className="h-5 w-5 mr-2" />
              Find a Repairer
            </Link>
            <Link to="/requests/add" className="btn bg-rose-500 hover:bg-rose-600 transition-colors text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              Post a Repair Request
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-amber-50 p-6 rounded-lg text-center transform transition-transform hover:scale-105">
              <div className="text-4xl font-bold text-amber-600 mb-2">{repairers.length}</div>
              <div className="text-gray-700">Skilled Repairers</div>
            </div>
            <div className="bg-emerald-50 p-6 rounded-lg text-center transform transition-transform hover:scale-105">
              <div className="text-4xl font-bold text-emerald-600 mb-2">{repairRequests.length}</div>
              <div className="text-gray-700">Active Repair Requests</div>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg text-center transform transition-transform hover:scale-105">
              <div className="text-4xl font-bold text-blue-600 mb-2">5</div>
              <div className="text-gray-700">Skills Categories</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-emerald-700" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Find Repairers</h3>
              <p className="text-gray-600">
                Browse our community of skilled fixers who can help repair your broken items
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-amber-700" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Request Repairs</h3>
              <p className="text-gray-600">
                Post your repair needs and let skilled repairers reach out to help
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Tool className="h-8 w-8 text-rose-700" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Share Your Skills</h3>
              <p className="text-gray-600">
                Volunteer your repair expertise to help others in the community
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Repairers */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Featured Repairers</h2>
            <Link to="/repairers" className="text-emerald-600 hover:text-emerald-700 flex items-center">
              View all <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {repairers.slice(0, 3).map((repairer) => (
              <div key={repairer.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-5">
                  <h3 className="text-lg font-semibold mb-2">{repairer.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{repairer.location}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {repairer.skills.map((skill) => (
                      <span key={skill} className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm mb-4 line-clamp-2">{repairer.description}</p>
                  <div className="flex justify-between items-center">
                    <span className={`text-xs px-2 py-1 rounded-full ${repairer.repairerType === 'Volunteer' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'}`}>
                      {repairer.repairerType}
                    </span>
                    <Link to={`/repairers?id=${repairer.id}`} className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                      Contact
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Join the Repair Movement?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Share your repair skills or find help for your broken items. Together we can reduce waste and build a more sustainable community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/repairers/add" className="btn bg-white text-emerald-700 hover:bg-gray-100 transition-colors px-6 py-3 rounded-lg font-semibold">
              Offer Your Repair Skills
            </Link>
            <Link to="/requests/add" className="btn bg-amber-500 hover:bg-amber-600 transition-colors text-white px-6 py-3 rounded-lg font-semibold">
              Request a Repair
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;