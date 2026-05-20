import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {} from '@shell/pages/main-menu-page/main-menu-page';
import { PreloadService } from '@core/preload/preload.service';

@Component({
  selector: 'app-loading-page',
  imports: [],
  templateUrl: './loading-page.html',
  styleUrl: './loading-page.css',
})
export class LoadingPage implements OnInit {
  private readonly router = inject(Router);

  readonly preloadService = inject(PreloadService);
  readonly preloadState = this.preloadService.state;

  async ngOnInit(): Promise<void> {
    await this.preloadService.preload();

    if (this.preloadService.isSuccess()) {
      await this.router.navigateByUrl('/menu');
    }
  }

  retry(): void {
    void this.ngOnInit();
  }
}
