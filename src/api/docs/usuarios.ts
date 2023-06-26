export const postUser = {
    tags: ['Users'],
    description: 'Create a new user in the system',
    operationId: 'postUser',
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

export const postUserSearch = {
    tags: ['Users'],
    description: 'Search for users in the system',
    operationId: 'postUserSearch',
    security: [
        {
            bearerAuth: [],
        },
    ],
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
                        nick: {
                            type: 'string',
                            example: 'nick',
                        },
                        fullName: {
                            type: 'string',
                            example: 'Robert Robertson',
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
            description: 'Users found',
            content: {
                'application/json': {
                    schema: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                id: {
                                    type: 'number',
                                    example: 1,
                                },
                                email: {
                                    type: 'string',
                                    example: 'email@email.com',
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
                            },
                        },
                    },
                },
            },
        },
        '500': {
            description: 'Error al buscar usuarios',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Error al buscar usuarios',
                            },
                        },
                    },
                },
            },
        },
    },
};

export const getUser = {
    tags: ['Users'],
    description: 'Get a user by id',
    operationId: 'getUser',
    security: [
        {
            bearerAuth: [],
        },
    ],
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'User id',
            required: true,
            schema: {
                type: 'number',
                example: 1,
            },
        },
    ],
    responses: {
        '200': {
            description: 'User found',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            id: {
                                type: 'number',
                                example: 1,
                            },
                            email: {
                                type: 'string',
                                example: 'email@email.com',
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
                        },
                    },
                },
            },
        },
        '500': {
            description: 'Error al buscar usuario',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Error al buscar usuario',
                            },
                        },
                    },
                },
            },
        },
    },
};

export const getUserSkills = {
    tags: ['Users'],
    description: 'Get a user skills by user id',
    operationId: 'getUserSkills',
    security: [
        {
            bearerAuth: [],
        },
    ],
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'User id',
            required: true,
            schema: {
                type: 'number',
                example: 1,
            },
        },
    ],
    responses: {
        '200': {
            description: 'User skills found',
            content: {
                'application/json': {
                    schema: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                id: {
                                    type: 'number',
                                    example: 1,
                                },
                                name: {
                                    type: 'string',
                                    example: 'skill',
                                },
                                description: {
                                    type: 'string',
                                    example: 'skill description',
                                },
                                categoryId: {
                                    type: 'number',
                                    example: 1,
                                },
                                categopryName: {
                                    type: 'string',
                                    example: 'category',
                                },
                            },
                        },
                    },
                },
            },
        },
        '500': {
            description: 'Error al buscar habilidades de usuario',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Error al buscar habilidades de usuario',
                            },
                        },
                    },
                },
            },
        },
        '400': {
            description: 'Solicitud incorrecta',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Solicitud incorrecta',
                            },
                        },
                    },
                },
            },
        },
        '401': {
            description: 'Usuario no autorizado',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Usuario no autorizado',
                            },
                        },
                    },
                },
            },
        },
    },
};

export const postUserSkill = {
    tags: ['Users'],
    description: 'Add a skill to a user',
    operationId: 'postUserSkill',
    security: [
        {
            bearerAuth: [],
        },
    ],
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'User id',
            required: true,
            schema: {
                type: 'number',
                example: 1,
            },
        },
    ],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        userId: {
                            type: 'number',
                            example: 1,
                        },
                        skillId: {
                            type: 'number',
                            example: 1,
                        },
                    },
                },
            },
        },
        required: true,
    },
    responses: {
        '200': {
            description: 'Skill added to user',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Skill added to user',
                            },
                        },
                    },
                },
            },
        },
        '500': {
            description: 'Error al agregar habilidad a usuario',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Error al agregar habilidad a usuario',
                            },
                        },
                    },
                },
            },
        },
        '400': {
            description: 'Solicitud incorrecta',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Solicitud incorrecta',
                            },
                        },
                    },
                },
            },
        },
        '401': {
            description: 'Usuario no autorizado',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Usuario no autorizado',
                            },
                        },
                    },
                },
            },
        },
    },
};

export const deleteUserSkill = {
    tags: ['Users'],
    description: 'Delete a skill from a user',
    operationId: 'deleteUserSkill',
    security: [
        {
            bearerAuth: [],
        },
    ],
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'User id',
            required: true,
            schema: {
                type: 'number',
                example: 1,
            },
        },
        {
            name: 'sId',
            in: 'path',
            description: 'Skill id',
            required: true,
            schema: {
                type: 'number',
                example: 1,
            },
        },
    ],
    responses: {
        '200': {
            description: 'Skill deleted from user',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Skill deleted from user',
                            },
                        },
                    },
                },
            },
        },
        '500': {
            description: 'Error al eliminar habilidad de usuario',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Error al eliminar habilidad de usuario',
                            },
                        },
                    },
                },
            },
        },
        '400': {
            description: 'Solicitud incorrecta',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Solicitud incorrecta',
                            },
                        },
                    },
                },
            },
        },
        '401': {
            description: 'Usuario no autorizado',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Usuario no autorizado',
                            },
                        },
                    },
                },
            },
        },
    },
};

