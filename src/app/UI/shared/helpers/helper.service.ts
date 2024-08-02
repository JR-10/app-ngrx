import Swal, { SweetAlertIcon, SweetAlertPosition } from 'sweetalert2';
import { Injectable } from '@angular/core';

export type ToastOptions = {
  position?: SweetAlertPosition;
  title?: string;
  icon?: SweetAlertIcon;
  text?: string;
  timer?: number;
};

@Injectable({
  providedIn: 'root',
})
export class HelperService {

  public toast(options: ToastOptions = {}): void {

    const defaultOptions = {
      position: 'top-end' as SweetAlertPosition,
      title: '',
      icon: 'success' as SweetAlertIcon,
      text: options.text,
      timer: 3000,
    };

    let { position, title, icon, text, timer } = options;

    const {
      position: default_position,
      title: default_title,
      icon: default_icon,
      text: default_text,
      timer: default_timer,
    } = defaultOptions;


    position = position ?? default_position;
    title = title ?? default_title;
    icon = icon ?? default_icon;
    text = text ?? default_text;
    timer = timer ?? default_timer;

    Swal.mixin({}).fire({
      toast: true,
      icon,
      showConfirmButton: false,
      text,
      title,
      position,
      timer,
    });
  }
}

