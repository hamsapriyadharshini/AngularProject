import {
    A,
    Z, ZERO, NINE, NUMPAD_ZERO, NUMPAD_NINE, BACKSPACE
} from '@angular/cdk/keycodes';
import {
    Directive,
    ElementRef,
    forwardRef,
    HostListener,
    OnInit,
    Renderer2,
    Self,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
    selector: '[appUppercase]',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => UppercaseDirective),
            multi: true,
        },
    ],
})
export class UppercaseDirective implements ControlValueAccessor {
    /** implements ControlValueAccessorInterface */
    _onChange: (_: any) => void;

    /** implements ControlValueAccessorInterface */
    _touched: () => void;

    constructor(@Self() private _el: ElementRef, private _renderer: Renderer2) { }

    /** Trata as teclas */
    @HostListener('keyup', ['$event'])
    onKeyDown(evt: KeyboardEvent) {
        const keyCode = evt.keyCode;
        const key = evt.key;
        console.log('ley ', key, ' Key code ', keyCode)
        console.log(evt);

        if ((keyCode >= A && keyCode <= Z) || (keyCode >= ZERO && keyCode <= NINE) || (keyCode >= NUMPAD_ZERO && keyCode <= NUMPAD_NINE)
            || keyCode === BACKSPACE) {
            const value = this._el.nativeElement.value.toUpperCase();
            console.log('value>>>> ', value);
            this._renderer.setProperty(this._el.nativeElement, 'value', value);
            this._onChange(value);
            evt.preventDefault();
        }
    }

    @HostListener('blur', ['$event'])
    onBlur(event) {
        this._touched();
    }

    /** Implementation for ControlValueAccessor interface */
    writeValue(value: any): void {
        this._renderer.setProperty(this._el.nativeElement, 'value', value);
    }

    /** Implementation for ControlValueAccessor interface */
    registerOnChange(fn: (_: any) => void): void {
        this._onChange = fn;
    }

    /** Implementation for ControlValueAccessor interface */
    registerOnTouched(fn: () => void): void {
        this._touched = fn;
    }

    /** Implementation for ControlValueAccessor interface */
    setDisabledState(isDisabled: boolean): void {
        this._renderer.setProperty(this._el.nativeElement, 'disabled', isDisabled);
    }
}
