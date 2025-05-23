import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(TextPlugin, SplitText) 

export class TextAnimation {
  constructor(element, changeText, speed = 0.15, direction = 'start', splitUnit = 'chars') {
    if (!element) return;
    this.element = element;
    this.init(changeText, speed, direction, splitUnit);
  }

  typing(text, speed, direction, splitUnit) {
    const splitText = new SplitText(text, { type: "words,chars" });
    const targets = splitUnit === 'words' ? splitText.words : splitText.chars;
    gsap.from(targets, {
      opacity: 0,
      stagger: {
        each: speed,
        from: direction,
      },
    });
  }

  init(changeText, speed, direction, splitUnit) {
    const text = this.element.querySelector('.typing-text');
    if(changeText) {
      gsap.set(
        text,
        {
          textContent: changeText,
        }
      )
    }
    this.typing(text, speed, direction, splitUnit);
  }
}
