// Data from JSON
const appData = {
    "bancos":  [
                   {
                       "id":  1,
                       "nombre":  "Banco Pichincha",
                       "activos_mill":  22820.93,
                       "patrimonio_mill":  2330.45,
                       "calificacion":  "AA+",
                       "solvencia":  14.56,
                       "morosidad":  3.04,
                       "liquidez":  32,
                       "cobertura":  207,
                       "liquidez_inmediata":  22,
                       "morosidad_consumo":  3.42,
                       "morosidad_comercial":  2.38,
                       "cartera_vencida":  3.04,
                       "depositos_corto_plazo":  67.2,
                       "roa":  0.71,
                       "roe":  10.1,
                       "cir":  54,
                       "solvencia_estructural":  14.56,
                       "calce_plazos":  8.2,
                       "diversificacion_fondeo":  8,
                       "crecimiento_cartera_12m":  10,
                       "productos_credito":  {
                                                 "consumo":  {
                                                                 "monto_min":  1000,
                                                                 "monto_max":  200000,
                                                                 "tasa_min":  9.5,
                                                                 "tasa_max":  12.8,
                                                                 "plazo_max_meses":  60,
                                                                 "requisitos":  [
                                                                                    "Cedula",
                                                                                    "RUC/RISE",
                                                                                    "Rol de pagos",
                                                                                    "Cuenta corriente/ahorros"
                                                                                ]
                                                             },
                                                 "hipotecario":  {
                                                                     "monto_min":  15000,
                                                                     "monto_max":  400000,
                                                                     "tasa_min":  7.2,
                                                                     "tasa_max":  8.9,
                                                                     "plazo_max_meses":  240,
                                                                     "financiamiento_max":  80,
                                                                     "requisitos":  [
                                                                                        "Entrada 20%",
                                                                                        "Ingresos demostrables",
                                                                                        "Avaluo",
                                                                                        "Escrituras"
                                                                                    ]
                                                                 },
                                                 "pyme":  {
                                                              "monto_min":  5000,
                                                              "monto_max":  500000,
                                                              "tasa_min":  10.8,
                                                              "tasa_max":  14.2,
                                                              "plazo_max_meses":  48,
                                                              "requisitos":  [
                                                                                 "RUC activo",
                                                                                 "Balances",
                                                                                 "Flujo de caja",
                                                                                 "Garantias"
                                                                             ]
                                                          }
                                             },
                       "estado":  "Activo",
                       "supervision":  "Superintendencia de Bancos",
                       "website":  "https://www.pichincha.com",
                       "tipo":  "banco"
                   },
                   {
                       "id":  2,
                       "nombre":  "Banco del Pacifico",
                       "activos_mill":  10489.69,
                       "patrimonio_mill":  1075.87,
                       "calificacion":  "AA",
                       "solvencia":  14.16,
                       "morosidad":  3.34,
                       "liquidez":  28,
                       "cobertura":  190,
                       "liquidez_inmediata":  21,
                       "morosidad_consumo":  3.72,
                       "morosidad_comercial":  2.78,
                       "cartera_vencida":  3.34,
                       "depositos_corto_plazo":  70.5,
                       "roa":  1.68,
                       "roe":  16.32,
                       "cir":  50,
                       "solvencia_estructural":  14.16,
                       "calce_plazos":  8.8,
                       "diversificacion_fondeo":  8.4,
                       "crecimiento_cartera_12m":  13,
                       "productos_credito":  {
                                                 "consumo":  {
                                                                 "monto_min":  500,
                                                                 "monto_max":  150000,
                                                                 "tasa_min":  9.8,
                                                                 "tasa_max":  13.5,
                                                                 "plazo_max_meses":  60,
                                                                 "requisitos":  [
                                                                                    "Cedula",
                                                                                    "Ingresos",
                                                                                    "Referencias",
                                                                                    "Cuenta en el banco"
                                                                                ]
                                                             },
                                                 "hipotecario":  {
                                                                     "monto_min":  20000,
                                                                     "monto_max":  350000,
                                                                     "tasa_min":  7.8,
                                                                     "tasa_max":  9.2,
                                                                     "plazo_max_meses":  300,
                                                                     "financiamiento_max":  75,
                                                                     "requisitos":  [
                                                                                        "Entrada 25%",
                                                                                        "Estabilidad laboral",
                                                                                        "Avaluo comercial",
                                                                                        "Seguro hipotecario"
                                                                                    ]
                                                                 },
                                                 "pyme":  {
                                                              "monto_min":  3000,
                                                              "monto_max":  300000,
                                                              "tasa_min":  11.2,
                                                              "tasa_max":  15.1,
                                                              "plazo_max_meses":  60,
                                                              "requisitos":  [
                                                                                 "Experiencia comercial",
                                                                                 "Estados financieros",
                                                                                 "Plan de negocios",
                                                                                 "Garantias reales"
                                                                             ]
                                                          }
                                             },
                       "estado":  "Activo",
                       "supervision":  "Superintendencia de Bancos",
                       "website":  "https://www.bancodelpacifico.com",
                       "tipo":  "banco"
                   },
                   {
                       "id":  3,
                       "nombre":  "Banco Guayaquil",
                       "activos_mill":  10218.08,
                       "patrimonio_mill":  911.14,
                       "calificacion":  "AA",
                       "solvencia":  13.86,
                       "morosidad":  3.24,
                       "liquidez":  26,
                       "cobertura":  194,
                       "liquidez_inmediata":  20,
                       "morosidad_consumo":  3.52,
                       "morosidad_comercial":  2.68,
                       "cartera_vencida":  3.24,
                       "depositos_corto_plazo":  68.3,
                       "roa":  1.3,
                       "roe":  14.53,
                       "cir":  53,
                       "solvencia_estructural":  13.86,
                       "calce_plazos":  8.5,
                       "diversificacion_fondeo":  8.1,
                       "crecimiento_cartera_12m":  9,
                       "productos_credito":  {
                                                 "consumo":  {
                                                                 "monto_min":  1000,
                                                                 "monto_max":  180000,
                                                                 "tasa_min":  10.2,
                                                                 "tasa_max":  13.8,
                                                                 "plazo_max_meses":  72,
                                                                 "requisitos":  [
                                                                                    "Documento identidad",
                                                                                    "Comprobante ingresos",
                                                                                    "Referencias comerciales",
                                                                                    "Cuenta activa"
                                                                                ]
                                                             },
                                                 "hipotecario":  {
                                                                     "monto_min":  25000,
                                                                     "monto_max":  450000,
                                                                     "tasa_min":  7.5,
                                                                     "tasa_max":  8.8,
                                                                     "plazo_max_meses":  360,
                                                                     "financiamiento_max":  85,
                                                                     "requisitos":  [
                                                                                        "Entrada 15%",
                                                                                        "Certificados ingresos",
                                                                                        "Avaluo actualizado",
                                                                                        "Poliza seguro"
                                                                                    ]
                                                                 },
                                                 "pyme":  {
                                                              "monto_min":  2000,
                                                              "monto_max":  400000,
                                                              "tasa_min":  11.5,
                                                              "tasa_max":  14.8,
                                                              "plazo_max_meses":  72,
                                                              "requisitos":  [
                                                                                 "RUC vigente",
                                                                                 "Declaraciones SRI",
                                                                                 "Balances auditados",
                                                                                 "Experiencia sector"
                                                                             ]
                                                          }
                                             },
                       "estado":  "Activo",
                       "supervision":  "Superintendencia de Bancos",
                       "website":  "https://www.bancoguayaquil.com",
                       "tipo":  "banco"
                   },
                   {
                       "id":  4,
                       "nombre":  "Produbanco",
                       "activos_mill":  9599.94,
                       "patrimonio_mill":  742.5,
                       "calificacion":  "AA+",
                       "solvencia":  14.46,
                       "morosidad":  3.14,
                       "liquidez":  31,
                       "cobertura":  212,
                       "liquidez_inmediata":  23,
                       "morosidad_consumo":  3.32,
                       "morosidad_comercial":  2.58,
                       "cartera_vencida":  3.14,
                       "depositos_corto_plazo":  65.7,
                       "roa":  0.44,
                       "roe":  5.75,
                       "cir":  57,
                       "solvencia_estructural":  14.46,
                       "calce_plazos":  7.9,
                       "diversificacion_fondeo":  8.7,
                       "crecimiento_cartera_12m":  7,
                       "productos_credito":  {
                                                 "consumo":  {
                                                                 "monto_min":  2500,
                                                                 "monto_max":  300000,
                                                                 "tasa_min":  10.5,
                                                                 "tasa_max":  13.5,
                                                                 "plazo_max_meses":  60,
                                                                 "requisitos":  [
                                                                                    "Cedula vigente",
                                                                                    "Estabilidad laboral",
                                                                                    "Ingresos demostrables",
                                                                                    "Buen historial crediticio"
                                                                                ]
                                                             },
                                                 "hipotecario":  {
                                                                     "monto_min":  30000,
                                                                     "monto_max":  500000,
                                                                     "tasa_min":  7.5,
                                                                     "tasa_max":  9.0,
                                                                     "plazo_max_meses":  240,
                                                                     "financiamiento_max":  80,
                                                                     "requisitos":  [
                                                                                        "Entrada 20%",
                                                                                        "Ingresos estables",
                                                                                        "Avaluo comercial",
                                                                                        "Escrituras globales"
                                                                                    ]
                                                                 },
                                                 "pyme":  {
                                                              "monto_min":  5000,
                                                              "monto_max":  1000000,
                                                              "tasa_min":  11.0,
                                                              "tasa_max":  14.0,
                                                              "plazo_max_meses":  48,
                                                              "requisitos":  [
                                                                                 "RUC activo 2 anos",
                                                                                 "Estados financieros",
                                                                                 "Flujos proyectados",
                                                                                 "Garantias suficientes"
                                                                             ]
                                                          }
                                             },
                       "estado":  "Activo",
                       "supervision":  "Superintendencia de Bancos",
                       "website":  "https://www.produbanco.com.ec",
                       "tipo":  "banco"
                   }
               ],
    "cooperativas":  [
                         {
                             "id":  1,
                             "nombre":  "Juventud Ecuatoriana Progresista (JEP)",
                             "nombre_corto":  "JEP",
                             "ruc":  "0190115798001",
                             "activos_mill":  4517.86,
                             "patrimonio_mill":  442.12,
                             "segmento":  1,
                             "calificacion":  "A+",
                             "solvencia":  18,
                             "morosidad":  5.48,
                             "liquidez":  23,
                             "cobertura":  183,
                             "liquidez_inmediata":  18,
                             "captaciones_corto_plazo":  79,
                             "morosidad_consumo":  5.96,
                             "morosidad_microcredito":  7.64,
                             "morosidad_comercial":  4.3,
                             "cartera_improductiva":  5.48,
                             "roa":  1.69,
                             "roe":  12.8,
                             "eficiencia_operativa":  84,
                             "solvencia_estructural":  18,
                             "crecimiento_patrimonial_12m":  16,
                             "crecimiento_socios_12m":  10,
                             "diversificacion_productos":  8.8,
                             "productos_credito":  {
                                                       "consumo":  {
                                                                       "monto_min":  300,
                                                                       "monto_max":  50000,
                                                                       "tasa_min":  12.5,
                                                                       "tasa_max":  16.8,
                                                                       "plazo_max_meses":  60,
                                                                       "requisitos":  [
                                                                                          "Socio activo",
                                                                                          "Cedula",
                                                                                          "Certificado ingresos",
                                                                                          "Garante personal"
                                                                                      ],
                                                                       "ventajas":  [
                                                                                        "Tramite agil",
                                                                                        "Menos documentos",
                                                                                        "Tasas preferenciales socios"
                                                                                    ]
                                                                   },
                                                       "microcredito":  {
                                                                            "monto_min":  500,
                                                                            "monto_max":  20000,
                                                                            "tasa_min":  15.2,
                                                                            "tasa_max":  22.5,
                                                                            "plazo_max_meses":  36,
                                                                            "requisitos":  [
                                                                                               "Actividad economica",
                                                                                               "RUC/RISE",
                                                                                               "Referencias comerciales",
                                                                                               "Capacidad pago"
                                                                                           ],
                                                                            "ventajas":  [
                                                                                             "Evaluacion in situ",
                                                                                             "Flexibilidad garantias",
                                                                                             "Acompanamiento tecnico"
                                                                                         ]
                                                                        },
                                                       "credipymes":  {
                                                                          "monto_min":  1000,
                                                                          "monto_max":  1000000,
                                                                          "tasa_min":  11.33,
                                                                          "tasa_max":  16.8,
                                                                          "plazo_max_meses":  48,
                                                                          "requisitos":  [
                                                                                             "RUC activo",
                                                                                             "Balances",
                                                                                             "Plan inversion",
                                                                                             "Garantias reales/personales"
                                                                                         ],
                                                                          "ventajas":  [
                                                                                           "Tasa competitiva",
                                                                                           "Seguimiento personalizado",
                                                                                           "Periodos gracia"
                                                                                       ]
                                                                      },
                                                       "hipotecario":  {
                                                                           "monto_min":  10000,
                                                                           "monto_max":  200000,
                                                                           "tasa_min":  8.9,
                                                                           "tasa_max":  11.5,
                                                                           "plazo_max_meses":  180,
                                                                           "financiamiento_max":  70,
                                                                           "requisitos":  [
                                                                                              "Socio 6 meses",
                                                                                              "Entrada 30%",
                                                                                              "Avaluo",
                                                                                              "Seguro hipotecario"
                                                                                          ],
                                                                           "ventajas":  [
                                                                                            "Menor entrada",
                                                                                            "Proceso personalizado",
                                                                                            "Tasas fijas"
                                                                                        ]
                                                                       }
                                                   },
                             "estado":  "Activa",
                             "provincia":  "Pichincha",
                             "socios_aprox":  201105,
                             "supervision":  "SEPS",
                             "website":  "https://www.jep.coop",
                             "tipo":  "cooperativa"
                         },
                         {
                             "id":  2,
                             "nombre":  "Jardin Azuayo",
                             "nombre_corto":  "Jardin Azuayo",
                             "ruc":  "0190155722001",
                             "activos_mill":  2522.012,
                             "patrimonio_mill":  334.69,
                             "segmento":  1,
                             "calificacion":  "A+",
                             "solvencia":  19,
                             "morosidad":  5.88,
                             "liquidez":  21,
                             "cobertura":  176,
                             "liquidez_inmediata":  17,
                             "captaciones_corto_plazo":  82,
                             "morosidad_consumo":  6.56,
                             "morosidad_microcredito":  8.04,
                             "morosidad_comercial":  4.5,
                             "cartera_improductiva":  5.88,
                             "roa":  1.94,
                             "roe":  14.4,
                             "eficiencia_operativa":  82,
                             "solvencia_estructural":  19,
                             "crecimiento_patrimonial_12m":  14,
                             "crecimiento_socios_12m":  7,
                             "diversificacion_productos":  9.3,
                             "productos_credito":  {
                                                       "consumo":  {
                                                                       "monto_min":  500,
                                                                       "monto_max":  40000,
                                                                       "tasa_min":  13.2,
                                                                       "tasa_max":  17.5,
                                                                       "plazo_max_meses":  48,
                                                                       "requisitos":  [
                                                                                          "Antiguedad socio 3 meses",
                                                                                          "Cedula",
                                                                                          "Rol pagos",
                                                                                          "Garante"
                                                                                      ],
                                                                       "ventajas":  [
                                                                                        "Tasa diferenciada socios",
                                                                                        "Sin comisiones",
                                                                                        "Aprobacion rapida"
                                                                                    ]
                                                                   },
                                                       "microcredito":  {
                                                                            "monto_min":  300,
                                                                            "monto_max":  15000,
                                                                            "tasa_min":  16.8,
                                                                            "tasa_max":  24.2,
                                                                            "plazo_max_meses":  24,
                                                                            "requisitos":  [
                                                                                               "Actividad 6 meses",
                                                                                               "Referencias",
                                                                                               "Visita negocio",
                                                                                               "Croquis ubicacion"
                                                                                           ],
                                                                            "ventajas":  [
                                                                                             "Metodologia grupal",
                                                                                             "Capacitacion empresarial",
                                                                                             "Renovacion automatica"
                                                                                         ]
                                                                        },
                                                       "agropecuario":  {
                                                                            "monto_min":  1000,
                                                                            "monto_max":  50000,
                                                                            "tasa_min":  11.8,
                                                                            "tasa_max":  16.2,
                                                                            "plazo_max_meses":  60,
                                                                            "requisitos":  [
                                                                                               "Actividad agropecuaria",
                                                                                               "Titulo propiedad",
                                                                                               "Asistencia tecnica",
                                                                                               "Seguro cultivos"
                                                                                           ],
                                                                            "ventajas":  [
                                                                                             "Periodos gracia",
                                                                                             "Pagos estacionales",
                                                                                             "Asesoria tecnica"
                                                                                         ]
                                                                        },
                                                       "vivienda":  {
                                                                        "monto_min":  8000,
                                                                        "monto_max":  150000,
                                                                        "tasa_min":  9.5,
                                                                        "tasa_max":  12.2,
                                                                        "plazo_max_meses":  180,
                                                                        "financiamiento_max":  80,
                                                                        "requisitos":  [
                                                                                           "Socio 1 ano",
                                                                                           "Entrada 20%",
                                                                                           "Avaluo",
                                                                                           "Polizas"
                                                                                       ],
                                                                        "ventajas":  [
                                                                                         "Menor entrada que bancos",
                                                                                         "Proceso agil",
                                                                                         "Tasas competitivas"
                                                                                     ]
                                                                    }
                                                   },
                             "estado":  "Activa",
                             "provincia":  "Azuay",
                             "socios_aprox":  156415,
                             "supervision":  "SEPS",
                             "website":  "https://www.jardinazuayo.fin.ec",
                             "tipo":  "cooperativa"
                         },
                         {
                             "id":  3,
                             "nombre":  "Policia Nacional",
                             "nombre_corto":  "Policia Nacional",
                             "ruc":  "1790866084001",
                             "activos_mill":  1823.62,
                             "patrimonio_mill":  165.58,
                             "segmento":  1,
                             "calificacion":  "A",
                             "solvencia":  17,
                             "morosidad":  5.58,
                             "liquidez":  22,
                             "cobertura":  170,
                             "liquidez_inmediata":  19,
                             "captaciones_corto_plazo":  86,
                             "morosidad_consumo":  4.96,
                             "morosidad_microcredito":  8.94,
                             "morosidad_comercial":  4.2,
                             "cartera_improductiva":  5.58,
                             "roa":  1.04,
                             "roe":  9.4,
                             "eficiencia_operativa":  91,
                             "solvencia_estructural":  17,
                             "crecimiento_patrimonial_12m":  12,
                             "crecimiento_socios_12m":  3,
                             "diversificacion_productos":  6.9,
                             "productos_credito":  {
                                                       "consumo_policial":  {
                                                                                "monto_min":  500,
                                                                                "monto_max":  100000,
                                                                                "tasa_min":  8.5,
                                                                                "tasa_max":  12.8,
                                                                                "plazo_max_meses":  72,
                                                                                "requisitos":  [
                                                                                                   "Miembro activo Policia",
                                                                                                   "Antiguedad",
                                                                                                   "Descuento rol",
                                                                                                   "Garante institucional"
                                                                                               ],
                                                                                "ventajas":  [
                                                                                                 "Tasas preferenciales",
                                                                                                 "Descuento automatico",
                                                                                                 "Montos altos",
                                                                                                 "Sin garante externo"
                                                                                             ]
                                                                            },
                                                       "consumo_general":  {
                                                                               "monto_min":  300,
                                                                               "monto_max":  25000,
                                                                               "tasa_min":  14.5,
                                                                               "tasa_max":  18.2,
                                                                               "plazo_max_meses":  48,
                                                                               "requisitos":  [
                                                                                                  "Socio cooperativa",
                                                                                                  "Ingresos comprobados",
                                                                                                  "Referencias",
                                                                                                  "Capacidad pago"
                                                                                              ],
                                                                               "ventajas":  [
                                                                                                "Proceso rapido",
                                                                                                "Requisitos flexibles",
                                                                                                "Atencion personalizada"
                                                                                            ]
                                                                           },
                                                       "emergencia":  {
                                                                          "monto_min":  200,
                                                                          "monto_max":  5000,
                                                                          "tasa_min":  15.8,
                                                                          "tasa_max":  19.5,
                                                                          "plazo_max_meses":  24,
                                                                          "requisitos":  [
                                                                                             "Socio activo",
                                                                                             "Justificacion emergencia",
                                                                                             "Descuento automatico"
                                                                                         ],
                                                                          "ventajas":  [
                                                                                           "Aprobacion inmediata",
                                                                                           "Desembolso 24h",
                                                                                           "Sin papeleos"
                                                                                       ]
                                                                      }
                                                   },
                             "estado":  "Activa",
                             "provincia":  "Pichincha",
                             "socios_aprox":  106139,
                             "supervision":  "SEPS",
                             "website":  "https://www.cooppolicianacional.fin.ec",
                             "tipo":  "cooperativa"
                         }
                     ],
    "indicadores_sistema":  {
                                "bancos_promedio":  {
                                                        "roa":  1.03,
                                                        "roe":  11.68,
                                                        "solvencia":  14.26,
                                                        "morosidad":  3.19,
                                                        "liquidez":  29.25,
                                                        "cir":  53.5
                                                    },
                                "cooperativas_promedio":  {
                                                              "roa":  1.56,
                                                              "roe":  12.2,
                                                              "solvencia":  18,
                                                              "morosidad":  5.65,
                                                              "liquidez":  22,
                                                              "eficiencia":  85.67
                                                          },
                                "sistema_general":  {
                                                        "total_activos_bancos":  53128.64,
                                                        "total_activos_coops":  8863.49,
                                                        "seguro_depositos":  32000,
                                                        "instituciones_supervisadas":  176
                                                    }
                            },
    "alertas_crea":  {
                         "fecha_liquidacion":  "2025-07-29",
                         "solvencia_final":  3.36,
                         "perdidas_estimadas":  189.5,
                         "socios_afectados":  75211,
                         "lecciones":  [
                                           "Monitorear solvencia y cobertura de cartera improductiva cada mes.",
                                           "Diversificar por institucion y por plazo para evitar concentracion de riesgo.",
                                           "No exceder el limite cubierto por COSEDE por institucion.",
                                           "Priorizar entidades con calificacion alta y rentabilidad sostenible.",
                                           "Revisar alertas de morosidad y crecimiento acelerado de cartera."
                                       ]
                     }
};