export const putUser = {
    tags: ['Users'],
    description: 'Update a user',
    operationId: 'putUser',
    security: [
        {
            bearerAuth: [],
        },
    ],
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'User id',
            required: true,
            schema: {
                type: 'number',
                example: 1,
            },
        },
    ],
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
                    },
                },
            },
        },
        required: true,
    },
    responses: {
        '200': {
            description: 'User updated',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'User updated',
                            },
                        },
                    },
                },
            },
        },
        '500': {
            description: 'Error al actualizar usuario',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Error al actualizar usuario',
                            },
                        },
                    },
                },

            },
            '400': {
                description: 'Solicitud incorrecta',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                message: {
                                    type: 'string',
                                    example: 'Solicitud incorrecta',
                                },
                            },
                        },
                    },
                },
            },
            '401': {
                description: 'Usuario no autorizado',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                message: {
                                    type: 'string',
                                    example: 'Usuario no autorizado',
                                },
                            },
                        },
                    },
                },
            },
        },
    }
};

export const getUserConnections = {
    tags: ['Users'],
    description: 'Get user connections',
    operationId: 'getUserConnections',
    security: [
        {
            bearerAuth: [],
        },
    ],
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'User id',
            required: true,
            schema: {
                type: 'number',
                example: 1,
            },
        },
    ],
    responses: {
        '200': {
            description: 'User connections',
            content: {
                'application/json': {
                    schema: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                userId: {
                                    type: 'number',
                                    example: 1,
                                },
                                email: {
                                    type: 'string',
                                    example: 'email@email.com',
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
                                aceptada: {
                                    type: 'boolean',
                                    example: false,
                                },
                            },
                        },
                    },
                },
            },
        },
        '500': {
            description: 'Error al obtener conexiones de usuario',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Error al obtener conexiones de usuario',
                            },
                        },
                    },
                },
            },
        },
        '400': {
            description: 'Solicitud incorrecta',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Solicitud incorrecta',    
                            },
                        },
                    },
                },
            },
        },
        '401': {
            description: 'Usuario no autorizado',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Usuario no autorizado',
                            },
                        },
                    },
                },
            },
        },
    },
};

export const postUserConnection = {
    tags: ['Users'],
    description: 'Create a user connection',
    operationId: 'postUserConnection',
    security: [
        {
            bearerAuth: [],
        },
    ],
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'User id',
            required: true,
            schema: {
                type: 'number',
                example: 1,
            },
        },
    ],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        activeUserId: {
                            type: 'number',
                            example: 1,
                        },
                        passiveUserId: {
                            type: 'boolean',
                            example: true,
                        },
                    },
                },
            },
        },
        required: true,
    },
    responses: {
        '200': {
            description: 'User connection created',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'User connection created',
                            },
                        },
                    },
                },
            },
        },
        '500': {
            description: 'Error al crear conexión de usuario',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example:'Error al crear conexión de usuario',
                            },
                        },
                    },
                },
            },
        },
        '400': {
            description: 'Solicitud incorrecta',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type:'string',
                                example: 'Solicitud incorrecta',
                            },
                        },
                    },
                },
            },
        },
        '401': {
            description: 'Usuario no autorizado',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message:{
                                type: 'string',
                                example: 'Usuario no autorizado',
                            },
                        },
                    },
                },
            },
        },
    },
};

export const deleteUserConnection = {
    tags: ['Users'],
    description: 'Delete a user connection',
    operationId: 'deleteUserConnection',
    security: [
        {
            bearerAuth: [],
        },
    ],
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'User id',
            required: true,
            schema: {
                type: 'number',
                example: 1,
            },
        },
        {
            name: 'cId',
            in: 'path',
            description: 'Connection id',
            required: true,
            schema: {
                type: 'number',
                example: 1,
            },
        },
    ],
    responses: {
        '200': {
            description: 'User connection deleted',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type:'string',
                                example: 'User connection deleted',
                            },
                        },
                    },
                },
            },
        },
        '500': {
            description: 'Error al eliminar conexión de usuario',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message:{
                                type: 'string',
                                example: 'Error al eliminar conexión de usuario',
                            },
                        },
                    },
                },
            },
        },
        '400': {
            description: 'Solicitud incorrecta',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message:{
                                type: 'string',
                                example: 'Solicitud incorrecta',
                            },
                        },
                    },
                },
            },
        },
        '401': {
            description: 'Usuario no autorizado',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message:{
                                type: 'string',
                                example: 'Usuario no autorizado',
                            },
                        },
                    },
                },
            },
        },
    },
};

