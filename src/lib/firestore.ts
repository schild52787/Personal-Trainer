/**
 * Simplified Firestore CRUD helpers
 * Type-safe database operations for all collections
 */

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit as firestoreLimit,
  type QueryConstraint,
  Timestamp,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase/config';
import type {
  User,
  EquipmentProfile,
  Exercise,
  ProgramTemplate,
  ProgramInstance,
  WorkoutInstance,
  SetLog,
  ReadinessEntry,
} from '@/types/models';

// Helper to convert Firestore Timestamps to Dates
function convertTimestamps<T>(data: any): T {
  const converted = { ...data };
  Object.keys(converted).forEach((key) => {
    if (converted[key] instanceof Timestamp) {
      converted[key] = converted[key].toDate();
    }
  });
  return converted as T;
}

// Generic CRUD operations
async function get<T>(collectionName: string, id: string): Promise<T | null> {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return null;

  return convertTimestamps<T>({
    id: docSnap.id,
    ...docSnap.data(),
  });
}

async function create<T>(
  collectionName: string,
  id: string,
  data: Omit<T, 'id'>
): Promise<string> {
  const docRef = doc(db, collectionName, id);
  await setDoc(docRef, {
    ...data,
    createdAt: serverTimestamp(),
  });
  return id;
}

async function update<T>(
  collectionName: string,
  id: string,
  data: Partial<T>
): Promise<void> {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  } as any);
}

async function remove(collectionName: string, id: string): Promise<void> {
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
}

async function list<T>(
  collectionName: string,
  constraints: QueryConstraint[] = []
): Promise<T[]> {
  const q = query(collection(db, collectionName), ...constraints);
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) =>
    convertTimestamps<T>({
      id: doc.id,
      ...doc.data(),
    })
  );
}

// ==================== COLLECTIONS ====================

export const firestore = {
  // Users
  users: {
    get: (id: string) => get<User>('users', id),
    create: (id: string, data: Omit<User, 'id'>) =>
      create<User>('users', id, data),
    update: (id: string, data: Partial<User>) => update<User>('users', id, data),
    delete: (id: string) => remove('users', id),
  },

  // Equipment Profiles
  equipmentProfiles: {
    get: (id: string) => get<EquipmentProfile>('equipmentProfiles', id),
    create: (id: string, data: Omit<EquipmentProfile, 'id'>) =>
      create<EquipmentProfile>('equipmentProfiles', id, data),
    update: (id: string, data: Partial<EquipmentProfile>) =>
      update<EquipmentProfile>('equipmentProfiles', id, data),
    delete: (id: string) => remove('equipmentProfiles', id),
    listByUser: (userId: string) =>
      list<EquipmentProfile>('equipmentProfiles', [where('userId', '==', userId)]),
  },

  // Exercises
  exercises: {
    get: (id: string) => get<Exercise>('exercises', id),
    create: (id: string, data: Omit<Exercise, 'id'>) =>
      create<Exercise>('exercises', id, data),
    update: (id: string, data: Partial<Exercise>) =>
      update<Exercise>('exercises', id, data),
    delete: (id: string) => remove('exercises', id),
    list: () => list<Exercise>('exercises'),
    listSafe: (injuryRegions: string[]) =>
      list<Exercise>('exercises'), // TODO: Add filtering logic
  },

  // Program Templates
  programTemplates: {
    get: (id: string) => get<ProgramTemplate>('programTemplates', id),
    create: (id: string, data: Omit<ProgramTemplate, 'id'>) =>
      create<ProgramTemplate>('programTemplates', id, data),
    list: () => list<ProgramTemplate>('programTemplates'),
  },

  // Program Instances
  programInstances: {
    get: (id: string) => get<ProgramInstance>('programInstances', id),
    create: (id: string, data: Omit<ProgramInstance, 'id'>) =>
      create<ProgramInstance>('programInstances', id, data),
    update: (id: string, data: Partial<ProgramInstance>) =>
      update<ProgramInstance>('programInstances', id, data),
    getActive: (userId: string) =>
      list<ProgramInstance>('programInstances', [
        where('userId', '==', userId),
        where('status', '==', 'active'),
        firestoreLimit(1),
      ]).then((instances) => instances[0] || null),
  },

  // Workout Instances
  workoutInstances: {
    get: (id: string) => get<WorkoutInstance>('workoutInstances', id),
    create: (id: string, data: Omit<WorkoutInstance, 'id'>) =>
      create<WorkoutInstance>('workoutInstances', id, data),
    update: (id: string, data: Partial<WorkoutInstance>) =>
      update<WorkoutInstance>('workoutInstances', id, data),
    getToday: (userId: string) =>
      list<WorkoutInstance>('workoutInstances', [
        where('userId', '==', userId),
        where('date', '>=', new Date(new Date().setHours(0, 0, 0, 0))),
        where('date', '<', new Date(new Date().setHours(23, 59, 59, 999))),
        firestoreLimit(1),
      ]).then((instances) => instances[0] || null),
    listByUser: (userId: string, limit = 30) =>
      list<WorkoutInstance>('workoutInstances', [
        where('userId', '==', userId),
        orderBy('date', 'desc'),
        firestoreLimit(limit),
      ]),
  },

  // Set Logs
  setLogs: {
    get: (id: string) => get<SetLog>('setLogs', id),
    create: (id: string, data: Omit<SetLog, 'id'>) =>
      create<SetLog>('setLogs', id, data),
    update: (id: string, data: Partial<SetLog>) =>
      update<SetLog>('setLogs', id, data),
    listByWorkout: (workoutInstanceId: string) =>
      list<SetLog>('setLogs', [
        where('workoutInstanceId', '==', workoutInstanceId),
        orderBy('setNumber', 'asc'),
      ]),
  },

  // Readiness Entries
  readinessEntries: {
    get: (id: string) => get<ReadinessEntry>('readinessEntries', id),
    create: (id: string, data: Omit<ReadinessEntry, 'id'>) =>
      create<ReadinessEntry>('readinessEntries', id, data),
    getToday: (userId: string) =>
      list<ReadinessEntry>('readinessEntries', [
        where('userId', '==', userId),
        where('date', '>=', new Date(new Date().setHours(0, 0, 0, 0))),
        firestoreLimit(1),
      ]).then((entries) => entries[0] || null),
  },
};
