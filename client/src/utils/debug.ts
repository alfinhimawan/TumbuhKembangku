import { getKPSPByAge, getActivitiesByAge } from '../data/kpspData';
import { calculateAge } from '../utils/helpers';

// Test script untuk debugging
console.log('=== TESTING KPSP Functions ===');

// Test untuk anak 18 bulan
const testAge = 18;
console.log(`Testing for age: ${testAge} months`);

const questions = getKPSPByAge(testAge);
console.log(`Found ${questions.length} questions:`, questions);

const activities = getActivitiesByAge(testAge);
console.log(`Found ${activities.length} activities:`, activities);

// Test calculate age
const testBirthDate = new Date('2023-03-15');
const age = calculateAge(testBirthDate);
console.log('Calculated age:', age);

export {}; // Make it a module