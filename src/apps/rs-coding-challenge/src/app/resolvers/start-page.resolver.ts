import { inject, Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { StartPageData } from '../pages/start-page.component';
import { ContentGraphApi } from '../services/content-graph.api';

@Injectable({
  providedIn: 'root',
})
export class StartPageResolver {
  protected contentGraphApi = inject(ContentGraphApi);

  resolve(): Observable<StartPageData> {
    return forkJoin({
      contentGraph: this.contentGraphApi.getContentGraph(),
    });
  }
}
