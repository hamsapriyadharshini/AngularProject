import { Pipe, PipeTransform } from '@angular/core';

@Pipe({

    name: 'stringToDate'

})
export class StringToDateFilter implements PipeTransform {

    transform(key: string): Date {

        return new Date(key);

    }
}
