# 프론트엔드 이미지 설정
FROM node:22

WORKDIR /app

# 소스 복사
COPY . .

RUN yarn install

# 프론트엔드 포트 노출
EXPOSE 3000

# 프론트엔드 서버 실행
CMD ["yarn", "start"]
