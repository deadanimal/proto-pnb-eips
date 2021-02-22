import { Component, OnInit, NgZone, OnDestroy, } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_moonrisekingdom from "@amcharts/amcharts4/themes/moonrisekingdom";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import swal from "sweetalert2";

export enum SelectionType {
  single = 'single',
  multi = 'multi',
  multiClick = 'multiClick',
  cell = 'cell',
  checkbox = 'checkbox'
}

@Component({
  selector: 'app-server-configuration',
  templateUrl: './server-configuration.component.html',
  styleUrls: ['./server-configuration.component.scss']
})
export class ServerConfigurationComponent implements OnInit, OnDestroy {

  //table
  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows: any = [
  {
    date: "2011/04/25 9.00 AM",
    server: "Server 1",
    level: "warn",
    class: "Class 1",
    message: "Troubleshoot reporting has not been invoked yet",
    cluster: "Cluster 1",
    project: "Project 1",
    version: "1.0.1",
  },
  {
    date: "2011/07/25 9.00 AM",
    server: "Server 3",
    level: "error",
    class: "Class 5",
    message: "Error occurred while processing image",
    cluster: "Cluster 2",
    project: "Project 1",
    version: "4.6.3",
  },
  {
    date: "2009/01/12 9.00 AM",
    server: "Server 3",
    level: "warn",
    class: "Class 2",
    message: "Troubleshoot reporting has not been invoked yet",
    cluster: "Cluster 5",
    project: "Project 2",
    version: "2.7.5",
  },
  {
    date: "2012/03/29 9.00 AM",
    server: "Server 4",
    level: "error",
    class: "Class 2",
    message: "Error occurred while processing message",
    cluster: "Cluster 5",
    project: "Project 2",
    version: "4.6.8",
  },
  {
    date: "2008/11/28 9.00 AM",
    server: "Server 5",
    level: "error",
    class: "Class w",
    message: "Error occurred while processing chart",
    cluster: "Cluster 5",
    project: "Project 6",
    version: "7.7.2",
  },
  {
    date: "2012/12/02 9.00 AM",
    server: "Server 1",
    level: "warn",
    class: "Class 2",
    message: "Troubleshoot reporting has not been invoked yet",
    cluster: "Cluster 3",
    project: "Project 1",
    version: "2.0.1",
  },
  {
    date: "2012/08/06 9.00 AM",
    server: "Server 3",
    level: "error",
    class: "Class 2",
    message: "Error occurred while processing image",
    cluster: "Cluster 4",
    project: "Project 5",
    version: "5.4.2",
  },
  {
    date: "2010/10/14 9.00 AM",
    server: "Server 3",
    level: "warn",
    class: "Class 4",
    message: "Troubleshoot reporting has not been invoked yet",
    cluster: "Cluster 3",
    project: "Project 3",
    version: "2.3.1",
  },
  {
    date: "2009/09/15 9.00 AM",
    server: "Server 4",
    level: "error",
    class: "Class 2",
    message: "Error occurred while processing save data",
    cluster: "Cluster 2",
    project: "Project 4",
    version: "1.0.4",
  },
  {
    date: "2008/12/13 9.00 AM",
    server: "Server 1",
    level: "warn",
    class: "Class 1",
    message: "Troubleshoot reporting has not been invoked yet",
    cluster: "Cluster 4",
    project: "Project 2",
    version: "3.5.2",
  },
  {
    date: "2008/12/19 9.00 AM",
    server: "Server 2",
    level: "error",
    class: "Class 3",
    message: "Error occurred while processing message",
    cluster: "Cluster 2",
    project: "Project 3",
    version: "1.6.6",
  },
  {
    date: "2013/03/03 9.00 AM",
    server: "Server 1",
    level: "warn",
    class: "Class 2",
    message: "Troubleshoot reporting has not been invoked yet",
    cluster: "Cluster 1",
    project: "Project 4",
    version: "1.0.1",
  },
  {
    date: "2008/10/16 9.00 AM",
    server: "Server 2",
    level: "warn",
    class: "Class 5",
    message: "Troubleshoot reporting has not been invoked yet",
    cluster: "Cluster 3",
    project: "Project 2",
    version: "2.2.1",
  },
  {
    date: "2012/12/18 9.00 AM",
    server: "Server 3",
    level: "warn",
    class: "Class 4",
    message: "Troubleshoot reporting has not been invoked yet",
    cluster: "Cluster 4",
    project: "Project 1",
    version: "3.0.2",
  },
  {
    date: "2010/03/17 9.00 AM",
    server: "Server 5",
    level: "error",
    class: "Class 5",
    message: "Error occurred while processing message",
    cluster: "Cluster 5",
    project: "Project 3",
    version: "5.4.6",
  },
  ];
  SelectionType = SelectionType;

  //datepickerrange
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();

  // Chart
  private chart1: any
  private chart2: any
  private chart3: any

  constructor(
    private zone: NgZone,
  ) {
    this.temp = this.rows.map((prop,key)=>{
      return {
        ...prop,
        id: key
      };

    });

    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
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
      this.getChartServerManagement1()
      this.getChartServerManagement2()
      this.getChartServerManagement3()
    })
  }

  getChartServerManagement1 () {
    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_moonrisekingdom);
    am4core.useTheme(am4themes_animated);
    // Themes end

    let capacity = 100;
    let value = 56.45;
    let circleSize = 0.8;

    let component = am4core.create("chartservermanage1", am4core.Container)
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

    this.chart1 = component;
  }
  
  getChartServerManagement2 () {
    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_moonrisekingdom);
    am4core.useTheme(am4themes_animated);
    // Themes end

    let capacity = 100;
    let value = 49.13;
    let circleSize = 0.8;

    let component = am4core.create("chartservermanage2", am4core.Container)
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

  getChartServerManagement3 () {
    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_moonrisekingdom);
    am4core.useTheme(am4themes_animated);
    // Themes end

    let capacity = 100;
    let value = 67.34;
    let circleSize = 0.8;

    let component = am4core.create("chartservermanage3", am4core.Container)
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

    this.chart3 = component;
  }

  successSwal(task) {
    swal.fire({
      title: "Success",
      text: "Successfully " + task + "!",
      type: "success",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-success"
    });
  }
}
