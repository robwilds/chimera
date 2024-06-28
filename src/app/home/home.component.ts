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
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [listAnimation],
})
export class HomeComponent implements OnInit, AfterViewInit {
  ngOnInit(): void {
    this.queryWebService();
  }

  ngAfterViewInit(): void {}

  constructor(private http: HttpClient) {}

  readonly dialog = inject(MatDialog);
  rkdata: any;
  showImages: boolean = true;
  //this will automatically add the current hostname to the URL for the web service
  webserviceURL =
    window.location.protocol +
    "//" +
    window.location.hostname +
    ":9200/getrekognitionfiles";

  queryWebService() {
    this.http.get<rekogData>(this.webserviceURL).subscribe((data) => {
      this.rkdata = data;
      this.showImages = true;
      console.log(this.rkdata);
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
          .split(".")[0]
          .substring(this.rkdata[i].src.length - 40),
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

  formValues: FormValues = {
    content: this.node,
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: rekogData,
    nodesApiService: NodesApiService
  ) {
    nodesApiService.getNode(data.nodeid).subscribe((minimalNode) => {
      this.node = minimalNode;
      console.log(minimalNode);
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.showElements = true;
    }, 500);
  }
}
