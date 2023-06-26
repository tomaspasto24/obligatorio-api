export const postUser = {
    tags: ['Users'],
    description: 'Crear un usuario en el sistema',
    operationId: 'postUser',
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        email: {
                            type: 'string',
                            description: 'Email del usuario',
                        },
                        password: {
                            type: 'string',
                            description: 'Contraseña del usuario',
                        },
                        nick: {
                            type: 'string',
                            description: 'Nick del usuario',
                        },
                        name: {
                            type: 'string',
                            description: 'Nombre del usuario',
                        },
                        lastName: {
                            type: 'string',
                            description: 'Apellido del usuario',
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
        },
        '500': {
            description: 'Error al registrar usuario',
        }
    }
};

export const postUserSearch = {
    tags: ['Users'],
    description: 'Buscar usuarios en el sistema',
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
                            description: 'Email del usuario',
                        },
                        nick: {
                            type: 'string',
                            description: 'Nick del usuario',
                        },
                        fullName: {
                            type: 'string',
                            description: 'Nombre completo del usuario',
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
            description: 'Usuarios encontrados',
            content: {
                'application/json': {
                    schema: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                id: {
                                    type: 'number',
                                    description: 'Identificador del usuario',
                                },
                                email: {
                                    type: 'string',
                                    description: 'Email del usuario',
                                },
                                nick: {
                                    type: 'string',
                                    description: 'Nick del usuario',
                                },
                                name: {
                                    type: 'string',
                                    description: 'Nombre del usuario',
                                },
                                lastName: {
                                    type: 'string',
                                    description: 'Apellido del usuario',
                                },
                            },
                        },
                    },
                },
            },
        },
        '500': {
            description: 'Error al buscar usuarios',
        },
    },
};

export const getUser = {
    tags: ['Users'],
    description: 'Obtener un usuario del sistema',
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
            description: 'Identificador del usuario',
            required: true,
            schema: {
                type: 'number',
                example: 1,
            },
        },
    ],
    responses: {
        '200': {
            description: 'Usuario encontrado',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            id: {
                                type: 'number',
                                description: 'Identificador del usuario',
                            },
                            email: {
                                type: 'string',
                                description: 'Email del usuario',
                            },
                            nick: {
                                type: 'string',
                                description: 'Nick del usuario',
                            },
                            name: {
                                type: 'string',
                                description: 'Nombre del usuario',
                            },
                            lastName: {
                                type: 'string',
                                description: 'Apellido del usuario',
                            },
                        },
                    },
                },
            },
        },
        '500': {
            description: 'Error al buscar usuario',
        },
    },
};

export const getUserSkills = {
    tags: ['Users'],
    description: 'Obtener las habilidades de un usuario',
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
            description: 'Identificador del usuario',
            required: true,
            schema: {
                type: 'number',
                example: 1,
            },
        },
    ],
    responses: {
        '200': {
            description: 'Habilidades encontradas',
            content: {
                'application/json': {
                    schema: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                id: {
                                    type: 'number',
                                    description: 'Identificador de la habilidad',
                                },
                                name: {
                                    type: 'string',
                                    description: 'Nombre de la habilidad',
                                },
                                description: {
                                    type: 'string',
                                    description: 'Descripción de la habilidad',
                                },
                                categoryId: {
                                    type: 'number',
                                    description: 'Identificador de la categoría',
                                },
                                categopryName: {
                                    type: 'string',
                                    description: 'Nombre de la categoría',
                                },
                            },
                        },
                    },
                },
            },
        },
        '500': {
            description: 'Error al buscar habilidades de usuario',
        },
        '400': {
            description: 'Usuario no encontrado',
        },
        '401': {
            description: 'Usuario no autorizado',
        },
    },
};

