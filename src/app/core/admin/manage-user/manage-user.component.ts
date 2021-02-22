import { Component, OnInit, NgZone, OnDestroy, TemplateRef } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_material from "@amcharts/amcharts4/themes/material";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
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
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit, OnDestroy {

  //table
  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows: any = [
    {
      name: "John Cena",
      username: "john_cena",
      firstname: "John",
      lastname: "Cena",
      email: "john_cena123@try.com",
      logId: "6165",
      activityTime: "2011/04/25 2.00 PM",
      activityLog: "login",
      status: "inuse",
      typeUser: "Developer",
      subscribeAPI1: "/base-rate/bank-code",
      subscribeAPI2: "User can login to the account and manage profile, subscribe new API, manage subscribed API."
    },
    {
      name: "Under Taker",
      username: "under_taker",
      firstname: "Under",
      lastname: "Taker",
      email: "under_taker93@try.com",
      logId: "6385",
      activityTime: "2011/07/25 2.00 PM",
      activityLog: "edit profile",
      status: "inuse",
      typeUser: "Admin",
      subscribeAPI1: "/base-rate/bank-code",
      subscribeAPI2: "User can login to the account and manage profile, subscribe new API, manage subscribed API."
    },
    {
      name: "Kane Boseman",
      username: "kane_boseman",
      firstname: "Kane",
      lastname: "Boseman",
      email: "john_cena75@try.com",
      logId: "6634",
      activityTime: "2009/01/12 2.00 PM",
      activityLog: "change billing info",
      status: "inuse",
      typeUser: "Developer",
      subscribeAPI1: "/exchange_rate/",
      subscribeAPI2: "The conversation between Malaysia currency with other country currency"
    },
    {
      name: "Harry Kane",
      username: "harry_kane",
      firstname: "Harry",
      lastname: "Kane",
      email: "kane_boseman23@try.com",
      logId: "2230",
      activityTime: "2012/03/29 2.00 PM",
      activityLog: "delete profile picture",
      status: "inuse",
      typeUser: "Admin",
      subscribeAPI1: "/profix_fpx/",
      subscribeAPI2: "Payment gateway platform"
    },
    {
      name: "Zlatan Ibrahimovic",
      username: "ibra_himovic",
      firstname: "Zlatan",
      lastname: "Ibrahimovic",
      email: "ibra_himovic56@try.com",
      logId: "3368",
      activityTime: "2008/11/28 2.00 PM",
      activityLog: "change username",
      status: "inuse",
      typeUser: "Developer",
      subscribeAPI1: "/exchange_rate/",
      subscribeAPI2: "The conversation between Malaysia currency with other country currency"
    },
    {
      name: "Cristiano Ronaldo",
      username: "c_ronaldo",
      firstname: "Cristiano",
      lastname: "Ronaldo",
      email: "c_ronaldo07@try.com",
      logId: "6179",
      activityTime: "2012/12/02 2.00 PM",
      activityLog: "update status",
      status: "inuse",
      typeUser: "Admin",
      subscribeAPI1: "/base-rate/bank-code",
      subscribeAPI2: "User can login to the account and manage profile, subscribe new API, manage subscribed API."
    },
    {
      name: "William Martin",
      username: "william_martin",
      firstname: "William",
      lastname: "Martin",
      email: "william_martin34@try.com",
      logId: "5913",
      activityTime: "2012/08/06 2.00 PM",
      activityLog: "login",
      status: "inuse",
      typeUser: "Developer",
      subscribeAPI1: "/base-rate/bank-code",
      subscribeAPI2: "User can login to the account and manage profile, subscribe new API, manage subscribed API."
    },
    {
      name: "Laila Majnun",
      username: "laila_majnun",
      firstname: "Laila",
      lastname: "Majnun",
      email: "laila_majnun467@try.com",
      logId: "5556",
      activityTime: "2010/10/14 2.00 PM",
      activityLog: "login",
      status: "inuse",
      typeUser: "Admin",
      subscribeAPI1: "/base-rate/bank-code",
      subscribeAPI2: "User can login to the account and manage profile, subscribe new API, manage subscribed API."
    },
    {
      name: "Maslinda Rahim",
      username: "maslinda_rahim",
      firstname: "Maslinda",
      lastname: "Rahim",
      email: "maslinda_rahim579@try.com",
      logId: "3957",
      activityTime: "2009/09/15 2.00 PM",
      activityLog: "login",
      status: "inuse",
      typeUser: "Developer",
      subscribeAPI1: "/base-rate/bank-code",
      subscribeAPI2: "User can login to the account and manage profile, subscribe new API, manage subscribed API."
    },
    {
      name: "Ahmad Ali",
      username: "ahmad_ali",
      firstname: "Ahmad",
      lastname: "Ali",
      email: "ahmad_ali94@try.com",
      logId: "2374",
      activityTime: "2008/12/13 2.00 PM",
      activityLog: "login",
      status: "inuse",
      typeUser: "Admin",
      subscribeAPI1: "/base-rate/bank-code",
      subscribeAPI2: "User can login to the account and manage profile, subscribe new API, manage subscribed API."
    },
    {
      name: "Chew Min",
      username: "chew_min",
      firstname: "Chew",
      lastname: "Min",
      email: "chew_min19@try.com",
      logId: "3062",
      activityTime: "2008/12/19 2.00 PM",
      activityLog: "login",
      status: "inuse",
      typeUser: "Developer",
      subscribeAPI1: "/base-rate/bank-code",
      subscribeAPI2: "User can login to the account and manage profile, subscribe new API, manage subscribed API."
    },
    {
      name: "Arumugam Krish",
      username: "arumugam_krish",
      firstname: "Arumugam",
      lastname: "Krish",
      email: "arumugam_krish76@try.com",
      logId: "2259",
      activityTime: "2013/03/03 2.00 PM",
      activityLog: "login",
      status: "inuse",
      typeUser: "Admin",
      subscribeAPI1: "/base-rate/bank-code",
      subscribeAPI2: "User can login to the account and manage profile, subscribe new API, manage subscribed API."
    },
    {
      name: "Chan Sow Lin",
      username: "chan_sow",
      firstname: "Chan Sow",
      lastname: "Lin",
      email: "chan_sow03@try.com",
      logId: "3651",
      activityTime: "2008/10/16 2.00 PM",
      activityLog: "login",
      status: "inuse",
      typeUser: "Developer",
      subscribeAPI1: "/base-rate/bank-code",
      subscribeAPI2: "User can login to the account and manage profile, subscribe new API, manage subscribed API."
    },
    {
      name: "Kim Jong Kok",
      username: "kim_jong",
      firstname: "Kim",
      lastname: "Jong Kok",
      email: "kim_jong87@try.com",
      logId: "4314",
      activityTime: "2012/12/18 2.00 PM",
      activityLog: "login",
      status: "inuse",
      typeUser: "Admin",
      subscribeAPI1: "/base-rate/bank-code",
      subscribeAPI2: "User can login to the account and manage profile, subscribe new API, manage subscribed API."
    },
    {
      name: "Khairi Jamal",
      username: "k_jamal",
      firstname: "Khairi",
      lastname: "Jamal",
      email: "k_jamal123@try.com",
      logId: "1949",
      activityTime: "2010/03/17 2.00 PM",
      activityLog: "login",
      status: "inuse",
      typeUser: "Developer",
      subscribeAPI1: "/base-rate/bank-code",
      subscribeAPI2: "User can login to the account and manage profile, subscribe new API, manage subscribed API."
    },
  ];
  SelectionType = SelectionType;

  // Chart
  private chart1: any

  //modal
  modalRef: BsModalRef;

  constructor(
    private zone: NgZone,
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
    this.getCharts()
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(
      () => {
        if (this.chart1) {
          console.log('Chart disposed')
          this.chart1.dispose()
        }
      }
    )
  }

  getCharts() {
    this.zone.runOutsideAngular(() => {
      this.getChartManageUserLine1()
    })
  }

  getChartManageUserLine1 () {
  /* Chart code */
  // Themes begin
  am4core.useTheme(am4themes_material);
  am4core.useTheme(am4themes_animated);
  // Themes end
  // Create chart instance
  let chart = am4core.create("chartmanageuserline1", am4charts.XYChart);

  // Add data
  chart.data = [{
    "date": "2020-01",
    "price": 20
  }, {
    "date": "2020-02",
    "price": 75
  }, {
    "date": "2020-03",
    "price": 15
  }, {
    "date": "2020-04",
    "price": 75
  }, {
    "date": "2020-05",
    "price": 158
  }, {
    "date": "2020-06",
    "price": 57
  }, {
    "date": "2020-07",
    "price": 107
  }, {
    "date": "2020-08",
    "price": 89
  }, {
    "date": "2020-09",
    "price": 75
  }, {
    "date": "2020-10",
    "price": 132
  }, {
    "date": "2020-11",
    "price": 380
  }, {
    "date": "2020-12",
    "price": 56
  }, ];

  // Create axes
  let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  dateAxis.renderer.grid.template.location = 0;
  dateAxis.renderer.minGridDistance = 50;

  let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.logarithmic = true;
  valueAxis.renderer.minGridDistance = 20;

  // Create series
  let series = chart.series.push(new am4charts.LineSeries());
  series.dataFields.valueY = "price";
  series.dataFields.dateX = "date";
  series.tensionX = 0.8;
  series.strokeWidth = 3;

  let bullet = series.bullets.push(new am4charts.CircleBullet());
  bullet.circle.fill = am4core.color("#fff");
  bullet.circle.strokeWidth = 3;

  // Add cursor
  chart.cursor = new am4charts.XYCursor();
  chart.cursor.fullWidthLineX = true;
  chart.cursor.xAxis = dateAxis;
  chart.cursor.lineX.strokeWidth = 0;
  chart.cursor.lineX.fill = am4core.color("#000");
  chart.cursor.lineX.fillOpacity = 0.1;

  // Add scrollbar
  chart.scrollbarX = new am4core.Scrollbar();

  // Add a guide
  // let range = valueAxis.axisRanges.create();
  // range.value = 90.4;
  // range.grid.stroke = am4core.color("#396478");
  // range.grid.strokeWidth = 1;
  // range.grid.strokeOpacity = 1;
  // range.grid.strokeDasharray = "3,3";
  // range.label.inside = true;
  // range.label.text = "Average";
  // range.label.fill = range.grid.stroke;
  // range.label.verticalCenter = "bottom";

  this.chart1 = chart;
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
