# nodejs-proxy-middleware-test

Proxy を使って、アプリケーションサーバーのログやエラーハンドリングを行ってみたサンプルです。

## 環境

- Node.js 16

## 使い方

1. アプリケーションサーバーを起動します。
2. HTTP リクエストを投げます。パスに error を含んだリクエストを投げると、エラーハンドリングが行われます。

```sh
$ yarn install
$ yarn run start
yarn run v1.22.18
$ ts-node index.ts
Listen http://localhost:3000/
2022-09-18T16:24:49.988Z: /hello/hello begin
2022-09-18T16:24:49.991Z: /hello/hello end
2022-09-18T16:24:51.473Z: /hello/error begin
2022-09-18T16:24:51.473Z: /hello/error error occurred: エラーです！！
```

```sh
$ curl -v http://localhost:3000/hello/hello
*   Trying 127.0.0.1:3000...
* TCP_NODELAY set
* Connected to localhost (127.0.0.1) port 3000 (#0)
> GET /hello/hello HTTP/1.1
> Host: localhost:3000
> User-Agent: curl/7.68.0
> Accept: */*
>
* Mark bundle as not supporting multiuse
< HTTP/1.1 200 OK
< Date: Sun, 18 Sep 2022 16:24:49 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
< Content-Length: 12
<
* Connection #0 to host localhost left intact
Hello world!⏎
$ curl -v http://localhost:3000/hello/error
*   Trying 127.0.0.1:3000...
* TCP_NODELAY set
* Connected to localhost (127.0.0.1) port 3000 (#0)
> GET /hello/error HTTP/1.1
> Host: localhost:3000
> User-Agent: curl/7.68.0
> Accept: */*
>
* Mark bundle as not supporting multiuse
< HTTP/1.1 500 Internal Server Error
< Date: Sun, 18 Sep 2022 16:24:51 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
< Content-Length: 65
<
* Connection #0 to host localhost left intact
処理中にエラーが発生しました: エラーです！！⏎
```