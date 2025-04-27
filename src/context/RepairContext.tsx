import React, { createContext, useState, useContext, ReactNode } from 'react';

// Types
export type SkillType = 'Appliances' | 'Clothes' | 'Bikes' | 'Electronics' | 'Furniture' | 'Other';
export type RepairerType = 'Volunteer' | 'Trade';

export interface Repairer {
  id: string;
  name: string;
  location: string;
  skills: SkillType[];
  repairerType: RepairerType;
  contactMethod: string;
  description: string;
  createdAt: Date;
}

export interface RepairRequest {
  id: string;
  name: string;
  location: string;
  itemToRepair: string;
  skillNeeded: SkillType;
  description: string;
  createdAt: Date;
}

interface RepairContextType {
  repairers: Repairer[];
  addRepairer: (repairer: Omit<Repairer, 'id' | 'createdAt'>) => void;
  repairRequests: RepairRequest[];
  addRepairRequest: (request: Omit<RepairRequest, 'id' | 'createdAt'>) => void;
}

const RepairContext = createContext<RepairContextType | undefined>(undefined);

// Sample data
const initialRepairers: Repairer[] = [
  {
    id: '1',
    name: 'John Smith',
    location: 'San Francisco, CA',
    skills: ['Electronics', 'Appliances'],
    repairerType: 'Volunteer',
    contactMethod: 'john@example.com',
    description: 'I specialize in repairing small electronics and household appliances. I have 10 years of experience as an electrical engineer.',
    createdAt: new Date('2023-01-15')
  },
  {
    id: '2',
    name: 'Maria Garcia',
    location: 'Boston, MA',
    skills: ['Clothes', 'Furniture'],
    repairerType: 'Trade',
    contactMethod: '555-123-4567',
    description: 'Professional seamstress with expertise in furniture upholstery and clothing repairs.',
    createdAt: new Date('2023-02-20')
  },
  {
    id: '3',
    name: 'David Park',
    location: 'Seattle, WA',
    skills: ['Bikes', 'Appliances'],
    repairerType: 'Volunteer',
    contactMethod: 'david@example.com',
    description: 'Former bike shop mechanic wanting to help the community. I can also fix smaller kitchen appliances.',
    createdAt: new Date('2023-03-05')
  }
];

const initialRequests: RepairRequest[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    location: 'Portland, OR',
    itemToRepair: 'Vintage Radio',
    skillNeeded: 'Electronics',
    description: 'My grandfather\'s vintage radio from the 1960s stopped working. It turns on but produces no sound.',
    createdAt: new Date('2023-04-10')
  },
  {
    id: '2',
    name: 'Michael Lee',
    location: 'Chicago, IL',
    itemToRepair: 'Broken Chair',
    skillNeeded: 'Furniture',
    description: 'Wooden dining chair with a broken leg and loose back support. Family heirloom that I\'d like to save.',
    createdAt: new Date('2023-04-15')
  }
];

export const RepairProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [repairers, setRepairers] = useState<Repairer[]>(initialRepairers);
  const [repairRequests, setRepairRequests] = useState<RepairRequest[]>(initialRequests);

  const addRepairer = (repairer: Omit<Repairer, 'id' | 'createdAt'>) => {
    const newRepairer: Repairer = {
      ...repairer,
      id: `${repairers.length + 1}`,
      createdAt: new Date()
    };
    setRepairers([...repairers, newRepairer]);
  };

  const addRepairRequest = (request: Omit<RepairRequest, 'id' | 'createdAt'>) => {
    const newRequest: RepairRequest = {
      ...request,
      id: `${repairRequests.length + 1}`,
      createdAt: new Date()
    };
    setRepairRequests([...repairRequests, newRequest]);
  };

  return (
    <RepairContext.Provider value={{ 
      repairers, 
      addRepairer, 
      repairRequests, 
      addRepairRequest 
    }}>
      {children}
    </RepairContext.Provider>
  );
};

export const useRepairContext = () => {
  const context = useContext(RepairContext);
  if (context === undefined) {
    throw new Error('useRepairContext must be used within a RepairProvider');
  }
  return context;
};