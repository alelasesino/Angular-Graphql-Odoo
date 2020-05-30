import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private TIME_OUT = 3000;

  constructor(private toast: ToastrService) { }
  
  showSuccess(message, title){
      this.toast.success(message, title, {timeOut: this.TIME_OUT})
  }
  
  showError(message, title){
      this.toast.error(message, title, {timeOut: this.TIME_OUT})
  }
  
  showInfo(message, title){
      this.toast.info(message, title, {timeOut: this.TIME_OUT})
  }
  
  showWarning(message, title){
      this.toast.warning(message, title, {timeOut: this.TIME_OUT})
  }

}
