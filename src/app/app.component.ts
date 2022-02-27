
import { ContactsService } from './Services/contacts.service';
import { Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';

export interface Contacts {
  firstName: string;
  lastName: string;
  phone: string;
  id: number;
}

const ELEMENT_DATA: Contacts[] = [];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  displayedColumns: any[] = ['id', 'firstName', 'lastName', 'phone', 'action'];
  dataSource = ELEMENT_DATA;

  ngOnInit() {
    this.getContacts();
  }
  /**
   * service call to get details of contacts
   */
  getContacts() {
    this.contactService.getContacts().subscribe((res: any) => {
      this.dataSource = res;
    })
  }

  @ViewChild(MatTable, { static: true })
  table!: MatTable<any>;

  constructor(public dialog: MatDialog, private contactService: ContactsService) { }
  /**
   * function call to perform grid actions
   * @param action - action to perform eg. Add, Update, Delete
   * @param obj - contact object
   */
  openDialog(action: any, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '265px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Add') {
        this.addRowData(result);
      } else if (result.event == 'Update') {
        this.updateRowData(result.data);
      } else if (result.event == 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }
  /**
   * to add new contact in data
   * @param row_obj : newly added obj
   */
  addRowData(row_obj: any) {
    this.dataSource.push({ 'id': this.dataSource.length + 1, 'firstName': row_obj.data.firstName, 'lastName': row_obj.data.lastName, 'phone': row_obj.data.phone });
    this.table.renderRows();
  }
  /**
   * to update exsting data from contacts
   * @param row_obj : updated obj of contact
   */
  updateRowData(row_obj: any) {
    this.dataSource = this.dataSource.filter((value: any) => {
      if (value.id == row_obj.id) {
        value.firstName = row_obj.firstName;
        value.lastName = row_obj.lastName;
        value.phone = row_obj.phone;
      }
      return true;
    });
  }
  /**
   * to delete selected contact
   * @param row_obj - selected contact obj
   */
  deleteRowData(row_obj: any) {
    this.dataSource = this.dataSource.filter((value: any) => {
      return value.id != row_obj.id;
    });
  }
}
