import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import { MatDialogModule} from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface rekogData {
  src: string;
  name: string;
  labels: string;
}

@Component({
  selector: 'app-home',
  styleUrls:['./home.component.scss'],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {

  ngOnInit(): void {
      this.queryWebService();
  }

  constructor(private http: HttpClient){}
  readonly dialog = inject(MatDialog);

  longText = ``;
  webserviceURL = 'http://127.0.0.1:5202/getrekognitionfiles'

  queryWebService(){

    this.http.get<rekogData>(this.webserviceURL).subscribe(data =>
      {
        console.log(data);
      })
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog,{
      height:'90%',
      width:'60%'
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
  imports: [MatDialogModule, MatButtonModule,MatGridListModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogContentExampleDialog {}
