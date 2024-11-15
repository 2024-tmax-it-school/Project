# 백엔드 이미지 설정
FROM python:3.9

WORKDIR /app

# 소스 복사 및 의존성 설치
COPY . .

WORKDIR /app/src

# 백엔드 포트 노출
EXPOSE 8080
COPY src/resources/user_info.json /app/resources/user_info.json
COPY src/resources/boxoffice.json /app/resources/boxoffice.json
COPY src/resources/review.json /app/resources/review.json

# 백엔드 서버 실행
CMD ["python3", "main.py"]


