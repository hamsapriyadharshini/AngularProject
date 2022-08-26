import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "spacingCapsFilter"
})
export class SpacingCapsFilter implements PipeTransform {
  transform(key: string): any {
    key = key.replace(/([a-z])([A-Z])/g, "$1 $2");
    return key[0].toUpperCase() + key.substr(1).toLowerCase();
  }
}
