import { testStoryAccessibility, generateA11yReport } from './utils/a11y-test-utils.js';
import { axe, toHaveNoViolations } from 'jest-axe';
import path from 'path';
import fs from 'fs';

expect.extend(toHaveNoViolations);

describe('Button 컴포넌트 접근성 테스트', () => {
  const storyFilePath = 'stories/Button/button.stories.js';
  const outputDir = path.join(process.cwd(), 'a11y-reports');
  
  // 출력 디렉토리가 없으면 생성
  beforeAll(() => {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
  });
  
  test('Primary 버튼이 접근성 기준을 충족합니다', async () => {
    const results = await testStoryAccessibility(storyFilePath, 'Primary');
    
    // 보고서 생성
    const outputFile = path.join(outputDir, 'Button-Primary.html');
    generateA11yReport(results, outputFile);
    
    // Jest 테스트 수행
    expect(results).toHaveNoViolations();
  });
  
  test('Secondary 버튼이 접근성 기준을 충족합니다', async () => {
    const results = await testStoryAccessibility(storyFilePath, 'Secondary');
    
    // 보고서 생성
    const outputFile = path.join(outputDir, 'Button-Secondary.html');
    generateA11yReport(results, outputFile);
    
    // Jest 테스트 수행
    expect(results).toHaveNoViolations();
  });
  
  test('Large 버튼이 접근성 기준을 충족합니다', async () => {
    const results = await testStoryAccessibility(storyFilePath, 'Large');
    
    // 보고서 생성
    const outputFile = path.join(outputDir, 'Button-Large.html');
    generateA11yReport(results, outputFile);
    
    // Jest 테스트 수행
    expect(results).toHaveNoViolations();
  });
  
  test('Small 버튼이 접근성 기준을 충족합니다', async () => {
    const results = await testStoryAccessibility(storyFilePath, 'Small');
    
    // 보고서 생성
    const outputFile = path.join(outputDir, 'Button-Small.html');
    generateA11yReport(results, outputFile);
    
    // Jest 테스트 수행
    expect(results).toHaveNoViolations();
  });
}); 