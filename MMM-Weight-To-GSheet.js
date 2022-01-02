/* global Module */

/* Magic Mirror
 * Module: MMM-Weight-To-GSheet
 *
 */

Module.register('MMM-Weight-To-GSheet', {

    defaults: {
    keyboard:null
    },

    getScripts: function() {
        return [
            'SimpleKeyboard.js'
        ];
    },
    getStyles: function() {
        return [
            'MMM-Weight-To-GSheet.css',
            'SimpleKeyboard.css'
        ];
    }, // Load translations files
    getTranslations: function () {
        return {
        en: "translations/en.json",
        fr: "translations/fr.json",
        };
    },

    start: function() {

        Log.info('Starting module: ' + this.name );



      


    },

    getDom: function() {


        var wrapper = document.createElement('div');
        wrapper.className="wtg-wrapper"

      this.renderWeightInputForm(wrapper);
      this.renderWeekWeight(wrapper);

        

         

        
        return wrapper;
    },

    handleKeyboard: function() {
        console.log(this.weightInputForm.className)
       if(this.weightInputForm.className=="hide-weightInputForm"){
           this.weightInputForm.className="weightInputForm";
           this.weightWeekWeight.className="hide-weightWeekWeight"
       }else{
           this.weightInputForm.className="hide-weightInputForm";
           this.weightWeekWeight.className="weightWeekWeight"
       }
        if(!this.keyboard){
        var Keyboard = window.SimpleKeyboard.default;

                  this.keyboard = new Keyboard({
                        onChange: input => this.onChange(input),
                        onKeyPress: button => this.onKeyPress(button),
                        layout: {
                            default: ["1 2 3", "4 5 6", "7 8 9", "{bksp} 0 ,"]
                        },
                        theme: "hg-theme-default hg-layout-numeric myTheme1 show-keyboard"
                        });
        }
        document.querySelector(".wtg-weight-input").value = "0000";
        this.keyboard.clearInput();
        /*else{
            if(this.keyboard.keyboardDOM.classList.contains("show-keyboard")){
                console.log(document.getElementById("wtg-weight-input").value)
                 this.keyboard.setOptions({
                        theme: "hg-theme-default hg-layout-numeric myTheme1"
                    });
            }else{
                this.keyboard.setOptions({
                        theme: "hg-theme-default hg-layout-numeric myTheme1 show-keyboard"
                    });
            }
        }
        */

        
    },

    onChange: function(input) {

        document.querySelector(".wtg-weight-input").value = input;
        console.log("Input changed", input);
    
    },

    onKeyPress: function(button) {

        console.log("Button pressed", button);
    
    },

    renderWeightInputForm: function(wrapper) {
        this.weightInputForm = document.createElement('div');
        this.weightInputForm.className="hide-weightInputForm";
        this.weightInputForm.id = "weightInputForm";
        
        var span1 = document.createElement('span');
        var btn = document.createElement('button');
        btn.innerHTML=this.translate('SEND_WEIGHT_BUTTON');
        btn.addEventListener("click", () => this.handleKeyboard());
        btn.className="wtg-weight-button";
        btn.id="wtg-weight-button";
        span1.appendChild(btn)

        var span2 = document.createElement('span');
        var input = document.createElement('input');
        input.className="wtg-weight-input";
        input.id="wtg-weight-input";
        span2.appendChild(input)

        var span3 = document.createElement('span');
        const kb = document.createElement("div");
          kb.className = "simple-keyboard";
          span3.appendChild(kb);




        this.weightInputForm.appendChild(span2);
        this.weightInputForm.appendChild(span3);
        this.weightInputForm.appendChild(span1);

        wrapper.appendChild(this.weightInputForm)
        

    },

renderWeekWeight: function(wrapper) {
        this.weightWeekWeight = document.createElement('div');
         this.weightWeekWeight.className="weightWeekWeight"
        
    this.renderday('MONDAY','10');
    this.renderday('TUESDAY','10');
    this.renderday('WEDNESDAY',null);
    this.renderday('THURSDAY',null);
    this.renderday('FRIDAY',null);
    this.renderday('SATURDAY',null);
    this.renderday('SUNDAY',null);

        

        wrapper.appendChild( this.weightWeekWeight)
        

    },
    renderday: function(dayValue,weightValue){
        var day = document.createElement('span');
        day.className="weightWeekWeightDays"
        var p = document.createElement('p');
        p.innerHTML =this.translate(dayValue);
        day.appendChild(p);

        if(weightValue){
        var weight = document.createElement('p');
        weight.innerHTML =weightValue; 
        weight.innerHTML +=" Kg";
        day.appendChild(weight);
        }else{
        var addWeight = document.createElement('button');
        addWeight.innerHTML =this.translate('ADD_WEIGHT_BUTTON');
        addWeight.addEventListener("click", () => this.handleKeyboard());
        day.appendChild(addWeight);

          
        }
        this.weightWeekWeight.appendChild(day);

    },

});
