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
  limit,
  QueryConstraint,
  DocumentData,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './config';

/**
 * Firestore utility functions with offline-first support
 * These wrap Firestore operations to work seamlessly with TanStack Query
 */

export const firestoreUtils = {
  // Get a single document
  getDocument: async <T = DocumentData>(collectionName: string, id: string): Promise<T | null> => {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? ({ id: docSnap.id, ...docSnap.data() } as T) : null;
  },

  // Get multiple documents with optional query constraints
  getDocuments: async <T = DocumentData>(
    collectionName: string,
    constraints: QueryConstraint[] = []
  ): Promise<T[]> => {
    const q = query(collection(db, collectionName), ...constraints);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as T));
  },

  // Create or update a document
  setDocument: async <T = DocumentData>(
    collectionName: string,
    id: string,
    data: Partial<T>,
    merge = true
  ): Promise<void> => {
    const docRef = doc(db, collectionName, id);
    await setDoc(docRef, { ...data, updatedAt: serverTimestamp() }, { merge });
  },

  // Update a document
  updateDocument: async <T = DocumentData>(
    collectionName: string,
    id: string,
    data: Partial<T>
  ): Promise<void> => {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, { ...data, updatedAt: serverTimestamp() } as any);
  },

  // Delete a document
  deleteDocument: async (collectionName: string, id: string): Promise<void> => {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
  },
};

// Export Firestore query builders for convenience
export { collection, doc, query, where, orderBy, limit, serverTimestamp };
