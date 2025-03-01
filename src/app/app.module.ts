import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ContentModule } from "@alfresco/adf-content-services";
import { ProcessModule } from "@alfresco/adf-process-services";
import {
  CoreModule,
  TRANSLATION_PROVIDER,
  TranslateLoaderService,
} from "@alfresco/adf-core";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { FileViewComponent } from "./file-view/file-view.component";
import { BlobViewComponent } from "./file-view/blob-view.component";
import { PreviewService } from "./services/preview.service";

// Custom stencils
import { StencilsModule } from "./stencils.module";

// App components
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { AppsComponent } from "./apps/apps.component";
import { TasksComponent } from "./tasks/tasks.component";
import { TaskDetailsComponent } from "./task-details/task-details.component";
import { DocumentsComponent } from "./documents/documents.component";
import { StartProcessComponent } from "./start-process/start-process.component";
import { appRoutes } from "./app.routes";
import { AppLayoutComponent } from "./app-layout/app-layout.component";
import { MatCardModule } from "@angular/material/card";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatDialogModule } from "@angular/material/dialog";
import { ReportingComponent } from "./reporting/reporting.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DragDropModule } from "@angular/cdk/drag-drop";
@NgModule({
  imports: [
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
    MatDividerModule,
    MatGridListModule,
    MatDialogModule,
    DragDropModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes, // ,
      // { enableTracing: true } // <-- debugging purposes only
      { relativeLinkResolution: "legacy" }
    ),

    // ADF modules
    CoreModule.forRoot(),
    ContentModule.forRoot(),
    ProcessModule.forRoot(),
    TranslateModule.forRoot({
      loader: { provide: TranslateLoader, useClass: TranslateLoaderService },
    }),
    StencilsModule,
  ],
  declarations: [
    AppComponent,
    AppsComponent,
    HomeComponent,
    LoginComponent,
    TasksComponent,
    TaskDetailsComponent,
    DocumentsComponent,
    StartProcessComponent,
    AppLayoutComponent,
    FileViewComponent,
    BlobViewComponent,
    ReportingComponent,
    DashboardComponent,
  ],
  providers: [
    PreviewService,
    {
      provide: TRANSLATION_PROVIDER,
      multi: true,
      useValue: {
        name: "app",
        source: "resources",
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
