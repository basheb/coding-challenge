import {Directive, Host, OnInit, SkipSelf, TemplateRef} from '@angular/core';
import {RegisterDropdownMenuEntryDirective} from './register-menu-entry-dropdown.directive';

@Directive({
    selector: '[rsUiDropdownMenuEntryContent]',
    standalone: true
})
export class RegisterMenuEntryDropdownContentDirective implements OnInit{
    constructor(
        @Host() @SkipSelf() private parent: RegisterDropdownMenuEntryDirective,
        private templateRef: TemplateRef<void>
    ) {
    }

    ngOnInit(): void {
        this.parent.setContentTemplate(this.templateRef);
    }
}
