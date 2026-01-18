# Guía práctica: Mostrar releases de un sello desde Beatport

> **Objetivo**: crear una web para un sello discográfico que muestre sus releases de Beatport, **sin depender de una API pública oficial** (porque no existe).

---

## 1. Contexto importante

Beatport **no ofrece una API pública para desarrolladores** como Spotify o Discogs.

- La **API v4** existe, pero es **interna / partner-only**
- No hay forma oficial de obtener un `client_id`
- La propia web de Beatport **consume endpoints JSON públicos/no documentados**

👉 **Conclusión**: sí se pueden mostrar releases, pero **no por la vía oficial**.

---

## 2. Qué NO se recomienda

### ❌ Usar tokens personales (OAuth)

Aunque es posible capturar un `accessToken` desde el navegador:

- Está ligado a una cuenta personal
- Puede ser revocado
- Viola potencialmente los TOS
- No es escalable ni seguro

**No recomendado para una web pública.**

---

## 3. Estrategia recomendada (la más usada)

### ✅ Consumir los endpoints públicos que usa la web

Cuando visitas un sello en Beatport:

```
https://www.beatport.com/label/dirtybird/1852
```

La web hace llamadas internas como:

```
GET https://api.beatport.com/v4/catalog/labels/1852/releases
```

💡 Muchos de estos endpoints **funcionan sin autenticación** o con token anónimo.

---

## 4. Endpoints útiles

> ⚠️ No documentados. Pueden cambiar.

### Releases de un sello

```
GET /v4/catalog/labels/:labelId/releases
```

### Tracks de un release

```
GET /v4/catalog/releases/:releaseId/tracks
```

### Información del sello

```
GET /v4/catalog/labels/:labelId
```

---

## 5. Ejemplo básico (Node / Frontend)

```ts
const res = await fetch(
  `https://api.beatport.com/v4/catalog/labels/${labelId}/releases?per_page=50`,
  {
    headers: {
      "User-Agent": "Mozilla/5.0",
      "Accept": "application/json",
    }
  }
);

const data = await res.json();
```

📌 Si recibes `401`:
- Añade headers realistas
- Haz la llamada desde backend
- Evita CORS

---

## 6. Arquitectura recomendada

```
[ Beatport ]
     ↓
[ Backend / API propia ]  ← cache (12–24h)
     ↓
[ Web del sello ]
```

### Por qué cachear

- Evitas rate limits
- Mejor performance
- Menos riesgo de bloqueo

---

## 7. Fallback: scraping HTML

Si Beatport bloquea los endpoints:

- Scrapea el HTML del sello
- Extrae:
  - título
  - artwork
  - fecha
  - link

### Pros
- Muy difícil de bloquear

### Contras
- Más frágil
- Menos datos

👉 Úsalo solo como **plan B**.

---

## 8. Alternativa habitual de sellos

Muchos sellos:

- No sincronizan datos automáticamente
- Mantienen releases en su CMS
- Usan Beatport solo como enlace

Botón típico:

> 🎧 Buy on Beatport

---

## 9. Legalidad y riesgo

- Datos son públicos
- No redistribuyes música
- Solo muestras metadatos + links

👉 **Riesgo bajo** para una web de sello.

---

## 10. Recomendación final

✔ Usa los endpoints públicos sin auth
✔ Cachea resultados
✔ Evita OAuth personal
✔ Ten fallback scraping
✔ Linkea siempre a Beatport

---

## 11. Notas finales

Esta solución es **práctica y realista**, usada por muchos proyectos no oficiales.

Beatport **no quiere ser backend**, solo marketplace.

---

🛠️ *Documento generado a partir de una conversación técnica sobre el uso real de la API de Beatport.*

