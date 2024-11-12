import {defineStore} from 'pinia';
import dayjs from 'dayjs';
import type {Contexts, Group} from "~/types/interfaces";
import {Mode} from "~/types/interfaces";

export const useDeviceStore = defineStore('device', {
    state: () => ({
        status: 'DMO Modus',
        time: dayjs().format('HH:mm'),
        date: dayjs().format('DD.MM.YYYY'),
        group: {
            name: '310_F*',
            number: 310,
            folder: 'DMO FW',
            mode: Mode.DMO,
        } as Group,
        isModalOpen: false,  // Neuer Zustand für das Modal
        activeModal: '',
        currentAction: '', // Neue Eigenschaft für die aktuelle Aktion
        locked: false,
        contexts: {
            left: 'Schrift',
            middle: 'Gruppe',
            right: 'Hilfe',
        } as Contexts,
        showCheckmark: false,
        showFail: false,
        hasSDS: false,
    }),
    actions: {
        updateDateTime() {
            this.time = dayjs().format('HH:mm');
            this.date = dayjs().format('DD.MM.YYYY');
        },
        closeCurrentModal() {
            console.log('closeCurrentModal');
            this.isModalOpen = false;
            this.activeModal = '';
        },
        toggleModal(modalName: string) {
            console.log('toggleModal');
            this.isModalOpen = !this.isModalOpen; // Aktion zum Umschalten des Modals
            this.activeModal = this.isModalOpen ? modalName : '';
        },
        setCurrentAction(action: string) {
            this.currentAction = action;  // Aktion setzen, die die Navigation ausführen soll
        },
        setStatus(status: string) {
            this.status = status;
        },
        setContexts(menu: Contexts) {
            this.contexts = menu;
        },
        resetContextmenu() {
            this.contexts = {
                left: 'Schrift',
                middle: 'Gruppe',
                right: 'Hilfe',
            };
        },
        toggleLock() {
            this.locked = !this.locked;
        },
        confirmGroupChange(selectedGroup: Group) {
            if (!selectedGroup || !selectedGroup.name) {
                console.warn('No group was selected');

                this.showFail = true;
                setTimeout(() => {
                    this.showFail = false;
                }, 2000);

                return;
            }

            console.log('confirmGroupChange');
            if (
                (this.group.mode === Mode.DMO && selectedGroup.mode === Mode.TMO)
                || (this.group.mode === Mode.TMO && selectedGroup.mode === Mode.DMO)
            ) {
                this.showCheckmark = true;
                setTimeout(() => {
                    this.showCheckmark = false;
                }, 2000);
            }

            this.group = selectedGroup;

            if (selectedGroup.mode === Mode.TMO) {
                this.setStatus('__Status 2__');
            }
        },
    },
    // Nutze `setup()` um das automatische Update zu starten
    setup() {
        const store = useDeviceStore();
        setInterval(() => {
            store.updateDateTime();
        }, 60000); // Alle 60 Sekunden aktualisieren
    },
});
