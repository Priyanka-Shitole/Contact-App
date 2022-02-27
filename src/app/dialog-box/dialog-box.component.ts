import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

export interface Contacts {
  firstName: string;
  lastName: string;
  phone: string;
  id: number;
}

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent {
  form: FormGroup;
  action: string;
  local_data: any;

  constructor(
    private toastr: ToastrService, public dialogRef: MatDialogRef<DialogBoxComponent>,
    /**@Optional() is used to prevent error if no data is passed */
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Contacts, private formBuilder: FormBuilder) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
    /**
     * form field innitialization
     */
    this.form = this.formBuilder.group({
      id: '',
      firstName: '',
      lastName: new FormControl('', [
        Validators.required
      ]),
      phone: ''
    });
  }
  ngOnInit(): void {
  }
  /**
   * function call on dialog actions
   */
  doAction() {
    if (this.form.valid) {
      this.dialogRef.close({ event: this.action, data: this.local_data });
      if (this.action === 'Add') this.toastr.success('Contact Added Successfully!');
      if (this.action === 'Update') this.toastr.success('Contact Updated Successfully!');
      if (this.action === 'Delete') this.toastr.success('Contact Deleted Successfully!');
    }
    else {
      this.toastr.error('Please enter the valid input values!');
    }

  }
  /**
   * function call to close the dialogs
   */
  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
  /**
   * function call after form submition
   */
  submit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}