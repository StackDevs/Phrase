# API Documentation

# 필수 바디

* token(토큰) 예외사항: GET /token, POST /register

## GET /token

토큰을 얻음

* 필요한 바디: id(토큰을 얻으려 하는 유저의 ID), pw(토큰을 얻으려 하는 유저의 PW)
* 성공 시 리턴 값 예시:
```json
{"token": "TOKEN"}
```

## POST /register

계정을 생성함

* 필요한 바디: id(만드려는 유저의 ID), pw(만드려는 유저의 PW)
* 성공시 리턴 값 예시:
```json
{"ok": true}
```

## POST /groups

그룹을 생성함

* 필요한 바디: name(만드려는 그룹의 이름)
* 성공시 리턴 값 예시: 
```json
{"ok": true}
```

## POST /groups/:targetId/members

그룹에 들어감

* 필요한 바디: 기본 헤더 제외 없음.
* 필요한 파라미터: targetId(들어가려는 그룹의 ID)
* 성공시 리턴 값:
```json
{"ok": true}
```

## 잡것
라우트 더 남았는데 이건 나중에 적음 ㅋㅋ