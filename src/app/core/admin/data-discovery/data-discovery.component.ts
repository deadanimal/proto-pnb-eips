import { Component, OnInit, NgZone, OnDestroy, } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_spiritedaway from "@amcharts/amcharts4/themes/spiritedaway";
import am4themes_material from "@amcharts/amcharts4/themes/material";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

export enum SelectionType {
  single = 'single',
  multi = 'multi',
  multiClick = 'multiClick',
  cell = 'cell',
  checkbox = 'checkbox'
}

@Component({
  selector: 'app-data-discovery',
  templateUrl: './data-discovery.component.html',
  styleUrls: ['./data-discovery.component.scss']
})
export class DataDiscoveryComponent implements OnInit, OnDestroy {

   //table
   entries: number = 5;
   selected: any[] = [];
   temp = [];
   activeRow: any;
   rows: any = [
   {
     name: "Tiger Nixon",
     typeDoc: "System Architect",
     office: "Edinburgh",
     clientId: "615",
     date: "2011/04/25",
     salary: "320",
     status: "high",
     locationType: "Endpoint",
     match: "54"
   },
   {
     name: "Garrett Winters",
     typeDoc: "Accountant",
     office: "Tokyo",
     clientId: "633",
     date: "2011/07/25",
     salary: "170",
     status: "low",
     locationType: "Endpoint",
     match: "67"
   },
   {
     name: "Ashton Cox",
     typeDoc: "Junior Technical Author",
     office: "San Francisco",
     clientId: "662",
     date: "2009/01/12",
     salary: "386",
     status: "na",
     locationType: "Endpoint",
     match: "86"
   },
   {
     name: "Cedric Kelly",
     typeDoc: "Senior Javascript Developer",
     office: "Edinburgh",
     clientId: "226",
     date: "2012/03/29",
     salary: "43",
     status: "medium",
     locationType: "Endpoint",
     match: "44"
   },
   {
     name: "Airi Satou",
     typeDoc: "Accountant",
     office: "Tokyo",
     clientId: "339",
     date: "2008/11/28",
     salary: "162",
     status: "na",
     locationType: "Endpoint",
     match: "86"
   },
   {
     name: "Brielle Williamson",
     typeDoc: "Integration Specialist",
     office: "New York",
     clientId: "561",
     date: "2012/12/02",
     salary: "372",
     status: "high",
     locationType: "Endpoint",
     match: "90"
   },
   {
     name: "Herrod Chandler",
     typeDoc: "Sales Assistant",
     office: "San Francisco",
     clientId: "594",
     date: "2012/08/06",
     salary: "137",
     status: "medium",
     locationType: "Endpoint",
     match: "65"
   },
   {
     name: "Rhona Davidson",
     typeDoc: "Integration Specialist",
     office: "Tokyo",
     clientId: "550",
     date: "2010/10/14",
     salary: "327",
     status: "low",
     locationType: "Endpoint",
     match: "97"
   },
   {
     name: "Colleen Hurst",
     typeDoc: "Javascript Developer",
     office: "San Francisco",
     clientId: "394",
     date: "2009/09/15",
     salary: "205",
     status: "na",
     locationType: "Endpoint",
     match: "56"
   },
   {
     name: "Sonya Frost",
     typeDoc: "Software Engineer",
     office: "Edinburgh",
     clientId: "323",
     date: "2008/12/13",
     salary: "103",
     status: "high",
     locationType: "Endpoint",
     match: "45"
   },
   {
     name: "Jena Gaines",
     typeDoc: "Office ManclientIdr",
     office: "London",
     clientId: "360",
     date: "2008/12/19",
     salary: "90",
     status: "medium",
     locationType: "Endpoint",
     match: "34"
   },
   {
     name: "Quinn Flynn",
     typeDoc: "Support Lead",
     office: "Edinburgh",
     clientId: "272",
     date: "2013/03/03",
     salary: "34",
     status: "low",
     locationType: "Endpoint",
     match: "12"
   },
   {
     name: "Charde Marshall",
     typeDoc: "Regional Director",
     office: "San Francisco",
     clientId: "785",
     date: "2008/10/16",
     salary: "470",
     status: "na",
     locationType: "Endpoint"
   },
   {
     name: "Haley Kennedy",
     typeDoc: "Senior Marketing Designer",
     office: "London",
     clientId: "493",
     date: "2012/12/18",
     salary: "313",
     status: "high",
     locationType: "Endpoint",
     match: "75"
   },
   {
     name: "Tatyana Fitzpatrick",
     typeDoc: "Regional Director",
     office: "London",
     clientId: "519",
     date: "2010/03/17",
     salary: "85",
     status: "medium",
     locationType: "Endpoint",
     match: "89"
   },
   ];
   SelectionType = SelectionType;

