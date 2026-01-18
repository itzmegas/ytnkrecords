# Guía de Integración: Beatport API v4

Esta guía resume los pasos necesarios para autenticarse y consultar recursos en la API v4 de Beatport.

## 1. Autenticación (Authentication)

La API utiliza **OAuth 2.0**. Para realizar peticiones, primero necesitas obtener un `access_token` temporal.

### Requisitos previos
Debes tener tus credenciales de cliente (proporcionadas por Beatport tras solicitar acceso como partner):
- `client_id`
- `client_secret`

### Obtener un Token (Client Credentials Flow)
Este es el flujo estándar para aplicaciones de servidor a servidor (sin usuario final logueado en Beatport).

**Endpoint:**
`POST https://api.beatport.com/v4/auth/o/token/`

**Parámetros (Form-Data o Body):**
- `grant_type`: `client_credentials`
- `client_id`: *TU_CLIENT_ID*
- `client_secret`: *TU_CLIENT_SECRET*

**Respuesta Exitosa:**
```json
{
  "access_token": "besu98...",
  "expires_in": 36000,
  "token_type": "Bearer",
  "scope": "read write"
}
```

### Usar el Token
Incluye el token en el header `Authorization` de todas tus peticiones siguientes:

```http
Authorization: Bearer <tu_access_token>
```

---

## 2. Obtención de IDs y Recursos

En Beatport API, no sueles "ver" una lista de IDs fijos. El flujo de trabajo consiste en **Buscar** para encontrar el ID y luego **Consultar** usando ese ID.

### Paso A: Buscar (Search)
El endpoint de búsqueda es la puerta de entrada para descubrir los IDs de Artistas, Géneros o Tracks.

**Endpoint:**
`GET /v4/catalog/search/`

**Parámetros útiles:**
- `q`: Texto de búsqueda (ej. "Techno", "Carl Cox").
- `type`: Tipo de recurso a buscar (`genres`, `artists`, `tracks`, `labels`).
- `per_page`: Número de resultados.

**Ejemplo: Buscar el ID del género "Techno"**
`GET /v4/catalog/search/?q=Techno&type=genres`

Respuesta simplificada:
```json
[
  {
    "id": 6,
    "name": "Techno",
    "slug": "techno",
    "url": "https://api.beatport.com/v4/catalog/genres/6/"
  }
]
```
*Aquí descubrimos que el ID de Techno es `6`.*

### Paso B: Consultar por ID
Una vez tienes el ID, puedes pedir datos específicos o listas filtradas.

#### Listar Tracks por Género
`GET /v4/catalog/tracks/?genre_id=6`

#### Obtener detalles de un Artista
`GET /v4/catalog/artists/{artist_id}/`

---

## 3. Endpoints Clave

| Recurso | Endpoint Base | Descripción |
| :--- | :--- | :--- |
| **Search** | `/v4/catalog/search/` | Buscador global para obtener IDs. |
| **Tracks** | `/v4/catalog/tracks/` | Listar y filtrar canciones. |
| **Artists** | `/v4/catalog/artists/` | Información de artistas. |
| **Genres** | `/v4/catalog/genres/` | Listado de géneros disponibles. |
| **Labels** | `/v4/catalog/labels/` | Información de sellos discográficos. |

## Referencias
- [Documentación Oficial Beatport v4](https://api.beatport.com/v4/docs/)
