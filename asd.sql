SELECT "UsuarioConectadoUsuario".id_usuario1 AS UsuarioConectadoUsuario_id_usuario1, "UsuarioConectadoUsuario".id_usuario2 AS UsuarioConectadoUsuario_id_usuario2, "UsuarioConectadoUsuario".aceptada AS UsuarioConectadoUsuario_aceptada, "U1".email AS U1_email, "U1".nick AS U1_nick, "U1".nombres AS U1_nombres, "U1".apellidos AS U1_apellidos, "U2".email AS U2_email, "U2".nick AS U2_nick, "U2".nombres AS U2_nombres, "U2".apellidos AS U2_apellidos FROM "UsuarioConectadoUsuario" LEFT JOIN "Usuario" AS "U1" ON ("UsuarioConectadoUsuario".id_usuario1 = "U1".id) LEFT JOIN "Usuario" AS "U2" ON ("UsuarioConectadoUsuario".id_usuario2 = "U2".id) WHERE (("UsuarioConectadoUsuario".id_usuario1 = 1) OR ("UsuarioConectadoUsuario".id_usuario2 = 1))
