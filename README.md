# 🎓 SIS-REG: Sistema de Registro y Admisión Estudiantil Universitario

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green.svg?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-lightgrey.svg?logo=express)](https://expressjs.com/)
[![SQLite](https://img.shields.io/badge/SQLite-3-blue.svg?logo=sqlite)](https://www.sqlite.org/)
[![Jest](https://img.shields.io/badge/Tested%20with-Jest-red.svg?logo=jest)](https://jestjs.io/)
[![pnpm](https://img.shields.io/badge/Managed%20with-pnpm-orange.svg?logo=pnpm)](https://pnpm.io/)

Aplicación web desarrollada como solución integral para la **Práctica de Aula: Caso de Estudio de Registro y Admisión Estudiantil** (especificado en `holis.txxt`). El proyecto implementa una arquitectura por capas fuertemente tipada en **TypeScript**, validaciones reactivas en el cliente, procesamiento seguro en el servidor y un módulo de automatización institucional.

---

## 📋 Tabla de Contenidos

1. [Caso de Estudio y Alcance](#-caso-de-estudio-y-alcance)
2. [Características Principales](#-características-principales)
3. [Módulo de Automatización](#-módulo-de-automatización)
4. [Estructura del Proyecto](#-estructura-del-proyecto)
5. [Requisitos Previos](#-requisitos-previos)
6. [Instalación y Configuración](#-instalación-y-configuración)
7. [Uso del Makefile](#-uso-del-makefile)
8. [Endpoints de la API](#-endpoints-de-la-api)
9. [Pruebas Automatizadas](#-pruebas-automatizadas)
10. [Criterios de Aceptación Cumplidos](#-criterios-de-aceptación-cumplidos)

---

## 🏛 Caso de Estudio y Alcance

El sistema permite gestionar la inscripción de nuevos postulantes universitarios, garantizando integridad de datos, unicidad del documento de identidad y generación automatizada de credenciales institucionales.

### Datos Solicitados al Estudiante:
- **Nombre Completo**: Validado (solo letras, espacios y caracteres del idioma español; mín. 3 caracteres).
- **Cédula de Identidad (C.I.)**: Requerido, único en la base de datos (evita duplicados con respuesta `409 Conflict`).
- **Edad**: Obligatorio, entero válido entre 16 y 90 años.
- **Carrera Universitaria**: Perteneciente al catálogo de carreras ofertadas.
- **Semestre**: Semestre de ingreso (1 al 10).
- **Correo Electrónico**: Formato RFC válido.
- **Ciudad y Domicilio**: Datos de residencia para el padrón estudiantil.

---

## ✨ Características Principales

- **Frontend Reactivo & Premium**:
  - Interfaz moderna con tema oscuro, glassmorphism y micro-animaciones en Vanilla CSS.
  - Validación en tiempo real campo por campo sin recargar la página.
  - Pestañas dinámicas: Formulario de admisión y Visor de estudiantes inscritos.
  - Búsqueda en vivo y filtrado instantáneo en la lista de inscritos.
  - Tarjeta de Credencial Académica Digital emitida al completar el registro.
- **Backend Modular en TypeScript**:
  - Arquitectura limpia dividida en DTOs, Servicios, Modelos/Repositorios, Controladores y Rutas.
  - Manejo semántico de códigos de estado HTTP (`201 Created`, `400 Bad Request`, `409 Conflict`, `200 OK`, `500 Server Error`).
- **Persistencia Aislada y Segura**:
  - Base de datos SQLite3 con consultas preparadas contra inyecciones SQL.
  - Base de datos en memoria (`:memory:`) automática para pruebas automatizadas.
- **Gestión Rápida con pnpm y Makefile**:
  - Bloqueo determinista de dependencias con `pnpm-lock.yaml`.
  - Automatización de tareas de compilación, ejecución y testing con `Makefile`.

---

## ⚙️ Módulo de Automatización

En cumplimiento de los requerimientos de automatización institucional del caso de estudio, el módulo `AutomationService` ejecuta de manera autónoma procesos que antes se realizaban manualmente:

1. **Generación de Matrícula Universitaria Oficial**:
   - Algoritmo: `MAT-[AÑO]-[CÓDIGO_CARRERA]-[CI]`
   - *Ejemplo*: `MAT-2026-SIS-8765432` para Ingeniería de Sistemas.
2. **Asignación de Correo Institucional Estandarizado**:
   - Algoritmo: Sanitiza tildes y diacríticos (`á` $\rightarrow$ `a`, `ñ` $\rightarrow$ `n`), toma primer nombre + primer apellido + últimos dígitos del CI.
   - *Ejemplo*: `valeria.mendoza432@universidad.edu.bo`.
3. **Asignación Automática de Turno y Jornada de Inducción**:
   - Semestres 1 y 2 $\rightarrow$ Turno Mañana.
   - Semestres 3 a 6 $\rightarrow$ Turno Tarde.
   - Semestres 7 a 10 $\rightarrow$ Turno Noche.
   - Calcula y fija la fecha oficial de la sesión de inducción y bienvenida.
4. **Token Criptográfico de Autenticidad**:
   - Hash SHA-256 alfanumérico único para validación de la credencial digital.

---

## 📂 Estructura del Proyecto

```
registro-estudiantes/
├── src/
│   ├── config/
│   │   └── database.ts            # Conexión SQLite (persistente o :memory:)
│   ├── types/
│   │   └── estudiante.types.ts    # Tipos e interfaces de dominio
│   ├── dtos/
│   │   ├── EstudianteDto.ts       # DTO limpio de estudiante
│   │   └── EstudianteValidator.ts # Validador desacoplado (Clean Code)
│   ├── services/
│   │   ├── AutomationService.ts   # Automatizaciones (matrícula, email, turno, token)
│   │   └── EstudianteService.ts   # Orquestador de negocio
│   ├── models/
│   │   ├── DuplicateCiError.ts    # Error personalizado de conflicto
│   │   └── EstudianteModel.ts     # Repositorio SQLite
│   ├── controllers/
│   │   └── EstudianteController.ts# Controladores HTTP de la API REST
│   ├── routes/
│   │   ├── estudianteRoutes.ts    # Endpoints /api/registro y /api/estudiantes
│   │   └── viewRoutes.ts          # Servidor de interfaz web
│   ├── styles/                    # Arquitectura modular SCSS (Clean Code < 110 líneas c/u)
│   │   ├── _variables.scss        # Tokens de diseño y colores
│   │   ├── _base.scss             # Resets y layout
│   │   ├── _header.scss           # Header hero y selector de tabs
│   │   ├── _card.scss             # Contenedores con glassmorphism
│   │   ├── _form.scss             # Campos y grilla de formulario
│   │   ├── _button.scss           # Botones, banners y spinners
│   │   ├── _credential.scss       # Tarjeta de credencial digital
│   │   ├── _table.scss            # Tabla responsiva y buscador
│   │   └── main.scss              # Bundle principal SCSS
│   ├── app.ts                     # Aplicación Express
│   └── server.ts                  # Punto de entrada HTTP
├── tests/
│   ├── unit/                      # Pruebas unitarias
│   └── integration/               # Pruebas de integración HTTP (Supertest)
├── public/
│   ├── js/                        # Módulos JS limpios en el cliente (< 95 líneas c/u)
│   │   ├── api.js                 # Cliente HTTP fetch
│   │   ├── validator.js           # Validación reactiva en cliente
│   │   ├── ui.js                  # Manejador de banners, tabs y errores visuales
│   │   ├── credential.js          # Renderizador de credencial
│   │   ├── table.js               # Renderizador y filtro de la tabla
│   │   └── main.js                # Orquestador principal del cliente
│   ├── app.js                     # Loader modular
│   ├── styles.css                 # CSS generado automáticamente desde SCSS
│   └── index.html                 # UI limpia (< 125 líneas)
├── Makefile                       # Tareas de automatización (build, dev, test, scss)
├── pnpm-lock.yaml                 # Dependencias bloqueadas con pnpm
└── tsconfig.json                  # Configuración estricta de TypeScript
```

---

## 📦 Requisitos Previos

- **Node.js**: Versión 20.x o superior.
- **pnpm**: Versión 9.x o 12.x (instalado globalmente o mediante devDependencies).
- **Make**: Para ejecutar los comandos abreviados del `Makefile` (opcional en Linux/macOS).

---

## 🚀 Instalación y Configuración

1. **Clonar el repositorio**:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd registro-estudiantes
   ```

2. **Instalar dependencias con pnpm**:
   ```bash
   pnpm install
   # O utilizando make:
   make install
   ```

3. **Compilar el proyecto**:
   ```bash
   make build
   # O con pnpm:
   pnpm run build
   ```

4. **Iniciar en modo desarrollo (recarga activa)**:
   ```bash
   make dev
   # O con pnpm:
   pnpm run dev
   ```

5. **Acceder a la aplicación**:
   - Abrir en el navegador: [http://localhost:3000/auth/registro](http://localhost:3000/auth/registro)

---

## 🛠 Uso del Makefile

El proyecto incluye un `Makefile` con comandos listos para usar:

| Comando | Descripción |
| :--- | :--- |
| `make help` | Muestra la lista interactiva de todos los comandos disponibles. |
| `make install` | Instala las dependencias y aprueba los scripts de compilación de pnpm. |
| `make build` | Compila el código fuente de TypeScript a JavaScript en `dist/`. |
| `make dev` | Inicia el servidor de desarrollo con recarga en caliente (`tsx watch`). |
| `make start` | Inicia el servidor de producción compilado (`node dist/server.js`). |
| `make test` | Ejecuta la suite de pruebas automatizadas con Jest. |
| `make test-coverage` | Ejecuta las pruebas y genera un reporte detallado de cobertura. |
| `make clean` | Elimina la carpeta `dist/` y directorios temporales de compilación. |
| `make db-reset` | Vacía la tabla de estudiantes en la base de datos SQLite local. |

---

## 📡 Endpoints de la API

### 1. Registrar Estudiante
- **Método**: `POST`
- **URL**: `/api/registro`
- **Headers**: `Content-Type: application/json`
- **Cuerpo de Solicitud (Ejemplo)**:
  ```json
  {
    "nombre": "Andrea Valeria Quispe",
    "ci": "8765432-LP",
    "edad": 22,
    "carrera": "Ingeniería de Sistemas",
    "semestre": "4",
    "correo": "andrea.quispe@gmail.com",
    "ciudad": "La Paz",
    "domicilio": "Av. 6 de Agosto #210"
  }
  ```
- **Respuesta Exitosa (`201 Created`)**:
  ```json
  {
    "success": true,
    "message": "Estudiante registrado con éxito",
    "data": {
      "id": 1,
      "nombre": "Andrea Valeria Quispe",
      "ci": "8765432-LP",
      "edad": 22,
      "carrera": "Ingeniería de Sistemas",
      "semestre": "4",
      "correo": "andrea.quispe@gmail.com",
      "ciudad": "La Paz",
      "domicilio": "Av. 6 de Agosto #210",
      "matricula": "MAT-2026-SIS-8765432LP",
      "correo_institucional": "andrea.quispe432@universidad.edu.bo",
      "turno": "Tarde",
      "fecha_induccion": "2026-11-15",
      "codigo_verificacion": "F83A20B19D4C"
    }
  }
  ```
- **Respuesta de C.I. Duplicado (`409 Conflict`)**:
  ```json
  {
    "success": false,
    "message": "La Cédula de Identidad (CI) ya se encuentra registrada en el sistema.",
    "error": "La Cédula de Identidad (CI) ya se encuentra registrada en el sistema."
  }
  ```
- **Respuesta de Validación Inválida (`400 Bad Request`)**:
  ```json
  {
    "success": false,
    "message": "El nombre completo debe tener al menos 3 caracteres.",
    "fields": {
      "nombre": "El nombre completo debe tener al menos 3 caracteres.",
      "correo": "El formato del correo electrónico no es válido."
    }
  }
  ```

### 2. Listar Estudiantes Registrados
- **Método**: `GET`
- **URL**: `/api/estudiantes`
- **Respuesta (`200 OK`)**:
  ```json
  {
    "success": true,
    "message": "Estudiantes recuperados con éxito",
    "total": 1,
    "data": [ ... ]
  }
  ```

---

## 🧪 Pruebas Automatizadas

El proyecto cuenta con cobertura de pruebas unitarias y de integración implementadas con **Jest** y **Supertest**:

```bash
# Ejecutar todas las pruebas
make test
# O con pnpm:
pnpm test
```

### Casos de Prueba Cubiertos:
- **`AutomationService.test.ts`**:
  - Sanitización de acentos, tildes y eñes.
  - Generación de matrícula con formato institucional y código de carrera.
  - Generación de correo electrónico institucional sin caracteres especiales.
  - Asignación correcta de turnos e inducción según semestre.
  - Generación de token criptográfico de verificación único.
- **`EstudianteDto.test.ts`**:
  - Aceptación de datos conformes.
  - Rechazo de nombres vacíos, cortos o con números.
  - Rechazo de CI vacío o con formato erróneo.
  - Validación de rango de edad (16 a 90/100 años).
  - Rechazo de carreras fuera del catálogo institucional.
  - Rechazo de correos sin formato RFC válido.
- **`estudianteApi.test.ts`**:
  - `POST /api/registro` retorna `201 Created` y datos completos.
  - `POST /api/registro` rechaza C.I. repetido retornando `409 Conflict`.
  - `POST /api/registro` retorna `400 Bad Request` en cargas incompletas.
  - `GET /api/estudiantes` retorna `200 OK` con el listado persistido.

---

## ✅ Criterios de Aceptación Cumplidos

- [x] Título del caso de estudio formalizado.
- [x] Formulario web para todos los campos requeridos.
- [x] Validación cliente reactiva sin recargar página.
- [x] Validación servidor tipada mediante DTO.
- [x] Prevención estricta de C.I. duplicado con respuesta `409 Conflict`.
- [x] Persistencia en SQLite con transacciones seguras.
- [x] Módulo de automatización con matrícula, correo, turno y token.
- [x] Encapsulación total en TypeScript bajo arquitectura por capas.
- [x] Suite de pruebas automatizadas completa con Jest y Supertest.
- [x] Gestión de dependencias y scripts mediante `pnpm` y `Makefile`.

---

**SIS-REG &copy; 2026** - Práctica de Aula: Caso de Estudio de Admisión Universitaria.
