# 安装最新版 protobuf-thrift
FROM golang:1.16 AS GoEnv
RUN go install -v github.com/YYCoder/protobuf-thrift@latest

# 初始化 node 运行时
FROM node:14-buster-slim
WORKDIR /root/app
# ! NOTE: 这里为了让 docker build 能利用上缓存，一定要先 copy package.json 和 yarn.lock 再执行 yarn
COPY ["package.json", "yarn.lock", "./"]
RUN yarn
COPY . .
RUN yarn build

# copy go 环境中的 protobuf-thrift 到当前 node 环境
COPY --from=GoEnv /go/bin/protobuf-thrift /usr/local/bin

# 提示暴露 3000 端口
EXPOSE 3000
WORKDIR /root/app
CMD [ "yarn", "start" ]
