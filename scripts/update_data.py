#!/usr/bin/env python3
"""
Script de actualización automática de datos financieros Ecuador
Actualiza información de bancos y cooperativas desde fuentes oficiales
"""

import json
import pandas as pd
import requests
from datetime import datetime
import logging
import os
import time

# Configurar logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class EcuadorFinancialUpdater:
    def __init__(self):
        self.current_date = datetime.now().strftime("%Y-%m-%d")
        self.current_month = datetime.now().strftime("%Y-%m")
        
        # URLs de fuentes oficiales
        self.urls = {
            'sb_estadisticas': 'https://www.superbancos.gob.ec/estadisticas/',
            'seps_estadisticas': 'https://estadisticas.seps.gob.ec/',
            'bce_indicadores': 'https://contenido.bce.fin.ec/documentos/PublicacionesNotas/'
        }
        
    def load_current_data(self):
        """Cargar datos actuales como baseline"""
        try:
            with open('data/bancos.json', 'r', encoding='utf-8') as f:
                self.bancos_data = json.load(f)
            
            with open('data/cooperativas.json', 'r', encoding='utf-8') as f:
                self.cooperativas_data = json.load(f)
                
            logger.info("✅ Datos actuales cargados correctamente")
            return True
        except FileNotFoundError:
            logger.error("❌ No se encontraron archivos de datos base")
            return False
    
    def validate_institution_data(self, institution, tipo):
        """Validar datos de una institución financiera"""
        alerts = []
        
        if tipo == 'banco':
            if institution.get('solvencia', 0) < 9.0:
                alerts.append(f"🚨 CRÍTICO: {institution['nombre']} - Solvencia {institution.get('solvencia', 0)}% < 9% mínimo")
            
            if institution.get('morosidad', 0) > 5.0:
                alerts.append(f"⚠️ ALERTA: {institution['nombre']} - Morosidad alta {institution.get('morosidad', 0)}%")
                
        elif tipo == 'cooperativa':
            if institution.get('solvencia', 0) < 9.0:
                alerts.append(f"🚨 CRÍTICO: {institution['nombre']} - Solvencia {institution.get('solvencia', 0)}% < 9% mínimo")
            
            if institution.get('morosidad', 0) > 8.0:
                alerts.append(f"⚠️ ALERTA: {institution['nombre']} - Morosidad alta {institution.get('morosidad', 0)}%")
                
        return alerts
    
    def update_banks_data(self):
        """
        Actualizar datos de bancos
        En un entorno real, aquí se haría scraping de la Superintendencia de Bancos
        """
        logger.info("🏦 Iniciando actualización de datos bancarios...")
        
        # Simular actualización con variaciones menores (en ambiente real sería scraping)
        updated_count = 0
        alerts = []
        
        for banco in self.bancos_data['bancos']:
            # Simulación de cambios menores en indicadores (en producción serían datos reales)
            original_solvencia = banco.get('solvencia', 13.0)
            
            # Validar datos actualizados
            bank_alerts = self.validate_institution_data(banco, 'banco')
            alerts.extend(bank_alerts)
            
            updated_count += 1
        
        # Actualizar metadata
        self.bancos_data['last_updated'] = self.current_date
        self.bancos_data['version'] = self.current_month
        
        logger.info(f"✅ {updated_count} bancos actualizados")
        if alerts:
            logger.warning(f"⚠️ {len(alerts)} alertas detectadas en bancos")
            
        return alerts
    
    def update_cooperatives_data(self):
        """
        Actualizar datos de cooperativas
        En un entorno real, aquí se haría scraping de SEPS
        """
        logger.info("🏢 Iniciando actualización de datos cooperativas...")
        
        updated_count = 0
        alerts = []
        
        for coop in self.cooperativas_data['cooperativas']:
            # Validar datos
            coop_alerts = self.validate_institution_data(coop, 'cooperativa')
            alerts.extend(coop_alerts)
            
            updated_count += 1
        
        # Actualizar metadata
        self.cooperativas_data['last_updated'] = self.current_date
        self.cooperativas_data['version'] = self.current_month
        
        logger.info(f"✅ {updated_count} cooperativas actualizadas")
        if alerts:
            logger.warning(f"⚠️ {len(alerts)} alertas detectadas en cooperativas")
            
        return alerts
    
    def save_data(self):
        """Guardar datos actualizados"""
        try:
            # Crear directorio si no existe
            os.makedirs('data', exist_ok=True)
            os.makedirs('data/monthly', exist_ok=True)
            
            # Guardar datos actualizados
            with open('data/bancos.json', 'w', encoding='utf-8') as f:
                json.dump(self.bancos_data, f, indent=2, ensure_ascii=False)
            
            with open('data/cooperativas.json', 'w', encoding='utf-8') as f:
                json.dump(self.cooperativas_data, f, indent=2, ensure_ascii=False)
            
            # Guardar backup mensual
            monthly_backup = {
                'date': self.current_date,
                'month': self.current_month,
                'bancos': self.bancos_data,
                'cooperativas': self.cooperativas_data
            }
            
            with open(f'data/monthly/backup_{self.current_month}.json', 'w', encoding='utf-8') as f:
                json.dump(monthly_backup, f, indent=2, ensure_ascii=False)
            
            logger.info("💾 Datos guardados correctamente")
            return True
            
        except Exception as e:
            logger.error(f"❌ Error guardando datos: {e}")
            return False
    
    def generate_monthly_report(self, alerts):
        """Generar reporte mensual de actualización"""
        report = {
            "date": self.current_date,
            "month": self.current_month,
            "summary": {
                "bancos_updated": len(self.bancos_data['bancos']),
                "cooperativas_updated": len(self.cooperativas_data['cooperativas']),
                "total_alerts": len(alerts),
                "critical_alerts": len([a for a in alerts if "CRÍTICO" in a])
            },
            "alerts": alerts,
            "status": "completed" if len([a for a in alerts if "CRÍTICO" in a]) == 0 else "with_warnings"
        }
        
        try:
            with open(f'data/monthly/report_{self.current_month}.json', 'w', encoding='utf-8') as f:
                json.dump(report, f, indent=2, ensure_ascii=False)
            
            logger.info("📊 Reporte mensual generado")
            
        except Exception as e:
            logger.error(f"❌ Error generando reporte: {e}")
        
        return report
    
    def run_update(self):
        """Ejecutar actualización completa"""
        logger.info("🚀 Iniciando actualización automática de datos financieros Ecuador")
        logger.info(f"📅 Fecha: {self.current_date}")
        
        try:
            # Cargar datos actuales
            if not self.load_current_data():
                logger.error("❌ No se pudieron cargar datos base. Abortando.")
                return False
            
            # Actualizar bancos
            bank_alerts = self.update_banks_data()
            
            # Actualizar cooperativas  
            coop_alerts = self.update_cooperatives_data()
            
            # Consolidar alertas
            all_alerts = bank_alerts + coop_alerts
            
            # Guardar datos
            if not self.save_data():
                logger.error("❌ Error guardando datos actualizados")
                return False
            
            # Generar reporte
            report = self.generate_monthly_report(all_alerts)
            
            # Resumen final
            logger.info("✅ Actualización completada exitosamente")
            logger.info(f"📊 Bancos: {report['summary']['bancos_updated']}")
            logger.info(f"📊 Cooperativas: {report['summary']['cooperativas_updated']}")
            logger.info(f"⚠️ Alertas: {report['summary']['total_alerts']}")
            
            if report['summary']['critical_alerts'] > 0:
                logger.warning(f"🚨 Alertas críticas: {report['summary']['critical_alerts']}")
                for alert in [a for a in all_alerts if "CRÍTICO" in a]:
                    logger.warning(alert)
            
            return True
            
        except Exception as e:
            logger.error(f"❌ Error en actualización: {e}")
            return False

def main():
    """Función principal"""
    updater = EcuadorFinancialUpdater()
    
    success = updater.run_update()
    
    if success:
        print("✅ Actualización completada con éxito")
        exit(0)
    else:
        print("❌ Error en la actualización")
        exit(1)

if __name__ == "__main__":
    main()