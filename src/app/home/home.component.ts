import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  inject,
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatDialogModule, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatGridListModule } from "@angular/material/grid-list";
import { HttpClient } from "@angular/common/http";
import { ContentModule } from "@alfresco/adf-content-services";
import { CommonModule } from "@angular/common";
import { MinimalNode } from "@alfresco/js-api";
import { NodesApiService } from "@alfresco/adf-content-services";
import { FormValues } from "@alfresco/adf-core";
import { ProcessModule } from "@alfresco/adf-process-services";
import { MatAccordion, MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import {
  trigger,
  state,
  style,
  animate,
  transition,
  group,
  query,
  stagger,
} from "@angular/animations";
export interface rekogData {
  src: string;
  name: string;
  labels: [];
  nodeid: string;
}

const listAnimation = trigger("listAnimation", [
  transition("* <=> *", [
    query(
      ":enter",
      [
        style({ opacity: 0 }),
        stagger("600ms", animate("600ms ease-out", style({ opacity: 1 }))),
      ],
      { optional: true }
    ),
    query(":leave", animate("200ms", style({ opacity: 0 })), {
      optional: true,
    }),
  ]),
]);

@Component({
  selector: "app-home",
  styleUrls: ["./home.component.scss"],
  templateUrl: "./home.component.html",
  //changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [listAnimation],
})
export class HomeComponent implements OnInit, AfterViewInit {
  ngOnInit(): void {
    setInterval(() => {
      this.queryWebService();
      console.log("called web service");
    }, 5000);

    //this.queryWebService;
  }

  ngAfterViewInit(): void {}

  constructor(private http: HttpClient) {}

  readonly dialog = inject(MatDialog);
  rkdata = {};
  showImages: boolean = true;
  //window.location.hostname will automatically add the current hostname to the URL for the web service
  webserviceURL =
    window.location.protocol +
    "//" +
    window.location.hostname +
    ":9200/getrekognitionfiles";

  queryWebService() {
    this.http.get<rekogData>(this.webserviceURL).subscribe((data) => {
      //get current length of rkdata.  if different than what's pulled
      //from the web service call then set the data to rkdata which
      //causes change detection to fire
      //this could be dangerous as someone could remove/add the same number
      //of items but a simple refresh of the browser checks that
      if (Object.keys(this.rkdata).length != Object.keys(data).length) {
        this.rkdata = data;
      }
      console.log("data from web service call-> " + this.rkdata);
    });
  }
  openDialog(i: any) {
    //console.log("i passed in -->" + i);
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {
      height: "100%",
      width: "100%",
      data: {
        src: this.rkdata[i].src,
        nodeid: this.rkdata[i].src
          .split(".")[0] //strip the extension from the string
          .substring(this.rkdata[i].src.length - 40), //now get the last 40 characters which is the nodeid
        name: this.rkdata[i].name,
        labels: this.rkdata[i].labels,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: "dialog-content-example-dialog",
  styleUrls: ["./home.component.scss"],
  templateUrl: "./dialog-content-example-dialog.html",
  standalone: true,
  imports: [
    MatIconModule,
    MatExpansionModule,
    ProcessModule,
    ContentModule,
    MatDialogModule,
    MatButtonModule,
    MatGridListModule,
    ContentModule,
    CommonModule,
  ],
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogContentExampleDialog implements AfterViewInit {
  showElements: boolean = false;
  node: MinimalNode = null;
  panelOpenState = false;

  /* formValues: FormValues = {
    content: this.node,
  }; */
  formValues: FormValues;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: rekogData,
    nodesApiService: NodesApiService
  ) {
    nodesApiService.getNode(data.nodeid).subscribe((minimalNode) => {
      this.node = minimalNode;
      this.formValues = {
        content: this.node, //content is the id of the file upload field!
      };
      console.log(this.node);
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.showElements = true;
    }, 100);
  }

  processStarted(event: any) {
    this.panelOpenState = false;
  }

  processError(event: any) {}
}
