export const getSolicitud = {
    tags: ['Solicitudes'],
    description: "Obtiene una solicitud registrada en el sistema.",
    operationId: 'getSolicitud',
    security: [
        {
            "bearerAuth": []
        }
    ],
    parameters: [
        {
            name: "id",
            in: "path",
            description: "Identificador de la solicitud.",
            required: true,
            schema: {
                type: "number"
            }
        }
    ],
    responses: {
        "200": {
            description: "Solicitud obtenida exitosamente.",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            id: {
                                type: "number",
                                description: "Identificador de la solicitud."
                            },
                            title: {
                                type: "string",
                                description: "Título de la solicitud."
                            },
                            description: {
                                type: "string",
                                description: "Descripción de la solicitud."
                            },
                            timeStart: {
                                type: "string",
                                description: "Fecha y hora de inicio de la solicitud."
                            },
                            location: {
                                type: "string",
                                description: "Ubicación de la solicitud."
                            },
                            requesterId: {
                                type: "number",
                                description: "Identificador del solicitante."
                            },
                            requesterName: {
                                type: "string",
                                description: "Nombre del solicitante."
                            },
                            requesterLastName: {
                                type: "string",
                                description: "Apellido del solicitante."
                            },
                            providerId: {
                                type: "number",
                                description: "Identificador del ayudante."
                            },
                            providerName: {
                                type: "string",
                                description: "Nombre del ayudante."
                            },
                            providerLastName: {
                                type: "string",
                                description: "Apellido del ayudante."
                            },
                            skill: {
                                type: "object",
                                properties: {
                                    id: {
                                        type: "number",
                                        description: "Identificador de la habilidad."
                                    },
                                    name: {
                                        type: "string",
                                        description: "Nombre de la habilidad."
                                    },
                                    description: {
                                        type: "string",
                                        description: "Descripción de la habilidad."
                                    },
                                    categoryId: {
                                        type: "number",
                                        description: "Identificador de la categoría de la habilidad."
                                    },
                                    categoryName: {
                                        type: "string",
                                        description: "Nombre de la categoría de la habilidad."
                                    }
                                }
                            },
                            status: {
                                type: "string",
                                description: "Estado de la solicitud."
                            }
                        }
                    }
                }
            }
        },
        '500': {
            description: "Error al obtener la solicitud."
        }
    }
};

export const postSolicitud = {
    tags: ['Solicitudes'],
    description: "Registra una nueva solicitud en el sistema.",
    operationId: 'postSolicitud',
    security: [
        {
            "bearerAuth": []
        }
    ],
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        title: {
                            type: "string",
                            description: "Título de la solicitud."
                        },
                        description: {
                            type: "string",
                            description: "Descripción de la solicitud."
                        },
                        location: {
                            type: "string",
                            description: "Ubicación de la solicitud."
                        },
                        requesterId: {
                            type: "number",
                            description: "Identificador del solicitante."
                        },
                        skill: {
                            type: "number",
                            description: "Identificador de la habilidad."
                        }
                    }
                }
            }
        }
    },
    responses: {
        "200": {
            description: "Solicitud registrada exitosamente.",
        },
        '500': {
            description: "Error al registrar la solicitud."
        }
    }
};

export const putSolicitud = {
    tags: ['Solicitudes'],
    description: "Actualiza una solicitud registrada en el sistema.",
    operationId: 'putSolicitud',
    security: [
        {
            "bearerAuth": []
        }
    ],
    parameters: [
        {
            name: "id",
            in: "path",
            description: "Identificador de la solicitud.",
            required: true,
            schema: {
                type: "number"
            }
        }
    ],
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        title: {
                            type: "string",
                            description: "Título de la solicitud."
                        },
                        description: {
                            type: "string",
                            description: "Descripción de la solicitud."
                        },
                        location: {
                            type: "string",
                            description: "Ubicación de la solicitud."
                        },
                        requesterId: {
                            type: "number",
                            description: "Identificador del solicitante."
                        },
                        skill: {
                            type: "number",
                            description: "Identificador de la habilidad."
                        }
                    }
                }
            }
        }
    },
    responses: {
        "200": {
            description: "Solicitud actualizada exitosamente.",
        },
        '500': {
            description: "Error al actualizar la solicitud."
        },
        '401': {
            description: "No autorizado."
        }
    }
};

export const putSolicitudAceptar = {
    tags: ['Solicitudes'],
    description: "Acepta una solicitud registrada en el sistema.",
    operationId: 'putSolicitudAceptar',
    security: [
        {
            "bearerAuth": []
        }
    ],
    parameters: [
        {
            name: "id",
            in: "path",
            description: "Identificador de la solicitud.",
            required: true,
            schema: {
                type: "number"
            }
        }
    ],
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        solicitudId: {
                            type: "number",
                            description: "Identificador de la solicitud."
                        },
                        providerId: {
                            type: "number",
                            description: "Identificador del ayudante."
                        }
                    }
                }
            }
        }
    },
    responses: {
        "200": {
            description: "Solicitud aceptada exitosamente.",
        },
        '500': {
            description: "Error al aceptar la solicitud."
        }
    }
};

