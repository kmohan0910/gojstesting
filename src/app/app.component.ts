import {
  CompactType,
  DisplayGrid,
  GridsterConfig,
  GridsterItem,
  GridType,
} from 'angular-gridster2';
import { Component, OnInit } from '@angular/core';
import * as go from 'gojs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'gojstesting';
  diagram!: go.Diagram;
  obj = {
    id: 'c',
    width: '1700',
    height: '800',
    x: 100,
    y: 0,
    zindex: 10,
    diagram: '',
    nodeDataArray: [],
    linkDataArray: [],
  };

  ngOnInit() {
    this.dashboard = [
      { cols: 5, rows: 5, y: 0, x: 0, index: 'diagram2' },
      { cols: 5, rows: 5, y: 2, x: 2, index: 'diagram1' },
    ];
    this.initOptions();
    // this.initScada();
  }
  addCanvas() {
    this.dashboard.push({
      cols: 5,
      rows: 5,
      y: 0,
      x: 0,
      index: 'diagram' + this.dashboard.length + 1,
    });
  }
  initScada() {
    console.log('here');
    const $ = go.GraphObject.make;
    this.diagram = $(go.Diagram, 'myDiagram', {
      maxSelectionCount: 1, // users can select only one part at a time
      'draggingTool.isEnabled': true,
      allowVerticalScroll: false,
      // allowHorizontalScroll: false,
      autoScale: go.Diagram.Uniform, // scale to fill viewport
      initialDocumentSpot: go.Spot.Top,
      initialViewportSpot: go.Spot.Top,

      // ChangedSelection: onSelectionChanged,
      // selectionMoved: onSelectionChanged,
      // layout:
      //   $(go.TreeLayout,
      //     { angle: 90, arrangement: go.TreeLayout.ArrangementFixedRoots }),
    });
    this.diagram.nodeTemplateMap.add(
      'Device',
      $(
        go.Node,
        'Auto',
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(
          go.Point.stringify
        ),
        // The main element of the Spot panel is a vertical panel housing an optional icon,
        // plus a rectangle that acts as the port
        $(
          go.Panel,
          'Vertical',
          $(
            go.Shape,
            'RoundedRectangle',
            {
              desiredSize: new go.Size(50, 50),
              fromLinkable: true,
              toLinkable: true,
              toLinkableDuplicates: true,
              fromLinkableDuplicates: true,
              cursor: 'pointer',
              portId: '',
              fromSpot: go.Spot.AllSides, // Where links can connect from this port
              toSpot: go.Spot.AllSides,
            },
            new go.Binding('source', 'img')
          ),
          $(
            go.Panel,
            'Vertical',
            $(
              go.TextBlock,
              {
                font: '28px Noto Sans, sans-serif',
                textAlign: 'left',
                // size: new go.Size(150, 100),
                maxSize: new go.Size(300, 600),
                text: 'Hello',
              },
              new go.Binding('text'),
              new go.Binding('alignment', 'textPosition'),
              new go.Binding('alignmentFocus', 'textAlignFocus'),
              new go.Binding('background', 'textBackground')
            )
          )
        )
      )
    );
    const nodeDataArray = [
      // ESEM_F
      {
        devID: '',
        key: 0,
        text: 'Main HT Panels',
        loc: '0 0',
        category: 'Device',
        img: '../../../../assets/img/sld/generator.png',
      },
      {
        devID: '',
        key: 0,
        text: 'Test 2',
        loc: '8 8',
        category: 'Device',
        img: '../../../../assets/img/sld/generator.png',
      },
      {
        devID: '',
        key: 0,
        text: 'Test 3',
        loc: '80 80',
        category: 'Device',
        img: '../../../../assets/img/sld/generator.png',
      },
    ];

    this.diagram.model = go.Model.fromJson({
      class: 'go.GraphLinksModel',
      nodeDataArray: nodeDataArray,
    });
    this.diagram.toolManager.linkingTool.isEnabled = true;
    //this.diagram.nodeTe;
    // this.diagram.model = new go.GraphLinksModel(
    //   [
    //     { key: 'Hello' }, // two node data, in an Array
    //     { key: 'World!' },
    //   ],
    //   [{ from: 'Hello', to: 'World!' }] // one link data, in an Array})
    // );
    // this.diagram.isEnabled = true;
    this.diagram.linkTemplate = $(
      go.Link,
      { toShortLength: 3, relinkableFrom: true, relinkableTo: true }, // allow the user to relink existing links
      $(go.Shape, { strokeWidth: 2 }, new go.Binding('stroke', 'color')),
      $(
        go.Shape,
        { toArrow: 'Standard', stroke: null },
        new go.Binding('fill', 'color')
      ),
      {
        // this tooltip Adornment is shared by all links
        toolTip: $(
          'ToolTip',
          $(
            go.TextBlock,
            { margin: 4 }, // the tooltip shows the result of calling linkInfo(data)
            new go.Binding('text', '')
          )
        ),
        // the same context menu Adornment is shared by all links
      }
    );
    this.diagram.toolManager.linkingTool.isEnabled = true;
  }
  addNode() {
    var node = new go.Node('Auto');
    var shape = new go.Shape();
    shape.figure = 'RoundedRectangle';
    shape.fill = 'lightblue';
    shape.strokeWidth = 3;
    node.add(shape);
    var textblock = new go.TextBlock();
    textblock.text = 'Hello!';
    textblock.margin = 5;
    node.add(textblock);
    this.diagram.add(node);
    //   const $ = go.GraphObject.make;
    //   $(go.Node. 'Auto',  { locationSpot: go.Spot.Center },$(go.Shape, "Rectangle",{
    //     fill: "rgba(128,128,128,0.2)", stroke: "gray", strokeWidth: 3,
    //     portId: "", cursor: "pointer",  // the Shape is the port, not the whole Node
    //     // allow all kinds of links from and to this port
    //     fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
    //     toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true

    //   }
    //   $(go.TextBlock,
    //      {

    //   })))
    // }
  }
  initOptions() {
    this.options = {
      gridType: GridType.Fixed,
      compactType: CompactType.None,
      margin: 10,
      outerMargin: true,
      outerMarginTop: null,
      outerMarginRight: null,
      outerMarginBottom: null,
      outerMarginLeft: null,
      useTransformPositioning: true,
      mobileBreakpoint: 640,
      minCols: 12,
      maxCols: 12,
      minRows: 5,
      maxRows: 12,
      maxItemCols: 12,
      minItemCols: 1,
      minItemRows: 1,
      maxItemArea: 2500,
      minItemArea: 1,
      defaultItemCols: 1,
      defaultItemRows: 1,
      fixedColWidth: (screen.width - 250) / 12,
      fixedRowHeight: 100,
      keepFixedHeightInMobile: false,
      keepFixedWidthInMobile: true,
      scrollSensitivity: 10,
      scrollSpeed: 20,
      enableEmptyCellClick: false,
      enableEmptyCellContextMenu: false,
      enableEmptyCellDrop: false,
      enableEmptyCellDrag: false,
      enableOccupiedCellDrop: false,
      emptyCellDragMaxCols: 50,
      emptyCellDragMaxRows: 50,
      ignoreMarginInRow: false,
      draggable: {
        enabled: true,
        dragHandleClass: 'handle',
        ignoreContent: true,
      },
      resizable: {
        enabled: true,
      },
      swap: true,
      pushItems: true,
      disablePushOnDrag: false,
      disablePushOnResize: false,
      pushDirections: {
        north: true,
        east: true,
        south: true,
        west: true,
      },
      pushResizeItems: false,
      displayGrid: DisplayGrid.OnDragAndResize,
      disableWindowResize: false,
      disableWarnings: false,
      scrollToNewItems: false,
      defaultLayerIndex: 1,
      setGridSize: true,
    };
  }
  options: GridsterConfig;
  dashboard: Array<GridsterItem>;

  changedOptions() {
    this.options.api.optionsChanged();
  }

  removeItem(item) {
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  // addItem() {
  //   this.dashboard.push({});
  // }
}