export const putUserConnection = {
    tags: ['Users'],
    description: 'Update a user connection',
    operationId: 'putUserConnection',
    security: [
        {
            bearerAuth: [],
        },
    ],
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'User id',
            required: true,
            schema: {
                type: 'number',
                example: 1,
            },
        },
        {
            name: 'cId',
            in: 'path',
            description: 'Connection id',
            required: true,
            schema: {
                type: 'number',
                example: 1,
            },
        },
    ],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        activeUserId: {
                            type: 'number',
                            example: 1,
                        },
                        passiveUserId: {
                            type: 'boolean',
                            example: true,
                        },
                    },
                },
            },
        },
        required: true,
    },
    responses: {
        '200': {
            description: 'User connection updated',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type:'string',
                                example: 'User connection updated',
                            },
                        },
                    },
                },
            },
        },
        '500': {
            description: 'Error al actualizar conexión de usuario',
            content: {
                'application/json': {   
                    schema: {
                        type: 'object',
                        properties: {
                            message:{
                                type: 'string',
                                example: 'Error al actualizar conexión de usuario',
                            },
                        },
                    },
                },
            },
        },
        '400': {
            description: 'Solicitud incorrecta',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message:{
                                type: 'string',
                                example: 'Solicitud incorrecta',
                            },
                        },
                    },
                },
            },
        },
        '401': {
            description: 'Usuario no autorizado',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message:{
                                type: 'string',
                                example: 'Usuario no autorizado',
                            },
                        },
                    },
                },
            },
        },
    },
};

export const postUserPassword = {
    tags: ['Users'],
    description: 'Update a user password',
    operationId: 'postUserPassword',
    security: [
        {
            bearerAuth: [],
        },
    ],
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'User id',
            required: true,
            schema: {
                type: 'number',
                example: 1,
            },
        },
    ],
    responses: {
        '200': {
            description: 'User password update started',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type:'string',
                                example: 'User password update started',
                            },
                        },
                    },
                },
            },
        },
        '500': {
            description: 'Error al iniciar actualización de contraseña de usuario',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message:{
                                type: 'string',
                                example: 'Error al iniciar actualización de contraseña de usuario',
                            },
                        },
                    },
                },
            },
        },
        '400': {
            description: 'Solicitud incorrecta',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message:{
                                type: 'string',
                                example: 'Solicitud incorrecta',
                            },
                        },
                    },
                },
            },
        },
        '401': {
            description: 'Usuario no autorizado',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message:{
                                type: 'string',
                                example: 'Usuario no autorizado',
                            },
                        },
                    },
                },
            },
        },
    },
};

export const putUserPassword = {
    tags: ['Users'],
    description: 'Update a user password',
    operationId: 'putUserPassword',
    security: [
        {
            bearerAuth: [],
        },
    ],
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'User id',
            required: true,
            schema: {
                type: 'number',
                example: 1,
            },
        },
    ],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        userId: {
                            type: 'number',
                            example: 1,
                        },
                        password: {
                            type: 'string',
                            example: '123456',
                        },
                        authCode: {
                            type: 'string',
                            example: '123456',
                        },
                    },
                },
            },
        },
        required: true,
    },
    responses: {
        '200': {
            description: 'User password updated',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type:'string',
                                example: 'User password updated',
                            },
                        },
                    },
                },
            },
        },
        '500': {
            description: 'Error al actualizar contraseña de usuario',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message:{
                                type: 'string',
                                example: 'Error al actualizar contraseña de usuario',
                            },
                        },
                    },
                },
            },
        },
        '400': {
            description: 'Solicitud incorrecta',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message:{
                                type: 'string',
                                example: 'Solicitud incorrecta',
                            },
                        },
                    },
                },
            },
        },
        '401': {
            description: 'Usuario no autorizado',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message:{
                                type: 'string',
                                example: 'Usuario no autorizado',
                            },
                        },
                    },
                },
            },
        },
    },
};

