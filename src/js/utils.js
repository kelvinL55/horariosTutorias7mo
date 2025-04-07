import { firebaseUtils } from './firebase-config.js';

// Constantes globales
export const STORAGE_KEY = 'tutoriasSchedules_L-V';

// Datos iniciales (solo se usarán si la base de datos está vacía)
export const initialSchedules = [
    { subject: 'DESARROLLO BASADO EN PLAT WEB', parallel: '100', day: 'Lunes', startTime: '1700', endTime: '1900', notes: '' },
    { subject: 'METODOLOGIAS DE DESARROLLO', parallel: '100', day: 'Martes', startTime: '1700', endTime: '1900', notes: '' },
    { subject: 'GESTION DE LA CALIDAD DEL SOFT', parallel: '101', day: 'Martes', startTime: '1700', endTime: '1900', notes: '' },
    { subject: 'GESTION DE LA CALIDAD DEL SOFT', parallel: '100', day: 'Miércoles', startTime: '1700', endTime: '1900', notes: '' },
    { subject: 'INGENIERIA DE REQUISITOS', parallel: '100', day: 'Miércoles', startTime: '1900', endTime: '2100', notes: '' },
    { subject: 'PLANIFICACION ESTRATEGICA Y SI', parallel: '100', day: 'Martes', startTime: '1700', endTime: '1900', notes: '' },
    { subject: 'PLANIFICACION ESTRATEGICA Y SI', parallel: '101', day: 'Jueves', startTime: '1700', endTime: '1900', notes: '' },
    { subject: 'REDES DE DISPOSITIVOS', parallel: '100', day: 'Jueves', startTime: '2000', endTime: '2200', notes: '' },
];

// Funciones de utilidad
export function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

export function getSchedules() {
    const schedules = localStorage.getItem(STORAGE_KEY);
    if (schedules) {
        try {
            return JSON.parse(schedules).filter(s => ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'].includes(s.day));
        } catch (e) {
            console.error('Error parsing schedules from localStorage:', e);
            localStorage.removeItem(STORAGE_KEY);
            return initialSchedules.filter(s => ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'].includes(s.day));
        }
    } else {
        const filteredInitial = initialSchedules.filter(s => ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'].includes(s.day));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredInitial));
        return filteredInitial;
    }
}

export function saveSchedules(schedules) {
    const filteredSchedules = schedules.filter(s => ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'].includes(s.day));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredSchedules));
}

// Funciones para interactuar con Firestore
export const utils = {
    // Obtener horarios
    getSchedules: (callback) => {
        return firebaseUtils.getSchedules(callback);
    },

    // Guardar horario
    saveSchedule: async (scheduleData) => {
        if (scheduleData.id) {
            await firebaseUtils.updateSchedule(scheduleData.id, scheduleData);
        } else {
            const id = await firebaseUtils.addSchedule(scheduleData);
            return id;
        }
    },

    // Eliminar horario
    deleteSchedule: async (scheduleId) => {
        await firebaseUtils.deleteSchedule(scheduleId);
    }
}; 