export const postUserSkill = {
    tags: ['Users'],
    description: 'Agregar una habilidad a un usuario',
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
            description: 'Identificador del usuario',
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
                            description: 'Identificador del usuario',
                        },
                        skillId: {
                            type: 'number',
                            description: 'Identificador de la habilidad',
                        },
                    },
                },
            },
        },
        required: true,
    },
    responses: {
        '200': {
            description: 'Habilidad agregada a usuario',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                description: 'Habilidad agregada a usuario',
                            },
                        },
                    },
                },
            },
        },
        '500': {
            description: 'Error al agregar habilidad a usuario',
        },
        '400': {
            description: 'Usuario no encontrado',
        },
        '401': {
            description: 'Usuario no autorizado',
        },
    },
};

export const deleteUserSkill = {
    tags: ['Users'],
    description: 'Eliminar una habilidad de un usuario',
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
            description: 'Identificador del usuario',
            required: true,
            schema: {
                type: 'number',
                example: 1,
            },
        },
        {
            name: 'sId',
            in: 'path',
            description: 'Identificador de la habilidad',
            required: true,
            schema: {
                type: 'number',
                example: 1,
            },
        },
    ],
    responses: {
        '200': {
            description: 'Habilidad eliminada de usuario',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                description: 'Habilidad eliminada de usuario',
                            },
                        },
                    },
                },
            },
        },
        '500': {
            description: 'Error al eliminar habilidad de usuario',
        },
        '400': {
            description: 'Usuario no encontrado',
        },
        '401': {
            description: 'Usuario no autorizado',
        },
    },
};

export const putUser = {
    tags: ['Users'],
    description: 'Actualizar un usuario',
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
            description: 'Identificador del usuario',
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
                            description: 'Correo electrónico del usuario',
                        },
                        nick: {
                            type: 'string',
                            description: 'Nombre de usuario',
                        },
                        name: {
                            type: 'string',
                            description: 'Nombre del usuario',
                        },
                        lastName: {
                            type: 'string',
                            description: 'Apellido del usuario',
                        },
                    },
                },
            },
        },
        required: true,
    },
    responses: {
        '200': {
            description: 'Usuario actualizado',
        },
        '500': {
            description: 'Error al actualizar usuario',
        },
        '400': {
            description: 'Usuario no encontrado',
        },
        '401': {
            description: 'Usuario no autorizado',
        },
    },
};

export const getUserConnections = {
    tags: ['Users'],
    description: 'Obtener las conexiones de un usuario',
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
            description: 'Identificador del usuario',
            required: true,
            schema: {
                type: 'number',
                example: 1,
            },
        },
    ],
    responses: {
        '200': {
            description: 'Conexiones de usuario',
            content: {
                'application/json': {
                    schema: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                userId: {
                                    type: 'number',
                                    description: 'Identificador del usuario',
                                },
                                email: {
                                    type: 'string',
                                    description: 'Correo electrónico del usuario',
                                },
                                nick: {
                                    type: 'string',
                                    description: 'Nombre de usuario',
                                },
                                name: {
                                    type: 'string',
                                    description: 'Nombre del usuario',
                                },
                                lastName: {
                                    type: 'string',
                                    description: 'Apellido del usuario',
                                },
                                aceptada: {
                                    type: 'boolean',
                                    description: 'Indica si la conexión fue aceptada',
                                },
                            },
                        },
                    },
                },
            },
        },
        '500': {
            description: 'Error al obtener conexiones de usuario',
        },
        '400': {
            description: 'Usuario no encontrado',
        },
        '401': {
            description: 'Usuario no autorizado',
        },
    },
};

export const postUserConnection = {
    tags: ['Users'],
    description: 'Crear una conexión entre usuarios',
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
            description: 'Identificador del usuario',
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
                            description: 'Identificador del usuario activo',
                        },
                        passiveUserId: {
                            type: 'boolean',
                            description: 'Identificador del usuario pasivo',
                        },
                    },
                },
            },
        },
        required: true,
    },
    responses: {
        '200': {
            description: 'Conexión de usuario creada',
        },
        '500': {
            description: 'Error al crear conexión de usuario',
        },
        '400': {
            description: 'Usuario no encontrado',
        },
        '401': {
            description: 'Usuario no autorizado',
        },
    },
};

