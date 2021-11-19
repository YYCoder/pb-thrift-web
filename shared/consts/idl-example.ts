export const thrift = `namespace go test.test.test
namespace py test.test.test

# 123123
enum Status {
    StatusUnknown = 0
    StatusUnreviewed = 1
    StatusOnline = 2
    StatusRejected = 3 // 123123
    StatusOffline = 4
}
enum OtherEnum {
    OtherEnumUnknown = 0
    Unreviewed = 1
    Online = 2
    Rejected = 3
    Offline = 4
}
/* asdasd */
struct RespOfTestGetApi {
    1: i32 Code
    2: string Message
}
struct ReqOfTestPostApi {
    1: i64 A
    2: string B
}
struct RespOfTestPostApi {
    1: i32 Code
    2: string Message
}
struct Config {
    1: i64 Id
    2: optional i32 Tag
    3: optional list<i32> TypeList
    4: bool Boolean
    5: Status Status
    6: map<i64,string> FailMap
    7: double Fl
    8: double Db
    9: binary Bs
    10: TimeRange Nested
    11: list<TimeRange> NestedTypeList
    12: map<string,TimeRange> NestedTypeMap
}
struct TimeRange {
    1: i64 Start
    2: i64 End
}
struct ReqOfTestGetApi {
    1: i64 A
    2: string B
}
struct ReqOfTestOther {
    1: i64 A
    2: string B
}
struct RespOfTestOther {
    1: i64 A
    2: string B
}
service APIs {
    RespOfTestGetApi TestGetApi (1: ReqOfTestGetApi Req)
    RespOfTestPostApi TestPostApi (1: ReqOfTestPostApi Req)
    RespOfTestOther TestOther (1: ReqOfTestOther Req)
}
`;

export const protobuf = `syntax = "proto3";
package test.test.test;

// comment enum
enum Status {
    Status_Unknown = 0;
    Status_Unreviewed = 1; // comment enum
    Status_Online = 2;
    Status_Rejected = 3;
    Status_Offline = 4;
}
message Config {
    int64 id = 1;
    int32 tag = 2;
    repeated int32 type_list = 3;
    bool boolean = 4; // comment
    Status status = 5;
    map<int64, string> fail_map = 6;
    float fl = 7;
    double db = 8;
    bytes bs = 9;
    TimeRange nested = 10;
    repeated TimeRange nested_type_list = 11;
    map<string, TimeRange> nested_type_map = 12;
}
message TimeRange {
    int64 start = 1;
    int64 end = 2;
}
message ReqOfTestGetApi {
    int64 a = 1;
    string b = 2;
}
message RespOfTestGetApi {
    int32 code = 1;
    string message = 2;
}
message ReqOfTestPostApi {
    int64 a = 1;
    string b = 2;
}
message RespOfTestPostApi {
    int32 code = 1;
    string message = 2;
}

service APIs {
    rpc TestGetApi(ReqOfTestGetApi) returns (RespOfTestGetApi) {
        option (google.api.http) = {
            get: "/api/test_get_api"
        };
    }
    rpc TestPostApi(ReqOfTestPostApi) returns (RespOfTestPostApi) {
        option (google.api.http) = {
            post: "/api/test_get_api"
            body: "*"
        };
    }
}`;
