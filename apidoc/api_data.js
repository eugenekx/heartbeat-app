define({ "api": [
  {
    "type": "get",
    "url": "genres/:id",
    "title": "Получить данные жанра по ID",
    "name": "GetGenreByID",
    "group": "Жанр",
    "parameter": {
      "fields": {
        "Параметры запроса": [
          {
            "group": "Параметры запроса",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID жанра, данные которого требуется получить.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Тело ответа": [
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>ID жанра</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": "<p>Название жанра</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "200 OK:",
          "content": "HTTP/1.1 200 OK\n{\n\t\"_id\": \"507f1f77bcf86cd799439011\",\n\t\"text\": \"Electronica / Downtempo\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Получает данные жанра по ID.</p>",
    "version": "0.0.0",
    "filename": "heartbeat-app/routes/api/genres.js",
    "groupTitle": "Жанр",
    "header": {
      "fields": {
        "Заголовок запроса": [
          {
            "group": "Заголовок запроса",
            "type": "String",
            "optional": false,
            "field": "x-token-auth",
            "description": "<p>Токен авторизации пользователя.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Ошибки авторизации": [
          {
            "group": "Ошибки авторизации",
            "optional": false,
            "field": "NoToken",
            "description": "<p>Пользователь не авторизован.</p>"
          },
          {
            "group": "Ошибки авторизации",
            "optional": false,
            "field": "TokenNotValid",
            "description": "<p>Передан неверный/истекший токен.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "NoToken",
          "content": "HTTP/1.1 401 Unauthorized\n{\n\t\"msg\": \"No token\"\n}",
          "type": "json"
        },
        {
          "title": "TokenNotValid",
          "content": "HTTP/1.1 400 Bad Request\n{\n\t\"msg\": \"token is not valid\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "genres/",
    "title": "Получить список всех жанров",
    "name": "GetGenreList",
    "group": "Жанр",
    "permission": [
      {
        "name": "Только авторизованные пользователи"
      }
    ],
    "success": {
      "fields": {
        "Тело ответа": [
          {
            "group": "Тело ответа",
            "type": "Object[]",
            "optional": false,
            "field": "genres",
            "description": "<p>Список жанров</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "genres._id",
            "description": "<p>ID жанра</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "genres.text",
            "description": "<p>Название жанра</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "200 OK:",
          "content": "HTTP/1.1 200 OK\n{\n\t[\n\t\t{\n\t\t\t\"_id\": \"507f1f77bcf86cd799439011\",\n\t\t\t\"text\": \"Electronica / Downtempo\"\n\t\t},\n\t\t{\n\t\t\t\"_id\": \"5f7f1e77bcf86cdd99f86cdd\",\n\t\t\t\"text\": \"Rock\"\n\t\t}\n\t]\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Получает список всех жанров.</p>",
    "version": "0.0.0",
    "filename": "heartbeat-app/routes/api/genres.js",
    "groupTitle": "Жанр",
    "header": {
      "fields": {
        "Заголовок запроса": [
          {
            "group": "Заголовок запроса",
            "type": "String",
            "optional": false,
            "field": "x-token-auth",
            "description": "<p>Токен авторизации пользователя.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Ошибки авторизации": [
          {
            "group": "Ошибки авторизации",
            "optional": false,
            "field": "NoToken",
            "description": "<p>Пользователь не авторизован.</p>"
          },
          {
            "group": "Ошибки авторизации",
            "optional": false,
            "field": "TokenNotValid",
            "description": "<p>Передан неверный/истекший токен.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "NoToken",
          "content": "HTTP/1.1 401 Unauthorized\n{\n\t\"msg\": \"No token\"\n}",
          "type": "json"
        },
        {
          "title": "TokenNotValid",
          "content": "HTTP/1.1 400 Bad Request\n{\n\t\"msg\": \"token is not valid\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "genres/",
    "title": "Добавить жанр",
    "name": "PostGenre",
    "group": "Жанр",
    "permission": [
      {
        "name": "Только авторизованные пользователи"
      }
    ],
    "parameter": {
      "fields": {
        "Тело запроса": [
          {
            "group": "Тело запроса",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": "<p>Название жанра.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Тело ответа": [
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>ID жанра.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": "<p>Название жанра.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "200 OK:",
          "content": "HTTP/1.1 200 OK\n{\n\t\"_id\": \"507f1f77bcf86cd799439011\",\n\t\"text\": \"Electronica / Downtempo\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Добавляет новый жанр.</p>",
    "version": "0.0.0",
    "filename": "heartbeat-app/routes/api/genres.js",
    "groupTitle": "Жанр",
    "header": {
      "fields": {
        "Заголовок запроса": [
          {
            "group": "Заголовок запроса",
            "type": "String",
            "optional": false,
            "field": "x-token-auth",
            "description": "<p>Токен авторизации пользователя.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Ошибки авторизации": [
          {
            "group": "Ошибки авторизации",
            "optional": false,
            "field": "NoToken",
            "description": "<p>Пользователь не авторизован.</p>"
          },
          {
            "group": "Ошибки авторизации",
            "optional": false,
            "field": "TokenNotValid",
            "description": "<p>Передан неверный/истекший токен.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "NoToken",
          "content": "HTTP/1.1 401 Unauthorized\n{\n\t\"msg\": \"No token\"\n}",
          "type": "json"
        },
        {
          "title": "TokenNotValid",
          "content": "HTTP/1.1 400 Bad Request\n{\n\t\"msg\": \"token is not valid\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "upload/avatar",
    "title": "Загрузить обложку песни",
    "name": "UploadArtwork",
    "group": "Загрузка_файлов",
    "permission": [
      {
        "name": "Только авторизованные пользователи"
      }
    ],
    "parameter": {
      "fields": {
        "Тело запроса": [
          {
            "group": "Тело запроса",
            "type": "File",
            "optional": false,
            "field": "artwork",
            "description": "<p>Файл, содержащий обложку песни</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Тело ответа": [
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>URL загруженного файла</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "200 OK:",
          "content": "HTTP/1.1 200 OK\n\"https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.jpg\"",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UploadError",
            "description": "<p>Загрузка файла не удалась.</p>"
          }
        ],
        "Ошибки авторизации": [
          {
            "group": "Ошибки авторизации",
            "optional": false,
            "field": "NoToken",
            "description": "<p>Пользователь не авторизован.</p>"
          },
          {
            "group": "Ошибки авторизации",
            "optional": false,
            "field": "TokenNotValid",
            "description": "<p>Передан неверный/истекший токен.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "UploadError",
          "content": "HTTP/1.1 400 Bad Request\n{\n\t\"err\": \"File is too big\"\n}",
          "type": "json"
        },
        {
          "title": "NoToken",
          "content": "HTTP/1.1 401 Unauthorized\n{\n\t\"msg\": \"No token\"\n}",
          "type": "json"
        },
        {
          "title": "TokenNotValid",
          "content": "HTTP/1.1 400 Bad Request\n{\n\t\"msg\": \"token is not valid\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Загружает обложку песни на Amazon S3.</p>",
    "version": "0.0.0",
    "filename": "heartbeat-app/routes/api/upload.js",
    "groupTitle": "Загрузка_файлов",
    "header": {
      "fields": {
        "Заголовок запроса": [
          {
            "group": "Заголовок запроса",
            "type": "String",
            "optional": false,
            "field": "x-token-auth",
            "description": "<p>Токен авторизации пользователя.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "upload/avatar",
    "title": "Загрузить аудиофайл",
    "name": "UploadAudio",
    "group": "Загрузка_файлов",
    "permission": [
      {
        "name": "Только авторизованные пользователи"
      }
    ],
    "parameter": {
      "fields": {
        "Тело запроса": [
          {
            "group": "Тело запроса",
            "type": "File",
            "optional": false,
            "field": "audio",
            "description": "<p>Аудиофайл</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Тело ответа": [
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>URL загруженного файла</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "200 OK:",
          "content": "HTTP/1.1 200 OK\n\"https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.mp3\"",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UploadError",
            "description": "<p>Загрузка файла не удалась.</p>"
          }
        ],
        "Ошибки авторизации": [
          {
            "group": "Ошибки авторизации",
            "optional": false,
            "field": "NoToken",
            "description": "<p>Пользователь не авторизован.</p>"
          },
          {
            "group": "Ошибки авторизации",
            "optional": false,
            "field": "TokenNotValid",
            "description": "<p>Передан неверный/истекший токен.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "UploadError",
          "content": "HTTP/1.1 400 Bad Request\n{\n\t\"err\": \"File is too big\"\n}",
          "type": "json"
        },
        {
          "title": "NoToken",
          "content": "HTTP/1.1 401 Unauthorized\n{\n\t\"msg\": \"No token\"\n}",
          "type": "json"
        },
        {
          "title": "TokenNotValid",
          "content": "HTTP/1.1 400 Bad Request\n{\n\t\"msg\": \"token is not valid\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Загружает аудиофайл на Amazon S3.</p>",
    "version": "0.0.0",
    "filename": "heartbeat-app/routes/api/upload.js",
    "groupTitle": "Загрузка_файлов",
    "header": {
      "fields": {
        "Заголовок запроса": [
          {
            "group": "Заголовок запроса",
            "type": "String",
            "optional": false,
            "field": "x-token-auth",
            "description": "<p>Токен авторизации пользователя.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "upload/avatar",
    "title": "Загрузить аватар",
    "name": "UploadAvatar",
    "group": "Загрузка_файлов",
    "permission": [
      {
        "name": "Только авторизованные пользователи"
      }
    ],
    "parameter": {
      "fields": {
        "Тело запроса": [
          {
            "group": "Тело запроса",
            "type": "File",
            "optional": false,
            "field": "avatar",
            "description": "<p>Файл, содержащий аватар</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Тело ответа": [
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>URL загруженного файла</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "200 OK:",
          "content": "HTTP/1.1 200 OK\n\"https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.jpg\"",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UploadError",
            "description": "<p>Загрузка файла не удалась.</p>"
          }
        ],
        "Ошибки авторизации": [
          {
            "group": "Ошибки авторизации",
            "optional": false,
            "field": "NoToken",
            "description": "<p>Пользователь не авторизован.</p>"
          },
          {
            "group": "Ошибки авторизации",
            "optional": false,
            "field": "TokenNotValid",
            "description": "<p>Передан неверный/истекший токен.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "UploadError",
          "content": "HTTP/1.1 400 Bad Request\n{\n\t\"err\": \"File is too big\"\n}",
          "type": "json"
        },
        {
          "title": "NoToken",
          "content": "HTTP/1.1 401 Unauthorized\n{\n\t\"msg\": \"No token\"\n}",
          "type": "json"
        },
        {
          "title": "TokenNotValid",
          "content": "HTTP/1.1 400 Bad Request\n{\n\t\"msg\": \"token is not valid\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Загружает аватар на Amazon S3.</p>",
    "version": "0.0.0",
    "filename": "heartbeat-app/routes/api/upload.js",
    "groupTitle": "Загрузка_файлов",
    "header": {
      "fields": {
        "Заголовок запроса": [
          {
            "group": "Заголовок запроса",
            "type": "String",
            "optional": false,
            "field": "x-token-auth",
            "description": "<p>Токен авторизации пользователя.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "songs/:id",
    "title": "Получить данные песни по ID",
    "name": "GetSongByID",
    "group": "Песня",
    "parameter": {
      "fields": {
        "Параметры запроса": [
          {
            "group": "Параметры запроса",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID песни, данные которой требуется получить.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Тело ответа": [
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>ID песни</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>ID пользователя</p>"
          },
          {
            "group": "Тело ответа",
            "type": "Object",
            "optional": false,
            "field": "genre",
            "description": "<p>Жанр песни</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "genre._id",
            "description": "<p>ID жанра</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "genre.text",
            "description": "<p>Название жанра</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Название песни</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "artistName",
            "description": "<p>Имя исполнителя</p>"
          },
          {
            "group": "Тело ответа",
            "type": "Number",
            "optional": false,
            "field": "reviewPoints",
            "description": "<p>Баланс песни</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "filename",
            "description": "<p>Ссылка на аудиофайл</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "artwork",
            "description": "<p>Ссылка на обложку</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "waveform",
            "description": "<p>Ссылка на waveform JSON</p>"
          },
          {
            "group": "Тело ответа",
            "type": "Date",
            "optional": false,
            "field": "date",
            "description": "<p>Дата загрузки</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "200 OK:",
          "content": "HTTP/1.1 200 OK\n{\n\t\"_id\": \"507f1f77bcf86cd799439011\",\n\t\"user\": \"507f1f77bcf86cd799439011\",\n\t\"genre\":\n\t{\n\t\t\"_id\": \"507f1f77bcf86cd799439011\",\n\t\t\"text\": \"Rock\"\n\t},\n\t\"name\": \"Mind Mischief\",\n\t\"artistName\": \"Tame Impala\",\n\t\"reviewPoints\": \"5\",\n\t\"filename\": \"https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.mp3\",\n\t\"artwork\": \"https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.jpg\",\n\t\"waveform\": \"https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.json\",\n\t\"date\": \"2012-04-23T18:25:43.511Z\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Получает данные песни по ID.</p>",
    "version": "0.0.0",
    "filename": "heartbeat-app/routes/api/songs.js",
    "groupTitle": "Песня",
    "header": {
      "fields": {
        "Заголовок запроса": [
          {
            "group": "Заголовок запроса",
            "type": "String",
            "optional": false,
            "field": "x-token-auth",
            "description": "<p>Токен авторизации пользователя.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Ошибки авторизации": [
          {
            "group": "Ошибки авторизации",
            "optional": false,
            "field": "NoToken",
            "description": "<p>Пользователь не авторизован.</p>"
          },
          {
            "group": "Ошибки авторизации",
            "optional": false,
            "field": "TokenNotValid",
            "description": "<p>Передан неверный/истекший токен.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "NoToken",
          "content": "HTTP/1.1 401 Unauthorized\n{\n\t\"msg\": \"No token\"\n}",
          "type": "json"
        },
        {
          "title": "TokenNotValid",
          "content": "HTTP/1.1 400 Bad Request\n{\n\t\"msg\": \"token is not valid\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "songs/review/:id",
    "title": "Получить песню для оценивания",
    "name": "GetSongForReview",
    "group": "Песня",
    "parameter": {
      "fields": {
        "Параметры запроса": [
          {
            "group": "Параметры запроса",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID жанра, в котором будет происходить поиск песни</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Тело ответа": [
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>ID песни</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>ID пользователя</p>"
          },
          {
            "group": "Тело ответа",
            "type": "Object",
            "optional": false,
            "field": "genre",
            "description": "<p>Жанр песни</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "genre._id",
            "description": "<p>ID жанра</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "genre.text",
            "description": "<p>Название жанра</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Название песни</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "artistName",
            "description": "<p>Имя исполнителя</p>"
          },
          {
            "group": "Тело ответа",
            "type": "Number",
            "optional": false,
            "field": "reviewPoints",
            "description": "<p>Баланс песни</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "filename",
            "description": "<p>Ссылка на аудиофайл</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "artwork",
            "description": "<p>Ссылка на обложку</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "waveform",
            "description": "<p>Ссылка на waveform JSON</p>"
          },
          {
            "group": "Тело ответа",
            "type": "Date",
            "optional": false,
            "field": "date",
            "description": "<p>Дата загрузки</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "200 OK:",
          "content": "HTTP/1.1 200 OK\n{\n\t\"_id\": \"507f1f77bcf86cd799439011\",\n\t\"user\": \"507f1f77bcf86cd799439011\",\n\t\"genre\":\n\t{\n\t\t\"_id\": \"507f1f77bcf86cd799439011\",\n\t\t\"text\": \"Rock\"\n\t},\n\t\"name\": \"Mind Mischief\",\n\t\"artistName\": \"Tame Impala\",\n\t\"reviewPoints\": \"5\",\n\t\"filename\": \"https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.mp3\",\n\t\"artwork\": \"https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.jpg\",\n\t\"waveform\": \"https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.json\",\n\t\"date\": \"2012-04-23T18:25:43.511Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Исключения": [
          {
            "group": "Исключения",
            "optional": false,
            "field": "NoSongs",
            "description": "<p>Нет доступных песен для оценивания в выбранном жанре.</p>"
          }
        ],
        "Ошибки авторизации": [
          {
            "group": "Ошибки авторизации",
            "optional": false,
            "field": "NoToken",
            "description": "<p>Пользователь не авторизован.</p>"
          },
          {
            "group": "Ошибки авторизации",
            "optional": false,
            "field": "TokenNotValid",
            "description": "<p>Передан неверный/истекший токен.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "NoSongs",
          "content": "HTTP/1.1 200 OK\n{\n\t\"msg\": \"no songs\"\n}",
          "type": "json"
        },
        {
          "title": "NoToken",
          "content": "HTTP/1.1 401 Unauthorized\n{\n\t\"msg\": \"No token\"\n}",
          "type": "json"
        },
        {
          "title": "TokenNotValid",
          "content": "HTTP/1.1 400 Bad Request\n{\n\t\"msg\": \"token is not valid\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Получает песню для оценивания: случайная песня из числа тех, что соответствуют выбранному жанру, имеют ненулевой баланс и не загружены текущим пользователем.</p>",
    "version": "0.0.0",
    "filename": "heartbeat-app/routes/api/songs.js",
    "groupTitle": "Песня",
    "header": {
      "fields": {
        "Заголовок запроса": [
          {
            "group": "Заголовок запроса",
            "type": "String",
            "optional": false,
            "field": "x-token-auth",
            "description": "<p>Токен авторизации пользователя.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "songs/user",
    "title": "Получить список песен для пользователя",
    "name": "GetSongListForUser",
    "group": "Песня",
    "success": {
      "fields": {
        "Тело ответа": [
          {
            "group": "Тело ответа",
            "type": "Object[]",
            "optional": false,
            "field": "songs",
            "description": "<p>Список песен для пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "songs._id",
            "description": "<p>ID песни</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "songs.user",
            "description": "<p>ID пользователя</p>"
          },
          {
            "group": "Тело ответа",
            "type": "Object",
            "optional": false,
            "field": "songs.genre",
            "description": "<p>Жанр песни</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "songs.genre._id",
            "description": "<p>ID жанра</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "songs.genre.text",
            "description": "<p>Название жанра</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "songs.name",
            "description": "<p>Название песни</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "songs.artistName",
            "description": "<p>Имя исполнителя</p>"
          },
          {
            "group": "Тело ответа",
            "type": "Number",
            "optional": false,
            "field": "songs.reviewPoints",
            "description": "<p>Баланс песни</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "songs.filename",
            "description": "<p>Ссылка на аудиофайл</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "songs.artwork",
            "description": "<p>Ссылка на обложку</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "songs.waveform",
            "description": "<p>Ссылка на waveform JSON</p>"
          },
          {
            "group": "Тело ответа",
            "type": "Date",
            "optional": false,
            "field": "date",
            "description": "<p>Дата загрузки</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "200 OK:",
          "content": "\tHTTP/1.1 200 OK\n\t{\n\t\t[\n\t\t\t{\n\t\t\t\t\"_id\": \"507f1f77bcf86cd799439011\",\n\t\t\t\t\"user\": \"507f1f77bcf86cd799439011\",\n\t\t\t\t\"genre\":\n\t\t\t\t{\n\t\t\t\t\t\"_id\": \"507f1f77bcf86cd799439011\",\n\t\t\t\t\t\"text\": \"Rock\"\n\t\t\t\t},\n\t\t\t\t\"name\": \"Mind Mischief\",\n\t\t\t\t\"artistName\": \"Tame Impala\",\n\t\t\t\t\"reviewPoints\": \"5\",\n\t\t\t\t\"filename\": \"https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.mp3\",\n\t\t\t\t\"artwork\": \"https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.jpg\",\n\t\t\t\t\"waveform\": \"https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.json\",\n\t\t\t\t\"date\": \"2012-04-23T18:25:43.511Z\"\n\t\t\t},\n \t\t{\n\t\t\t\t\"_id\": \"507f1f77bcf86cd799439011\",\n\t\t\t\t\"user\": \"507f1f77bcf86cd799439011\",\n\t\t\t\t\"genre\":\n\t\t\t\t{\n\t\t\t\t\t\"_id\": \"507f1f77bcf86cd799439011\",\n\t\t\t\t\t\"text\": \"Rock\"\n\t\t\t\t},\n\t\t\t\t\"name\": \"Desire Be Desire Go\",\n\t\t\t\t\"artistName\": \"Tame Impala\",\n\t\t\t\t\"reviewPoints\": \"5\",\n\t\t\t\t\"filename\": \"https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.mp3\",\n\t\t\t\t\"artwork\": \"https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.jpg\",\n\t\t\t\t\"waveform\": \"https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.json\",\n\t\t\t\t\"date\": \"2012-04-23T18:25:43.511Z\"\n\t\t\t}\n\t\t]\n\t}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Получает список песен для пользователя.</p>",
    "version": "0.0.0",
    "filename": "heartbeat-app/routes/api/songs.js",
    "groupTitle": "Песня",
    "header": {
      "fields": {
        "Заголовок запроса": [
          {
            "group": "Заголовок запроса",
            "type": "String",
            "optional": false,
            "field": "x-token-auth",
            "description": "<p>Токен авторизации пользователя.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Ошибки авторизации": [
          {
            "group": "Ошибки авторизации",
            "optional": false,
            "field": "NoToken",
            "description": "<p>Пользователь не авторизован.</p>"
          },
          {
            "group": "Ошибки авторизации",
            "optional": false,
            "field": "TokenNotValid",
            "description": "<p>Передан неверный/истекший токен.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "NoToken",
          "content": "HTTP/1.1 401 Unauthorized\n{\n\t\"msg\": \"No token\"\n}",
          "type": "json"
        },
        {
          "title": "TokenNotValid",
          "content": "HTTP/1.1 400 Bad Request\n{\n\t\"msg\": \"token is not valid\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "songs/",
    "title": "Добавить песню",
    "name": "PostSong",
    "group": "Песня",
    "permission": [
      {
        "name": "Только авторизованные пользователи"
      }
    ],
    "parameter": {
      "fields": {
        "Тело запроса": [
          {
            "group": "Тело запроса",
            "type": "String",
            "optional": false,
            "field": "genre",
            "description": "<p>ID жанра песни</p>"
          },
          {
            "group": "Тело запроса",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Название песни</p>"
          },
          {
            "group": "Тело запроса",
            "type": "String",
            "optional": false,
            "field": "artistName",
            "description": "<p>Имя исполнителя</p>"
          },
          {
            "group": "Тело запроса",
            "type": "String",
            "optional": false,
            "field": "filename",
            "description": "<p>Ссылка на аудиофайл</p>"
          },
          {
            "group": "Тело запроса",
            "type": "String",
            "optional": false,
            "field": "artwork",
            "description": "<p>Ссылка на обложку</p>"
          },
          {
            "group": "Тело запроса",
            "type": "String",
            "optional": false,
            "field": "waveform",
            "description": "<p>Ссылка на waveform JSON</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Тело ответа": [
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>ID песни</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>ID пользователя</p>"
          },
          {
            "group": "Тело ответа",
            "type": "Object",
            "optional": false,
            "field": "genre",
            "description": "<p>Жанр песни</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "genre._id",
            "description": "<p>ID жанра</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "genre.text",
            "description": "<p>Название жанра</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Название песни</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "artistName",
            "description": "<p>Имя исполнителя</p>"
          },
          {
            "group": "Тело ответа",
            "type": "Number",
            "optional": false,
            "field": "reviewPoints",
            "description": "<p>Баланс песни</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "filename",
            "description": "<p>Ссылка на аудиофайл</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "artwork",
            "description": "<p>Ссылка на обложку</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "waveform",
            "description": "<p>Ссылка на waveform JSON</p>"
          },
          {
            "group": "Тело ответа",
            "type": "Date",
            "optional": false,
            "field": "date",
            "description": "<p>Дата загрузки</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "200 OK:",
          "content": "HTTP/1.1 200 OK\n{\n\t\"_id\": \"507f1f77bcf86cd799439011\",\n\t\"user\": \"507f1f77bcf86cd799439011\",\n\t\"genre\":\n\t{\n\t\t\"_id\": \"507f1f77bcf86cd799439011\",\n\t\t\"text\": \"Rock\"\n\t},\n\t\"name\": \"Mind Mischief\",\n\t\"artistName\": \"Tame Impala\",\n\t\"reviewPoints\": \"5\",\n\t\"filename\": \"https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.mp3\",\n\t\"artwork\": \"https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.jpg\",\n\t\"waveform\": \"https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.json\",\n\t\"date\": \"2012-04-23T18:25:43.511Z\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Добавляет новую песню.</p>",
    "version": "0.0.0",
    "filename": "heartbeat-app/routes/api/songs.js",
    "groupTitle": "Песня",
    "header": {
      "fields": {
        "Заголовок запроса": [
          {
            "group": "Заголовок запроса",
            "type": "String",
            "optional": false,
            "field": "x-token-auth",
            "description": "<p>Токен авторизации пользователя.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Ошибки авторизации": [
          {
            "group": "Ошибки авторизации",
            "optional": false,
            "field": "NoToken",
            "description": "<p>Пользователь не авторизован.</p>"
          },
          {
            "group": "Ошибки авторизации",
            "optional": false,
            "field": "TokenNotValid",
            "description": "<p>Передан неверный/истекший токен.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "NoToken",
          "content": "HTTP/1.1 401 Unauthorized\n{\n\t\"msg\": \"No token\"\n}",
          "type": "json"
        },
        {
          "title": "TokenNotValid",
          "content": "HTTP/1.1 400 Bad Request\n{\n\t\"msg\": \"token is not valid\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "songs/addpoints/:id",
    "title": "Пополнить баланс песни",
    "name": "SongAddPoints",
    "group": "Песня",
    "permission": [
      {
        "name": "Только авторизованные пользователи"
      }
    ],
    "parameter": {
      "fields": {
        "Параметры запроса": [
          {
            "group": "Параметры запроса",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID песни</p>"
          }
        ],
        "Тело запроса": [
          {
            "group": "Тело запроса",
            "type": "Number",
            "optional": false,
            "field": "points",
            "description": "<p>Количество перемещаемых поинтов</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Тело ответа": [
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>Результат транзакции</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "200 OK:",
          "content": "HTTP/1.1 200 OK\n{\n\t\"msg\": \"ok\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Указанная песня не принадлежит текущему пользователю</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotEnoughPoints",
            "description": "<p>Поинтов на балансе пользователя недостаточно</p>"
          }
        ],
        "Ошибки авторизации": [
          {
            "group": "Ошибки авторизации",
            "optional": false,
            "field": "NoToken",
            "description": "<p>Пользователь не авторизован.</p>"
          },
          {
            "group": "Ошибки авторизации",
            "optional": false,
            "field": "TokenNotValid",
            "description": "<p>Передан неверный/истекший токен.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "PermissionDenied",
          "content": "HTTP/1.1 403 Forbidden\n{\n\t\"msg\": \"Can't transfer points to another user's song\"\n}",
          "type": "json"
        },
        {
          "title": "NotEnoughPoints",
          "content": "HTTP/1.1 403 Forbidden\n{\n\t\"msg\": \"User doesn't have enough points\"\n}",
          "type": "json"
        },
        {
          "title": "NoToken",
          "content": "HTTP/1.1 401 Unauthorized\n{\n\t\"msg\": \"No token\"\n}",
          "type": "json"
        },
        {
          "title": "TokenNotValid",
          "content": "HTTP/1.1 400 Bad Request\n{\n\t\"msg\": \"token is not valid\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Перемещает указанное число поинтов с баланса пользователя на баланс песни.</p>",
    "version": "0.0.0",
    "filename": "heartbeat-app/routes/api/songs.js",
    "groupTitle": "Песня",
    "header": {
      "fields": {
        "Заголовок запроса": [
          {
            "group": "Заголовок запроса",
            "type": "String",
            "optional": false,
            "field": "x-token-auth",
            "description": "<p>Токен авторизации пользователя.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "songs/update/:id",
    "title": "Обновить данные песни",
    "name": "UpdateSong",
    "group": "Песня",
    "permission": [
      {
        "name": "Только авторизованные пользователи"
      }
    ],
    "parameter": {
      "fields": {
        "Параметры запроса": [
          {
            "group": "Параметры запроса",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID песни, данные которой требуется обновить</p>"
          }
        ],
        "Тело запроса": [
          {
            "group": "Тело запроса",
            "type": "Object",
            "optional": false,
            "field": "updatedSong",
            "description": "<p>Обновленные данные песни</p>"
          },
          {
            "group": "Тело запроса",
            "type": "String",
            "optional": true,
            "field": "updatedSong.genre",
            "description": "<p>ID жанра песни</p>"
          },
          {
            "group": "Тело запроса",
            "type": "String",
            "optional": true,
            "field": "updatedSong.name",
            "description": "<p>Название песни</p>"
          },
          {
            "group": "Тело запроса",
            "type": "String",
            "optional": true,
            "field": "updatedSong.artistName",
            "description": "<p>Имя исполнителя</p>"
          },
          {
            "group": "Тело запроса",
            "type": "String",
            "optional": true,
            "field": "updatedSong.filename",
            "description": "<p>Ссылка на аудиофайл</p>"
          },
          {
            "group": "Тело запроса",
            "type": "String",
            "optional": true,
            "field": "updatedSong.artwork",
            "description": "<p>Ссылка на обложку</p>"
          },
          {
            "group": "Тело запроса",
            "type": "String",
            "optional": true,
            "field": "updatedSong.waveform",
            "description": "<p>Ссылка на waveform JSON</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Тело ответа": [
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>ID песни</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>ID пользователя</p>"
          },
          {
            "group": "Тело ответа",
            "type": "Object",
            "optional": false,
            "field": "genre",
            "description": "<p>Жанр песни</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "genre._id",
            "description": "<p>ID жанра</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "genre.text",
            "description": "<p>Название жанра</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Название песни</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "artistName",
            "description": "<p>Имя исполнителя</p>"
          },
          {
            "group": "Тело ответа",
            "type": "Number",
            "optional": false,
            "field": "reviewPoints",
            "description": "<p>Баланс песни</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "filename",
            "description": "<p>Ссылка на аудиофайл</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "artwork",
            "description": "<p>Ссылка на обложку</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "waveform",
            "description": "<p>Ссылка на waveform JSON</p>"
          },
          {
            "group": "Тело ответа",
            "type": "Date",
            "optional": false,
            "field": "date",
            "description": "<p>Дата загрузки</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "200 OK:",
          "content": "HTTP/1.1 200 OK\n{\n\t\"_id\": \"507f1f77bcf86cd799439011\",\n\t\"user\": \"507f1f77bcf86cd799439011\",\n\t\"genre\":\n\t{\n\t\t\"_id\": \"507f1f77bcf86cd799439011\",\n\t\t\"text\": \"Rock\"\n\t},\n\t\"name\": \"Mind Mischief\",\n\t\"artistName\": \"Tame Impala\",\n\t\"reviewPoints\": \"5\",\n\t\"filename\": \"https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.mp3\",\n\t\"artwork\": \"https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.jpg\",\n\t\"waveform\": \"https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.json\",\n\t\"date\": \"2012-04-23T18:25:43.511Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "SongDoesNotExist",
            "description": "<p>Песни не существует.</p>"
          }
        ],
        "Ошибки авторизации": [
          {
            "group": "Ошибки авторизации",
            "optional": false,
            "field": "NoToken",
            "description": "<p>Пользователь не авторизован.</p>"
          },
          {
            "group": "Ошибки авторизации",
            "optional": false,
            "field": "TokenNotValid",
            "description": "<p>Передан неверный/истекший токен.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "SongDoesNotExist",
          "content": "HTTP/1.1 400 Bad Request\n{\n\t\"msg\": \"Song does not exist.\"\n}",
          "type": "json"
        },
        {
          "title": "NoToken",
          "content": "HTTP/1.1 401 Unauthorized\n{\n\t\"msg\": \"No token\"\n}",
          "type": "json"
        },
        {
          "title": "TokenNotValid",
          "content": "HTTP/1.1 400 Bad Request\n{\n\t\"msg\": \"token is not valid\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Обновляет данные песни в соответствии с теми, которые указаны в теле запроса.</p>",
    "version": "0.0.0",
    "filename": "heartbeat-app/routes/api/songs.js",
    "groupTitle": "Песня",
    "header": {
      "fields": {
        "Заголовок запроса": [
          {
            "group": "Заголовок запроса",
            "type": "String",
            "optional": false,
            "field": "x-token-auth",
            "description": "<p>Токен авторизации пользователя.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "auth/",
    "title": "Авторизовать пользователя",
    "name": "AuthUser",
    "group": "Пользователь",
    "permission": [
      {
        "name": "Для всех"
      }
    ],
    "parameter": {
      "fields": {
        "Тело запроса": [
          {
            "group": "Тело запроса",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>E-Mail пользователя.</p>"
          },
          {
            "group": "Тело запроса",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Пароль пользователя.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Тело ответа": [
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Токен авторизации.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>Данные о пользователе.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "user._id",
            "description": "<p>ID пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "user.name",
            "description": "<p>Имя пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "user.avatar",
            "description": "<p>Ссылка на аватар пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "user.email",
            "description": "<p>E-Mail адрес пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "Number",
            "optional": false,
            "field": "user.points",
            "description": "<p>Баланс пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "user.bandcampLink",
            "description": "<p>Ссылка на Bandcamp-страницу пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "user.spotifyLink",
            "description": "<p>Ссылка на Spotify-страницу пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "user.facebookLink",
            "description": "<p>Ссылка на Facebook-страницу пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "user.twitterLink",
            "description": "<p>Сссылка на Twitter-страницу пользователя.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "200 OK:",
          "content": "HTTP/1.1 200 OK\n{\n\t\"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c\",\n\t\"user\":\n\t{\n\t\t\"_id\": \"507f1f77bcf86cd799439011\",\n\t\t\"name\": \"John Doe\",\n\t\t\"avatar\": \"https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.jpg\",\n\t\t\"email\": \"johndoe@gmail.com\",\n\t\t\"points\": \"0\",\n\t\t\"bandcampLink\": \"https://johndoe.bandcamp.com/\",\n\t\t\"spotifyLink\": \"https://open.spotify.com/artist/6x8L59xNfuXIM7UfzoSe7g?si=IF09HKfsSk-oG9M9W7we6w\",\n\t\t\"facebookLink\": \"https://www.facebook.com/johndoe/\",\n\t\t\"twitterLink\": \"https://www.twitter.com/johndoe/\"\n\t}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>Пользователь не найден.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidCredentials",
            "description": "<p>E-mail и/или пароль неверны.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "EnterAllFields",
            "description": "<p>Заполнены не все поля.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "UserNotFound",
          "content": "HTTP/1.1 400 Bad Request\n{\n\t\"msg\": \"User does not exist\"\n}",
          "type": "json"
        },
        {
          "title": "InvalidCredentials",
          "content": "HTTP/1.1 400 Bad Request\n{\n\t\"msg\": \"Invalid credentials\"\n}",
          "type": "json"
        },
        {
          "title": "EnterAllFields",
          "content": "HTTP/1.1 400 Bad Request\n{\n\t\"msg\": \"Please enter all fields\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Авторизует пользователя с учетными данными, указанными в теле запроса.</p>",
    "version": "0.0.0",
    "filename": "heartbeat-app/routes/api/auth.js",
    "groupTitle": "Пользователь"
  },
  {
    "type": "get",
    "url": "auth/user/",
    "title": "Получить данные пользователя",
    "name": "GetUser",
    "group": "Пользователь",
    "permission": [
      {
        "name": "Только авторизованные пользователи"
      }
    ],
    "success": {
      "fields": {
        "Тело ответа": [
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>ID пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Имя пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "avatar",
            "description": "<p>Ссылка на аватар пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>E-Mail адрес пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "Number",
            "optional": false,
            "field": "points",
            "description": "<p>Баланс пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "bandcampLink",
            "description": "<p>Ссылка на Bandcamp-страницу пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "spotifyLink",
            "description": "<p>Ссылка на Spotify-страницу пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "facebookLink",
            "description": "<p>Ссылка на Facebook-страницу пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "twitterLink",
            "description": "<p>Сссылка на Twitter-страницу пользователя.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "200 OK:",
          "content": "HTTP/1.1 200 OK\n{\n\t\"_id\": \"507f1f77bcf86cd799439011\",\n\t\"name\": \"John Doe\",\n\t\"avatar\": \"https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.jpg\",\n\t\"email\": \"johndoe@gmail.com\",\n\t\"points\": \"0\",\n\t\"bandcampLink\": \"https://johndoe.bandcamp.com/\",\n\t\"spotifyLink\": \"https://open.spotify.com/artist/6x8L59xNfuXIM7UfzoSe7g?si=IF09HKfsSk-oG9M9W7we6w\",\n\t\"facebookLink\": \"https://www.facebook.com/johndoe/\",\n\t\"twitterLink\": \"https://www.twitter.com/johndoe/\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Получает данные авторизованного пользователя.</p>",
    "version": "0.0.0",
    "filename": "heartbeat-app/routes/api/auth.js",
    "groupTitle": "Пользователь",
    "header": {
      "fields": {
        "Заголовок запроса": [
          {
            "group": "Заголовок запроса",
            "type": "String",
            "optional": false,
            "field": "x-token-auth",
            "description": "<p>Токен авторизации пользователя.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Ошибки авторизации": [
          {
            "group": "Ошибки авторизации",
            "optional": false,
            "field": "NoToken",
            "description": "<p>Пользователь не авторизован.</p>"
          },
          {
            "group": "Ошибки авторизации",
            "optional": false,
            "field": "TokenNotValid",
            "description": "<p>Передан неверный/истекший токен.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "NoToken",
          "content": "HTTP/1.1 401 Unauthorized\n{\n\t\"msg\": \"No token\"\n}",
          "type": "json"
        },
        {
          "title": "TokenNotValid",
          "content": "HTTP/1.1 400 Bad Request\n{\n\t\"msg\": \"token is not valid\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "users/:id",
    "title": "Получить данные пользователя по ID",
    "name": "GetUserByID",
    "group": "Пользователь",
    "permission": [
      {
        "name": "Только авторизованные пользователи"
      }
    ],
    "parameter": {
      "fields": {
        "Параметры запроса": [
          {
            "group": "Параметры запроса",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID пользователя, данные которого требуется получить.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Тело ответа": [
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>ID пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Имя пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "avatar",
            "description": "<p>Ссылка на аватар пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>E-Mail адрес пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "Number",
            "optional": false,
            "field": "points",
            "description": "<p>Баланс пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "bandcampLink",
            "description": "<p>Ссылка на Bandcamp-страницу пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "spotifyLink",
            "description": "<p>Ссылка на Spotify-страницу пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "facebookLink",
            "description": "<p>Ссылка на Facebook-страницу пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "twitterLink",
            "description": "<p>Сссылка на Twitter-страницу пользователя.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "200 OK:",
          "content": "HTTP/1.1 200 OK\n{\n\t\"_id\": \"507f1f77bcf86cd799439011\",\n\t\"name\": \"John Doe\",\n\t\"avatar\": \"https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.jpg\",\n\t\"email\": \"johndoe@gmail.com\",\n\t\"points\": \"0\",\n\t\"bandcampLink\": \"https://johndoe.bandcamp.com/\",\n\t\"spotifyLink\": \"https://open.spotify.com/artist/6x8L59xNfuXIM7UfzoSe7g?si=IF09HKfsSk-oG9M9W7we6w\",\n\t\"facebookLink\": \"https://www.facebook.com/johndoe/\",\n\t\"twitterLink\": \"https://www.twitter.com/johndoe/\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Получает данные авторизованного пользователя.</p>",
    "version": "0.0.0",
    "filename": "heartbeat-app/routes/api/users.js",
    "groupTitle": "Пользователь",
    "header": {
      "fields": {
        "Заголовок запроса": [
          {
            "group": "Заголовок запроса",
            "type": "String",
            "optional": false,
            "field": "x-token-auth",
            "description": "<p>Токен авторизации пользователя.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Ошибки авторизации": [
          {
            "group": "Ошибки авторизации",
            "optional": false,
            "field": "NoToken",
            "description": "<p>Пользователь не авторизован.</p>"
          },
          {
            "group": "Ошибки авторизации",
            "optional": false,
            "field": "TokenNotValid",
            "description": "<p>Передан неверный/истекший токен.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "NoToken",
          "content": "HTTP/1.1 401 Unauthorized\n{\n\t\"msg\": \"No token\"\n}",
          "type": "json"
        },
        {
          "title": "TokenNotValid",
          "content": "HTTP/1.1 400 Bad Request\n{\n\t\"msg\": \"token is not valid\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "users/",
    "title": "Зарегистрировать пользователя",
    "name": "RegisterUser",
    "group": "Пользователь",
    "permission": [
      {
        "name": "Для всех"
      }
    ],
    "parameter": {
      "fields": {
        "Тело запроса": [
          {
            "group": "Тело запроса",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Имя пользователя.</p>"
          },
          {
            "group": "Тело запроса",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>E-Mail пользователя.</p>"
          },
          {
            "group": "Тело запроса",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Пароль пользователя.</p>"
          },
          {
            "group": "Тело запроса",
            "type": "String",
            "optional": true,
            "field": "bandcampLink",
            "description": "<p>Ссылка на Bandcamp-страницу пользователя.</p>"
          },
          {
            "group": "Тело запроса",
            "type": "String",
            "optional": true,
            "field": "spotifyLink",
            "description": "<p>Ссылка на Spotify-страницу пользователя.</p>"
          },
          {
            "group": "Тело запроса",
            "type": "String",
            "optional": true,
            "field": "facebookLink",
            "description": "<p>Ссылка на Facebook-страницу пользователя.</p>"
          },
          {
            "group": "Тело запроса",
            "type": "String",
            "optional": true,
            "field": "twitterLink",
            "description": "<p>Сссылка на Twitter-страницу пользователя.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Тело ответа": [
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Токен авторизации.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>Данные о пользователе.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "user._id",
            "description": "<p>ID пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "user.name",
            "description": "<p>Имя пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "user.avatar",
            "description": "<p>Ссылка на аватар пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "user.email",
            "description": "<p>E-Mail адрес пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "Number",
            "optional": false,
            "field": "user.points",
            "description": "<p>Баланс пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "user.bandcampLink",
            "description": "<p>Ссылка на Bandcamp-страницу пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "user.spotifyLink",
            "description": "<p>Ссылка на Spotify-страницу пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "user.facebookLink",
            "description": "<p>Ссылка на Facebook-страницу пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "user.twitterLink",
            "description": "<p>Сссылка на Twitter-страницу пользователя.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "200 OK:",
          "content": "HTTP/1.1 200 OK\n{\n\t\"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c\",\n\t\"user\":\n\t{\n\t\t\"_id\": \"507f1f77bcf86cd799439011\",\n\t\t\"name\": \"John Doe\",\n\t\t\"avatar\": \"\",\n\t\t\"email\": \"johndoe@gmail.com\",\n\t\t\"points\": \"0\",\n\t\t\"bandcampLink\": \"https://johndoe.bandcamp.com/\",\n\t\t\"spotifyLink\": \"https://open.spotify.com/artist/6x8L59xNfuXIM7UfzoSe7g?si=IF09HKfsSk-oG9M9W7we6w\",\n\t\t\"facebookLink\": \"https://www.facebook.com/johndoe/\",\n\t\t\"twitterLink\": \"https://www.twitter.com/johndoe/\"\n\t}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserAlreadyExists",
            "description": "<p>Пользователь с таким e-mail уже зарегистрирован.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "EnterAllFields",
            "description": "<p>Заполнены не все поля.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "UserAlreadyExists",
          "content": "HTTP/1.1 400 Bad Request\n{\n\t\"msg\": \"User already exists\"\n}",
          "type": "json"
        },
        {
          "title": "EnterAllFields",
          "content": "HTTP/1.1 400 Bad Request\n{\n\t\"msg\": \"Please enter all fields\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Регистрирует пользователя с учетными данными, указанными в теле запроса.</p>",
    "version": "0.0.0",
    "filename": "heartbeat-app/routes/api/users.js",
    "groupTitle": "Пользователь"
  },
  {
    "type": "post",
    "url": "users/update",
    "title": "Обновить данные пользователя",
    "name": "UpdateUser",
    "group": "Пользователь",
    "permission": [
      {
        "name": "Только авторизованные пользователи"
      }
    ],
    "parameter": {
      "fields": {
        "Тело запроса": [
          {
            "group": "Тело запроса",
            "type": "Object",
            "optional": false,
            "field": "updatedUser",
            "description": "<p>Объект, содержащий обновленные данные пользователя.</p>"
          },
          {
            "group": "Тело запроса",
            "type": "String",
            "optional": true,
            "field": "updatedUser.name",
            "description": "<p>Имя пользователя.</p>"
          },
          {
            "group": "Тело запроса",
            "type": "String",
            "optional": true,
            "field": "updatedUser.email",
            "description": "<p>E-Mail пользователя.</p>"
          },
          {
            "group": "Тело запроса",
            "type": "String",
            "optional": true,
            "field": "updatedUser.password",
            "description": "<p>Пароль пользователя.</p>"
          },
          {
            "group": "Тело запроса",
            "type": "String",
            "optional": true,
            "field": "updatedUser.avatar",
            "description": "<p>Ссылка на аватар пользователя.</p>"
          },
          {
            "group": "Тело запроса",
            "type": "String",
            "optional": true,
            "field": "updatedUser.bandcampLink",
            "description": "<p>Ссылка на Bandcamp-страницу пользователя.</p>"
          },
          {
            "group": "Тело запроса",
            "type": "String",
            "optional": true,
            "field": "updatedUser.spotifyLink",
            "description": "<p>Ссылка на Spotify-страницу пользователя.</p>"
          },
          {
            "group": "Тело запроса",
            "type": "String",
            "optional": true,
            "field": "updatedUser.facebookLink",
            "description": "<p>Ссылка на Facebook-страницу пользователя.</p>"
          },
          {
            "group": "Тело запроса",
            "type": "String",
            "optional": true,
            "field": "updatedUser.twitterLink",
            "description": "<p>Сссылка на Twitter-страницу пользователя.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Тело ответа": [
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>ID пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Имя пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "avatar",
            "description": "<p>Ссылка на аватар пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>E-Mail адрес пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "Number",
            "optional": false,
            "field": "points",
            "description": "<p>Баланс пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "bandcampLink",
            "description": "<p>Ссылка на Bandcamp-страницу пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "spotifyLink",
            "description": "<p>Ссылка на Spotify-страницу пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "facebookLink",
            "description": "<p>Ссылка на Facebook-страницу пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "twitterLink",
            "description": "<p>Сссылка на Twitter-страницу пользователя.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "200 OK:",
          "content": "HTTP/1.1 200 OK\n{\n\t\"_id\": \"507f1f77bcf86cd799439011\",\n\t\"name\": \"John Doe\",\n\t\"avatar\": \"https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.jpg\",\n\t\"email\": \"johndoe@gmail.com\",\n\t\"points\": \"0\",\n\t\"bandcampLink\": \"https://johndoe.bandcamp.com/\",\n\t\"spotifyLink\": \"https://open.spotify.com/artist/6x8L59xNfuXIM7UfzoSe7g?si=IF09HKfsSk-oG9M9W7we6w\",\n\t\"facebookLink\": \"https://www.facebook.com/johndoe/\",\n\t\"twitterLink\": \"https://www.twitter.com/johndoe/\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserDoesNotExist",
            "description": "<p>Пользователя не существует.</p>"
          }
        ],
        "Ошибки авторизации": [
          {
            "group": "Ошибки авторизации",
            "optional": false,
            "field": "NoToken",
            "description": "<p>Пользователь не авторизован.</p>"
          },
          {
            "group": "Ошибки авторизации",
            "optional": false,
            "field": "TokenNotValid",
            "description": "<p>Передан неверный/истекший токен.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "UserDoesNotExist",
          "content": "HTTP/1.1 400 Bad Request\n{\n\t\"msg\": \"User does not exist.\"\n}",
          "type": "json"
        },
        {
          "title": "NoToken",
          "content": "HTTP/1.1 401 Unauthorized\n{\n\t\"msg\": \"No token\"\n}",
          "type": "json"
        },
        {
          "title": "TokenNotValid",
          "content": "HTTP/1.1 400 Bad Request\n{\n\t\"msg\": \"token is not valid\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Обновляет данные пользователя в соответствии с данными, указанными в запросе.</p>",
    "version": "0.0.0",
    "filename": "heartbeat-app/routes/api/users.js",
    "groupTitle": "Пользователь",
    "header": {
      "fields": {
        "Заголовок запроса": [
          {
            "group": "Заголовок запроса",
            "type": "String",
            "optional": false,
            "field": "x-token-auth",
            "description": "<p>Токен авторизации пользователя.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "reviews/id/:id",
    "title": "Получить рецензию по ID",
    "name": "GetReviewByID",
    "group": "Рецензия",
    "parameter": {
      "fields": {
        "Параметры запроса": [
          {
            "group": "Параметры запроса",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID рецензии, данные которой требуется получить.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Тело ответа": [
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>ID рецензии</p>"
          },
          {
            "group": "Тело ответа",
            "type": "Object",
            "optional": false,
            "field": "song",
            "description": "<p>Песня, на которую написана рецензия</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "song._id",
            "description": "<p>ID песни</p>"
          },
          {
            "group": "Тело ответа",
            "type": "Object",
            "optional": false,
            "field": "song.user",
            "description": "<p>Данные о пользователе, загрузившем песню.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "song.user._id",
            "description": "<p>ID пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "song.user.name",
            "description": "<p>Имя пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "song.user.avatar",
            "description": "<p>Ссылка на аватар пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "song.user.email",
            "description": "<p>E-Mail адрес пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "Number",
            "optional": false,
            "field": "song.user.points",
            "description": "<p>Баланс пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "song.user.bandcampLink",
            "description": "<p>Ссылка на Bandcamp-страницу пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "song.user.spotifyLink",
            "description": "<p>Ссылка на Spotify-страницу пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "song.user.facebookLink",
            "description": "<p>Ссылка на Facebook-страницу пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "song.user.twitterLink",
            "description": "<p>Сссылка на Twitter-страницу пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "song.genre",
            "description": "<p>ID жанра</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "song.name",
            "description": "<p>Название песни</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "song.artistName",
            "description": "<p>Имя исполнителя</p>"
          },
          {
            "group": "Тело ответа",
            "type": "Number",
            "optional": false,
            "field": "song.reviewPoints",
            "description": "<p>Баланс песни</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "song.filename",
            "description": "<p>Ссылка на аудиофайл</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "song.artwork",
            "description": "<p>Ссылка на обложку</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "song.waveform",
            "description": "<p>Ссылка на waveform JSON</p>"
          },
          {
            "group": "Тело ответа",
            "type": "Date",
            "optional": false,
            "field": "song.date",
            "description": "<p>Дата загрузки</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>ID пользователя, оставившего рецензию</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": "<p>Текст рецензии</p>"
          },
          {
            "group": "Тело ответа",
            "type": "Boolean",
            "optional": false,
            "field": "rating",
            "description": "<p>Оценка песни (True - понравилась, False - не понравилась)</p>"
          },
          {
            "group": "Тело ответа",
            "type": "Boolean",
            "optional": false,
            "field": "isRead",
            "description": "<p>Флаг, говорящий о том, просмотрена ли рецензия автором песни.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "Date",
            "optional": false,
            "field": "date",
            "description": "<p>Дата рецензии</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "200 OK:",
          "content": "HTTP/1.1 200 OK\n{\n\t\"_id\": \"507f1f77bcf86cd799439011\",\n\t\"song\":\n\t{\n\t\t\"_id\": \"507f1f77bcf86cd799439011\",\n\t\t\"user\":\n\t\t{\n\t\t\t\"_id\": \"507f1f77bcf86cd799439011\",\n\t\t\t\"name\": \"John Doe\",\n\t\t\t\"avatar\": \"https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.jpg\",\n\t\t\t\"email\": \"johndoe@gmail.com\",\n\t\t\t\"points\": \"0\",\n\t\t\t\"bandcampLink\": \"https://johndoe.bandcamp.com/\",\n\t\t\t\"spotifyLink\": \"https://open.spotify.com/artist/6x8L59xNfuXIM7UfzoSe7g?si=IF09HKfsSk-oG9M9W7we6w\",\n\t\t\t\"facebookLink\": \"https://www.facebook.com/johndoe/\",\n\t\t\t\"twitterLink\": \"https://www.twitter.com/johndoe/\"\n\t\t},\n\t\t\"genre\": \"507f1f77bcf86cd799439011\",\n\t\t\"name\": \"Mind Mischief\",\n\t\t\"artistName\": \"Tame Impala\",\n\t\t\"reviewPoints\": \"5\",\n\t\t\"filename\": \"https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.mp3\",\n\t\t\"artwork\": \"https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.jpg\",\n\t\t\"waveform\": \"https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.json\",\n\t\t\"date\": \"2012-04-23T18:25:43.511Z\"\n\t},\n\t\"user\": \"507f1f77bcf86cd799439011\",\n\t\"text\": \"it's fine\",\n\t\"rating\": True,\n\t\"isRead\": False,\n\t\"date\": \"2012-04-23T18:25:43.511Z\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Получает рецензию по ID.</p>",
    "version": "0.0.0",
    "filename": "heartbeat-app/routes/api/reviews.js",
    "groupTitle": "Рецензия",
    "header": {
      "fields": {
        "Заголовок запроса": [
          {
            "group": "Заголовок запроса",
            "type": "String",
            "optional": false,
            "field": "x-token-auth",
            "description": "<p>Токен авторизации пользователя.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Ошибки авторизации": [
          {
            "group": "Ошибки авторизации",
            "optional": false,
            "field": "NoToken",
            "description": "<p>Пользователь не авторизован.</p>"
          },
          {
            "group": "Ошибки авторизации",
            "optional": false,
            "field": "TokenNotValid",
            "description": "<p>Передан неверный/истекший токен.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "NoToken",
          "content": "HTTP/1.1 401 Unauthorized\n{\n\t\"msg\": \"No token\"\n}",
          "type": "json"
        },
        {
          "title": "TokenNotValid",
          "content": "HTTP/1.1 400 Bad Request\n{\n\t\"msg\": \"token is not valid\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "reviews/history",
    "title": "Получить положительные рецензии для пользователя",
    "name": "GetReviewListFavorite",
    "group": "Рецензия",
    "success": {
      "fields": {
        "Тело ответа": [
          {
            "group": "Тело ответа",
            "type": "Object[]",
            "optional": false,
            "field": "reviews",
            "description": "<p>Список положительных рецензий для песни, оставленных пользователем</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "reviews._id",
            "description": "<p>ID рецензии</p>"
          },
          {
            "group": "Тело ответа",
            "type": "Object",
            "optional": false,
            "field": "reviews.song",
            "description": "<p>Песня, на которую написана рецензия</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "reviews.song._id",
            "description": "<p>ID песни</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "reviews.song.user",
            "description": "<p>ID пользователя, загрузившего песню.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "reviews.song.genre",
            "description": "<p>ID жанра</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "reviews.song.name",
            "description": "<p>Название песни</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "reviews.song.artistName",
            "description": "<p>Имя исполнителя</p>"
          },
          {
            "group": "Тело ответа",
            "type": "Number",
            "optional": false,
            "field": "reviews.song.reviewPoints",
            "description": "<p>Баланс песни</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "reviews.song.filename",
            "description": "<p>Ссылка на аудиофайл</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "reviews.song.artwork",
            "description": "<p>Ссылка на обложку</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "reviews.song.waveform",
            "description": "<p>Ссылка на waveform JSON</p>"
          },
          {
            "group": "Тело ответа",
            "type": "Date",
            "optional": false,
            "field": "reviews.song.date",
            "description": "<p>Дата загрузки</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "reviews.user",
            "description": "<p>ID пользователя, оставившего рецензию.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "reviews.text",
            "description": "<p>Текст рецензии</p>"
          },
          {
            "group": "Тело ответа",
            "type": "Boolean",
            "optional": false,
            "field": "reviews.rating",
            "description": "<p>Оценка песни (True - понравилась, False - не понравилась)</p>"
          },
          {
            "group": "Тело ответа",
            "type": "Boolean",
            "optional": false,
            "field": "reviews.isRead",
            "description": "<p>Флаг, говорящий о том, просмотрена ли рецензия автором песни.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "Date",
            "optional": false,
            "field": "reviews.date",
            "description": "<p>Дата рецензии</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "200 OK:",
          "content": "HTTP/1.1 200 OK\n{\n\t[\n\t\t{\n\t\t\t\"_id\": \"507f1f77bcf86cd799439011\",\n\t\t\t\"song\":\n\t\t\t{\n\t\t\t\t\"_id\": \"507f1f77bcf86cd799439011\",\n\t\t\t\t\"user\": \"507f1f77bcf86cd799439011\",\n\t\t\t\t\"genre\": \"507f1f77bcf86cd799439011\",\n\t\t\t\t\"name\": \"Mind Mischief\",\n\t\t\t\t\"artistName\": \"Tame Impala\",\n\t\t\t\t\"reviewPoints\": \"5\",\n\t\t\t\t\"filename\": \"https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.mp3\",\n\t\t\t\t\"artwork\": \"https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.jpg\",\n\t\t\t\t\"waveform\": \"https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.json\",\n\t\t\t\t\"date\": \"2012-04-23T18:25:43.511Z\"\n\t\t\t},\n\t\t\t\"user\": \"507f1f77bcf86cd799439011\",\n\t\t\t\"text\": \"it's fine\",\n\t\t\t\"rating\": True,\n\t\t\t\"isRead\": False,\n\t\t\t\"date\": \"2012-04-23T18:25:43.511Z\"\n\t\t},\n\t\t{\n\t\t\t\"_id\": \"507f1f77bcf86cd799439011\",\n\t\t\t\"song\":\n\t\t\t{\n\t\t\t\t\"_id\": \"507f1f77bcf86cd799439011\",\n\t\t\t\t\"user\": \"507f1f77bcf86cd799439011\",\n\t\t\t\t\"genre\": \"507f1f77bcf86cd799439011\",\n\t\t\t\t\"name\": \"Mind Mischief\",\n\t\t\t\t\"artistName\": \"Tame Impala\",\n\t\t\t\t\"reviewPoints\": \"5\",\n\t\t\t\t\"filename\": \"https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.mp3\",\n\t\t\t\t\"artwork\": \"https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.jpg\",\n\t\t\t\t\"waveform\": \"https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.json\",\n\t\t\t\t\"date\": \"2012-04-23T18:25:43.511Z\"\n\t\t\t},\n\t\t\t\"user\": \"507f1f77bcf86cd799439011\",\n\t\t\t\"text\": \"it's bad\",\n\t\t\t\"rating\": True,\n\t\t\t\"isRead\": False,\n\t\t\t\"date\": \"2012-04-23T18:25:43.511Z\"\n\t\t}\n\t]\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Получает список положительных рецензий для пользователя</p>",
    "version": "0.0.0",
    "filename": "heartbeat-app/routes/api/reviews.js",
    "groupTitle": "Рецензия",
    "header": {
      "fields": {
        "Заголовок запроса": [
          {
            "group": "Заголовок запроса",
            "type": "String",
            "optional": false,
            "field": "x-token-auth",
            "description": "<p>Токен авторизации пользователя.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Ошибки авторизации": [
          {
            "group": "Ошибки авторизации",
            "optional": false,
            "field": "NoToken",
            "description": "<p>Пользователь не авторизован.</p>"
          },
          {
            "group": "Ошибки авторизации",
            "optional": false,
            "field": "TokenNotValid",
            "description": "<p>Передан неверный/истекший токен.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "NoToken",
          "content": "HTTP/1.1 401 Unauthorized\n{\n\t\"msg\": \"No token\"\n}",
          "type": "json"
        },
        {
          "title": "TokenNotValid",
          "content": "HTTP/1.1 400 Bad Request\n{\n\t\"msg\": \"token is not valid\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "reviews/song/:id",
    "title": "Получить список рецензии для песни",
    "name": "GetReviewListForSong",
    "group": "Рецензия",
    "parameter": {
      "fields": {
        "Параметры запроса": [
          {
            "group": "Параметры запроса",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID песни, для которой требуется получить список рецензий</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Тело ответа": [
          {
            "group": "Тело ответа",
            "type": "Object[]",
            "optional": false,
            "field": "reviews",
            "description": "<p>Список рецензий для песни</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "reviews._id",
            "description": "<p>ID рецензии</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "reviews.song",
            "description": "<p>ID песни, на которую написана рецензия</p>"
          },
          {
            "group": "Тело ответа",
            "type": "Object",
            "optional": false,
            "field": "reviews.user",
            "description": "<p>Данные о пользователе, оставившем рецензию</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "reviews.user._id",
            "description": "<p>ID пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "reviews.user.name",
            "description": "<p>Имя пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "reviews.user.avatar",
            "description": "<p>Ссылка на аватар пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "reviews.user.email",
            "description": "<p>E-Mail адрес пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "Number",
            "optional": false,
            "field": "reviews.user.points",
            "description": "<p>Баланс пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "reviews.user.bandcampLink",
            "description": "<p>Ссылка на Bandcamp-страницу пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "reviews.user.spotifyLink",
            "description": "<p>Ссылка на Spotify-страницу пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "reviews.user.facebookLink",
            "description": "<p>Ссылка на Facebook-страницу пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "reviews.user.twitterLink",
            "description": "<p>Сссылка на Twitter-страницу пользователя.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "reviews.text",
            "description": "<p>Текст рецензии</p>"
          },
          {
            "group": "Тело ответа",
            "type": "Boolean",
            "optional": false,
            "field": "reviews.rating",
            "description": "<p>Оценка песни (True - понравилась, False - не понравилась)</p>"
          },
          {
            "group": "Тело ответа",
            "type": "Boolean",
            "optional": false,
            "field": "reviews.isRead",
            "description": "<p>Флаг, говорящий о том, просмотрена ли рецензия автором песни.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "Date",
            "optional": false,
            "field": "reviews.date",
            "description": "<p>Дата рецензии</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "200 OK:",
          "content": "HTTP/1.1 200 OK\n{\n\t[\n\t\t{\n\t\t\t\"_id\": \"507f1f77bcf86cd799439011\",\n\t\t\t\"song\": \"507f1f77bcf86cd799439011\",\n\t\t\t\"user\":\n\t\t\t{\n\t\t\t\t\"_id\": \"507f1f77bcf86cd799439011\",\n\t\t\t\t\"name\": \"John Doe\",\n\t\t\t\t\"avatar\": \"https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.jpg\",\n\t\t\t\t\"email\": \"johndoe@gmail.com\",\n\t\t\t\t\"points\": \"0\",\n\t\t\t\t\"bandcampLink\": \"https://johndoe.bandcamp.com/\",\n\t\t\t\t\"spotifyLink\": \"https://open.spotify.com/artist/6x8L59xNfuXIM7UfzoSe7g?si=IF09HKfsSk-oG9M9W7we6w\",\n\t\t\t\t\"facebookLink\": \"https://www.facebook.com/johndoe/\",\n\t\t\t\t\"twitterLink\": \"https://www.twitter.com/johndoe/\"\n\t\t\t},\n\t\t\t\"text\": \"it's fine\",\n\t\t\t\"rating\": True,\n\t\t\t\"isRead\": False,\n\t\t\t\"date\": \"2012-04-23T18:25:43.511Z\"\n\t\t},\n\t\t{\n\t\t\t\"_id\": \"507f1f77bcf86cd799439011\",\n\t\t\t\"song\": \"507f1f77bcf86cd799439011\",\n\t\t\t\"user\":\n\t\t\t{\n\t\t\t\t\"_id\": \"507f1f77bcf86cd799439011\",\n\t\t\t\t\"name\": \"Jack Doe\",\n\t\t\t\t\"avatar\": \"https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.jpg\",\n\t\t\t\t\"email\": \"jackdoe@gmail.com\",\n\t\t\t\t\"points\": \"0\",\n\t\t\t\t\"bandcampLink\": \"https://johndoe.bandcamp.com/\",\n\t\t\t\t\"spotifyLink\": \"https://open.spotify.com/artist/6x8L59xNfuXIM7UfzoSe7g?si=IF09HKfsSk-oG9M9W7we6w\",\n\t\t\t\t\"facebookLink\": \"https://www.facebook.com/johndoe/\",\n\t\t\t\t\"twitterLink\": \"https://www.twitter.com/johndoe/\"\n\t\t\t},\n\t\t\t\"text\": \"it's bad\",\n\t\t\t\"rating\": False,\n\t\t\t\"isRead\": True,\n\t\t\t\"date\": \"2012-04-23T18:25:43.511Z\"\n\t\t}\n\t]\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Получает список рецензий для песни</p>",
    "version": "0.0.0",
    "filename": "heartbeat-app/routes/api/reviews.js",
    "groupTitle": "Рецензия",
    "header": {
      "fields": {
        "Заголовок запроса": [
          {
            "group": "Заголовок запроса",
            "type": "String",
            "optional": false,
            "field": "x-token-auth",
            "description": "<p>Токен авторизации пользователя.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Ошибки авторизации": [
          {
            "group": "Ошибки авторизации",
            "optional": false,
            "field": "NoToken",
            "description": "<p>Пользователь не авторизован.</p>"
          },
          {
            "group": "Ошибки авторизации",
            "optional": false,
            "field": "TokenNotValid",
            "description": "<p>Передан неверный/истекший токен.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "NoToken",
          "content": "HTTP/1.1 401 Unauthorized\n{\n\t\"msg\": \"No token\"\n}",
          "type": "json"
        },
        {
          "title": "TokenNotValid",
          "content": "HTTP/1.1 400 Bad Request\n{\n\t\"msg\": \"token is not valid\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "reviews/history",
    "title": "Получить историю рецензий для пользователя",
    "name": "GetReviewListHistory",
    "group": "Рецензия",
    "success": {
      "fields": {
        "Тело ответа": [
          {
            "group": "Тело ответа",
            "type": "Object[]",
            "optional": false,
            "field": "reviews",
            "description": "<p>Список рецензий для песни, оставленных пользователем</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "reviews._id",
            "description": "<p>ID рецензии</p>"
          },
          {
            "group": "Тело ответа",
            "type": "Object",
            "optional": false,
            "field": "reviews.song",
            "description": "<p>Песня, на которую написана рецензия</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "reviews.song._id",
            "description": "<p>ID песни</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "reviews.song.user",
            "description": "<p>ID пользователя, загрузившего песню.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "reviews.song.genre",
            "description": "<p>ID жанра</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "reviews.song.name",
            "description": "<p>Название песни</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "reviews.song.artistName",
            "description": "<p>Имя исполнителя</p>"
          },
          {
            "group": "Тело ответа",
            "type": "Number",
            "optional": false,
            "field": "reviews.song.reviewPoints",
            "description": "<p>Баланс песни</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "reviews.song.filename",
            "description": "<p>Ссылка на аудиофайл</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "reviews.song.artwork",
            "description": "<p>Ссылка на обложку</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "reviews.song.waveform",
            "description": "<p>Ссылка на waveform JSON</p>"
          },
          {
            "group": "Тело ответа",
            "type": "Date",
            "optional": false,
            "field": "reviews.song.date",
            "description": "<p>Дата загрузки</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "reviews.user",
            "description": "<p>ID пользователя, оставившего рецензию.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "reviews.text",
            "description": "<p>Текст рецензии</p>"
          },
          {
            "group": "Тело ответа",
            "type": "Boolean",
            "optional": false,
            "field": "reviews.rating",
            "description": "<p>Оценка песни (True - понравилась, False - не понравилась)</p>"
          },
          {
            "group": "Тело ответа",
            "type": "Boolean",
            "optional": false,
            "field": "reviews.isRead",
            "description": "<p>Флаг, говорящий о том, просмотрена ли рецензия автором песни.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "Date",
            "optional": false,
            "field": "reviews.date",
            "description": "<p>Дата рецензии</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "200 OK:",
          "content": "HTTP/1.1 200 OK\n{\n\t[\n\t\t{\n\t\t\t\"_id\": \"507f1f77bcf86cd799439011\",\n\t\t\t\"song\":\n\t\t\t{\n\t\t\t\t\"_id\": \"507f1f77bcf86cd799439011\",\n\t\t\t\t\"user\": \"507f1f77bcf86cd799439011\",\n\t\t\t\t\"genre\": \"507f1f77bcf86cd799439011\",\n\t\t\t\t\"name\": \"Mind Mischief\",\n\t\t\t\t\"artistName\": \"Tame Impala\",\n\t\t\t\t\"reviewPoints\": \"5\",\n\t\t\t\t\"filename\": \"https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.mp3\",\n\t\t\t\t\"artwork\": \"https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.jpg\",\n\t\t\t\t\"waveform\": \"https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.json\",\n\t\t\t\t\"date\": \"2012-04-23T18:25:43.511Z\"\n\t\t\t},\n\t\t\t\"user\": \"507f1f77bcf86cd799439011\",\n\t\t\t\"text\": \"it's fine\",\n\t\t\t\"rating\": True,\n\t\t\t\"isRead\": False,\n\t\t\t\"date\": \"2012-04-23T18:25:43.511Z\"\n\t\t},\n\t\t{\n\t\t\t\"_id\": \"507f1f77bcf86cd799439011\",\n\t\t\t\"song\":\n\t\t\t{\n\t\t\t\t\"_id\": \"507f1f77bcf86cd799439011\",\n\t\t\t\t\"user\": \"507f1f77bcf86cd799439011\",\n\t\t\t\t\"genre\": \"507f1f77bcf86cd799439011\",\n\t\t\t\t\"name\": \"Mind Mischief\",\n\t\t\t\t\"artistName\": \"Tame Impala\",\n\t\t\t\t\"reviewPoints\": \"5\",\n\t\t\t\t\"filename\": \"https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.mp3\",\n\t\t\t\t\"artwork\": \"https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.jpg\",\n\t\t\t\t\"waveform\": \"https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.json\",\n\t\t\t\t\"date\": \"2012-04-23T18:25:43.511Z\"\n\t\t\t},\n\t\t\t\"user\": \"507f1f77bcf86cd799439011\",\n\t\t\t\"text\": \"it's bad\",\n\t\t\t\"rating\": False,\n\t\t\t\"isRead\": False,\n\t\t\t\"date\": \"2012-04-23T18:25:43.511Z\"\n\t\t}\n\t]\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Получает историю рецензий для пользователя</p>",
    "version": "0.0.0",
    "filename": "heartbeat-app/routes/api/reviews.js",
    "groupTitle": "Рецензия",
    "header": {
      "fields": {
        "Заголовок запроса": [
          {
            "group": "Заголовок запроса",
            "type": "String",
            "optional": false,
            "field": "x-token-auth",
            "description": "<p>Токен авторизации пользователя.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Ошибки авторизации": [
          {
            "group": "Ошибки авторизации",
            "optional": false,
            "field": "NoToken",
            "description": "<p>Пользователь не авторизован.</p>"
          },
          {
            "group": "Ошибки авторизации",
            "optional": false,
            "field": "TokenNotValid",
            "description": "<p>Передан неверный/истекший токен.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "NoToken",
          "content": "HTTP/1.1 401 Unauthorized\n{\n\t\"msg\": \"No token\"\n}",
          "type": "json"
        },
        {
          "title": "TokenNotValid",
          "content": "HTTP/1.1 400 Bad Request\n{\n\t\"msg\": \"token is not valid\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "reviews/unread/user",
    "title": "Получить список непрочитанных рецензий для пользователя",
    "name": "GetUnreadReviewListForUser",
    "group": "Рецензия",
    "success": {
      "fields": {
        "Тело ответа": [
          {
            "group": "Тело ответа",
            "type": "Object[]",
            "optional": false,
            "field": "reviews",
            "description": "<p>Список рецензий для песни</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "reviews._id",
            "description": "<p>ID рецензии</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "reviews.song",
            "description": "<p>ID песни, на которую написана рецензия</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "reviews.user",
            "description": "<p>ID пользователя, оставившего рецензию.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "reviews.text",
            "description": "<p>Текст рецензии</p>"
          },
          {
            "group": "Тело ответа",
            "type": "Boolean",
            "optional": false,
            "field": "reviews.rating",
            "description": "<p>Оценка песни (True - понравилась, False - не понравилась)</p>"
          },
          {
            "group": "Тело ответа",
            "type": "Boolean",
            "optional": false,
            "field": "reviews.isRead",
            "description": "<p>Флаг, говорящий о том, просмотрена ли рецензия автором песни.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "Date",
            "optional": false,
            "field": "reviews.date",
            "description": "<p>Дата рецензии</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "200 OK:",
          "content": "HTTP/1.1 200 OK\n{\n\t[\n\t\t{\n\t\t\t\"_id\": \"507f1f77bcf86cd799439011\",\n\t\t\t\"song\": \"507f1f77bcf86cd799439011\",\n\t\t\t\"user\": \"507f1f77bcf86cd799439011\",\n\t\t\t\"text\": \"it's fine\",\n\t\t\t\"rating\": True,\n\t\t\t\"isRead\": False,\n\t\t\t\"date\": \"2012-04-23T18:25:43.511Z\"\n\t\t},\n\t\t{\n\t\t\t\"_id\": \"507f1f77bcf86cd799439011\",\n\t\t\t\"song\": \"507f1f77bcf86cd799439011\",\n\t\t\t\"user\": \"507f1f77bcf86cd799439011\",\n\t\t\t\"text\": \"it's bad\",\n\t\t\t\"rating\": False,\n\t\t\t\"isRead\": False,\n\t\t\t\"date\": \"2012-04-23T18:25:43.511Z\"\n\t\t}\n\t]\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Получает список непрочитанных рецензий для пользователя</p>",
    "version": "0.0.0",
    "filename": "heartbeat-app/routes/api/reviews.js",
    "groupTitle": "Рецензия",
    "header": {
      "fields": {
        "Заголовок запроса": [
          {
            "group": "Заголовок запроса",
            "type": "String",
            "optional": false,
            "field": "x-token-auth",
            "description": "<p>Токен авторизации пользователя.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Ошибки авторизации": [
          {
            "group": "Ошибки авторизации",
            "optional": false,
            "field": "NoToken",
            "description": "<p>Пользователь не авторизован.</p>"
          },
          {
            "group": "Ошибки авторизации",
            "optional": false,
            "field": "TokenNotValid",
            "description": "<p>Передан неверный/истекший токен.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "NoToken",
          "content": "HTTP/1.1 401 Unauthorized\n{\n\t\"msg\": \"No token\"\n}",
          "type": "json"
        },
        {
          "title": "TokenNotValid",
          "content": "HTTP/1.1 400 Bad Request\n{\n\t\"msg\": \"token is not valid\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "review/",
    "title": "Добавить рецензию",
    "name": "PostReview",
    "group": "Рецензия",
    "permission": [
      {
        "name": "Только авторизованные пользователи"
      }
    ],
    "parameter": {
      "fields": {
        "Тело запроса": [
          {
            "group": "Тело запроса",
            "type": "String",
            "optional": false,
            "field": "song",
            "description": "<p>ID песни, на которую написана рецензия</p>"
          },
          {
            "group": "Тело запроса",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>ID пользователя, оставившего рецензию</p>"
          },
          {
            "group": "Тело запроса",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": "<p>Текст рецензии</p>"
          },
          {
            "group": "Тело запроса",
            "type": "Boolean",
            "optional": false,
            "field": "rating",
            "description": "<p>Оценка песни (True - понравилась, False - не понравилась)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Тело ответа": [
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>ID рецензии</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "song",
            "description": "<p>ID песни, на которую написана рецензия</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>ID пользователя, оставившего рецензию.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": "<p>Текст рецензии</p>"
          },
          {
            "group": "Тело ответа",
            "type": "Boolean",
            "optional": false,
            "field": "rating",
            "description": "<p>Оценка песни (True - понравилась, False - не понравилась)</p>"
          },
          {
            "group": "Тело ответа",
            "type": "Boolean",
            "optional": false,
            "field": "isRead",
            "description": "<p>Флаг, говорящий о том, просмотрена ли рецензия автором песни.</p>"
          },
          {
            "group": "Тело ответа",
            "type": "Date",
            "optional": false,
            "field": "date",
            "description": "<p>Дата рецензии</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "200 OK:",
          "content": "HTTP/1.1 200 OK\n{\n\t\"_id\": \"507f1f77bcf86cd799439011\",\n\t\"song\": \"507f1f77bcf86cd799439011\",\n\t\"user\": \"507f1f77bcf86cd799439011\",\n\t\"text\": \"it's fine\",\n\t\"rating\": True,\n\t\"isRead\": False,\n\t\"date\": \"2012-04-23T18:25:43.511Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "EnterAllFields",
            "description": "<p>Заполнены не все поля.</p>"
          }
        ],
        "Ошибки авторизации": [
          {
            "group": "Ошибки авторизации",
            "optional": false,
            "field": "NoToken",
            "description": "<p>Пользователь не авторизован.</p>"
          },
          {
            "group": "Ошибки авторизации",
            "optional": false,
            "field": "TokenNotValid",
            "description": "<p>Передан неверный/истекший токен.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "EnterAllFields",
          "content": "HTTP/1.1 400 Bad Request\n{\n\t\"msg\": \"Please enter all fields\"\n}",
          "type": "json"
        },
        {
          "title": "NoToken",
          "content": "HTTP/1.1 401 Unauthorized\n{\n\t\"msg\": \"No token\"\n}",
          "type": "json"
        },
        {
          "title": "TokenNotValid",
          "content": "HTTP/1.1 400 Bad Request\n{\n\t\"msg\": \"token is not valid\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Добавляет новую рецензию.</p>",
    "version": "0.0.0",
    "filename": "heartbeat-app/routes/api/reviews.js",
    "groupTitle": "Рецензия",
    "header": {
      "fields": {
        "Заголовок запроса": [
          {
            "group": "Заголовок запроса",
            "type": "String",
            "optional": false,
            "field": "x-token-auth",
            "description": "<p>Токен авторизации пользователя.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "reviews/is_reviewed/:id",
    "title": "Получить статус прочтенности рецензии по ID",
    "name": "isReviewRead",
    "group": "Рецензия",
    "parameter": {
      "fields": {
        "Параметры запроса": [
          {
            "group": "Параметры запроса",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID рецензии, статус которой требуется получить.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Тело ответа": [
          {
            "group": "Тело ответа",
            "type": "Boolean",
            "optional": false,
            "field": "isRead",
            "description": "<p>Статус прочтенности рецензии</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "200 OK:",
          "content": "HTTP/1.1 200 OK\n{\n\t\"isRead\": False\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Получает статус прочтенности рецензии по ID.</p>",
    "version": "0.0.0",
    "filename": "heartbeat-app/routes/api/reviews.js",
    "groupTitle": "Рецензия",
    "header": {
      "fields": {
        "Заголовок запроса": [
          {
            "group": "Заголовок запроса",
            "type": "String",
            "optional": false,
            "field": "x-token-auth",
            "description": "<p>Токен авторизации пользователя.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Ошибки авторизации": [
          {
            "group": "Ошибки авторизации",
            "optional": false,
            "field": "NoToken",
            "description": "<p>Пользователь не авторизован.</p>"
          },
          {
            "group": "Ошибки авторизации",
            "optional": false,
            "field": "TokenNotValid",
            "description": "<p>Передан неверный/истекший токен.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "NoToken",
          "content": "HTTP/1.1 401 Unauthorized\n{\n\t\"msg\": \"No token\"\n}",
          "type": "json"
        },
        {
          "title": "TokenNotValid",
          "content": "HTTP/1.1 400 Bad Request\n{\n\t\"msg\": \"token is not valid\"\n}",
          "type": "json"
        }
      ]
    }
  }
] });
