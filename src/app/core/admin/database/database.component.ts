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
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.scss']
})
export class DatabaseComponent implements OnInit {

  //table
  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows: any = [
    {
      databaseName: "MASTER_PATIENT_RECORD",      
      physicalName: "MASTER_PATIENT_RECORD",
      databaseServer: "LOCALHOST",
      databaseType: "sql",  
    },
    {
      databaseName: "MASTER_ASSET_RECORD",      
      physicalName: "MASTER_ASSET_RECORD",
      databaseServer: "LOCALHOST",
      databaseType: "sql",  
    },
    {
      databaseName: "MASTER_DEPARTMENT_RECORD",      
      physicalName: "MASTER_DEPARTMENT_RECORD",
      databaseServer: "LOCALHOST",
      databaseType: "sql",  
    },
    {
      databaseName: "MASTER_BILLING_RECORD",      
      physicalName: "MASTER_BILLING_RECORD",
      databaseServer: "LOCALHOST",
      databaseType: "sql",  
    },
    {
      databaseName: "MASTER_REVENUE_RECORD",      
      physicalName: "MASTER_REVENUE_RECORD",
      databaseServer: "LOCALHOST",
      databaseType: "sql",  
    },
    {
      databaseName: "MASTER_PATIENT_RECORD",      
      physicalName: "MASTER_PATIENT_RECORD",
      databaseServer: "LOCALHOST",
      databaseType: "sql",  
    },
    {
      databaseName: "MASTER_ASSET_RECORD",      
      physicalName: "MASTER_ASSET_RECORD",
      databaseServer: "LOCALHOST",
      databaseType: "sql",  
    },
    {
      databaseName: "MASTER_DEPARTMENT_RECORD",      
      physicalName: "MASTER_DEPARTMENT_RECORD",
      databaseServer: "LOCALHOST",
      databaseType: "sql",  
    },
    {
      databaseName: "MASTER_BILLING_RECORD",      
      physicalName: "MASTER_BILLING_RECORD",
      databaseServer: "LOCALHOST",
      databaseType: "sql",  
    },
    {
      databaseName: "MASTER_REVENUE_RECORD",      
      physicalName: "MASTER_REVENUE_RECORD",
      databaseServer: "LOCALHOST",
      databaseType: "sql",  
    },
    {
      databaseName: "MASTER_PATIENT_RECORD",      
      physicalName: "MASTER_PATIENT_RECORD",
      databaseServer: "LOCALHOST",
      databaseType: "sql",  
    },
    {
      databaseName: "MASTER_ASSET_RECORD",      
      physicalName: "MASTER_ASSET_RECORD",
      databaseServer: "LOCALHOST",
      databaseType: "sql",  
    },
    {
      databaseName: "MASTER_DEPARTMENT_RECORD",      
      physicalName: "MASTER_DEPARTMENT_RECORD",
      databaseServer: "LOCALHOST",
      databaseType: "sql",  
    },
    {
      databaseName: "MASTER_BILLING_RECORD",      
      physicalName: "MASTER_BILLING_RECORD",
      databaseServer: "LOCALHOST",
      databaseType: "sql",  
    },
    {
      databaseName: "MASTER_REVENUE_RECORD",      
      physicalName: "MASTER_REVENUE_RECORD",
      databaseServer: "LOCALHOST",
      databaseType: "sql",  
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

  warningSwal(task) {
    swal.fire({
      title: "Success",
      text: "Successfully " + task + "!",
      type: "warning",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-warning"
    });
    this.modalRef.hide()
  }

}
