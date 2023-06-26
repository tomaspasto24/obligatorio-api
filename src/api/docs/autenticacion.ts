export const login = {
    tags: ['Autenticación'],
    description: 'Iniciar sesión en el sistema',
    operationId: 'login',
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        email: {
                            type: 'string',
                            example: 'email@email.email',
                        },
                        password: {
                            type: 'string',
                            example: 'password',
                        },
                    },
                },
            },
        },
        required: true,
    },
    responses: {
        '200': {
            description: 'Usuario autenticado correctamente',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            accessToken: {
                                type: 'string',
                                example: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYXNkQGFzZC5hc2QiLCJmdWxsTmFtZSI6IlJvZHJpZ28gRGUgQXJtYXMiLCJpYXQiOjE2ODc3MjIyMzksImV4cCI6MTY4Nzk4MTQzOX0.2aulpvS5Sa324gJQyZ4xfwIwkf2m0aLCVEjINg71OwRg8HtXuuiDqfRytibw9h3XWboljtZ_Rl2SgY88rXu8eaPS5htCEoOZOxD750BYyz94i1gLvxP3sZLwOvMpYMeoA6Dm2uhKycJous10lDyHtFHT2eTQyoUkDgMNAnaDsY5gnCSuU0vjadMighV9egQupC7jBGJisvfjNfCDmdBvFrmpnIwpPAuu8v0XSz3k3QzHsfFwnvB6zbyIc3yQCQrZCLS34JYe0Sij1y-fsEf2W5QSnsNMAn7sv9LTVbIYiGcwdbroqVgbHHHG3Cdpyv-5ROs4wjRaoFtRLGeR3VWBjw',
                            },
                        },
                    },
                },
            },
        },
        '400': {
            description: 'Credenciales inválidas',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Credenciales inválidas',
                            },
                        },
                    },
                },
            },
        },
        '500': {
            description: 'Error al autenticar usuario',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Error al autenticar usuario',
                            },
                        },
                    },
                },
            },
        },
    },
};

export const registry = {
    tags: ['Autenticación'],
    description: 'Registrar un nuevo usuario en el sistema',
    operationId: 'registry',
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        email: {
                            type: 'string',
                            example: 'email@email.com',
                        },
                        password: {
                            type: 'string',
                            example: 'password',
                        },
                        nick: {
                            type: 'string',
                            example: 'nick',
                        },
                        name: {
                            type: 'string',
                            example: 'Robert',
                        },
                        lastName: {
                            type: 'string',
                            example: 'Robertson',
                        },
                        skills: {
                            type: 'array',
                            items: {
                                type: 'number',
                                example: 1,
                            },
                        },
                    },
                },
            },
        },
        required: true,
    },
    responses: {
        '200': {
            description: 'Usuario registrado correctamente',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Usuario registrado correctamente',
                            },
                        },
                    },
                },
            },
        },
        '500': {
            description: 'Error al registrar usuario',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Error al registrar usuario',
                            },
                        },
                    },
                },
            },
        },
    },
};