export const deleteUserConnection = {
    tags: ['Users'],
    description: 'Eliminar una conexión entre usuarios',
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
            description: 'Identificador del usuario 1',
            required: true,
            schema: {
                type: 'number',
                example: 1,
            },
        },
        {
            name: 'cId',
            in: 'path',
            description: 'Identificador del usuario 2',
            required: true,
            schema: {
                type: 'number',
                example: 1,
            },
        },
    ],
    responses: {
        '200': {
            description: 'Conexión de usuario eliminada',
        },
        '500': {
            description: 'Error al eliminar conexión de usuario',
        },
        '400': {
            description: 'Usuario no encontrado',
        },
        '401': {
            description: 'Usuario no autorizado',
        },
    },
};

export const putUserConnection = {
    tags: ['Users'],
    description: 'Actualizar una conexión entre usuarios',
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
            description: 'Identificador del usuario 1',
            required: true,
            schema: {
                type: 'number',
                example: 1,
            },
        },
        {
            name: 'cId',
            in: 'path',
            description: 'Identificador del usuario 2',
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
                            description: 'Identificador del usuario activo',
                        },
                        passiveUserId: {
                            type: 'boolean',
                            description: 'Identificador del usuario pasivo',
                        },
                    },
                },
            },
        },
        required: true,
    },
    responses: {
        '200': {
            description: 'Conexión de usuario actualizada',
        },
        '500': {
            description: 'Error al actualizar conexión de usuario',
        },
        '400': {
            description: 'Usuario no encontrado',
        },
        '401': {
            description: 'Usuario no autorizado',
        },
    },
};

export const postUserPassword = {
    tags: ['Users'],
    description: 'Iniciar actualización de contraseña de usuario',
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
            description: 'Identificador del usuario',
            required: true,
            schema: {
                type: 'number',
                example: 1,
            },
        },
    ],
    responses: {
        '200': {
            description: 'Actualización de contraseña de usuario iniciada',
        },
        '500': {
            description: 'Error al iniciar actualización de contraseña de usuario',
        },
        '400': {
            description: 'Usuario no encontrado',
        },
        '401': {
            description: 'Usuario no autorizado',
        }
    },
};

export const putUserPassword = {
    tags: ['Users'],
    description: 'Actualizar contraseña de usuario',
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
            description: 'Identificador del usuario',
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
                            description: 'Identificador del usuario',
                        },
                        password: {
                            type: 'string',
                            description: 'Contraseña del usuario',
                        },
                        authCode: {
                            type: 'string',
                            description: 'Código de autenticación',
                        },
                    },
                },
            },
        },
        required: true,
    },
    responses: {
        '200': {
            description: 'Contraseña de usuario actualizada',
        },
        '500': {
            description: 'Error al actualizar contraseña de usuario',
        },
        '400': {
            description: 'Usuario no encontrado',
        },
        '401': {
            description: 'Usuario no autorizado',
        },
    },
};