// Global variables
let currentTheme = 'light';
let charts = {};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupTabNavigation();
    setupEventListeners();
    loadDashboard();
    loadBancosTable();
    loadCooperativasTable();
    loadIndicatorsTable();
    loadCreditProducts();
    setupComparator();
    setupThemeToggle();
}

function setupTabNavigation() {
    document.querySelectorAll('.nav__tab').forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const targetTab = this.dataset.tab;
            
            // Update active tab
            document.querySelectorAll('.nav__tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show target content
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
                
                // Load specific content if needed
                if (targetTab === 'dashboard') {
                    loadDashboard();
                } else if (targetTab === 'indicadores') {
                    setTimeout(() => createRadarChart(), 100);
                }
            }
        });
    });
}

function setupEventListeners() {
    // Theme toggle - separate event listener
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleTheme();
        });
    }
    
    // Modal close
    const modalClose = document.getElementById('modal-close');
    const modal = document.getElementById('institution-modal');
    
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target.classList.contains('modal__backdrop')) closeModal();
        });
    }
    
    // Credit filters
    const filterCreditsBtn = document.getElementById('filter-credits');
    if (filterCreditsBtn) {
        filterCreditsBtn.addEventListener('click', filterCreditProducts);
    }
    
    // Comparator
    const generateComparisonBtn = document.getElementById('generate-comparison');
    if (generateComparisonBtn) {
        generateComparisonBtn.addEventListener('click', generateComparison);
    }
    
    // Risk simulator
    const simulateBtn = document.getElementById('simulate-diversification');
    if (simulateBtn) {
        simulateBtn.addEventListener('click', simulateDiversification);
    }
    
    // Indicators filters
    document.querySelectorAll('.indicators-filters .btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.indicators-filters .btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterIndicators(this.dataset.filter);
        });
    });
}

