import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { of, Observable } from 'rxjs';

import { select, Store } from '@ngrx/store';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import * as fromStore from '../core/store';

@Injectable()
export class LoadGuard implements CanActivate {
  constructor(private store: Store<fromStore.AssetState>) {
  }

  canActivate(): Observable<boolean> {
    return this.checkCategories()
      .pipe(
        switchMap(() => this.checkStages()),
        switchMap(() => of(true)),
        catchError(() => of(false))
      );
  }

  checkCategories(): Observable<boolean> {
    return this.store.pipe(select(fromStore.getCategoriesLoaded))
      .pipe(
        tap(aLoaded => {
          if (!aLoaded) {
            this.store.dispatch(new fromStore.LoadCategories());
          }
        }),
        filter(aLoaded => aLoaded),
        take(1)
      );
  }

  checkStages(): Observable<boolean> {
    return this.store.pipe(select(fromStore.getStagesLoaded))
      .pipe(
        tap(aLoaded => {
          if (!aLoaded) {
            this.store.dispatch(new fromStore.LoadStages());
          }
        }),
        filter(aLoaded => aLoaded),
        take(1)
      );
  }
}
