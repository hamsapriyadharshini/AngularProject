import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'commonArrayFilter'
})
export class CommonArrayFilterPipe implements PipeTransform {
  
  transform(items: any[], field : string, value): any[] {

    /* Common Pipe for attribute filter
        items is the array of object ,field is the key to map and value is the findings.
     */
    if (!items) return [];
    if (!value || value.length === 0) return items;
    return items.filter(it =>
    it[field] === value);
  }

}
