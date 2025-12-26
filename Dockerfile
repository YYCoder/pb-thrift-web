# 安装最新版 protobuf-thrift
FROM golang:1.16 AS goenv
# Install git for cloning
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*
# Configure Go to use direct mode to bypass proxy issues
ENV GOPROXY=direct
# Build from source since main package is in a subdirectory
RUN git clone --depth 1 https://github.com/YYCoder/protobuf-thrift.git /tmp/protobuf-thrift && \
    cd /tmp/protobuf-thrift && \
    (test -f ./cmd/protobuf-thrift/main.go && go build -o /go/bin/protobuf-thrift ./cmd/protobuf-thrift) || \
    (test -f ./cmd/main.go && go build -o /go/bin/protobuf-thrift ./cmd) || \
    (test -f ./main.go && go build -o /go/bin/protobuf-thrift .) || \
    (find . -name "main.go" -type f | head -1 | xargs dirname | xargs -I {} sh -c 'go build -o /go/bin/protobuf-thrift ./{}') && \
    rm -rf /tmp/protobuf-thrift

# 初始化 node 运行时
FROM node:22.12.0-bullseye-slim
WORKDIR /root/app
# ! NOTE: 这里为了让 docker build 能利用上缓存，一定要先 copy package.json 和 yarn.lock 再执行 yarn
COPY package.json yarn.lock .yarnrc.yml .nvmrc ./
RUN corepack enable
RUN yarn install
COPY . .
RUN yarn build

# copy go 环境中的 protobuf-thrift 到当前 node 环境
COPY --from=goenv /go/bin/protobuf-thrift /usr/local/bin

# 提示暴露 3000 端口
EXPOSE 3000
WORKDIR /root/app
CMD [ "yarn", "start" ]
