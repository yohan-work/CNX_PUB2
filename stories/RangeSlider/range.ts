// import { * as type } from "./type";

import { calcProps, childProps, extensionUnitProps, rootElementProps, showValueProps, stepProps, toolTipProps } from "./type";

// export type calcProps = {
//     value : number;
//     min : number;
//     max : number;
// }

export class RangeSlider {
    constructor(
        public rootElement : rootElementProps,
        public extensionUnit : extensionUnitProps, // input 단위
        public showValue : showValueProps, // input 영역 유무
        public step : stepProps, // 단위
        public toolTip : toolTipProps,
        public leftProps : childProps,
        public rightProps : childProps
    ){
        this.init()
    }

    init() {
        /* 선언 */
        const rootElement = this.rootElement;
    
        const leftIo = rootElement.querySelector(`${this.leftProps.id}`);
        if(leftIo == null || leftIo == undefined) {
          console.error("Error leftProps.id를 확인하세요.")
        }
        const rightIo = rootElement.querySelector(`${this.rightProps.id}`);
        if(rightIo == null) {
          console.error("Error rightProps.id를 확인하세요.")
        }
        this.createElement()
        this.setValue('left')
        this.setValue('right')
    
        this.addEvent('left')
        this.addEvent('right')
    
    }

    createElement() {
        /*
          slider-wrap 생성
        */
        const createSliderWrap = document.createElement("div");
        createSliderWrap.className = 'range-slider--multi'
    
        /*
          가상 폼 생성
        */
       const vertualFormElementArray = ["track", "range", "left", "right"];
       const createVertualForm = document.createElement("div");
       createVertualForm.className = "fake-form"
       
       vertualFormElementArray.map((ele)=> {
          const crtEle = document.createElement("div");
          crtEle.className=ele
    
          if(ele === 'left' || ele === 'right'){
            crtEle.classList.add('thumb')
    
            /*
              tooltip 사용 여부
            */
            if(this.toolTip) {
              const createVertualTag = document.createElement("div");
              createVertualTag.className='vtt'
    
              /*
                tooltip 방향
              */
              if(this.toolTip.direction) {
                createVertualTag.classList.add(this.toolTip.direction)
              }
              /*
                tooltip 모드
              */
              if(this.toolTip.mode === "hover") {
                this.rootElement.setAttribute("data-show-mode", "hover")
              }
    
              const createVertualSpan = document.createElement("span")
              createVertualSpan.className = 's'
    
              
              createVertualTag.appendChild(createVertualSpan)
              crtEle.appendChild(createVertualTag);
            }
          }
          createVertualForm.appendChild(crtEle)
       })
    
       const cloneNode = [this.rootElement.querySelector(`${this.leftProps.id}`), this.rootElement.querySelector(`${this.rightProps.id}`)]
       cloneNode.map((node, index)=> {
          if(node) {
            function setAttributeFunc(element:Element, key:string, value:number) {
                return element.setAttribute(key, `${value}`)
            }
            if(index == 0) {
                //left
                // node.min = this.leftProps.values.min;
                // node.max = this.leftProps.values.max;
                // node.step = this.step;
                // node.setAttribute('value', this.leftProps.values.currentValue)

                setAttributeFunc(node, "min", this.leftProps.values.min);
                setAttributeFunc(node, "max", this.leftProps.values.max);
                setAttributeFunc(node, "step", this.step);
                setAttributeFunc(node, "value", this.leftProps.values.currentValue);

              }else {
                // node.min = this.rightProps.values.min;
                // node.max = this.rightProps.values.max;
                // node.step = this.step;
                // node.setAttribute('value', this.rightProps.values.currentValue)

                setAttributeFunc(node, "min", this.rightProps.values.min);
                setAttributeFunc(node, "max", this.rightProps.values.max);
                setAttributeFunc(node, "step", this.step);
                setAttributeFunc(node, "value", this.rightProps.values.currentValue);
              }
             createSliderWrap.appendChild(node)
          }
       })
    
       // range-slider--multi 까지 생성 완료
       createSliderWrap.appendChild(createVertualForm)
    
      /*합치기*/
       this.rootElement.appendChild(createSliderWrap)
    
    
       /*기타 옵션 대응*/
        //  showValue
        if(this.showValue){
          const array = ['left', 'right']
          array.map((ele)=> {
            const createShowValue = document.createElement('input');
            createShowValue.setAttribute('type', 'text');
            createShowValue.className = 'ui-textfield';
            createShowValue.id = `${ele}_value`
    
            if(ele === 'left') {
              this.rootElement.prepend(createShowValue)
            }else {
              this.rootElement.appendChild(createShowValue)
            }
          })
        }
        //  disabled
        if(this.leftProps.disabled || this.rightProps.disabled) {
          const array = ['left', 'right']
    
          array.map(ele=> {
            const element = this.rootElement.querySelector(`#input-${ele}`);
            const element2 = this.rootElement.querySelector(`#${ele}_value`);
            const fakeFormThumb = this.rootElement.querySelector(`.fake-form .${ele}`)
            const fakeFormRange = this.rootElement.querySelector(".fake-form .range")

            function setAttributeFunc(element:Element | null, key:string, value:boolean) {
                return element?.setAttribute(key, `${value}`)
            }
    
            if(this.leftProps.disabled && this.rightProps.disabled) {
                fakeFormRange?.classList.add("disabled")
            }

            if(ele === 'left') {
                setAttributeFunc(element, "disabled", this.leftProps.disabled)
                setAttributeFunc(element2, "disabled", this.leftProps.disabled)
                fakeFormThumb?.classList.add(this.leftProps.disabled ? "disabled" : "")
            }else {
                setAttributeFunc(element, "disabled", this.rightProps.disabled)
                setAttributeFunc(element2, "disabled", this.rightProps.disabled)
                fakeFormThumb?.classList.add(this.rightProps.disabled ? "disabled" : "")
            }
    
          })
        }
      }

