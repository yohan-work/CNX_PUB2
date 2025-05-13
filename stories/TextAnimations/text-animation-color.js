import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(TextPlugin, SplitText) 

export class TextAnimation {
  constructor(element, changeText, speed = 0.15, direction = 'start', splitUnit = 'chars', fromColor = "#DDD", toColor = "#000") {
    if (!element) return;
    this.element = element;
    this.init(changeText, speed, direction, splitUnit, fromColor, toColor);
  }

  colorize(text, speed, direction, splitUnit, fromColor, toColor) {
    const splitText = new SplitText(text, { type: "words,chars" });
    const targets = splitUnit === 'words' ? splitText.words : splitText.chars;
    
    // 모든 타겟 엘리먼트에 초기 스타일 설정
    gsap.set(targets, {
      color: fromColor
    });
    
    // 애니메이션 시작
    gsap.to(targets, {
      duration: 0.5,
      color: toColor,
      stagger: {
        each: speed,
        from: direction,
      },
    });
  }

  init(changeText, speed, direction, splitUnit, fromColor, toColor) {
    const text = this.element.querySelector('.typing-text');
    if(changeText) {
      gsap.set(
        text,
        {
          textContent: changeText,
        }
      )
    }
    this.colorize(text, speed, direction, splitUnit, fromColor, toColor);
  }
} 