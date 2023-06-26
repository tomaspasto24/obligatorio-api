export const getHabilidades = {
    tags: ['Habilidades'],
    description: "Obtiene todas las habilidades registradas en el sistema.",
    operationId: 'getHabilidades',
    responses: {
        "200": {
            description: "Habilidades obtenidas correctamente.",
            content: {
                "application/json": {
                    schema: {
                        type: "array",
                        items: {
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
                                },
                            }
                        }
                    }
                }
            }
        },
        "500": {
            description: "Error al obtener las habilidades."
        }
    }
};

export const getHabilidadesCategorias = {
    tags: ['Habilidades'],
    description: "Obtiene todas las categorías de habilidades registradas en el sistema.",
    operationId: 'getHabilidadesCategorias',
    responses: {
        "200": {
            description: "Categorías de habilidades obtenidas correctamente.",
            content: {
                "application/json": {
                    schema: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                id: {
                                    type: "number",
                                    description: "Identificador de la categoría de habilidad."
                                },
                                name: {
                                    type: "string",
                                    description: "Nombre de la categoría de habilidad."
                                }
                            }
                        }
                    }
                }
            }
        },
        "500": {
            description: "Error al obtener las categorías de habilidades."
        }
    }
};

export const postHabilidad = {
    tags: ['Habilidades'],
    description: "Registra una nueva habilidad en el sistema.",
    operationId: 'postHabilidad',
    security: [
        {
            bearerAuth: []
        }
    ],
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
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
                        }
                    }
                }
            }
        }
    },
    responses: {
        "501": {
            description: "Registro de habilidad no implementado."
        }
    }
};

export const putHabilidad = {
    tags: ['Habilidades'],
    description: "Actualiza una habilidad registrada en el sistema.",
    operationId: 'putHabilidad',
    security: [
        {
            bearerAuth: []
        }
    ],
    parameters: [
        {
            name: "id",
            in: "path",
            description: "Identificador de la habilidad.",
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
                        }
                    }
                }
            }
        }
    },
    responses: {
        "501": {
            description: "Actualización de habilidad no implementada."
        }
    }
};

export const deleteHabilidad = {
    tags: ['Habilidades'],
    description: "Elimina una habilidad registrada en el sistema.",
    operationId: 'deleteHabilidad',
    security: [
        {
            bearerAuth: []
        }
    ],
    parameters: [
        {
            name: "id",
            in: "path",
            description: "Identificador de la habilidad.",
            required: true,
            schema: {
                type: "number"
            }
        }
    ],
    responses: {
        "501": {
            description: "Eliminación de habilidad no implementada."
        }
    }
};
