var spec =
{
    swagger: "2.0",    // Phiên bản Swagger UI
    info: {
        description:
            "A retarded version of Reddit made by 3 retarded students",
        version: "0.0.1",    // Phiên bản API
        title: "RetardedReddit"
    },
    host: "localhost:5000",    // Server và port deploy API
    basePath: "/",       // Đường dẫn tới API
    tags: [    // Danh sách các nhóm API: admin, users, images,...
        {
            name: "User",                                   // Tên nhóm API
            description: "API about users",    // Mô tả về nhóm API
        }
    ],
    schemes: ["http"],    // Sử dụng scheme gì? HTTP, HTTPS?
    paths: {
        "/register": {    // Đường dẫn. Kết hợp với host và basePath sẽ thành localhost:3000/api/v1/admin/
            post: {        // Phương thức gửi request: get, post, put, delete
                tags: ["User"],
                summary:"Register new account",
                description: "",
                operationId: "createNewUser",
                consumes: ["multipart/form-data"],    // Loại dữ liệu gửi đi
                produces: ["application/json"],       // Loại dữ liệu trả về
                parameters: [               // Các tham số
                    {
                        "in": "formData",      // Tham số được gửi lên từ form
                        "name": "email",    // Tên tham số
                        "required": "true",    // Tham số là bắt buộc
                        "schema": {
                            "type": "string"   // Loại dữ liệu của tham số là chuỗi
                        },
                        "description": "Email for new account"
                    },
                    {
                        "in": "formData",
                        "name": "password",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "Password for new account"
                    }
                ],
                responses: {
                    200: {
                        description: "New account created successfully"
                    },
                    401: {
                      description: "if you encounter this error, the POST method is probally flawed."
                    },
                    403: {
                      description: "email is taken"
                    }

                },
                security: [
                    
                ]
            }
        },
        "/Authorization": {
            post: {
                tags: ["User"],
                summary: "User Autho",
                description: "",
                operationId: "AuthorizeUser",
                consumes: ["multipart/form-data"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "path",
                        "name": "username",
                        "required": "true",
                        "schema": {
                            "type": "integer",
                            "minimum": "1"
                        },
                        "description": "Username or email. it says username but it is username or email. Design flaw that i too lazy to bother to fix"
                    },{
                      "in": "path",
                      "name": "password",
                      "required": "true",
                      "schema": {
                          "type": "integer",
                          "minimum": "1"
                      },
                      "description": "Enter the password for the corresponding account"
                      
                  }
                ],
                responses: {
                    200: {                                     // Mã trả về 200
                        description: "Login successful",    // Mô tả kết quả trả về
                        schema: {
                            $ref: "#/definitions/authorization"           // Dữ liệu trả về là đói tượng admin (tham chiếu với phần definitions ở cuối)
                        }
                    },
                    403: {                                    
                      description: "Login unsuccessful because the email/username is not exist in the database or the credestial is incorrect"
                    }
                },
                security: [
                    
                ]
            }
        }
    },
    securityDefinitions: {    // Thông tin về api key sử dụng để thực hiện request
        api_key: {
            type: "apiKey",      // Thuộc loại api key xác thực
            name: "Authorization",     // Tên trường chứa api key xác thực
            in: "header",        // API key được để trong phần header của request
        }
    },
    definitions: {            // Thông tin các đối tượng sẽ trả về
        reddituser: {                 // Tên đối tượng
            type: "object",         // Loại đối tượng là object
            properties: {           // Các thuộc tính của đối tượng
                userid: {                  // Tên thuộc tính
                    type: "string"    // Loại dữ liệu là số nguyên
                },
                username: {
                    type: "string"     // Loại dữ liệu là chuỗi
                },
                userpassword: {
                    type: "hashed string"
                },
                email: {
                    type: "string"     // Loại dữ liệu là chuỗi
                },
                cakedate: {
                    type: "date"     // Loại dữ liệu là chuỗi
                },
                karma: {
                    type: "integer"     // Loại dữ liệu là chuỗi
                },
                avatarpath: {
                    type: "string"     // Loại dữ liệu là chuỗi
                },
            }
        },
        authorization:{
          type: "object",
          properties: {
            token : {                  // Tên thuộc tính
              type: "string"    // Loại dữ liệu là số nguyên
            }
          }
        }
    }
};
