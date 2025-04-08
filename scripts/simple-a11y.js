#!/usr/bin/env node

/**
 * 간단한 HTML 접근성 검사 스크립트
 * 사용법: node scripts/simple-a11y.js <HTML_파일_경로>
 */

import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';
import chalk from 'chalk';

// 수동 접근성 검사 함수
function checkAccessibility(html, filePath) {
  console.log(chalk.blue(`${filePath} 파일을 검사 중...`));
  
  try {
    // HTML 파싱
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    // 위반 및 통과 항목 초기화
    const violations = [];
    const passes = [];
    
    // 1. 이미지 alt 속성 확인
    const images = document.querySelectorAll('img');
    let hasImageAltViolation = false;
    
    images.forEach((img, index) => {
      if (!img.hasAttribute('alt')) {
        hasImageAltViolation = true;
        violations.push({
          id: 'image-alt',
          impact: 'serious',
          help: '이미지에 대체 텍스트 제공',
          description: '모든 이미지는 적절한 대체 텍스트(alt 속성)를 가져야 합니다.',
          helpUrl: 'https://dequeuniversity.com/rules/axe/4.4/image-alt',
          nodes: [{
            html: img.outerHTML,
            target: [`img:nth-of-type(${index + 1})`],
            failureSummary: '이 이미지에 alt 속성을 추가하세요.'
          }]
        });
      }
    });
    
    if (images.length > 0 && !hasImageAltViolation) {
      passes.push({
        id: 'image-alt',
        description: '모든 이미지에 적절한 대체 텍스트가 제공됩니다.'
      });
    }
    
    // 2. 버튼과 링크 접근성 확인
    const interactiveElements = [...document.querySelectorAll('a, button')];
    let hasLinkNameViolation = false;
    
    interactiveElements.forEach((element, index) => {
      if (element.textContent.trim() === '' && 
          (!element.hasAttribute('aria-label') && 
          !element.hasAttribute('aria-labelledby'))) {
        hasLinkNameViolation = true;
        violations.push({
          id: 'link-name',
          impact: 'serious',
          help: '링크와 버튼에 접근 가능한 이름 제공',
          description: '모든 링크와 버튼은 접근 가능한 이름을 가져야 합니다.',
          helpUrl: 'https://dequeuniversity.com/rules/axe/4.4/link-name',
          nodes: [{
            html: element.outerHTML,
            target: [`${element.tagName.toLowerCase()}:nth-of-type(${index + 1})`],
            failureSummary: '이 요소에 텍스트 내용이나 aria-label 속성을 추가하세요.'
          }]
        });
      }
    });
    
    if (interactiveElements.length > 0 && !hasLinkNameViolation) {
      passes.push({
        id: 'link-name',
        description: '모든 링크와 버튼에 접근 가능한 이름이 제공됩니다.'
      });
    }
    
    // 3. 폼 레이블 확인
    const formControls = document.querySelectorAll('input, select, textarea');
    let hasLabelViolation = false;
    
    formControls.forEach((control, index) => {
      if (control.type !== 'hidden' && 
          control.type !== 'button' && 
          control.type !== 'submit' && 
          control.type !== 'reset' && 
          !control.hasAttribute('aria-label') && 
          !control.hasAttribute('aria-labelledby') &&
          !document.querySelector(`label[for="${control.id}"]`)) {
        hasLabelViolation = true;
        violations.push({
          id: 'label',
          impact: 'critical',
          help: '폼 요소에 레이블 제공',
          description: '모든 폼 요소는 접근 가능한 레이블을 가져야 합니다.',
          helpUrl: 'https://dequeuniversity.com/rules/axe/4.4/label',
          nodes: [{
            html: control.outerHTML,
            target: [`${control.tagName.toLowerCase()}:nth-of-type(${index + 1})`],
            failureSummary: '이 요소에 label 요소를 연결하거나 aria-label 속성을 추가하세요.'
          }]
        });
      }
    });
    
    if (formControls.length > 0 && !hasLabelViolation) {
      passes.push({
        id: 'label',
        description: '모든 폼 요소에 접근 가능한 레이블이 제공됩니다.'
      });
    }
    
    // 4. 헤딩 구조 확인
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let hasHeadingOrderViolation = false;
    let prevLevel = 0;
    
    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName[1]);
      if (prevLevel > 0 && level > prevLevel + 1) {
        hasHeadingOrderViolation = true;
        violations.push({
          id: 'heading-order',
          impact: 'moderate',
          help: '헤딩 레벨이 순차적으로 증가해야 함',
          description: '헤딩 레벨은 순차적으로 증가해야 합니다 (예: h1 다음에 h3이 아닌 h2가 와야 함).',
          helpUrl: 'https://dequeuniversity.com/rules/axe/4.4/heading-order',
          nodes: [{
            html: heading.outerHTML,
            target: [`${heading.tagName.toLowerCase()}:nth-of-type(${index + 1})`],
            failureSummary: `헤딩 레벨이 ${prevLevel}에서 ${level}으로 건너뛰었습니다. 순차적으로 증가해야 합니다.`
          }]
        });
      }
      prevLevel = level;
    });
    
    if (headings.length > 0 && !hasHeadingOrderViolation) {
      passes.push({
        id: 'heading-order',
        description: '헤딩 레벨이 순차적으로 증가합니다.'
      });
    }
    
    // 5. ARIA 역할 확인
    const ariaElements = document.querySelectorAll('[role]');
    let hasAriaRoleViolation = false;
    const validRoles = [
      'alert', 'alertdialog', 'application', 'article', 'banner', 'button', 'cell', 'checkbox', 
      'columnheader', 'combobox', 'complementary', 'contentinfo', 'definition', 'dialog', 
      'directory', 'document', 'feed', 'figure', 'form', 'grid', 'gridcell', 'group', 'heading', 
      'img', 'link', 'list', 'listbox', 'listitem', 'log', 'main', 'marquee', 'math', 'menu', 
      'menubar', 'menuitem', 'menuitemcheckbox', 'menuitemradio', 'navigation', 'none', 'note', 
      'option', 'presentation', 'progressbar', 'radio', 'radiogroup', 'region', 'row', 'rowgroup', 
      'rowheader', 'scrollbar', 'search', 'searchbox', 'separator', 'slider', 'spinbutton', 
      'status', 'switch', 'tab', 'table', 'tablist', 'tabpanel', 'term', 'textbox', 'timer', 
      'toolbar', 'tooltip', 'tree', 'treegrid', 'treeitem'
    ];
    
    ariaElements.forEach((element, index) => {
      const role = element.getAttribute('role');
      if (!validRoles.includes(role)) {
        hasAriaRoleViolation = true;
        violations.push({
          id: 'aria-roles',
          impact: 'serious',
          help: '유효한 ARIA 역할 사용',
          description: 'ARIA 역할은 유효한 값을 사용해야 합니다.',
          helpUrl: 'https://dequeuniversity.com/rules/axe/4.4/aria-roles',
          nodes: [{
            html: element.outerHTML,
            target: [`[role="${role}"]:nth-of-type(${index + 1})`],
            failureSummary: `"${role}"은(는) 유효한 ARIA 역할이 아닙니다.`
          }]
        });
      }
    });
    
    if (ariaElements.length > 0 && !hasAriaRoleViolation) {
      passes.push({
        id: 'aria-roles',
        description: '모든 ARIA 역할이 유효합니다.'
      });
    }
    
    // 결과 출력
    console.log(chalk.green(`검사 완료`));
    console.log(`  위반 항목: ${chalk.red(violations.length)}개`);
    console.log(`  통과 항목: ${chalk.green(passes.length)}개`);
    
    // 위반 항목이 있으면 간단히 출력
    if (violations.length > 0) {
      console.log(chalk.yellow('\n위반 항목:'));
      violations.forEach((violation, index) => {
        console.log(`  ${index + 1}. ${chalk.red(violation.id)}: ${violation.help} (중요도: ${violation.impact})`);
      });
    }
    
    // 보고서 생성
    const outputDir = './a11y-reports';
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const outputFile = path.join(outputDir, `${path.basename(filePath, '.html')}-simple-a11y-report.html`);
    generateReport({ violations, passes }, outputFile, filePath);
    
    console.log(chalk.green(`\n보고서가 생성되었습니다: ${outputFile}`));
    return { violations, passes };
    
  } catch (error) {
    console.error(chalk.red(`파일 처리 중 오류가 발생했습니다:`), error);
    return { violations: [], passes: [] };
  }
}