export const putSolicitudRechazar = {
    tags: ['Solicitudes'],
    description: "Rechaza una solicitud registrada en el sistema.",
    operationId: 'putSolicitudRechazar',
    security: [
        {
            "bearerAuth": []
        }
    ],
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        solicitudId: {
                            type: "number",
                            description: "Identificador de la solicitud."
                        },
                        providerId: {
                            type: "number",
                            description: "Identificador del ayudante."
                        }
                    }
                }
            }
        }
    },
    parameters: [
        {
            name: "id",
            in: "path",
            description: "Identificador de la solicitud.",
            required: true,
            schema: {
                type: "number"
            }
        }
    ],
    responses: {
        "200": {
            description: "Solicitud rechazada exitosamente.",
        },
        '500': {
            description: "Error al rechazar la solicitud."
        }
    }
};

export const getSolicitudChat = {
    tags: ['Solicitudes'],
    description: "Obtiene el chat de una solicitud registrada en el sistema.",
    operationId: 'getSolicitudChat',
    security: [
        {
            "bearerAuth": []
        }
    ],
    parameters: [
        {
            name: "id",
            in: "path",
            description: "Identificador de la solicitud.",
            required: true,
            schema: {
                type: "number"
            }
        }
    ],
    responses: {
        "200": {
            description: "Chat de la solicitud.",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            requestId: {
                                type: "number",
                                description: "Identificador de la solicitud."
                            },
                            requestTitle: {
                                type: "string",
                                description: "Título de la solicitud."
                            },
                            requestStatus: {
                                type: "string",
                                description: "Estado de la solicitud."
                            },
                            requesterId: {
                                type: "number",
                                description: "Identificador del solicitante."
                            },
                            requesterName: {
                                type: "string",
                                description: "Nombre del solicitante."
                            },
                            requesterLastName: {
                                type: "string",
                                description: "Apellido del solicitante."
                            },
                            providerId: {
                                type: "number",
                                description: "Identificador del proveedor."
                            },
                            providerName: {
                                type: "string",
                                description: "Nombre del proveedor."
                            },
                            providerLastName: {
                                type: "string",
                                description: "Apellido del proveedor."
                            },
                            messages: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        requestId: {
                                            type: "number",
                                            description: "Identificador de la solicitud."
                                        },
                                        messageId: {
                                            type: "number",
                                            description: "Identificador del mensaje."
                                        },
                                        timeStamp: {
                                            type: "string",
                                            description: "Fecha y hora del mensaje."
                                        },
                                        senderId: {
                                            type: "number",
                                            description: "Identificador del emisor."
                                        },
                                        senderName: {
                                            type: "string",
                                            description: "Nombre del emisor."
                                        },
                                        senderLastName: {
                                            type: "string",
                                            description: "Apellido del emisor."
                                        },
                                        contents: {
                                            type: "string",
                                            description: "Contenido del mensaje."
                                        },
                                        deleted: {
                                            type: "boolean",
                                            description: "Indica si el mensaje fue eliminado."
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        '500': {
            description: "Error al obtener el chat de la solicitud."
        },
        '401': {
            description: "No autorizado."
        }
    }
};

export const postSolicitudChatMensaje = {
    tags: ['Solicitudes'],
    description: "Envía un mensaje al chat de una solicitud registrada en el sistema.",
    operationId: 'postSolicitudChatMensaje',
    security: [
        {
            "bearerAuth": []
        }
    ],
    parameters: [
        {
            name: "id",
            in: "path",
            description: "Identificador de la solicitud.",
            required: true,
            schema: {
                type: "number"
            }
        }
    ],
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        contents: {
                            type: "string",
                            description: "Contenido del mensaje."
                        }
                    }
                }
            }
        }
    },
    responses: {
        "200": {
            description: "Mensaje enviado exitosamente.",
        },
        '500': {
            description: "Error al enviar el mensaje."
        },
        '401': {
            description: "No autorizado."
        }
    }
};

export const deleteSolicitudChatMensaje = {
    tags: ['Solicitudes'],
    description: "Elimina un mensaje del chat de una solicitud registrada en el sistema.",
    operationId: 'deleteSolicitudChatMensaje',
    security: [
        {
            "bearerAuth": []
        }
    ],
    parameters: [
        {
            name: "id",
            in: "path",
            description: "Identificador de la solicitud.",
            required: true,
            schema: {
                type: "number"
            }
        },
        {
            name: "msgId",
            in: "path",
            description: "Identificador del mensaje.",
            required: true,
            schema: {
                type: "number"
            }
        }
    ],
    responses: {
        "200": {
            description: "Mensaje eliminado exitosamente.",
        },
        '500': {
            description: "Error al eliminar el mensaje."
        },
        '401': {
            description: "No autorizado."
        }
    }
};

export const putSolicitudFinalizar = {
    tags: ['Solicitudes'],
    description: "Finaliza una solicitud registrada en el sistema.",
    operationId: 'putSolicitudFinalizar',
    security: [
        {
            "bearerAuth": []
        }
    ],
    parameters: [
        {
            name: "id",
            in: "path",
            description: "Identificador de la solicitud.",
            required: true,
            schema: {
                type: "number"
            }
        }
    ],
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        requestId: {
                            type: "number",
                            description: "Identificador de la solicitud."
                        },
                        userId: {
                            type: "number",
                            description: "Identificador del usuario."
                        },
                        status: {
                            type: "string",
                            description: "Estado de la solicitud."
                        },
                        opinion: {
                            type: "string",
                            description: "Opinión del usuario."
                        }
                    }
                }
            }
        }
    },
    responses: {
        "200": {
            description: "Solicitud finalizada exitosamente.",
        },
        '500': {
            description: "Error al finalizar la solicitud."
        },
        '401': {
            description: "No autorizado."
        }
    }
};














