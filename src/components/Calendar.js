import { getSchedules } from '../js/utils.js';

export class Calendar {
    constructor() {
        this.dayColumns = document.querySelectorAll('.day-column');
    }

    createScheduleCard(schedule) {
        const card = document.createElement('div');
        card.classList.add('schedule-card', 'bg-indigo-50', 'p-3', 'rounded-lg', 'border', 'border-indigo-200', 'cursor-pointer', 'hover:shadow-md');
        card.dataset.id = schedule.id;

        card.innerHTML = `
            <h3 class="font-semibold text-sm text-indigo-800 mb-1">${schedule.subject}</h3>
            <p class="text-xs text-gray-600">Paralelo ${schedule.parallel || 'NA'}</p>
            <p class="text-xs text-gray-600">
                <i data-lucide="clock" class="inline-block w-3 h-3 mr-1"></i>${schedule.startTime} - ${schedule.endTime}
            </p>
            ${schedule.notes ? `<p class="text-xs text-gray-500 mt-1 italic">${schedule.notes}</p>` : ''}
        `;

        return card;
    }

    renderSchedules(schedules) {
        // Limpiar contenedores existentes
        this.dayColumns.forEach(column => {
            column.querySelector('.schedules-container').innerHTML = '';
        });

        // Agrupar horarios por día
        const schedulesByDay = schedules.reduce((acc, schedule) => {
            const day = schedule.day;
            if (document.querySelector(`.day-column[data-day=${day}]`)) {
                if (!acc[day]) {
                    acc[day] = [];
                }
                acc[day].push(schedule);
            }
            return acc;
        }, {});

        // Ordenar horarios dentro de cada día por hora de inicio
        for (const day in schedulesByDay) {
            schedulesByDay[day].sort((a, b) => {
                const timeA = a.startTime.split('').map(Number);
                const timeB = b.startTime.split('').map(Number);
                if (timeA[0] !== timeB[0]) return timeA[0] - timeB[0];
                return timeA[1] - timeB[1];
            });
        }

        // Añadir tarjetas al día correspondiente
        this.dayColumns.forEach(column => {
            const day = column.dataset.day;
            const container = column.querySelector('.schedules-container');
            if (schedulesByDay[day]) {
                schedulesByDay[day].forEach(schedule => {
                    const card = this.createScheduleCard(schedule);
                    container.appendChild(card);
                });
            }
        });

        // Crear iconos Lucide después de añadir las tarjetas
        try {
            lucide.createIcons();
        } catch (error) {
            console.warn('Lucide icons not loaded or failed to initialize:', error);
        }
    }

    setOnCardClick(callback) {
        this.dayColumns.forEach(column => {
            column.addEventListener('click', (event) => {
                const card = event.target.closest('.schedule-card');
                if (card) {
                    const scheduleId = card.dataset.id;
                    const schedules = getSchedules();
                    const schedule = schedules.find(s => s.id === scheduleId);
                    if (schedule) {
                        callback(schedule);
                    }
                }
            });
        });
    }
} 