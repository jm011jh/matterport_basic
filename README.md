# Matterport Showcase SDK 기본 설정 가이드

이 프로젝트는 Matterport Showcase SDK를 웹 페이지에 연동하는 기본적인 방법을 안내합니다.

## 📝 사전 준비

- **Node.js 및 npm/yarn**: 프로젝트 실행 및 패키지 관리를 위해 필요합니다.
- **Matterport 모델 SID**: 연동할 Matterport 모델의 고유 ID가 필요합니다.
- **Matterport SDK 애플리케이션 키**: Matterport API를 사용하기 위한 키가 필요합니다.

## ⚙️ 설치

프로젝트에 필요한 의존성을 설치합니다.

```bash
# yarn 사용 시
yarn install

# npm 사용 시
npm install
```

## ▶️ 실행

이 프로젝트는 웹 서버를 통해 실행해야 합니다. 로컬 파일(`file://`)로 직접 열 경우 SDK가 정상적으로 동작하지 않을 수 있습니다. `webpack-dev-server`를 사용하여 간편하게 테스트 서버를 실행할 수 있습니다.

1.  **`package.json`에 실행 스크립트 추가**

    `package.json` 파일의 `scripts` 섹션에 다음 `start` 명령어를 추가하세요.

    ```json
    "scripts": {
      "start": "webpack-dev-server"
    }
    ```

2.  **개발 서버 실행**

    터미널에서 다음 명령어를 실행하여 개발 서버를 시작합니다.

    ```bash
    # yarn 사용 시
    yarn start

    # npm 사용 시
    npm start
    ```

    명령어를 실행하면 자동으로 브라우저 창이 열리며 `index.html` 페이지가 로드됩니다.

## 🔧 설정 방법

SDK를 연동하기 위해 `index.html`과 `src/index.ts` 파일을 수정해야 합니다.

1.  **`index.html` 파일 설정**

    Matterport 모델을 표시할 컨테이너 div와 SDK 스크립트를 추가합니다.

    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Matterport SDK Basic Setup</title>
      <!-- SDK에서 사용하는 스타일시트 -->
      <link rel="stylesheet" href="./bundle/css/showcase.css">
    </head>
    <body>
      <h1>Matterport SDK Sample</h1>
      <!-- Matterport 모델이 표시될 컨테이너 -->
      <iframe id="showcase" style="width: 800px; height: 600px;"></iframe>
    </body>
    </html>
    ```

2.  **`src/index.ts` 파일 설정**

    `src/index.ts` 파일에서 SDK를 초기화하는 코드를 작성합니다.

    ```typescript
    // Matterport 모델을 표시할 HTML 요소를 가져옵니다.
    const showcase = document.getElementById('showcase');

    // 본인의 Matterport 애플리케이션 키로 교체해야 합니다.
    const key = 'YOUR_APPLICATION_KEY';

    // 연동하려는 Matterport 모델의 SID로 교체해야 합니다.
    const spaceId = 'YOUR_MODEL_SID';

    showcase.src = `bundle/showcase.html?m=${spaceId}&play=1&qs=1&log=0&applicationKey=${key}`;
    const showcaseWindow = showcase.contentWindow;

    // SDK가 window 객체에 MP_SDK로 할당되므로, any 타입으로 캐스팅하여 사용합니다.
    declare global {
      interface Window {
        MP_SDK: any;
      }
    }
    // declare this file is a module
    export {};

    // SDK와 연결합니다.
    showcase.addEventListener('load', async function() {
    try {
      await showcaseWindow.MP_SDK.connect(showcase, key, '3.6')
      showcase.contentWindow.postMessage('hello from parent','*')
    }
    catch(e) {
      console.error(e);
      return;
    }
    })
    ```

    **중요**: 위 코드에서 `key`와 `spaceId`를 본인의 값으로 반드시 교체해야 합니다.

## 📂 주요 파일 구조

-   `index.html`: Matterport 모델이 표시될 기본 HTML 파일입니다.
-   `src/index.ts`: SDK 초기화 및 관련 로직을 작성하는 TypeScript 파일입니다.
-   `bundle/`: Matterport에서 제공하는 SDK 번들 파일(JS, CSS 등)이 위치합니다.
-   `webpack.config.js`: Webpack 설정 파일입니다.
-   `package.json`: 프로젝트 의존성 및 스크립트를 관리하는 파일입니다.
