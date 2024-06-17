import { AfterViewInit, ChangeDetectionStrategy, Component, Inject,OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import { MatDialogModule,MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,} from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlfrescoApi } from '@alfresco/js-api';
import { ContentModule } from '@alfresco/adf-content-services';
import { CommonModule } from '@angular/common';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  group,
  query,
  stagger
  } from '@angular/animations';
export interface rekogData {
  src: string;
  name: string;
  labels: [];
  nodeid:string
}

const listAnimation = trigger('listAnimation', [
  transition('* <=> *', [
    query(':enter',
      [style({ opacity: 0 }), stagger('600ms', animate('600ms ease-out', style({ opacity: 1 })))],
      { optional: true }
    ),
    query(':leave',
      animate('200ms', style({ opacity: 0 })),
      { optional: true }
    )
  ])
]);

@Component({
  selector: 'app-home',
  styleUrls:['./home.component.scss'],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [listAnimation]

})
export class HomeComponent implements OnInit,AfterViewInit {

  ngOnInit(): void {
    this.queryWebService();
  }

  ngAfterViewInit(): void {
      /* setTimeout(() => {
      this.queryWebService();
    },50) */
  }
  constructor(private http: HttpClient){}
  readonly dialog = inject(MatDialog);
  rkdata:any;
  longText = ``;
  showImages:boolean=true;
  //this will automatically add the current hostname to the URL for the web service
  webserviceURL = window.location.protocol+'//'+window.location.hostname +':5202/getrekognitionfiles'

  queryWebService(){

  this.http.get<rekogData>(this.webserviceURL).subscribe(data =>
      {
        this.rkdata = data;
        this.showImages = true;
        console.log(this.rkdata);
      })
  }
  openDialog(i:any) {

    //console.log("i passed in -->" + i);
    const dialogRef = this.dialog.open(DialogContentExampleDialog,{
      height:'100%',
      width:'100%',
      data: {
        src: this.rkdata[i].src ,
        nodeid: this.rkdata[i].src.split('.')[0],
        name: this.rkdata[i].name,
        labels: this.rkdata[i].labels
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  styleUrls:['./home.component.scss'],
  templateUrl: './dialog-content-example-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule,MatGridListModule,ContentModule,CommonModule],
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogContentExampleDialog implements AfterViewInit{

  constructor(@Inject(MAT_DIALOG_DATA) public data: rekogData) {}
  showElements:boolean=false

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.showElements = true;
    },500)

  }



}
