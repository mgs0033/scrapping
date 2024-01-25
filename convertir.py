import csv
import json

def csv_to_json(csv_file, json_file):
    # Abrir el archivo CSV con codificación UTF-8
    with open(csv_file, 'r', encoding='utf-8') as csvfile:
        # Leer el archivo CSV como un diccionario
        csv_dict = csv.DictReader(csvfile)
        # Convertir el diccionario a una lista de diccionarios
        data = list(csv_dict)
    # Escribir la lista de diccionarios en un archivo JSON
    with open(json_file, 'w', encoding='utf-8') as jsonfile:
        jsonfile.write(json.dumps(data, indent=2, ensure_ascii=False))

# Reemplaza 'webscarping.csv' y 'productos.json' con tus nombres de archivo
csv_to_json('webscarping.csv', 'productos.json')