#!/usr/bin/env python3
"""Validate data consistency for bancos/cooperativas dataset."""

from __future__ import annotations

import json
import re
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]


@dataclass
class ValidationResult:
    errors: list[str]
    warnings: list[str]

    def ok(self) -> bool:
        return not self.errors


def load_json(path: Path) -> Any:
    with path.open("r", encoding="utf-8") as f:
        return json.load(f)


def parse_app_data(app_js_path: Path) -> dict[str, Any]:
    text = app_js_path.read_text(encoding="utf-8")
    match = re.search(r"const appData = (\{[\s\S]*?\});", text)
    if not match:
        raise ValueError("No se pudo encontrar const appData en app.js")
    return json.loads(match.group(1))


def avg(values: list[float]) -> float:
    return round(sum(values) / len(values), 2) if values else 0.0


def validate() -> ValidationResult:
    errors: list[str] = []
    warnings: list[str] = []

    bancos = load_json(ROOT / "data" / "bancos.json")
    coops = load_json(ROOT / "data" / "cooperativas.json")
    bancos_exp = load_json(ROOT / "data" / "bancos_expandidos.json")
    coops_exp = load_json(ROOT / "data" / "cooperativas_expandidas.json")
    sistema = load_json(ROOT / "data" / "indicadores_sistema.json")
    app_data = parse_app_data(ROOT / "app.js")

    req_banco = ["id", "nombre", "activos_mill", "solvencia", "morosidad", "liquidez"]
    req_coop = ["id", "nombre", "activos_mill", "solvencia", "morosidad", "liquidez"]

    # Basic structure and ranges
    for b in bancos["bancos"]:
        for key in req_banco:
            if key not in b:
                errors.append(f"bancos.json: falta {key} en banco id={b.get('id')}")
        if b.get("solvencia", 0) < 9:
            errors.append(f"bancos.json: solvencia < 9 en {b.get('nombre')}")
        if b.get("morosidad", 0) > 12:
            warnings.append(f"bancos.json: morosidad alta en {b.get('nombre')}")

    for c in coops["cooperativas"]:
        for key in req_coop:
            if key not in c:
                errors.append(f"cooperativas.json: falta {key} en cooperativa id={c.get('id')}")
        if c.get("solvencia", 0) < 9:
            errors.append(f"cooperativas.json: solvencia < 9 en {c.get('nombre')}")
        if c.get("morosidad", 0) > 15:
            warnings.append(f"cooperativas.json: morosidad alta en {c.get('nombre')}")

    # ID uniqueness
    bancos_ids = [b["id"] for b in bancos["bancos"]]
    coops_ids = [c["id"] for c in coops["cooperativas"]]
    if len(bancos_ids) != len(set(bancos_ids)):
        errors.append("bancos.json: ids duplicados")
    if len(coops_ids) != len(set(coops_ids)):
        errors.append("cooperativas.json: ids duplicados")

    # Simplified vs expanded checks
    if len(bancos["bancos"]) != len(bancos_exp["bancos"]):
        errors.append("Diferencia de numero de bancos entre simplificado y expandido")
    if len(coops["cooperativas"]) != len(coops_exp["cooperativas"]):
        errors.append("Diferencia de numero de cooperativas entre simplificado y expandido")

    exp_bancos_by_id = {b["id"]: b for b in bancos_exp["bancos"]}
    exp_coops_by_id = {c["id"]: c for c in coops_exp["cooperativas"]}

    for b in bancos["bancos"]:
        src = exp_bancos_by_id.get(b["id"])
        if not src:
            errors.append(f"Banco id={b['id']} no existe en expandido")
            continue
        if b["nombre"] != src["nombre"]:
            errors.append(f"Nombre banco distinto para id={b['id']}")

    for c in coops["cooperativas"]:
        src = exp_coops_by_id.get(c["id"])
        if not src:
            errors.append(f"Cooperativa id={c['id']} no existe en expandido")
            continue
        if c["nombre"] != src["nombre"]:
            errors.append(f"Nombre cooperativa distinto para id={c['id']}")

    # Aggregates coherence
    total_bancos = round(sum(b["activos_mill"] for b in bancos_exp["bancos"]), 2)
    total_coops = round(sum(c["activos_mill"] for c in coops_exp["cooperativas"]), 2)
    app_total_bancos = round(app_data["indicadores_sistema"]["sistema_general"]["total_activos_bancos"], 2)
    app_total_coops = round(app_data["indicadores_sistema"]["sistema_general"]["total_activos_coops"], 2)

    if total_bancos != app_total_bancos:
        errors.append(f"Total bancos no cuadra app.js ({app_total_bancos}) vs data ({total_bancos})")
    if total_coops != app_total_coops:
        errors.append(f"Total coops no cuadra app.js ({app_total_coops}) vs data ({total_coops})")

    b_roa = avg([b["roa"] for b in bancos_exp["bancos"]])
    b_roe = avg([b["roe"] for b in bancos_exp["bancos"]])
    b_solv = avg([b["solvencia"] for b in bancos_exp["bancos"]])
    b_moro = avg([b["morosidad"] for b in bancos_exp["bancos"]])
    b_liq = avg([b["liquidez"] for b in bancos_exp["bancos"]])

    c_roa = avg([c["roa"] for c in coops_exp["cooperativas"]])
    c_roe = avg([c["roe"] for c in coops_exp["cooperativas"]])
    c_solv = avg([c["solvencia"] for c in coops_exp["cooperativas"]])
    c_moro = avg([c["morosidad"] for c in coops_exp["cooperativas"]])
    c_liq = avg([c["liquidez"] for c in coops_exp["cooperativas"]])

    app_b = app_data["indicadores_sistema"]["bancos_promedio"]
    app_c = app_data["indicadores_sistema"]["cooperativas_promedio"]

    checks = [
        (round(app_b["roa"], 2), b_roa, "ROA bancos"),
        (round(app_b["roe"], 2), b_roe, "ROE bancos"),
        (round(app_b["solvencia"], 2), b_solv, "Solvencia bancos"),
        (round(app_b["morosidad"], 2), b_moro, "Morosidad bancos"),
        (round(app_b["liquidez"], 2), b_liq, "Liquidez bancos"),
        (round(app_c["roa"], 2), c_roa, "ROA coops"),
        (round(app_c["roe"], 2), c_roe, "ROE coops"),
        (round(app_c["solvencia"], 2), c_solv, "Solvencia coops"),
        (round(app_c["morosidad"], 2), c_moro, "Morosidad coops"),
        (round(app_c["liquidez"], 2), c_liq, "Liquidez coops"),
    ]

    for app_v, calc_v, label in checks:
        if app_v != calc_v:
            errors.append(f"{label} no cuadra app.js ({app_v}) vs calculado ({calc_v})")

    sis = sistema["sistema"]["indicadores"]
    if round(sis["bancos"]["solvencia_promedio"], 2) != b_solv:
        errors.append("indicadores_sistema.json: solvencia promedio bancos inconsistente")
    if round(sis["cooperativas"]["morosidad_promedio"], 2) != c_moro:
        errors.append("indicadores_sistema.json: morosidad promedio coops inconsistente")

    return ValidationResult(errors=errors, warnings=warnings)


def main() -> int:
    result = validate()

    print("=== VALIDACION DE DATOS 2026 ===")
    print(f"Errores: {len(result.errors)}")
    print(f"Advertencias: {len(result.warnings)}")

    if result.errors:
        for err in result.errors:
            print(f"ERROR: {err}")

    if result.warnings:
        for w in result.warnings:
            print(f"WARN: {w}")

    if result.ok():
        print("OK: validacion completada sin errores")
        return 0

    print("FAIL: se encontraron errores de consistencia")
    return 1


if __name__ == "__main__":
    sys.exit(main())
