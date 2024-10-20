import {
  ActionDirective,
  ActionType,
  BoxHeaderComponent,
  DefaultLayoutComponent,
  HeaderRegistrarDirective,
  MainContentRegistrarDirective,
} from '@rs/uikit';
import {
  Component,
  OnInit,
  Signal,
  WritableSignal,
  computed,
  inject,
  signal,
} from '@angular/core';
import { ContentGraph, ContentGraphElement } from '../content-graph/interface';
import {
  RadiusFormData,
  Radiuses,
} from '../components/shared/radius-form/interface';

import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ContentGraphApi } from '../services/content-graph.api';
import { CornerBoxComponent } from '../components/corner-box/corner-box.component';
import { FormsModule } from '@angular/forms';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { RadiusFormComponent } from '../components/shared/radius-form/radius-form.component';

export interface StartPageData {
  contentGraph: ContentGraph;
}

@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [
    CommonModule,
    MainContentRegistrarDirective,
    DefaultLayoutComponent,
    BoxHeaderComponent,
    HeaderRegistrarDirective,
    ActionDirective,
    NzIconDirective,
    CornerBoxComponent,
    FormsModule,
    RadiusFormComponent,
  ],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.css',
})
export class StartPageComponent implements OnInit {
  protected contentGraphApi: ContentGraphApi = inject(ContentGraphApi);

  protected route: ActivatedRoute = inject(ActivatedRoute);
  protected readonly ActionType = ActionType;
  protected contentGraph: WritableSignal<ContentGraph> = signal(undefined);
  protected rawPreview: Signal<string> = computed(() => {
    return JSON.stringify(this.contentGraph(), undefined, 2);
  });
  protected activeElement: WritableSignal<ContentGraphElement> =
    signal(undefined);

  protected save: () => void = () => {
    this.contentGraphApi.saveContentGraph(this.contentGraph()).subscribe();
  };
  protected deleteContentGraph: () => void = () => {
    this.contentGraphApi.deleteContentGraph().subscribe();
  };
  protected isFormDataInvalid: WritableSignal<boolean> = signal(true);

  onRadiusUpdated(radiusData: RadiusFormData) {
    this.updateActiveElementRadius(radiusData.values);
    this.isFormDataInvalid.set(!radiusData.isValid);
  }

  // Update the corners of the active element
  private updateActiveElementRadius(values: Radiuses): void {
    const element = this.activeElement();
    if (element) {
      element.style.corners = [
        values.topLeft,
        values.topRight,
        values.bottomRight,
        values.bottomLeft,
      ];
      this.activeElement.set(element);
    }
  }

  ngOnInit(): void {
    this.route.data.subscribe((data) => this.setPageData(data.data));
  }

  private setPageData(pageData: StartPageData): void {
    this.contentGraph.set(pageData.contentGraph);
    this.activeElement.set(this.contentGraph().attributes.main.elements[0]);
  }
}
