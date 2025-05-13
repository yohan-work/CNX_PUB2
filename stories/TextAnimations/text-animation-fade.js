import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(TextPlugin, SplitText) 

export class TextAnimation {
  constructor(element, changeText, speed = 0.15, direction = 'start', fadeDirection = 'bottom', splitUnit = 'chars') {
    if (!element) return;
    this.element = element;
    this.init(changeText, speed, direction, fadeDirection, splitUnit);
  }

  fade(text, speed, direction, fadeDirection, splitUnit) {
    const splitText = new SplitText(text, { type: "words,chars" });
    const animProps = { opacity: 0, stagger: { each: speed, from: direction } };
    
    // 페이드 방향에 따라 애니메이션 속성 설정
    switch(fadeDirection) {
      case 'top':
        animProps.y = -10;
        break;
      case 'left':
        animProps.x = -10;
        break;
      case 'right':
        animProps.x = 10;
        break;
      case 'bottom':
      default:
        animProps.y = 10;
        break;
    }

    // 분할 단위에 따라 애니메이션 타겟 선택
    const targets = splitUnit === 'words' ? splitText.words : splitText.chars;
    gsap.from(targets, animProps);
  }

  init(changeText, speed, direction, fadeDirection, splitUnit) {
    const text = this.element.querySelector('.typing-text');
    if(changeText) {
      gsap.set(
        text,
        {
          textContent: changeText,
        }
      )
    }
    this.fade(text, speed, direction, fadeDirection, splitUnit);
  }
} 