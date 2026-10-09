.PHONY: help install build build-css watch-css dev start test test-coverage clean db-reset

PNPM := pnpm

help:
	@echo "======================================================================"
	@echo "  SIS-REG: Sistema de Registro y Admisión Estudiantil Universitario   "
	@echo "======================================================================"
	@echo "Comandos disponibles:"
	@echo "  make install        - Instala dependencias con pnpm"
	@echo "  make build          - Compila SCSS y TypeScript a dist/"
	@echo "  make build-css      - Compila exclusivamente los archivos SCSS a CSS"
	@echo "  make watch-css      - Monitorea cambios en SCSS en tiempo real"
	@echo "  make dev            - Inicia el servidor de desarrollo (tsx watch)"
	@echo "  make start          - Inicia el servidor compilado en producción"
	@echo "  make test           - Ejecuta las pruebas automatizadas (Jest)"
	@echo "  make test-coverage  - Ejecuta pruebas con reporte de cobertura"
	@echo "  make clean          - Limpia dist/ y temporales"
	@echo "  make db-reset       - Vacía los registros de la base de datos SQLite"
	@echo "======================================================================"

install:
	@echo "📦 Instalando dependencias con pnpm..."
	$(PNPM) install
	$(PNPM) approve-builds --all

build-css:
	@echo "🎨 Compilando SCSS a public/styles.css..."
	$(PNPM) run build:css

watch-css:
	@echo "👀 Monitoreando SCSS..."
	$(PNPM) run watch:css

build:
	@echo "🔨 Compilando SCSS y TypeScript..."
	$(PNPM) run build

dev:
	@echo "🚀 Iniciando servidor de desarrollo..."
	$(PNPM) run dev

start: build
	@echo "⚡ Iniciando servidor de producción..."
	$(PNPM) start

test:
	@echo "🧪 Ejecutando suite de pruebas..."
	$(PNPM) test

test-coverage:
	@echo "📊 Ejecutando pruebas con cobertura..."
	$(PNPM) run test:coverage

clean:
	@echo "🧹 Limpiando artefactos..."
	$(PNPM) exec rimraf dist coverage

db-reset:
	@echo "⚠️ Reiniciando base de datos SQLite..."
	@node -e "const sqlite3 = require('sqlite3'); const db = new sqlite3.Database('./database.sqlite'); db.run('DELETE FROM estudiantes', (err) => { if (err) console.error(err); else console.log('Tabla vaciada con éxito'); db.close(); });"
