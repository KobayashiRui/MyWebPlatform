# 外部機器操作の実装例
外部機器からの接続および、リアルタイム操作を実装する

## 実装の仕組み


## protocコマンド
go
`docker run --rm -it -v ${PWD}:/ex_dir protoc_cmd --go_out=./server --go_opt=paths=source_relative --go-grpc_out=./server --go-grpc_opt=paths=source_relative ./proto/edo.proto`

Node
`docker run --rm -it -v ${PWD}:/ex_dir --entrypoint=grpc_tools_node_protoc protoc_cmd --js_out=import_style=commonjs,binary:./client_nodejs --grpc_out=grpc_js:./client_nodejs ./proto/edo.proto`


Web
`docker run --rm -it -v ${PWD}:/ex_dir protoc_cmd --plugin="protoc-gen-ts=/usr/local/bin/protoc-gen-ts" --js_out="import_style=commonjs,binary:./front/src" --ts_out="service=grpc-web:./front/src" ./proto/edo.proto `