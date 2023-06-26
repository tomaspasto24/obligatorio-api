import { login, registry } from "./autenticacion";
import { deleteUserConnection, deleteUserSkill, getUser, getUserConnections, getUserRequestsActive, getUserRequestsRelevant, getUserSkills, postUser, postUserConnection, postUserPassword, postUserSearch, postUserSkill, putUser, putUserConnection, putUserPassword } from "./usuarios";

export const documentation = {
    openapi: '3.0.3',
    info: {
        version: '0.1.0',
        title: 'AyudaYa API',
        summary: 'API para el sistema de AyudaYa',
        description: 'Sistema de ayuda mutua diseñado para el proyecto de Base de Datos 2 (2023-1) en la Universidad Católica del Uruguay.',
        termsOfService: '',
        contact: {
            name: 'Grupo "no me acuerdo", Base de Datos 2, Sem 1, 2023, Universidad Católica del Uruguay',
            email: '',
            url: '',
        },
        license: {
            name: 'MIT',
            url: 'https://opensource.org/licenses/MIT',
        },
    },
    servers: [
        {
            url: 'http://localhost:3001',
            description: 'Local server',
        },
    ],
    tags: [
        {
            name: 'Autenticación',
            description: 'Endpoints de registro e inicio de sesión',
        },
        {
            name: 'Usuarios',
            description: 'Endpoints de manejo de usuarios',
        },
        {
            name: 'Habilidades',
            description: 'Endpoints de manejo de habilidades',
        },
        {
            name: 'Solicitudes',
            description: 'Endpoints de manejo de solicitudes',
        },
    ],
    paths: {
        '/api/autenticacion/ingreso': {
            post: login,
        },
        '/api/autenticacion/registro': {
            post: registry,
        },
        '/api/usuarios': {
            post: postUser,
        },
        '/api/usuarios/search': {
            post: postUserSearch,
        },
        '/api/usuarios/{id}': {
            get: getUser,
            put: putUser,
        },
        '/api/usuarios/{id}/habilidades': {
            get: getUserSkills,
            post: postUserSkill,
        },
        '/api/usuarios/{id}/habilidades/{sId}': {
            delete: deleteUserSkill,
        },
        '/api/usuarios/{id}/conexiones': {
            get: getUserConnections,
            post: postUserConnection,
        },
        '/api/usuarios/{id}/conexiones/{cId}': {
            delete: deleteUserConnection,
            put: putUserConnection,
        },
        '/api/usuarios/{id}/password': {
            post: postUserPassword,
            put: putUserPassword,
        },
        '/api/usuarios/{id}/solicitudes/relevantes': {
            get: getUserRequestsRelevant,
        },
        '/api/usuarios/{id}/solicitudes/activas': {
            get: getUserRequestsActive,
        },
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
};