function loadDashboard() {
    setTimeout(() => {
        createSectorsChart();
        createIndicatorsChart();
    }, 100);
}

function createSectorsChart() {
    const canvas = document.getElementById('sectorsChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    if (charts.sectorsChart) {
        charts.sectorsChart.destroy();
    }
    
    charts.sectorsChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Bancos', 'Cooperativas'],
            datasets: [{
                data: [
                    appData.indicadores_sistema.sistema_general.total_activos_bancos,
                    appData.indicadores_sistema.sistema_general.total_activos_coops
                ],
                backgroundColor: ['#1FB8CD', '#FFC185'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Distribucion de Activos por Sector (Millones USD)'
                },
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function createIndicatorsChart() {
    const canvas = document.getElementById('indicatorsChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    if (charts.indicatorsChart) {
        charts.indicatorsChart.destroy();
    }
    
    charts.indicatorsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['ROA', 'ROE', 'Solvencia', 'Morosidad', 'Liquidez'],
            datasets: [{
                label: 'Bancos',
                data: [
                    appData.indicadores_sistema.bancos_promedio.roa,
                    appData.indicadores_sistema.bancos_promedio.roe,
                    appData.indicadores_sistema.bancos_promedio.solvencia,
                    appData.indicadores_sistema.bancos_promedio.morosidad,
                    appData.indicadores_sistema.bancos_promedio.liquidez
                ],
                backgroundColor: '#1FB8CD'
            }, {
                label: 'Cooperativas',
                data: [
                    appData.indicadores_sistema.cooperativas_promedio.roa,
                    appData.indicadores_sistema.cooperativas_promedio.roe,
                    appData.indicadores_sistema.cooperativas_promedio.solvencia,
                    appData.indicadores_sistema.cooperativas_promedio.morosidad,
                    appData.indicadores_sistema.cooperativas_promedio.liquidez
                ],
                backgroundColor: '#FFC185'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Indicadores Promedio por Sector'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function loadBancosTable() {
    const tbody = document.getElementById('bancos-tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    appData.bancos.forEach(banco => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <strong>${banco.nombre}</strong>
                <div style="font-size: 0.8em; color: var(--color-text-secondary);">${banco.calificacion}</div>
            </td>
            <td>$${banco.activos_mill.toLocaleString()}</td>
            <td><span class="status-indicator status-indicator--${getRatingClass(banco.calificacion)}">${banco.calificacion}</span></td>
            <td>${banco.solvencia}%</td>
            <td>${banco.morosidad}%</td>
            <td>${banco.roa}%</td>
            <td>${banco.roe}%</td>
            <td>${banco.liquidez}%</td>
            <td>
                <button class="btn btn--outline btn--sm action-btn" onclick="showInstitutionDetails('banco', ${banco.id})">Ver detalles</button>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    setupTableSorting('bancos-table');
}

function loadCooperativasTable() {
    const tbody = document.getElementById('cooperativas-tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    appData.cooperativas.forEach(coop => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <strong>${coop.nombre_corto}</strong>
                <div style="font-size: 0.8em; color: var(--color-text-secondary);">${coop.calificacion}</div>
            </td>
            <td>$${coop.activos_mill.toLocaleString()}</td>
            <td><span class="status-indicator status-indicator--${getRatingClass(coop.calificacion)}">${coop.calificacion}</span></td>
            <td>${coop.solvencia}%</td>
            <td>${coop.morosidad}%</td>
            <td>${coop.roa}%</td>
            <td>${coop.roe}%</td>
            <td>${coop.socios_aprox.toLocaleString()}</td>
            <td>
                <button class="btn btn--outline btn--sm action-btn" onclick="showInstitutionDetails('cooperativa', ${coop.id})">Ver detalles</button>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    setupTableSorting('cooperativas-table');
}

function loadIndicatorsTable() {
    const tbody = document.getElementById('indicators-tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    const allInstitutions = [...appData.bancos, ...appData.cooperativas];
    
    allInstitutions.forEach(inst => {
        const crecimiento = inst.crecimiento_cartera_12m || inst.crecimiento_patrimonial_12m || 0;
        const semaforo = getSemaforoRating(inst);
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${inst.nombre_corto || inst.nombre}</td>
            <td>${inst.roa}%</td>
            <td>${inst.roe}%</td>
            <td>${inst.cir || 'N/A'}</td>
            <td>${inst.solvencia}%</td>
            <td>${crecimiento}%</td>
            <td><span class="status-indicator status-indicator--${semaforo.class}">${semaforo.text}</span></td>
        `;
        tbody.appendChild(row);
    });
}

function createRadarChart() {
    const canvas = document.getElementById('radarChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    if (charts.radarChart) {
        charts.radarChart.destroy();
    }
    
    // Sample institutions for radar chart
    const sampleInstitutions = [
        appData.bancos[0], // Pichincha
        appData.cooperativas[0], // JEP
        appData.bancos[1] // Pacifico
    ];
    
    const datasets = sampleInstitutions.map((inst, index) => ({
        label: inst.nombre_corto || inst.nombre.split(' ')[0],
        data: [
            inst.roa,
            inst.roe,
            100 - (inst.cir || 50), // Inverted for better visualization
            inst.solvencia,
            inst.liquidez
        ],
        backgroundColor: `rgba(${['31, 184, 205', '255, 193, 133', '180, 65, 60'][index]}, 0.2)`,
        borderColor: `rgb(${['31, 184, 205', '255, 193, 133', '180, 65, 60'][index]})`,
        pointBackgroundColor: `rgb(${['31, 184, 205', '255, 193, 133', '180, 65, 60'][index]})`,
        borderWidth: 2
    }));
    
    charts.radarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['ROA', 'ROE', 'Eficiencia', 'Solvencia', 'Liquidez'],
            datasets: datasets
        },
        options: {
            responsive: true,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 50
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Comparacion Multidimensional'
                }
            }
        }
    });
}

function loadCreditProducts() {
    const container = document.getElementById('credit-products');
    if (!container) return;
    
    container.innerHTML = '';
    
    const allProducts = [];
    
    // Extract products from banks
    appData.bancos.forEach(banco => {
        Object.entries(banco.productos_credito).forEach(([tipo, producto]) => {
            allProducts.push({
                institucion: banco.nombre,
                tipo: tipo,
                ...producto,
                sector: 'banco'
            });
        });
    });
    
    // Extract products from cooperatives
    appData.cooperativas.forEach(coop => {
        Object.entries(coop.productos_credito).forEach(([tipo, producto]) => {
            allProducts.push({
                institucion: coop.nombre_corto,
                tipo: tipo,
                ...producto,
                sector: 'cooperativa'
            });
        });
    });
    
    displayCreditProducts(allProducts);
}

function displayCreditProducts(products) {
    const container = document.getElementById('credit-products');
    if (!container) return;
    
    container.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'credit-product';
        
        const ventajas = product.ventajas ? 
            `<div class="product-advantages">
                <strong>Ventajas:</strong>
                <ul>${product.ventajas.map(v => `<li>${v}</li>`).join('')}</ul>
            </div>` : '';
        
        productCard.innerHTML = `
            <div class="product-header">
                <div class="product-title">${product.institucion}</div>
                <div class="product-type">${product.tipo}</div>
            </div>
            <div class="product-details">
                <div class="detail-item">
                    <span class="detail-label">Monto:</span>
                    <span class="detail-value">$${product.monto_min.toLocaleString()} - $${product.monto_max.toLocaleString()}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Tasa:</span>
                    <span class="detail-value">${product.tasa_min}% - ${product.tasa_max}%</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Plazo maximo:</span>
                    <span class="detail-value">${product.plazo_max_meses} meses</span>
                </div>
                ${product.financiamiento_max ? `
                <div class="detail-item">
                    <span class="detail-label">Financiamiento:</span>
                    <span class="detail-value">Hasta ${product.financiamiento_max}%</span>
                </div>
                ` : ''}
            </div>
            ${ventajas}
            <button class="apply-btn" onclick="calculateLoan(${product.monto_min}, ${product.tasa_min}, 24)">
                Calcular Cuota
            </button>
        `;
        
        container.appendChild(productCard);
    });
}

function filterCreditProducts() {
    const typeSelect = document.getElementById('credit-type');
    const amountInput = document.getElementById('credit-amount');
    const termInput = document.getElementById('credit-term');
    
    if (!typeSelect || !amountInput || !termInput) return;
    
    const type = typeSelect.value;
    const amount = parseInt(amountInput.value) || 0;
    const term = parseInt(termInput.value) || 0;
    
    const allProducts = [];
    
    // Extract and filter products
    [...appData.bancos, ...appData.cooperativas].forEach(inst => {
        Object.entries(inst.productos_credito).forEach(([tipo, producto]) => {
            if (type !== 'all' && !tipo.includes(type)) return;
            if (amount > 0 && (amount < producto.monto_min || amount > producto.monto_max)) return;
            if (term > 0 && term > producto.plazo_max_meses) return;
            
            allProducts.push({
                institucion: inst.nombre_corto || inst.nombre,
                tipo: tipo,
                ...producto,
                sector: inst.tipo
            });
        });
    });
    
    displayCreditProducts(allProducts);
}

function calculateLoan(amount, rate, term) {
    const monthlyRate = rate / 100 / 12;
    const payment = (amount * monthlyRate * Math.pow(1 + monthlyRate, term)) / 
                   (Math.pow(1 + monthlyRate, term) - 1);
    
    const resultDiv = document.getElementById('calculator-result');
    if (resultDiv) {
        resultDiv.innerHTML = `
            <strong>Cuota mensual estimada: $${payment.toFixed(2)}</strong><br>
            <small>Monto: $${amount.toLocaleString()} | Tasa: ${rate}% | Plazo: ${term} meses</small>
        `;
    }
}

function setupComparator() {
    const selectors = ['compare-1', 'compare-2', 'compare-3'];
    const allInstitutions = [...appData.bancos, ...appData.cooperativas];
    
    selectors.forEach(selectorId => {
        const select = document.getElementById(selectorId);
        if (!select) return;
        
        select.innerHTML = '<option value="">Seleccionar...</option>';
        
        allInstitutions.forEach(inst => {
            const option = document.createElement('option');
            option.value = `${inst.tipo}-${inst.id}`;
            option.textContent = inst.nombre_corto || inst.nombre;
            select.appendChild(option);
        });
    });
}

function generateComparison() {
    const select1 = document.getElementById('compare-1');
    const select2 = document.getElementById('compare-2');
    const select3 = document.getElementById('compare-3');
    
    if (!select1 || !select2 || !select3) return;
    
    const selections = [
        select1.value,
        select2.value,
        select3.value
    ].filter(val => val !== '');
    
    if (selections.length < 2) {
        alert('Selecciona al menos 2 instituciones para comparar');
        return;
    }
    
    const institutions = selections.map(sel => {
        const [type, id] = sel.split('-');
        const data = type === 'banco' ? appData.bancos : appData.cooperativas;
        return data.find(inst => inst.id == id);
    }).filter(Boolean);
    
    displayComparison(institutions);
    generateRecommendations(institutions);
}

function displayComparison(institutions) {
    const container = document.getElementById('comparison-result');
    if (!container) return;
    
    if (institutions.length === 0) {
        container.innerHTML = '<p>Selecciona instituciones para comparar</p>';
        return;
    }
    
    const table = document.createElement('table');
    table.className = 'comparison-table';
    
    const headers = ['Indicador', ...institutions.map(inst => inst.nombre_corto || inst.nombre)];
    const thead = document.createElement('thead');
    thead.innerHTML = `<tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>`;
    table.appendChild(thead);
    
    const indicators = [
        ['Activos (MM)', 'activos_mill', '$'],
        ['Calificacion', 'calificacion', ''],
        ['Solvencia', 'solvencia', '%'],
        ['Morosidad', 'morosidad', '%'],
        ['ROA', 'roa', '%'],
        ['ROE', 'roe', '%'],
        ['Liquidez', 'liquidez', '%']
    ];
    
    const tbody = document.createElement('tbody');
    indicators.forEach(([label, key, suffix]) => {
        const row = document.createElement('tr');
        const cells = [label, ...institutions.map(inst => {
            const value = inst[key];
            if (typeof value === 'number') {
                return suffix === '$' ? `$${value.toLocaleString()}` : `${value}${suffix}`;
            }
            return value || 'N/A';
        })];
        row.innerHTML = cells.map(cell => `<td>${cell}</td>`).join('');
        tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    container.innerHTML = '<h3>Comparacion Detallada</h3>';
    container.appendChild(table);
}

function generateRecommendations(institutions) {
    const container = document.getElementById('recommendations');
    if (!container) return;
    
    if (institutions.length === 0) {
        container.innerHTML = '';
        return;
    }
    
    const recommendations = [];
    
    // Find best ROA
    const bestROA = institutions.reduce((best, inst) => 
        inst.roa > best.roa ? inst : best
    );
    recommendations.push(`**Mejor ROA**: ${bestROA.nombre_corto || bestROA.nombre} con ${bestROA.roa}%`);
    
    // Find best solvency
    const bestSolvency = institutions.reduce((best, inst) => 
        inst.solvencia > best.solvencia ? inst : best
    );
    recommendations.push(`**Mayor Solvencia**: ${bestSolvency.nombre_corto || bestSolvency.nombre} con ${bestSolvency.solvencia}%`);
    
    // Find lowest delinquency
    const bestMorosidad = institutions.reduce((best, inst) => 
        inst.morosidad < best.morosidad ? inst : best
    );
    recommendations.push(`**Menor Morosidad**: ${bestMorosidad.nombre_corto || bestMorosidad.nombre} con ${bestMorosidad.morosidad}%`);
    
    container.innerHTML = `
        <h3>Recomendaciones</h3>
        ${recommendations.map(rec => 
            `<div class="recommendation-item">${rec}</div>`
        ).join('')}
        <div class="recommendation-item">
            <strong>Recomendacion General:</strong> Considera diversificar entre diferentes instituciones 
            y sectores para reducir el riesgo de concentracion.
        </div>
    `;
}

function simulateDiversification() {
    const totalAmountInput = document.getElementById('total-amount');
    if (!totalAmountInput) return;
    
    const totalAmount = parseFloat(totalAmountInput.value);
    
    if (!totalAmount || totalAmount <= 0) {
        alert('Ingresa un monto valido para simular');
        return;
    }
    
    const resultDiv = document.getElementById('simulation-result');
    if (!resultDiv) return;
    
    const maxPerInstitution = 32000; // Seguro de depositos
    const recommendedInstitutions = Math.ceil(totalAmount / maxPerInstitution);
    
    const topInstitutions = [
        ...appData.bancos.filter(b => ['AA+', 'AA'].includes(b.calificacion)),
        ...appData.cooperativas.filter(c => ['A+', 'A'].includes(c.calificacion))
    ].sort((a, b) => b.solvencia - a.solvencia).slice(0, recommendedInstitutions);
    
    const amountPerInstitution = Math.min(totalAmount / recommendedInstitutions, maxPerInstitution);
    
    resultDiv.innerHTML = `
        <h4>Simulacion de Diversificacion</h4>
        <p><strong>Monto total:</strong> $${totalAmount.toLocaleString()}</p>
        <p><strong>Instituciones recomendadas:</strong> ${recommendedInstitutions}</p>
        <p><strong>Monto por institucion:</strong> $${amountPerInstitution.toLocaleString()}</p>
        
        <h5>Instituciones Sugeridas:</h5>
        <ul>
            ${topInstitutions.map(inst => 
                `<li>${inst.nombre_corto || inst.nombre} (${inst.calificacion}) - $${amountPerInstitution.toLocaleString()}</li>`
            ).join('')}
        </ul>
        
        <div class="alert-card" style="margin-top: 16px; border-left-color: var(--color-success);">
            <strong>Proteccion del seguro de depositos:</strong> 
            ${totalAmount <= maxPerInstitution * recommendedInstitutions ? 
              'Completa' : 'Parcial - considera mas instituciones'}
        </div>
    `;
}

// Utility functions
function getRatingClass(rating) {
    if (['AAA', 'AA+', 'AA'].includes(rating)) return 'excellent';
    if (['AA-', 'A+', 'A'].includes(rating)) return 'good';
    return 'warning';
}

function getSemaforoRating(institution) {
    let score = 0;
    
    // ROA scoring
    if (institution.roa >= 1.5) score += 2;
    else if (institution.roa >= 1.0) score += 1;
    
    // Solvency scoring
    if (institution.solvencia >= 15) score += 2;
    else if (institution.solvencia >= 12) score += 1;
    
    // Delinquency scoring (inverted)
    if (institution.morosidad <= 3) score += 2;
    else if (institution.morosidad <= 5) score += 1;
    
    if (score >= 5) return { class: 'excellent', text: 'Excelente' };
    if (score >= 3) return { class: 'good', text: 'Bueno' };
    return { class: 'warning', text: 'Precaucion' };
}

function setupTableSorting(tableId) {
    const table = document.getElementById(tableId);
    if (!table) return;
    
    const headers = table.querySelectorAll('th.sortable');
    
    headers.forEach(header => {
        header.addEventListener('click', function() {
            const column = this.dataset.sort;
            const tbody = table.querySelector('tbody');
            const rows = Array.from(tbody.querySelectorAll('tr'));
            
            const isNumeric = ['activos_mill', 'solvencia', 'morosidad', 'roa', 'roe', 'liquidez'].includes(column);
            
            rows.sort((a, b) => {
                const aVal = a.cells[Array.from(this.parentNode.children).indexOf(this)].textContent;
                const bVal = b.cells[Array.from(this.parentNode.children).indexOf(this)].textContent;
                
                if (isNumeric) {
                    return parseFloat(bVal.replace(/[^0-9.-]/g, '')) - parseFloat(aVal.replace(/[^0-9.-]/g, ''));
                }
                
                return aVal.localeCompare(bVal);
            });
            
            tbody.innerHTML = '';
            rows.forEach(row => tbody.appendChild(row));
        });
    });
}

function showInstitutionDetails(type, id) {
    const data = type === 'banco' ? appData.bancos : appData.cooperativas;
    const institution = data.find(inst => inst.id === id);
    
    if (!institution) return;
    
    const modal = document.getElementById('institution-modal');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');
    
    if (!modal || !title || !body) return;
    
    title.textContent = institution.nombre;
    
    const products = Object.entries(institution.productos_credito).map(([tipo, producto]) => `
        <div style="margin-bottom: 16px; padding: 12px; background: var(--color-surface); border-radius: 8px;">
            <h5 style="margin: 0 0 8px 0; color: var(--color-primary);">${tipo.charAt(0).toUpperCase() + tipo.slice(1)}</h5>
            <p style="margin: 4px 0;"><strong>Monto:</strong> $${producto.monto_min.toLocaleString()} - $${producto.monto_max.toLocaleString()}</p>
            <p style="margin: 4px 0;"><strong>Tasa:</strong> ${producto.tasa_min}% - ${producto.tasa_max}%</p>
            <p style="margin: 4px 0;"><strong>Plazo:</strong> Hasta ${producto.plazo_max_meses} meses</p>
            ${producto.ventajas ? `<p style="margin: 4px 0;"><strong>Ventajas:</strong> ${producto.ventajas.join(', ')}</p>` : ''}
        </div>
    `).join('');
    
    body.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px;">
            <div>
                <h4>Indicadores Financieros</h4>
                <p><strong>Activos:</strong> $${institution.activos_mill.toLocaleString()} millones</p>
                <p><strong>Calificacion:</strong> ${institution.calificacion}</p>
                <p><strong>Solvencia:</strong> ${institution.solvencia}%</p>
                <p><strong>Morosidad:</strong> ${institution.morosidad}%</p>
                <p><strong>ROA:</strong> ${institution.roa}%</p>
                <p><strong>ROE:</strong> ${institution.roe}%</p>
                <p><strong>Liquidez:</strong> ${institution.liquidez}%</p>
            </div>
            <div>
                <h4>Informacion General</h4>
                <p><strong>Estado:</strong> ${institution.estado}</p>
                <p><strong>Supervision:</strong> ${institution.supervision}</p>
                ${institution.socios_aprox ? `<p><strong>Socios:</strong> ${institution.socios_aprox.toLocaleString()}</p>` : ''}
                ${institution.provincia ? `<p><strong>Provincia:</strong> ${institution.provincia}</p>` : ''}
                <p><strong>Website:</strong> <a href="${institution.website}" target="_blank">Visitar</a></p>
            </div>
        </div>
        <div>
            <h4>Productos de Credito</h4>
            ${products}
        </div>
    `;
    
    modal.classList.remove('hidden');
}

function closeModal() {
    const modal = document.getElementById('institution-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function filterIndicators(filterType) {
    // This would filter the indicators table based on short/long term
    console.log('Filtering indicators by:', filterType);
}

function toggleTheme() {
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    
    if (!themeToggle) return;
    
    if (currentTheme === 'light') {
        body.setAttribute('data-color-scheme', 'dark');
        themeToggle.textContent = 'Modo Claro';
        currentTheme = 'dark';
    } else {
        body.setAttribute('data-color-scheme', 'light');
        themeToggle.textContent = 'Modo Oscuro';
        currentTheme = 'light';
    }
    
    // Refresh charts with new theme
    setTimeout(() => {
        Object.values(charts).forEach(chart => {
            if (chart && chart.update) {
                chart.update();
            }
        });
    }, 100);
}

function setupThemeToggle() {
    // Initialize theme based on system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        toggleTheme();
    }
}

