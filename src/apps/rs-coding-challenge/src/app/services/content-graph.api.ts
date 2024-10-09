import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ContentGraph } from '../content-graph/interface';

@Injectable({
  providedIn: 'root',
})
export class ContentGraphApi {
  protected httpClient: HttpClient = inject(HttpClient);

  public getContentGraph(): Observable<ContentGraph> {
    const localContentGraph = localStorage.getItem('rs-content-graph');
    if (localContentGraph) {
      return of(JSON.parse(localContentGraph));
    } else {
      return this.httpClient.get<ContentGraph>('/test-content-graph.json');
    }
  }

  public saveContentGraph(update: ContentGraph): Observable<void> {
    localStorage.setItem('rs-content-graph', JSON.stringify(update));
    return of(undefined);
  }

  public deleteContentGraph(): Observable<void> {
    localStorage.removeItem('rs-content-graph');
    return of(undefined);
  }
}
