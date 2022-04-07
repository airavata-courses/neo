import { AfterViewInit, Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { NasaResult } from 'src/app/dto';
import * as Highcharts from "highcharts/highmaps";
import worldMap from '@highcharts/map-collection/custom/world.topo.json';

export interface MapDataModalDataOptions {
  readonly feature?: string;
  readonly date?: string;
  readonly topology?: Object;
  readonly data?: NasaResult;
  readonly buttonData?: string;
}

export class MapDataModalData {
  static asConfig(
    text: string,
    {
      feature,
      date,
      topology,
      data
    }: MapDataModalDataOptions = {}
  ): MatDialogConfig<MapDataModalData> {
    return {
      data: new MapDataModalData(text, feature, date, topology, data)
    };
  }
  constructor(
    readonly text: string,
    readonly feature: string | undefined,
    readonly date: string | undefined,
    readonly topology: Object | undefined,
    readonly data: NasaResult | undefined
  ) { }
}

@Component({
  selector: 'map-data-modal',
  templateUrl: './map-data-modal.component.html',
  styleUrls: ['./map-data-modal.component.scss']
})
export class MapDataModalComponent implements AfterViewInit{
  static config: MatDialogConfig<MapDataModalData> = {
    maxWidth: '800px',
    minWidth: '500px'
  };
  constructor(
    private readonly dialog: MatDialogRef<MapDataModalComponent, MatDialogRef<unknown>>,
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    readonly data: MapDataModalData | null
  ) {}

  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor = "mapChart";
  // result: {
  //   z: number,
  //   lat: number,
  //   lon: number,
  //   color: string
  // }[] = [];

  random_hex_color_code = (d: number) => {
    let n = ((1 + Math.ceil(d)) * 0xffffff * 1).toString(16);
    return '#' + n.slice(0, 6);
  };

  preparedData(data?: NasaResult) {
    const result = [];
    let idx = 0;
    let lat = -90;
    while(idx < 361) {
      let jdx = 0;
      let lon = -180;
      while(jdx < 576) {
        try {
          result.push({
            lat,
            lon,
            z: 10,
            color: this.random_hex_color_code(data?.SLP[idx][jdx] || 0)
          })
        } catch(e) {
          debugger
        }
        jdx = jdx + (1 * 10);
        lon = lon + (0.625 * 10);
      }
      idx = idx + (1 * 10);
      lat = lat + (.5 * 10);
      if (idx >= 361) {
        return result;
      }
    }
    return [];
    // debugger
    // return []
    // this.data?.data?.map(p => ({
    //   ...p,
    //   z: 1,
    //   color: this.random_hex_color_code(p.population);
    // }));
  }

  chartOptions: Highcharts.Options = {
    chart: {
      map: worldMap
    },
    title: {
      text: this.data?.text || ''
    },
    legend: {enabled: false},
    tooltip: { enabled: false },
    mapNavigation: {
      enabled: true
    },
    xAxis: {
      crosshair: {
        zIndex: 5,
        dashStyle: 'Dot',
        snap: false,
        color: 'gray'
      }
    },
    yAxis: {
      crosshair: {
        zIndex: 5,
        dashStyle: 'Dot',
        snap: false,
        color: 'gray'
      }
    },
    series: [
      {
        name: 'Basemap',
        borderColor: '#606060',
        nullColor: 'rgba(255, 255, 255, 1)',
        showInLegend: false
      } as Highcharts.SeriesMapOptions,
      {
        type: 'mapbubble',
        // type: 'mappoint',
        data: this.preparedData(this.data?.data),
        // marker: {
        //   radius: 5
        // },
        maxSize: '5%',
        opacity: .5
    }]
  }

  onClose() {
    this.dialog.close();
  }

  ngAfterViewInit(): void {
    // highcharts-map-series
  //   document.getElementById('container')?.addEventListener('mousemove', e => {
      
  //     e = chart.pointer.normalize(e);

  //     chart.lbl.attr({
  //         x: e.chartX + 5,
  //         y: e.chartY - 22,
  //         text: 'Lat: ' + e.lat.toFixed(2) + '<br>Lon: ' + e.lon.toFixed(2)
  //     });
  // });
  }
}
