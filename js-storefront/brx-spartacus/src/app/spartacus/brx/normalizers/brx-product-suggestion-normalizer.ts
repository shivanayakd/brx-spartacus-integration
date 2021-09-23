import { Injectable } from '@angular/core';
import { Converter, Suggestion } from '@spartacus/core';

@Injectable({
  providedIn: 'root'
})
export class BrxProductSuggestionNormalizer implements Converter<any, Suggestion> {

  convert(
    source: any,
    target: Suggestion = {}
  ): Suggestion {
    target = {
      ...target,
      ...(source as any),
    };

    target.value = source.q;

    return target;
  }
}
