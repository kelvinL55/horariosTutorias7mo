import { generateId } from '../js/utils.js';

export class Modal {
    constructor() {
        this.modal = document.getElementById('scheduleModal');
        this.form = document.getElementById('scheduleForm');
        this.title = document.getElementById('modalTitle');
        this.scheduleId = document.getElementById('scheduleId');
        this.deleteBtn = document.getElementById('deleteScheduleBtn');
        this.saveBtn = document.getElementById('saveScheduleBtn');
        this.cancelBtn = document.getElementById('cancelModalBtn');

        this.setupEventListeners();
    }

    setupEventListeners() {
        this.cancelBtn.addEventListener('click', () => this.close());
        this.modal.addEventListener('click', (event) => {
            if (event.target === this.modal) {
                this.close();
            }
        });
    }

    open(schedule = null) {
        this.form.reset();
        if (schedule) {
            this.title.textContent = 'Editar Horario';
            this.scheduleId.value = schedule.id;
            document.getElementById('subject').value = schedule.subject;
            document.getElementById('parallel').value = schedule.parallel || '';
            document.getElementById('day').value = schedule.day;
            document.getElementById('startTime').value = schedule.startTime;
            document.getElementById('endTime').value = schedule.endTime;
            document.getElementById('notes').value = schedule.notes || '';
            this.deleteBtn.classList.remove('hidden');
            this.saveBtn.textContent = 'Actualizar';
        } else {
            this.title.textContent = 'Agregar Nuevo Horario';
            this.scheduleId.value = '';
            this.deleteBtn.classList.add('hidden');
            this.saveBtn.textContent = 'Guardar';
            document.getElementById('day').value = 'Lunes';
        }
        this.modal.classList.remove('hidden');
    }

    close() {
        this.modal.classList.add('hidden');
        this.form.reset();
    }

    getFormData() {
        const formData = new FormData(this.form);
        return {
            id: this.scheduleId.value || generateId(),
            subject: formData.get('subject'),
            parallel: formData.get('parallel'),
            day: formData.get('day'),
            startTime: formData.get('startTime'),
            endTime: formData.get('endTime'),
            notes: formData.get('notes')
        };
    }

    setOnSubmit(callback) {
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            callback(this.getFormData());
        });
    }

    setOnDelete(callback) {
        this.deleteBtn.addEventListener('click', () => {
            if (confirm('¿Estás seguro de que deseas eliminar este horario?')) {
                callback(this.scheduleId.value);
            }
        });
    }
} 