export const getUserRequestsRelevant = {
    tags: ['Users'],
    description: 'Get user requests relevant',
    operationId: 'getUserRequestsRelevant',
    security: [
        {
            bearerAuth: [],
        },
    ],
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'User id',
            required: true,
            schema: {
                type: 'number',
                example: 1,
            },
        },
    ],
    responses: {
        '200': {
            description: 'User requests relevant obtained',
            content: {
                'application/json': {
                    schema: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                id: {
                                    type: 'number',
                                    example: 1,
                                },
                                title: {
                                    type: 'string',
                                    example: 'Solicitud de prueba',
                                },
                                description: {
                                    type: 'string',
                                    example: 'Solicitud de prueba',
                                },
                                timeStart: {
                                    type: 'string',
                                    example: '2021-05-05 00:00:00',
                                },
                                location: {
                                    type: 'string',
                                    example: 'Calle 123',
                                },
                                requesterId: {
                                    type: 'number',
                                    example: 1,
                                },
                                requesterName: {
                                    type: 'string',
                                    example: 'Juan',
                                },
                                requesterLastname: {
                                    type: 'string',
                                    example: 'Juancho',
                                },
                                skill: {
                                    type: 'object',
                                    properties: {
                                        id: {
                                            type: 'number',
                                            example: 1,
                                        },
                                        name: {
                                            type: 'string',
                                            example: 'Carpintería',
                                        },
                                        description: {
                                            type: 'string',
                                            example: 'Carpintería',
                                        },
                                        categoryId: {
                                            type: 'number',
                                            example: 1,
                                        },
                                        categoryName: {
                                            type: 'string',
                                            example: 'Mantenimiento',
                                        },
                                    },
                                },
                                status: {
                                    type: 'string',
                                    example: 'active',
                                },
                            },
                        },
                    },
                },
            },
        },
        '500': {
            description: 'Error al obtener solicitudes relevantes de usuario',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type:'string',
                                example: 'Error al obtener solicitudes relevantes de usuario',
                            },
                        },
                    },
                },
            },
        },
        '400': {
            description: 'Solicitud incorrecta',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type:'string',
                                example: 'Solicitud incorrecta',
                            },
                        },
                    },
                },
            },
        },
        '401': {
            description: 'Usuario no autorizado',   
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type:'string',
                                example: 'Usuario no autorizado',
                            },
                        },
                    },
                },
            },
        },
    },
};

export const getUserRequestsActive = {
    tags: ['Users'],
    description: 'Get user requests active',
    operationId: 'getUserRequestsActive',
    security: [
        {
            bearerAuth: [],
        },
    ],
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'User id',
            required: true,
            schema: {
                type: 'number',
                example: 1,
            },
        },
    ],
    responses: {
        '200': {
            description: 'User requests active obtained',
            content: {
                'application/json': {
                    schema: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                id: {
                                    type: 'number',
                                    example: 1,
                                },
                                title: {
                                    type: 'string',
                                    example: 'Solicitud de prueba',
                                },
                                description: {
                                    type: 'string',
                                    example: 'Solicitud de prueba',
                                },
                                timeStart: {
                                    type: 'string',
                                    example: '2021-05-05 00:00:00',
                                },
                                location: {
                                    type: 'string',
                                    example: 'Calle 123',
                                },
                                requesterId: {
                                    type: 'number',
                                    example: 1,
                                },
                                requesterName: {
                                    type: 'string',
                                    example: 'Juan',
                                },
                                requesterLastname: {
                                    type: 'string',
                                    example: 'Juancho',
                                },
                                providerId: {
                                    type: 'number',
                                    example: 1,
                                },
                                providerName: {
                                    type: 'string',
                                    example: 'Marcos',
                                },
                                providerLastname: {
                                    type: 'string',
                                    example: 'Marquito',
                                },
                                skill: {
                                    type: 'object',
                                    properties: {
                                        id: {
                                            type: 'number',
                                            example: 1,
                                        },
                                        name: {
                                            type: 'string',
                                            example: 'Carpintería',
                                        },
                                        description: {
                                            type: 'string',
                                            example: 'Carpintería',
                                        },
                                        categoryId: {
                                            type: 'number',
                                            example: 1,
                                        },
                                        categoryName: {
                                            type: 'string',
                                            example: 'Mantenimiento',
                                        },
                                    },
                                },
                                status: {
                                    type: 'string',
                                    example: 'active',
                                },

                            },
                        },
                    },
                },
            },
        },
        '500': {
            description: 'Error al obtener solicitudes activas de usuario',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type:'string',
                                example: 'Error al obtener solicitudes activas de usuario',
                            },
                        },
                    },
                },
            },
        },
        '400': {
            description: 'Solicitud incorrecta',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type:'string',
                                example: 'Solicitud incorrecta',
                            },
                        },
                    },
                },
            },
        },
        '401': {
            description: 'Usuario no autorizado',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type:'string',
                                example: 'Usuario no autorizado',
                            },
                        },
                    },
                },
            },
        },
    },
};