  // Chart
  private chart1: any
  private chart2: any

  constructor(
    private zone: NgZone,
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
        if (this.chart2) {
          console.log('Chart disposed')
          this.chart2.dispose()
        }
      }
    )
  }

  getCharts() {
    this.zone.runOutsideAngular(() => {
      this.getChartDataDiscovery3DPie1()
      this.getChartDataDiscoveryBarLine1()
    })
  }

  getChartDataDiscovery3DPie1 () {
    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_spiritedaway);
    am4core.useTheme(am4themes_animated);
    // Themes end

    let chart = am4core.create("chartdatadiscovery3Dpie1", am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.data = [
      {
        country: "Highly Confidential",
        litres: 501.9
      },
      {
        country: "Confidential",
        litres: 301.9
      },
      {
        country: "General",
        litres: 201.1
      },
      {
        country: "Public",
        litres: 165.8
      },
      {
        country: "Non-Business",
        litres: 139.9
      },
    ];

    chart.innerRadius = am4core.percent(40);
    chart.depth = 120;

    chart.legend = new am4charts.Legend();

    let series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "litres";
    series.dataFields.depthValue = "litres";
    series.dataFields.category = "country";
    series.slices.template.cornerRadius = 5;
    series.colors.step = 3;

    this.chart1 = chart;
  }

  getChartDataDiscoveryBarLine1 () {
    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_material);
    am4core.useTheme(am4themes_animated);
    // Themes end

    let chart = am4core.create("chartdatadiscoverybarline1", am4charts.XYChart);

    chart.data = [{
            "year": "General",
            "income": 23.5,
            "expenses": 18.1
        }, {
            "year": "Confidential",
            "income": 26.2,
            "expenses": 22.8
        }, {
            "year": "Highly Confidential",
            "income": 30.1,
            "expenses": 23.9
        }, {
            "year": "Public",
            "income": 29.5,
            "expenses": 25.1
        }, {
            "year": "Non-Business",
            "income": 24.6,
            "expenses": 25
        }];

    //create category axis for years
    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "year";
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.location = 0;

    //create value axis for income and expenses
    let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.opposite = true;


    //create columns
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryY = "year";
    series.dataFields.valueX = "income";
    series.name = "Income";
    series.columns.template.fillOpacity = 0.5;
    series.columns.template.strokeOpacity = 0;
    series.tooltipText = "Income in {categoryY}: {valueX.value}";

    //create line
    let lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.dataFields.categoryY = "year";
    lineSeries.dataFields.valueX = "expenses";
    lineSeries.name = "Expenses";
    lineSeries.strokeWidth = 3;
    lineSeries.tooltipText = "Expenses in {categoryY}: {valueX.value}";

    //add bullets
    let circleBullet = lineSeries.bullets.push(new am4charts.CircleBullet());
    circleBullet.circle.fill = am4core.color("#fff");
    circleBullet.circle.strokeWidth = 2;

    //add chart cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "zoomY";

    //add legend
    chart.legend = new am4charts.Legend();

    this.chart2 = chart;
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

}
