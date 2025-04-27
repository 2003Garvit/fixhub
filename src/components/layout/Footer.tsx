import React from 'react';
import { Heart, Github, Coffee } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-emerald-900 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3">FixHub</h3>
            <p className="text-emerald-100 text-sm">
              Connecting people with repair skills to those in need of repairs. Reduce waste,
              build community, and keep items out of landfills.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-emerald-100 hover:text-white transition-colors">Home</a></li>
              <li><a href="/repairers" className="text-emerald-100 hover:text-white transition-colors">Find Repairers</a></li>
              <li><a href="/requests" className="text-emerald-100 hover:text-white transition-colors">Browse Repair Requests</a></li>
              <li><a href="/about" className="text-emerald-100 hover:text-white transition-colors">About Us</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Get Involved</h3>
            <ul className="space-y-2">
              <li><a href="/repairers/add" className="text-emerald-100 hover:text-white transition-colors">Offer Your Repair Skills</a></li>
              <li><a href="/requests/add" className="text-emerald-100 hover:text-white transition-colors">Request a Repair</a></li>
              <li><a href="#" className="text-emerald-100 hover:text-white transition-colors flex items-center"><Coffee className="h-4 w-4 mr-1" /> Support This Project</a></li>
              <li><a href="#" className="text-emerald-100 hover:text-white transition-colors flex items-center"><Github className="h-4 w-4 mr-1" /> Contribute on GitHub</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-emerald-700 text-center">
          <p className="text-emerald-200 text-sm flex items-center justify-center">
            Made with <Heart className="h-4 w-4 text-red-400 mx-1" /> for a more sustainable world. &copy; {new Date().getFullYear()} FixHub
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;