import { Injectable } from '@angular/core';
import { Modal } from 'bootstrap';

@Injectable()
export class CommonUtil {

    closeModal(modalElement: HTMLElement | null): void {
        if (modalElement) {
            const modal = Modal.getInstance(modalElement);
            if (modal) {
                modal.hide();
                const backdrops = document.querySelectorAll('.modal-backdrop');
                backdrops.forEach(backdrop => backdrop.remove());
            }
        }
    }
}