    getCalcValue({value, min, max}:calcProps):number {
        let result = Math.floor(((value - min) / (max- min)) * max);
        return result
    }

    swicher(target) {
        let min!:number;
        let max!:number;
        let ioValue!:number;
        let percent!: number;
        let percentFake!: number;


        const ioLeft = this.rootElement.querySelector<HTMLInputElement>(`#input-left`);
        const ioRight = this.rootElement.querySelector<HTMLInputElement>(`#input-right`);
        

        switch(target) {
            case 'left' :
            min = this.leftProps.values.min;
            max = this.leftProps.values.max;

            ioValue = Math.min(Number(ioRight?.value), Number(ioLeft?.value));
            percent = this.getCalcValue({
                value : Number(ioLeft?.value), 
                min : min,
                max : max
            });
            percentFake = percent * (100 / max)
            
            break;
            case 'right' :
            min = this.rightProps.values.min;
            max = this.rightProps.values.max;

            ioValue = Math.max(Number(ioRight?.value), Number(ioLeft?.value));
            percent = this.getCalcValue({
                value : Number(ioRight?.value),
                min : min,
                max : max
            });
            percentFake = (max - percent) * (100 / max)

            break;
            default :
            console.log("default")
        }

        return {min, max, ioValue, percent, percentFake}

    }

    setValue(target) {
        /* 공통 */
        const ioLeft = this.rootElement.querySelector<HTMLInputElement>(`#input-left`);
        const ioRight = this.rootElement.querySelector<HTMLInputElement>(`#input-right`);
        
        const leftFake = this.rootElement.querySelector<HTMLDivElement>(".fake-form > .left");
        const rightFake = this.rootElement.querySelector<HTMLDivElement>(".fake-form > .right");
        const rangeFake = this.rootElement.querySelector<HTMLDivElement>(".fake-form > .range")
        /* 공통 */
        
        function setAttributeFunc(element:Element | HTMLElement, key:string, value:number) {
            return element.setAttribute(key, `${value}`)
        }
        

        /* 방향별 값 삽입 */
        if(target == 'left') {
            setAttributeFunc(ioLeft!,"value", this.swicher(target).ioValue)
        //   ioLeft.value = this.swicher(target).ioValue; 
          let percent = this.swicher(target).percentFake;
    
          leftFake.style.left = percent + '%';
          rangeFake.style.left = percent + '%';
    
          if(this.toolTip) {
            let vtt = leftFake.children[0].children[0];
            vtt.innerText = percent
          }
    
        }else {
          ioRight.value = this.swicher(target).ioValue;
          let percentFake =this.swicher(target).percentFake
          let percent = this.swicher(target).percent;
    
          rightFake.style.right = percentFake + '%';
          rangeFake.style.right = percentFake + '%';
    
          if(this.toolTip) {
            let vtt = rightFake.children[0].children[0];
            vtt.innerText = percent
          }
        }
          
    
        if(this.showValue) {
          const getShowValueLeftEle = this.rootElement.querySelector("#left_value");
          const getShowValueRightEle = this.rootElement.querySelector("#right_value");
    
          // extensionUnit옵션 대응
          const unit = !this.extensionUnit ? '' : this.extensionUnit
    
          getShowValueLeftEle.value = this.swicher('left').percent + unit
          getShowValueRightEle.value = this.swicher('right').percent + unit;
        }
    
    
      }


}



export class Brand {
    name : string;
    since : number;
    employee : number;
    constructor(name : string, since : number, employee:number) {
        this.name = name;
        this.since = since;
        this.employee = employee;
    }
    
    // constructor(
    //     public name : string,
    //     public since : number,
    //     public employee : number
    // ){}
}

export class Samsung extends Brand {
    location : string;
    constructor(name : string, since : number, employee:number, location: string) {
        super(name, since, employee);
        
        this.location = location
    }

    // constructor(
    //     public name : string,
    //     public since : number,
    //     public employee:number,
    //     public location: string) {
    //     super(name, since, employee);
    // }

    getInfomation() {
        return `name : ${this.name}\nsince : ${this.since}, \nemployee : ${this.employee}, \nlocation : ${this.location}`
    }
}


