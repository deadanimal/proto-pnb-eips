import { Component, OnInit, NgZone, OnDestroy, TemplateRef } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_spiritedaway from "@amcharts/amcharts4/themes/spiritedaway";
import am4themes_moonrisekingdom from "@amcharts/amcharts4/themes/moonrisekingdom";
import am4themes_kelly from "@amcharts/amcharts4/themes/kelly";
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
  selector: 'app-data-integration',
  templateUrl: './data-integration.component.html',
  styleUrls: ['./data-integration.component.scss']
})
export class DataIntegrationComponent implements OnInit, OnDestroy {

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
      clientId: "61",
      date: "2011/04/25",
      next:"2011/05/25",
      salary: "$320,800",
      status: "success"
    },
    {
      name: "Garrett Winters",
      typeDoc: "Accountant",
      office: "Tokyo",
      clientId: "63",
      date: "2011/07/25",
      next:"2011/08/25",
      salary: "$170,750",
      status: "cancel"
    },
    {
      name: "Ashton Cox",
      typeDoc: "Junior Technical Author",
      office: "San Francisco",
      clientId: "66",
      date: "2009/01/12",
      next:"2009/02/12",
      salary: "$86,000",
      status: "success"
    },
    {
      name: "Cedric Kelly",
      typeDoc: "Senior Javascript Developer",
      office: "Edinburgh",
      clientId: "22",
      date: "2012/03/29",
      next:"2013/04/29",
      salary: "$433,060",
      status: "cancel"
    },
    {
      name: "Airi Satou",
      typeDoc: "Accountant",
      office: "Tokyo",
      clientId: "33",
      date: "2008/11/28",
      next:"2008/12/25",
      salary: "$162,700",
      status: "success"
    },
    {
      name: "Brielle Williamson",
      typeDoc: "Integration Specialist",
      office: "New York",
      clientId: "61",
      date: "2012/12/02",
      next:"2013/01/17",
      salary: "$372,000",
      status: "cancel"
    },
    {
      name: "Herrod Chandler",
      typeDoc: "Sales Assistant",
      office: "San Francisco",
      clientId: "59",
      date: "2012/08/06",
      next:"2012/09/07",
      salary: "$137,500",
      status: "cancel"
    },
    {
      name: "Rhona Davidson",
      typeDoc: "Integration Specialist",
      office: "Tokyo",
      clientId: "55",
      date: "2010/10/14",
      next:"2010/11/17",
      salary: "$327,900",
      status: "success"
    },
    {
      name: "Colleen Hurst",
      typeDoc: "Javascript Developer",
      office: "San Francisco",
      clientId: "39",
      date: "2009/09/15",
      next:"2009/10/16",
      salary: "$205,500",
      status: "cancel"
    },
    {
      name: "Sonya Frost",
      typeDoc: "Software Engineer",
      office: "Edinburgh",
      clientId: "23",
      date: "2008/12/13",
      next:"2009/01/12",
      salary: "$103,600",
      status: "success"
    },
    {
      name: "Jena Gaines",
      typeDoc: "Office ManclientIdr",
      office: "London",
      clientId: "30",
      date: "2008/12/19",
      next:"2009/01/21",
      salary: "$90,560",
      status: "success"
    },
    {
      name: "Quinn Flynn",
      typeDoc: "Support Lead",
      office: "Edinburgh",
      clientId: "22",
      date: "2013/03/03",
      next:"2014/04/04",
      salary: "$342,000",
      status: "cancel"
    },
    {
      name: "Charde Marshall",
      typeDoc: "Regional Director",
      office: "San Francisco",
      clientId: "36",
      date: "2008/10/16",
      next:"2008/11/18",
      salary: "$470,600",
      status: "success"
    },
    {
      name: "Haley Kennedy",
      typeDoc: "Senior Marketing Designer",
      office: "London",
      clientId: "43",
      date: "2012/12/18",
      next:"2013/01/22",
      salary: "$313,500",
      status: "success"
    },
    {
      name: "Tatyana Fitzpatrick",
      typeDoc: "Regional Director",
      office: "London",
      clientId: "19",
      date: "2010/03/17",
      next:"2010/04/25",
      salary: "$385,750",
      status: "cancel"
    },
  ];
  SelectionType = SelectionType;

  //modal
  modalRef: BsModalRef;

  // Chart
  private chart1: any
  private chart2: any
  private chart3: any

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
      this.getChartDataIntegrationBar1()
      this.getChartDataIntegrationProgress1()
      this.getChartDataIntegrationBar2()
    })
  }

  getChartDataIntegrationBar1 () {
    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_spiritedaway);
    am4core.useTheme(am4themes_animated);
    // Themes end

    let chart = am4core.create("chartdataintegratebar1", am4charts.XYChart);

    chart.data = [{
    "country": "Jan",
    "visits": 2025
    }, {
    "country": "Feb",
    "visits": 1882
    }, {
    "country": "Mar",
    "visits": 1809
    }, {
    "country": "Apr",
    "visits": 1322
    }, {
    "country": "May",
    "visits": 1122
    }, {
    "country": "June",
    "visits": 1114
    }, {
    "country": "July",
    "visits": 984
    }, {
    "country": "Aug",
    "visits": 711
    }, {
    "country": "Sep",
    "visits": 665
    }, {
    "country": "Oct",
    "visits": 580
    }, {
    "country": "Nov",
    "visits": 443
    }, {
    "country": "Dec",
    "visits": 441
    }];

    chart.padding(40, 40, 40, 40);

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "country";
    categoryAxis.renderer.minGridDistance = 60;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.disabled = true;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.extraMax = 0.1;
    //valueAxis.rangeChangeEasing = am4core.ease.linear;
    //valueAxis.rangeChangeDuration = 1500;

    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryX = "country";
    series.dataFields.valueY = "visits";
    series.tooltipText = "{valueY.value}"
    series.columns.template.strokeOpacity = 0;
    series.columns.template.column.cornerRadiusTopRight = 10;
    series.columns.template.column.cornerRadiusTopLeft = 10;
    //series.interpolationDuration = 1500;
    //series.interpolationEasing = am4core.ease.linear;
    let labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.verticalCenter = "bottom";
    labelBullet.label.dy = -10;
    labelBullet.label.text = "{values.valueY.workingValue.formatNumber('#.')}";

    chart.zoomOutButton.disabled = true;

    // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
    series.columns.template.adapter.add("fill", function (fill, target) {
    return chart.colors.getIndex(target.dataItem.index);
    });

    setInterval(function () {
    am4core.array.each(chart.data, function (item) {
      item.visits += Math.round(Math.random() * 200 - 100);
      item.visits = Math.abs(item.visits);
    })
    chart.invalidateRawData();
    }, 2000)

    categoryAxis.sortBySeries = series;

    this.chart1 = chart;
  }
  
  getChartDataIntegrationProgress1 () {
    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_moonrisekingdom);
    am4core.useTheme(am4themes_animated);
    // Themes end

    let capacity = 100;
    let value = 49.13;
    let circleSize = 0.8;

    let component = am4core.create("chartdataintegrateprogress1", am4core.Container)
    component.width = am4core.percent(100);
    component.height = am4core.percent(100);

    let chartContainer = component.createChild(am4core.Container);
    chartContainer.x = am4core.percent(50)
    chartContainer.y = am4core.percent(50)

    let circle = chartContainer.createChild(am4core.Circle);
    circle.fill = am4core.color("#dadada");

    let circleMask = chartContainer.createChild(am4core.Circle);

    let waves = chartContainer.createChild(am4core.WavedRectangle);
    waves.fill = am4core.color("#34a4eb");
    waves.mask = circleMask;
    waves.horizontalCenter = "middle";
    waves.waveHeight = 10;
    waves.waveLength = 30;
    waves.y = 500;
    circleMask.y = -500;

    component.events.on("maxsizechanged", function(){
      let smallerSize = Math.min(component.pixelWidth, component.pixelHeight);  
      let radius = smallerSize * circleSize / 2;

      circle.radius = radius;
      circleMask.radius = radius;
      waves.height = smallerSize;
      waves.width = Math.max(component.pixelWidth, component.pixelHeight);  

      //capacityLabel.y = radius;

      let labelRadius = radius + 20

      // capacityLabel.path = am4core.path.moveTo({x:-labelRadius, y:0}) + am4core.path.arcToPoint({x:labelRadius, y:0}, labelRadius, labelRadius);
      // capacityLabel.locationOnPath = 0.5;

      setValue(value);
    })


    function setValue(value){
      let y = - circle.radius - waves.waveHeight + (1 - value / capacity) * circle.pixelRadius * 2;
      waves.animate([{property:"y", to:y}, {property:"waveHeight", to:10, from:15}, {property:"x", from:-50, to:0}], 5000, am4core.ease.elasticOut);
      circleMask.animate([{property:"y", to:-y},{property:"x", from:50, to:0}], 5000, am4core.ease.elasticOut);
    }


    let label = chartContainer.createChild(am4core.Label)
    let formattedValue = component.numberFormatter.format(value, "#.#a");
    formattedValue = formattedValue.toUpperCase();

    label.text = formattedValue + " %";
    label.fill = am4core.color("#fff");
    label.fontSize = 20;
    label.horizontalCenter = "middle";


    // let capacityLabel = chartContainer.createChild(am4core.Label)

    // let formattedCapacity = component.numberFormatter.format(capacity, "#.#a").toUpperCase();;

    // capacityLabel.text = "Capacity " + formattedCapacity + " Litres";
    // capacityLabel.fill = am4core.color("#34a4eb");
    // capacityLabel.fontSize = 10;
    // capacityLabel.textAlign = "middle";
    // capacityLabel.padding(0,0,0,0);

    this.chart2 = component;
  }

  getChartDataIntegrationBar2 () {
    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_kelly);
    am4core.useTheme(am4themes_animated);
    // Themes end

    let chart = am4core.create("chartdataintegratebar2", am4charts.XYChart);
    chart.padding(40, 40, 40, 40);

    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "network";
    categoryAxis.renderer.minGridDistance = 1;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.disabled = true;

    let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;

    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryY = "network";
    series.dataFields.valueX = "MAU";
    series.tooltipText = "{valueX.value}"
    series.columns.template.strokeOpacity = 0;
    series.columns.template.column.cornerRadiusBottomRight = 5;
    series.columns.template.column.cornerRadiusTopRight = 5;

    let labelBullet = series.bullets.push(new am4charts.LabelBullet())
    labelBullet.label.horizontalCenter = "left";
    labelBullet.label.dx = 10;
    labelBullet.label.text = "{values.valueX.workingValue.formatNumber('#.0as')}";
    labelBullet.locationX = 1;

    // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
    series.columns.template.adapter.add("fill", function(fill, target){
      return chart.colors.getIndex(target.dataItem.index);
    });

    categoryAxis.sortBySeries = series;
    chart.data = [
        {
          "network": "MS Word",
          "MAU": 2255250000
        },
        {
          "network": "Acrolinx for word",
          "MAU": 430000000
        },
        {
          "network": "Acrolinx plug in",
          "MAU": 1000000000
        },
        {
          "network": "Acrolinx desktop checker",
          "MAU": 246500000
        },
        {
          "network": "Acrolinx Content Analyzer",
          "MAU": 355000000
        },
        {
          "network": "CLI (Command Line Interface)",
          "MAU": 500000000
        },
      ]

      this.chart3 = chart;
  }

  change () {
    swal.fire({
      title: "Successful",
      text: "Data has been saved",
      type: "success",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-success"
    });
    this.modalRef.hide()
  }

}
