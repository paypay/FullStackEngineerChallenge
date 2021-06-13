import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SidenavRightPanelContentService {
    panelClose$ = new BehaviorSubject<boolean>(false);

    private _componentPortal$ = new BehaviorSubject<ComponentPortal<any> | null>(null);


    getComponentPortal$(): Observable<ComponentPortal<any> | null> {
        return from(this._componentPortal$);
    }

    setComponentPortal(component: ComponentType<any>) {
        this._componentPortal$.next(new ComponentPortal<any>(component));
    }
}
