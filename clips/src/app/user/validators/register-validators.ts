import { ValidationErrors, AbstractControl,ValidatorFn } from "@angular/forms";

export class RegisterValidators {
    static match(controlName : string, matchingControl1 :string):ValidatorFn {
        return(group: AbstractControl): ValidationErrors | null =>{
            const control = group.get(controlName)
            const matchingControl = group.get(matchingControl1)
            if (!control || !matchingControl) {
                console.error('Form control can not be found')
                return { controlNotFound: false }
        }
        const error = control.value ===matchingControl.value? null:{noMatch: true}
        matchingControl.setErrors(error)
        return error
    }
}

}