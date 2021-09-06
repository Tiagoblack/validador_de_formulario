let form = document.querySelector('.form');
let validate = {
    handleSubimt(event) {
        event.preventDefault();
        let send = true;
        let inputs = form.querySelectorAll('input');
        validate.clearError();
        for (let i = 0; i < inputs.length; i++) {
            let input = inputs[i];
            let check = validate.checkInput(input)
            if (check !== true) {
                send = false;
                validate.showError(input, check);

            }


        }

        if (send) {
            form.submit();
        }
    },

    checkInput: (input) => {
        let rules = input.getAttribute('data-rules');
        if (rules) {
            rules = rules.split('|');
            for (let k in rules) {
                let rDarils = rules[k].split('=');
                switch (rDarils[0]) {
                    case 'required':
                        if (input.value === '') return 'Campo não pode ser vazio';

                        break;

                    case 'min':
                        if (input.value.length < rDarils[1]) {
                            return 'Campo tem pelo menos ' + rDarils[1] + ' caracteres';
                        }
                        break;


                }
            }
        }
        return true
    },
    showError: (input, error) => {
        input.style.borderColor = '#ff0000';

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;


        input.parentElement.insertBefore(errorElement, input.ElementSilibins);
    },

    clearError: () => {
        let inputs = form.querySelectorAll('input');
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].style = '';
        }

        let errorElements = document.querySelectorAll('.error');
        for (let i = 0; i < errorElements.length; i++) {
            errorElements[i].remove();
        }
    }

}


form.addEventListener('submit', validate.handleSubimt)