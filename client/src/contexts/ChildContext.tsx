import React, { createContext, useContext, useState, useEffect } from 'react';
import { Child, ChildContextType } from '../types';
import { storage, generateId } from '../utils/helpers';
import { useAuth } from './AuthContext';

const ChildContext = createContext<ChildContextType | undefined>(undefined);

// Dummy children data
const dummyChildren: Child[] = [
  {
    id: '1',
    parentId: '1',
    name: 'Aisyah',
    birthDate: new Date('2023-03-15'), // 18 months old
    gender: 'female',
    createdAt: new Date('2023-03-15')
  },
  {
    id: '2',
    parentId: '1',
    name: 'Ahmad',
    birthDate: new Date('2023-11-20'), // 10 months old
    gender: 'male',
    createdAt: new Date('2023-11-20')
  },
  {
    id: '3',
    parentId: '2',
    name: 'Zahra',
    birthDate: new Date('2024-01-10'), // 8 months old
    gender: 'female',
    createdAt: new Date('2024-01-10')
  }
];

export const ChildProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [childrenList, setChildrenList] = useState<Child[]>([]);
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);

  useEffect(() => {
    if (user) {
      // Get children for current user
      const userChildren = dummyChildren.filter(child => child.parentId === user.id);
      setChildrenList(userChildren);
      
      // Load selected child from storage or select first child
      const storedSelectedChildId = storage.get(`selectedChild_${user.id}`);
      if (storedSelectedChildId) {
        const storedChild = userChildren.find(c => c.id === storedSelectedChildId);
        if (storedChild) {
          setSelectedChild(storedChild);
        } else if (userChildren.length > 0) {
          setSelectedChild(userChildren[0]);
        }
      } else if (userChildren.length > 0) {
        setSelectedChild(userChildren[0]);
      }
    } else {
      setChildrenList([]);
      setSelectedChild(null);
    }
  }, [user]);

  const addChild = (childData: Omit<Child, 'id' | 'parentId' | 'createdAt'>) => {
    if (!user) return;
    
    const newChild: Child = {
      ...childData,
      id: generateId(),
      parentId: user.id,
      createdAt: new Date()
    };
    
    dummyChildren.push(newChild);
    setChildrenList(prev => [...prev, newChild]);
    
    // Auto-select new child if it's the first one
    if (childrenList.length === 0) {
      setSelectedChild(newChild);
      storage.set(`selectedChild_${user.id}`, newChild.id);
    }
  };

  const updateChild = (id: string, updates: Partial<Child>) => {
    const updatedChild = { ...childrenList.find(c => c.id === id)!, ...updates };
    
    // Update in dummy data
    const index = dummyChildren.findIndex(c => c.id === id);
    if (index !== -1) {
      dummyChildren[index] = updatedChild;
    }
    
    // Update in state
    setChildrenList(prev => prev.map(c => c.id === id ? updatedChild : c));
    
    // Update selected child if it's the one being updated
    if (selectedChild?.id === id) {
      setSelectedChild(updatedChild);
    }
  };

  const selectChild = (child: Child) => {
    setSelectedChild(child);
    if (user) {
      storage.set(`selectedChild_${user.id}`, child.id);
    }
  };

  const deleteChild = (id: string) => {
    // Remove from dummy data
    const index = dummyChildren.findIndex(c => c.id === id);
    if (index !== -1) {
      dummyChildren.splice(index, 1);
    }
    
    // Remove from state
    const updatedChildren = childrenList.filter(c => c.id !== id);
    setChildrenList(updatedChildren);
    
    // Update selected child
    if (selectedChild?.id === id) {
      const newSelected = updatedChildren.length > 0 ? updatedChildren[0] : null;
      setSelectedChild(newSelected);
      if (user) {
        if (newSelected) {
          storage.set(`selectedChild_${user.id}`, newSelected.id);
        } else {
          storage.remove(`selectedChild_${user.id}`);
        }
      }
    }
  };

  const value: ChildContextType = {
    children: childrenList,
    selectedChild,
    addChild,
    updateChild,
    selectChild,
    deleteChild
  };

  return (
    <ChildContext.Provider value={value}>
      {children}
    </ChildContext.Provider>
  );
};

export const useChildren = (): ChildContextType => {
  const context = useContext(ChildContext);
  if (!context) {
    throw new Error('useChildren must be used within a ChildProvider');
  }
  return context;
};