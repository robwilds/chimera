import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { NodeEntry } from "@alfresco/js-api";
import { PreviewService } from "../services/preview.service";

@Component({
  selector: "app-root",
  templateUrl: "./app-layout.component.html",
  styleUrls: ["./app-layout.component.scss"],
})
export class AppLayoutComponent {
  constructor(public router: Router, private preview: PreviewService) {}

  /**
   * Called when the user submits the search, e.g. hits enter or clicks submit
   *
   * @param event Parameters relating to the search
   */
  onSearchSubmit(event: KeyboardEvent) {
    const value = (event.target as HTMLInputElement).value;
    this.router.navigate([
      "/search",
      {
        q: value,
      },
    ]);
  }

  onItemClicked(event: NodeEntry) {
    if (event.entry.isFile) {
      this.preview.showResource(event.entry.id);
    } else if (event.entry.isFolder) {
      this.router.navigate(["/files", event.entry.id]);
    }
  }
}
