FROM node:22

# tini 설치
RUN apt-get update && apt-get install -y python3 python3-pip tini

WORKDIR /app

# 소스 복사
COPY . .

# 백엔드 디렉토리에서 파이썬 의존성 설치
WORKDIR /app/backend/src
EXPOSE 8080

# 프론트엔드 설치
WORKDIR /app/frontend
RUN yarn install
EXPOSE 3000 

# 두 프로세스를 함께 실행
CMD ["tini", "--", "sh", "-c", "python3 /app/backend/src/main.py & yarn start"]