// 보고서 생성 함수
function generateReport(results, outputFile, sourceFile) {
  let htmlReport = `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>간단한 접근성 테스트 보고서 - ${path.basename(sourceFile)}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px; color: #333; }
        h1 { color: #2c3e50; border-bottom: 1px solid #eee; padding-bottom: 10px; }
        h2 { color: #3498db; margin-top: 30px; }
        .summary { background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0; }
        .violation { background: #ffecec; padding: 15px; margin: 10px 0; border-left: 5px solid #e74c3c; border-radius: 3px; }
        .impact-critical { border-left-color: #e74c3c; }
        .impact-serious { border-left-color: #e67e22; }
        .impact-moderate { border-left-color: #f1c40f; }
        .impact-minor { border-left-color: #3498db; }
        .node-info { background: #f5f5f5; padding: 10px; margin: 10px 0; font-family: monospace; white-space: pre-wrap; }
        .help-info { margin-top: 15px; }
        .help-info a { color: #3498db; text-decoration: none; }
        .help-info a:hover { text-decoration: underline; }
        .pass { color: green; }
        .timestamp { color: #777; font-size: 0.9em; margin-top: 50px; }
      </style>
    </head>
    <body>
      <h1>간단한 접근성 테스트 보고서</h1>
      <p>소스 파일: ${sourceFile}</p>
      
      <div class="summary">
        <h2>요약</h2>
        <p>테스트 시간: ${new Date().toLocaleString()}</p>
        <p>위반 항목: ${results.violations.length}개</p>
        <p>통과 항목: ${results.passes.length}개</p>
        <p>${results.violations.length === 0 ? 
          '<strong class="pass">검사한 항목에 대해 접근성 문제가 발견되지 않았습니다.</strong>' : 
          '<strong>접근성 이슈가 발견되었습니다. 아래 세부 정보를 확인하세요.</strong>'}
        </p>
      </div>
      
      <h2>위반 항목 상세</h2>
  `;

  if (results.violations.length === 0) {
    htmlReport += '<p>위반 항목이 없습니다.</p>';
  } else {
    results.violations.forEach(violation => {
      htmlReport += `
        <div class="violation impact-${violation.impact}">
          <h3>${violation.help} (중요도: ${violation.impact})</h3>
          <p>${violation.description}</p>
          <p>위반 규칙: ${violation.id}</p>
          
          <h4>영향받는 요소:</h4>
          ${violation.nodes.map(node => `
            <div class="node-info">
              <p>HTML: ${node.html}</p>
              <p>위치: ${node.target.join(', ')}</p>
              <p>해결 방법: ${node.failureSummary}</p>
            </div>
          `).join('')}
          
          <div class="help-info">
            <a href="${violation.helpUrl}" target="_blank">자세한 내용 보기</a>
          </div>
        </div>
      `;
    });
  }

  htmlReport += `
      <h2>통과된 항목</h2>
      <ul>
        ${results.passes.map(pass => `<li>${pass.id}: ${pass.description}</li>`).join('')}
      </ul>
      
      <div class="timestamp">
        생성 시간: ${new Date().toLocaleString()}
      </div>
    </body>
    </html>
  `;

  fs.writeFileSync(outputFile, htmlReport);
}

// 메인 함수
async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log('사용법: node scripts/simple-a11y.js <HTML_파일_경로>');
    process.exit(1);
  }
  
  const filePath = args[0];
  if (!fs.existsSync(filePath)) {
    console.error(chalk.red(`${filePath} 파일을 찾을 수 없습니다.`));
    process.exit(1);
  }
  
  try {
    const html = fs.readFileSync(filePath, 'utf8');
    checkAccessibility(html, filePath);
  } catch (error) {
    console.error(chalk.red(`파일 읽기 오류:`), error);
    process.exit(1);
  }
}

main(); 