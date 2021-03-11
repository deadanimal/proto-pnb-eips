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
  selector: 'app-master-database',
  templateUrl: './master-database.component.html',
  styleUrls: ['./master-database.component.scss']
})
export class MasterDatabaseComponent implements OnInit {

  //table
  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows: any = [
    {
      name: "sample_1",      
      from: "Ampang",
      status: "success",
      databaseType: "sql",
      version: "1.0.1",
      noTel: "03-4270 2500",
      timezone: "12.00:00 (GMT +8)"
    },
    {
      name: "sample_2",      
      from: "Damansaral",
      status: "success",
      databaseType: "sql",
      version: "1.0.1",
      noTel: "03-7722 2692",
      timezone: "12.00:00 (GMT +9)"
    },
    {
      name: "sample_3",      
      from: "Bangi",
      status: "success",
      databaseType: "sql",
      version: "1.0.1",
      noTel: "03-4026 7777",
      timezone: "12.00:00 (GMT -8)"
    },
    {
      name: "sample_4",      
      from: "Kajang",
      status: "success",
      databaseType: "sql",
      version: "1.0.1",
      noTel: "03-5543 1111",
      timezone: "12.00:00 (GMT +2)"
    },
    {
      name: "sample_5",      
      from: "Nilai",
      status: "success",
      databaseType: "sql",
      version: "1.0.1",
      noTel: "03-8769 2999",
      timezone: "12.00:00 (GMT +10)"
    },
    {
      name: "sample_6",      
      from: "Bukit Mertajam",
      status: "success",
      databaseType: "sql",
      version: "1.0.1",
      noTel: "03-4043 7166",
      timezone: "12.00:00 (GMT -5)"
    },
    {
      name: "sample_7",      
      from: "Arau",
      status: "success",
      databaseType: "sql",
      version: "1.0.1",
      noTel: "03-3377 7888",
      timezone: "12.00:00 (GMT -6)"
    },
    {
      name: "sample_8",      
      from: "Rawang",
      status: "success",
      databaseType: "sql",
      version: "1.0.1",
      noTel: "03-4026 7777",
      timezone: "12.00:00 (GMT +7)"
    },
    {
      name: "sample_9",      
      from: "Alor Setar",
      status: "success",
      databaseType: "sql",
      version: "1.0.1",
      noTel: "03-5543 1111",
      timezone: "12.00:00 (GMT +4)"
    },
    {
      name: "sample_10",      
      from: "Kulai",
      status: "success",
      databaseType: "sql",
      version: "1.0.1",
      noTel: "03-8769 2999",
      timezone: "12.00:00 (GMT +8)"
    },
    {
      name: "sample_11",      
      from: "Melaka",
      status: "success",
      databaseType: "sql",
      version: "1.0.1",
      noTel: "03-4270 2500",
      timezone: "12.00:00 (GMT -1)"
    },
    {
      name: "sample_12",      
      from: "Kota Bharu",
      status: "success",
      databaseType: "sql",
      version: "1.0.1",
      noTel: "03-7722 2692",
      timezone: "12.00:00 (GMT +8)"
    },
    {
      name: "sample_13",      
      from: "Kuala Lumpur",
      status: "success",
      databaseType: "sql",
      version: "1.0.1",
      noTel: "03-4026 7777",
      timezone: "12.00:00 (GMT +8)"
    },
    {
      name: "4",      
      from: "KPJ Selangor Specialist Hospital",
      status: "Putrajaya",
      databaseType: "sql",
      version: "1.0.1",
      noTel: "03-5543 1111",
      timezone: "12.00:00 (GMT -6)"
    },
    {
      name: "5",      
      from: "Kuantan",
      status: "success",
      databaseType: "sql",
      version: "1.0.1",
      noTel: "03-8769 2999",
      timezone: "12.00:00 (GMT +8)"
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
