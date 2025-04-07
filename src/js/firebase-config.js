// Importa las funciones necesarias de Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore';

// Configuración de Firebase
const firebaseConfig = {
    // Aquí irán tus credenciales de Firebase
    apiKey: "TU_API_KEY",
    authDomain: "TU_PROYECTO.firebaseapp.com",
    projectId: "TU_PROYECTO",
    storageBucket: "TU_PROYECTO.appspot.com",
    messagingSenderId: "TU_SENDER_ID",
    appId: "TU_APP_ID"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Referencia a la colección de horarios
const schedulesCollection = collection(db, 'schedules');

// Funciones para interactuar con Firestore
export const firebaseUtils = {
    // Obtener todos los horarios
    getSchedules: (callback) => {
        const q = query(schedulesCollection, orderBy('day'));
        return onSnapshot(q, (snapshot) => {
            const schedules = [];
            snapshot.forEach((doc) => {
                schedules.push({ id: doc.id, ...doc.data() });
            });
            callback(schedules);
        });
    },

    // Agregar un nuevo horario
    addSchedule: async (scheduleData) => {
        try {
            const docRef = await addDoc(schedulesCollection, scheduleData);
            return docRef.id;
        } catch (error) {
            console.error("Error al agregar horario:", error);
            throw error;
        }
    },

    // Actualizar un horario existente
    updateSchedule: async (scheduleId, scheduleData) => {
        try {
            const scheduleRef = doc(db, 'schedules', scheduleId);
            await updateDoc(scheduleRef, scheduleData);
        } catch (error) {
            console.error("Error al actualizar horario:", error);
            throw error;
        }
    },

    // Eliminar un horario
    deleteSchedule: async (scheduleId) => {
        try {
            const scheduleRef = doc(db, 'schedules', scheduleId);
            await deleteDoc(scheduleRef);
        } catch (error) {
            console.error("Error al eliminar horario:", error);
            throw error;
        }
    }
}; 