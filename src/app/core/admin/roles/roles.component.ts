import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import swal from "sweetalert2";

export enum SelectionType {
  single = 'single',
  multi = 'multi',
  multiClick = 'multiClick',
  cell = 'cell',
  checkbox = 'checkbox'
}

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  //table
  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows: any = [
    {
      typeUser: "Admin",      
      activityTime: "2015/04/25",
      status: "admin",      
    },
    {
      typeUser: "User",
      activityTime: "2015/05/25",
      status: "user",      
    },
  ];
  SelectionType = SelectionType;

  //modal
  modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService
  ) {
    this.temp = this.rows.map((prop,key)=>{
      return {
        ...prop,
        id: key
      };

    });
  }

  ngOnInit() {
  }

  entriesChange($event){
    this.entries = $event.target.value;
  }
  filterTable($event) {
    let val = $event.target.value;
    this.temp = this.rows.filter(function(d) {

      for(var key in d){
        if(d[key].toLowerCase().indexOf(val) !== -1){
          return true;
        }
      }
      return false;
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  successSwal(task) {
    swal.fire({
      title: "Success",
      text: "Successfully " + task + "!",
      type: "success",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-success"
    });
    this.modalRef.hide()
  }

}
