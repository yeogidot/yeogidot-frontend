# 여행 기록 서비스 여기닷

여행 기록 서비스 여기닷의 프론트엔드 레포지토리입니다.

## 프로젝트 실행 방법

레포지토리 클론 후, 해당 경로에서

의존성 설치

```
npm install
```

개발 서버 실행

```
npm run dev
```

## 기여방법

Github Flow

1. 수정 내용을 잘 설명하는 이름으로 브랜치 생성 (예: 로그인 페이지 개발 feature/login-page)
2. 해당 브랜치 복제(clone) 및 작업 후, 원격 레포지토리에 푸시
3. 풀 리퀘스트 작성
4. 풀 리퀘스트 검토 후 `main` 브랜치에 통합 (`main` 브랜치에 직접 커밋 지양)

### 참고하면 좋은 글

- [사례로 이해하는 GitHub Flow](https://www.heropy.dev/p/6hdJi6)
- [Github 공식 Github Flow 글](https://docs.github.com/ko/get-started/using-github/github-flow)

### 커밋 메세지 컨벤션

커밋의 의도를 명확히 알 수 있게 커밋 메세지를 다음과 같은 형태로 작성해봅시다.

기능 구현 (feat)

```
feat: 로그인 페이지 유효성 검사 구현
```

버그 및 오류 수정 (fix)

```
fix: 유효성 검사 로직 오류 수정
```

빌드 관련 코드 수정, 설정 관련 파일 수정(chore)

```
chore: 의존성 추가, 빌드 스크립트 수정
```

테스트 코드 관련 (test)

```
test: E2E 테스트 추가
```

문서 관련 (docs)

```
docs: 리드미 문서 수정
```

리팩토링 (refactor)

```
refactor: 로그인 로직 코드 리팩토링
```

## 사용기술

- Vite
- React(v19)
- react-router(v7)