export const getUserRequestsRelevant = {
    tags: ['Users'],
    description: 'Obtener solicitudes relevantes de un usuario',
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
            description: 'Identificador del usuario',
            required: true,
            schema: {
                type: 'number',
                example: 1,
            },
        },
    ],
    responses: {
        '200': {
            description: 'Solicitudes relevantes de usuario obtenidas',
            content: {
                'application/json': {
                    schema: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                id: {
                                    type: 'number',
                                    description: 'Identificador de la solicitud',
                                },
                                title: {
                                    type: 'string',
                                    description: 'Título de la solicitud',
                                },
                                description: {
                                    type: 'string',
                                    description: 'Descripción de la solicitud',
                                },
                                timeStart: {
                                    type: 'string',
                                    description: 'Fecha de inicio de la solicitud',
                                },
                                location: {
                                    type: 'string',
                                    description: 'Ubicación de la solicitud',
                                },
                                requesterId: {
                                    type: 'number',
                                    description: 'Identificador del solicitante',
                                },
                                requesterName: {
                                    type: 'string',
                                    description: 'Nombre del solicitante',
                                },
                                requesterLastname: {
                                    type: 'string',
                                    description: 'Apellido del solicitante',
                                },
                                skill: {
                                    type: 'object',
                                    properties: {
                                        id: {
                                            type: 'number',
                                            description: 'Identificador de la habilidad',
                                        },
                                        name: {
                                            type: 'string',
                                            description: 'Nombre de la habilidad',	
                                        },
                                        description: {
                                            type: 'string',
                                            description: 'Descripción de la habilidad',
                                        },
                                        categoryId: {
                                            type: 'number',
                                            description: 'Identificador de la categoría',
                                        },
                                        categoryName: {
                                            type: 'string',
                                            description: 'Nombre de la categoría',
                                        },
                                    },
                                },
                                status: {
                                    type: 'string',
                                    description: 'Estado de la solicitud',
                                },
                            },
                        },
                    },
                },
            },
        },
        '500': {
            description: 'Error al obtener solicitudes relevantes de usuario',
        },
        '400': {
            description: 'Usuario no encontrado',
        },
        '401': {
            description: 'Usuario no autorizado',
        },
    },
};

export const getUserRequestsActive = {
    tags: ['Users'],
    description: 'Obtener solicitudes activas de un usuario',
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
            description: 'Identificador del usuario',
            required: true,
            schema: {
                type: 'number',
                example: 1,
            },
        },
    ],
    responses: {
        '200': {
            description: 'Solicitudes activas de usuario obtenidas',
            content: {
                'application/json': {
                    schema: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                id: {
                                    type: 'number',
                                    description: 'Identificador de la solicitud',
                                },
                                title: {
                                    type: 'string',
                                    description: 'Título de la solicitud',
                                },
                                description: {
                                    type: 'string',
                                    description: 'Descripción de la solicitud',
                                },
                                timeStart: {
                                    type: 'string',
                                    description: 'Fecha de inicio de la solicitud',
                                },
                                location: {
                                    type: 'string',
                                    description: 'Ubicación de la solicitud',
                                },
                                requesterId: {
                                    type: 'number',
                                    description: 'Identificador del solicitante',
                                },
                                requesterName: {
                                    type: 'string',
                                    description: 'Nombre del solicitante',
                                },
                                requesterLastname: {
                                    type: 'string',
                                    description: 'Apellido del solicitante',
                                },
                                providerId: {
                                    type: 'number',
                                    description: 'Identificador del proveedor',
                                },
                                providerName: {
                                    type: 'string',
                                    description: 'Nombre del proveedor',
                                },
                                providerLastname: {
                                    type: 'string',
                                    description: 'Apellido del proveedor',
                                },
                                skill: {
                                    type: 'object',
                                    properties: {
                                        id: {
                                            type: 'number',
                                            description: 'Identificador de la habilidad',
                                        },
                                        name: {
                                            type: 'string',
                                            description: 'Nombre de la habilidad',
                                        },
                                        description: {
                                            type: 'string',
                                            description: 'Descripción de la habilidad',
                                        },
                                        categoryId: {
                                            type: 'number',
                                            description: 'Identificador de la categoría',
                                        },
                                        categoryName: {
                                            type: 'string',
                                            description: 'Nombre de la categoría',
                                        },
                                    },
                                },
                                status: {
                                    type: 'string',
                                    description: 'Estado de la solicitud',
                                },

                            },
                        },
                    },
                },
            },
        },
        '500': {
            description: 'Error al obtener solicitudes activas de usuario',
        },
        '400': {
            description: 'Usuario no encontrado',
        },
        '401': {
            description: 'Usuario no autorizado',
        },
    },
};