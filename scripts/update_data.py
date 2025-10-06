import json
from datetime import datetime
import logging
import os

logging.basicConfig(level=logging.INFO)

def load_json(file):
    if not os.path.exists(file):
        logging.error(f"{file} no existe.")
        return None
    with open(file, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_json(data, file):
    with open(file, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

def update_data():
    logging.info("Iniciando actualización de datos...")
    bancos = load_json('data/bancos.json')
    cooperativas = load_json('data/cooperativas.json')
    indicadores = load_json('data/indicadores_sistema.json')

    if not bancos or not cooperativas or not indicadores:
        logging.error("Faltan datos para actualizar.")
        return False

    # Simulación simple: actualizar fecha en metadata
    now = datetime.now().strftime('%Y-%m-%d')
    bancos['metadata']['last_updated'] = now
    cooperativas['metadata']['last_updated'] = now
    indicadores['metadata']['last_updated'] = now

    save_json(bancos, 'data/bancos.json')
    save_json(cooperativas, 'data/cooperativas.json')
    save_json(indicadores, 'data/indicadores_sistema.json')

    logging.info("Datos actualizados correctamente.")
    return True

if __name__ == "__main__":
    update_data()
