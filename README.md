# Galaxy Store IAP Test App

React 기반 iframe 테스트 애플리케이션입니다.

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm start
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인할 수 있습니다.

## 주요 기능

- iframe을 통한 Galaxy Store 구독 페이지 통합
- PostMessage API를 이용한 부모-자식 window 간 통신
- 토큰 기반 인증 전달

## 사용 방법

1. "iframe 호출" 버튼 클릭
2. iframe이 로드되면 자동으로 토큰 전송
3. iframe 내에서 'back' 또는 'close' 메시지 수신 시 iframe 닫기
