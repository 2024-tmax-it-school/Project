# 프론트엔드 이미지 설정
FROM node:22

WORKDIR /app

# 3. package.json과 yarn.lock을 복사 (package.json 먼저 복사)
COPY package.json yarn.lock ./

# 4. 의존성 설치
RUN yarn install

# 5. 앱 소스 코드 복사
COPY . .

# 6. React 빌드
RUN yarn build

# 7. 포트 설정
EXPOSE 3000

# 8. 앱 실행
CMD ["yarn", "start"]