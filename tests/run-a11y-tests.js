#!/usr/bin/env node

import { testStoryAccessibility, testHtmlFileAccessibility, generateA11yReport } from './utils/a11y-test-utils.js';
import fs from 'fs';
import path from 'path';
import glob from 'glob';
import { Command } from 'commander';
import { pathToFileURL } from 'url';

const program = new Command();

program
  .name('a11y-test-runner')
  .description('스토리북 컴포넌트 및 HTML 파일의 접근성 테스트를 실행하는 CLI 도구')
  .version('1.0.0');

program
  .command('test-story')
  .description('스토리북 컴포넌트의 접근성 테스트 실행')
  .argument('<storyFilePath>', '테스트할 스토리 파일 경로')
  .argument('[storyId]', '테스트할 스토리 ID', 'default')
  .option('-o, --output <path>', '보고서 출력 경로', './a11y-reports/report.html')
  .action(async (storyFilePath, storyId, options) => {
    try {
      console.log(`스토리 파일 ${storyFilePath}의 "${storyId}" 스토리에 대한 접근성 테스트를 실행합니다...`);
      const results = await testStoryAccessibility(storyFilePath, storyId);
      generateA11yReport(results, options.output);
    } catch (error) {
      console.error('스토리 테스트 중 오류가 발생했습니다:', error);
      process.exit(1);
    }
  });

program
  .command('test-html')
  .description('HTML 파일의 접근성 테스트 실행')
  .argument('<filePath>', '테스트할 HTML 파일 경로')
  .option('-o, --output <path>', '보고서 출력 경로', './a11y-reports/report.html')
  .action(async (filePath, options) => {
    try {
      console.log(`HTML 파일 ${filePath}에 대한 접근성 테스트를 실행합니다...`);
      const results = await testHtmlFileAccessibility(filePath);
      generateA11yReport(results, options.output);
    } catch (error) {
      console.error('HTML 테스트 중 오류가 발생했습니다:', error);
      process.exit(1);
    }
  });

program
  .command('test-all-stories')
  .description('모든 스토리북 컴포넌트의 접근성 테스트 실행')
  .option('-d, --dir <directory>', '스토리 파일이 있는 디렉토리', './stories')
  .option('-o, --output-dir <directory>', '보고서 출력 디렉토리', './a11y-reports')
  .action(async (options) => {
    try {
      console.log(`디렉토리 ${options.dir}의 모든 스토리에 대한 접근성 테스트를 실행합니다...`);
      
      const storyFiles = glob.sync(`${options.dir}/**/*.stories.js`);
      if (storyFiles.length === 0) {
        console.log('테스트할 스토리 파일을 찾을 수 없습니다.');
        return;
      }
      
      console.log(`${storyFiles.length}개의 스토리 파일을 찾았습니다.`);
      
      for (const storyFile of storyFiles) {
        const relativePath = path.relative(process.cwd(), storyFile);
        console.log(`${relativePath} 파일을 테스트합니다...`);
        
        try {
          // 동적 임포트 사용 - Windows 경로 처리
          const fileUrl = pathToFileURL(path.resolve(process.cwd(), storyFile));
          const storyModuleImport = await import(fileUrl.href);
          const storyModule = storyModuleImport.default || storyModuleImport;
          
          const stories = Object.keys(storyModule).filter(key => typeof storyModule[key] === 'function' || (storyModule[key] && storyModule[key].render));
          
          console.log(`${stories.length}개의 스토리를 찾았습니다.`);
          
          for (const storyId of stories) {
            if (storyId === 'default') continue; // default 내보내기는 건너뜀
            
            console.log(`${storyId} 스토리를 테스트합니다...`);
            try {
              const results = await testStoryAccessibility(storyFile, storyId);
              const outputFile = path.join(options.outputDir, `${path.basename(storyFile, '.stories.js')}-${storyId}.html`);
              generateA11yReport(results, outputFile);
            } catch (err) {
              console.error(`${storyId} 스토리 테스트 중 오류가 발생했습니다:`, err.message);
            }
          }
        } catch (err) {
          console.error(`${relativePath} 파일 로드 중 오류가 발생했습니다:`, err.message);
        }
      }
      
      console.log('모든 테스트가 완료되었습니다.');
    } catch (error) {
      console.error('스토리 테스트 중 오류가 발생했습니다:', error);
      process.exit(1);
    }
  });

program.parse(process.argv); 