import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import * as go from 'gojs';

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss'],
})
export class DiagramComponent implements OnInit, AfterViewInit {
  title = 'gojstesting';
  diagram!: go.Diagram;
  @Input() diagramID;
  constructor() {}

  ngOnInit() {}
  ngAfterViewInit(): void {
    this.initScada();
  }
  initScada() {
    console.log('here', this.diagramID);
    const $ = go.GraphObject.make;
    this.diagram = $(go.Diagram, this.diagramID, {
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
}
