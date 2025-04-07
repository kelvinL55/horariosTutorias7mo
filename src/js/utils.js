// Constantes globales
export const STORAGE_KEY = 'tutoriasSchedules_L-V';

// Datos iniciales
export const initialSchedules = [
    { id: 'init_1', subject: 'DESARROLLO BASADO EN PLAT WEB', parallel: '100', day: 'Lunes', startTime: '1700', endTime: '1900', notes: '' },
    { id: 'init_2', subject: 'METODOLOGIAS DE DESARROLLO', parallel: '100', day: 'Martes', startTime: '1700', endTime: '1900', notes: '' },
    { id: 'init_3', subject: 'GESTION DE LA CALIDAD DEL SOFT', parallel: '101', day: 'Martes', startTime: '1700', endTime: '1900', notes: '' },
    { id: 'init_4', subject: 'GESTION DE LA CALIDAD DEL SOFT', parallel: '100', day: 'Miércoles', startTime: '1700', endTime: '1900', notes: '' },
    { id: 'init_5', subject: 'INGENIERIA DE REQUISITOS', parallel: '100', day: 'Miércoles', startTime: '1900', endTime: '2100', notes: '' },
    { id: 'init_6', subject: 'PLANIFICACION ESTRATEGICA Y SI', parallel: '100', day: 'Martes', startTime: '1700', endTime: '1900', notes: '' },
    { id: 'init_7', subject: 'PLANIFICACION ESTRATEGICA Y SI', parallel: '101', day: 'Jueves', startTime: '1700', endTime: '1900', notes: '' },
    { id: 'init_8', subject: 'REDES DE DISPOSITIVOS', parallel: '100', day: 'Jueves', startTime: '2000', endTime: '2200', notes: '' },
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