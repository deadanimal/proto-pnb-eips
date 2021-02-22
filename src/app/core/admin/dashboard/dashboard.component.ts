import { Component, OnInit, NgZone, OnDestroy } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_spiritedaway from "@amcharts/amcharts4/themes/spiritedaway";
import am4themes_kelly from "@amcharts/amcharts4/themes/kelly";
import am4geodata_continentsLow from "@amcharts/amcharts4-geodata/continentsLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Router } from '@angular/router';

export enum SelectionType {
  single = 'single',
  multi = 'multi',
  multiClick = 'multiClick',
  cell = 'cell',
  checkbox = 'checkbox'
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  // Chart
  private chart3: any
  private chart1: any
  private chart2: any
  private clicked: any = true
  private clicked1: any = false

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
    ipaddress: "192.169.9.012"
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
    ipaddress: "192.169.9.012"
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
    ipaddress: "192.169.9.012"
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
    ipaddress: "192.169.9.012"
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
    ipaddress: "192.169.9.012"
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
    ipaddress: "192.169.9.012"
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
    ipaddress: "192.169.9.012"
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
    ipaddress: "192.169.9.012"
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
    ipaddress: "192.169.9.012"
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
    ipaddress: "192.169.9.012"
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
    ipaddress: "192.169.9.012"
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
    ipaddress: "192.169.9.012"
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
    ipaddress: "192.169.9.012"
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
    ipaddress: "192.169.9.012"
  },
  {
    name: "Khairi Jamal",
    username: "k_jamal",
    firstname: "Khairi",
    lastname: "Jamal",
    email: "john_cena123@try.com",
    logId: "1949",
    activityTime: "2010/03/17 2.00 PM",
    activityLog: "login",
    ipaddress: "192.169.9.012"
  },
  ];
  SelectionType = SelectionType;

  constructor(
    private zone: NgZone
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

  ngOnDestroy() {
    this.zone.runOutsideAngular(
      () => {
        if (this.chart1) {
          console.log('Chart disposed')
          this.chart1.dispose()
        }
        if (this.chart2) {
          console.log('Chart disposed')
          this.chart2.dispose()
        }
        if (this.chart3) {
          console.log('Chart disposed')
          this.chart3.dispose()
        }
      }
    )
  }

  getCharts() {
    this.zone.runOutsideAngular(() => {
      this.getChartDashboardPie1()
      this.getChartDashboard3DBar1()
      this.getChartDashboardLollipop1()
    })
  }

  getChartDashboardPie1 () {
    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_kelly);
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    let chart = am4core.create("chartdashboardpie1", am4charts.PieChart);

    // Add data
    chart.data = [ {
      "country": "Success",
      "litres": 501.9
    }, {
      "country": "Failure",
      "litres": 301.9
    }, 
    ];

    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "litres";
    pieSeries.dataFields.category = "country";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeOpacity = 1;

    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;

    chart.hiddenState.properties.radius = am4core.percent(0);

    this.chart1 = chart;
  }

  getChartDashboard3DBar1 () {
    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_kelly);
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    let chart = am4core.create("chartdashboard3Dbar1", am4charts.XYChart3D);

    // Add data
    chart.data = [{
        "country": "Jan",
        "success": 3.5,
        "failure": 4.2
    }, {
        "country": "Feb",
        "success": 1.7,
        "failure": 3.1
    }, {
        "country": "March",
        "success": 2.8,
        "failure": 2.9
    }, {
        "country": "Apr",
        "success": 2.6,
        "failure": 2.3
    }, {
        "country": "May",
        "success": 1.4,
        "failure": 2.1
    }, {
        "country": "June",
        "success": 2.6,
        "failure": 4.9
    }, {
        "country": "July",
        "success": 6.4,
        "failure": 7.2
    }, {
        "country": "Aug",
        "success": 8,
        "failure": 7.1
    }, {
        "country": "Sep",
        "success": 9.9,
        "failure": 10.1
    }, {
        "country": "Oct",
        "success": 2.6,
        "failure": 2.3
    }, {
        "country": "Nov",
        "success": 1.4,
        "failure": 2.1
    }, {
        "country": "Dec",
        "success": 2.6,
        "failure": 4.9
    },];

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "country";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "Current Month Execution";
    valueAxis.renderer.labels.template.adapter.add("text", function(text) {
      return text + "%";
    });

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries3D());
    series.dataFields.valueY = "success";
    series.dataFields.categoryX = "country";
    series.name = "Success";
    series.clustered = false;
    series.columns.template.tooltipText = "Success Execution in {country}: [bold]{valueY}[/]";
    series.columns.template.fillOpacity = 0.9;

    let series2 = chart.series.push(new am4charts.ColumnSeries3D());
    series2.dataFields.valueY = "failure";
    series2.dataFields.categoryX = "country";
    series2.name = "Failure";
    series2.clustered = false;
    series2.columns.template.tooltipText = "Failure Execution in {country}: [bold]{valueY}[/]";

    this.chart2 = chart;
  }

  getChartDashboardLollipop1 () {
    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_spiritedaway);
    am4core.useTheme(am4themes_animated);
    // Themes end

    let chart = am4core.create("chartdashboardlollipop1", am4charts.XYChart);

    let data = [];
    let value = 120;

    let names = ["Raina",
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
      
    ];

    for (var i = 0; i < names.length; i++) {
      value += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 5);
      data.push({ category: names[i], value: value });
    }

    chart.data = data;
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.minGridDistance = 15;
    categoryAxis.renderer.grid.template.location = 0.5;
    categoryAxis.renderer.grid.template.strokeDasharray = "1,3";
    categoryAxis.renderer.labels.template.rotation = -90;
    categoryAxis.renderer.labels.template.horizontalCenter = "left";
    categoryAxis.renderer.labels.template.location = 0.5;

    categoryAxis.renderer.labels.template.adapter.add("dx", function(dx, target) {
        return -target.maxRight / 2;
    })

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.ticks.template.disabled = true;
    valueAxis.renderer.axisFills.template.disabled = true;

    let series = chart.series.push(new am4charts.ColumnSeries()) as any;
    series.dataFields.categoryX = "category";
    series.dataFields.valueY = "value";
    series.tooltipText = "{valueY.value}";
    series.sequencedInterpolation = true;
    series.fillOpacity = 0;
    series.strokeOpacity = 1;
    series.strokeDashArray = "1,3";
    series.columns.template.width = 0.01;
    series.tooltip.pointerOrientation = "horizontal";

    let bullet = series.bullets.create(am4charts.CircleBullet);

    chart.cursor = new am4charts.XYCursor();

    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarY = new am4core.Scrollbar();

    this.chart3 = chart;
  }

}
