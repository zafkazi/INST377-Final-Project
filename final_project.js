//help form
function textValidation(){
            inputTest = document.getElementById("bigbox").value;
            const validationRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
            if(validationRegex.test(inputTest)) {
                alert('Error: Special characters not allowed in this field.')
                return false;
            }
            return true;
        }