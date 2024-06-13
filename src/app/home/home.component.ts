import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import { MatDialogModule} from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-home',
  styleUrls:['./home.component.scss'],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {

  readonly dialog = inject(MatDialog);

  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;

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
